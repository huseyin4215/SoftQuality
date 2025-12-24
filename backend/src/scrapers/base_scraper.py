"""Base scraper class for web scraping operations"""
from abc import ABC, abstractmethod
from typing import List, Optional
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
from tenacity import retry, stop_after_attempt, wait_fixed
from src.config import settings
from src.logger import app_logger
from src.models import Article


class BaseScraper(ABC):
    """Base class for all web scrapers"""
    
    def __init__(self, use_selenium: bool = True):
        """
        Initialize scraper
        
        Args:
            use_selenium: Whether to use Selenium or just requests/BeautifulSoup
        """
        self.use_selenium = use_selenium
        self.driver: Optional[webdriver.Chrome] = None
        self.logger = app_logger
        
    def setup_driver(self) -> webdriver.Chrome:
        """Setup and configure Selenium WebDriver"""
        chrome_options = Options()
        
        if settings.selenium_headless:
            chrome_options.add_argument("--headless")
        
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--window-size=1920,1080")
        chrome_options.add_argument("--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
        
        service = Service(ChromeDriverManager().install())
        driver = webdriver.Chrome(service=service, options=chrome_options)
        driver.implicitly_wait(settings.selenium_implicit_wait)
        
        self.logger.info("Selenium WebDriver initialized successfully")
        return driver
    
    def __enter__(self):
        """Context manager entry"""
        if self.use_selenium:
            self.driver = self.setup_driver()
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        """Context manager exit - cleanup"""
        if self.driver:
            self.driver.quit()
            self.logger.info("WebDriver closed")
    
    def get_page_source(self, url: str) -> str:
        """
        Get page source from URL
        
        Args:
            url: Target URL
            
        Returns:
            HTML source code
        """
        if self.driver:
            self.driver.get(url)
            self.logger.info(f"Navigated to: {url}")
            return self.driver.page_source
        else:
            raise RuntimeError("WebDriver not initialized. Use context manager.")
    
    def wait_for_element(self, by, value, timeout: int = None):
        """
        Wait for element to be present
        
        Args:
            by: Selenium By locator type
            value: Locator value
            timeout: Maximum wait time in seconds
        """
        if not self.driver:
            raise RuntimeError("WebDriver not initialized")
        
        wait_time = timeout or settings.selenium_timeout
        wait = WebDriverWait(self.driver, wait_time)
        return wait.until(EC.presence_of_element_located((by, value)))
    
    @retry(stop=stop_after_attempt(3), wait=wait_fixed(2))
    def safe_get(self, url: str) -> str:
        """
        Safely get page with retry logic
        
        Args:
            url: Target URL
            
        Returns:
            Page source
        """
        try:
            return self.get_page_source(url)
        except Exception as e:
            self.logger.error(f"Error fetching {url}: {str(e)}")
            raise
    
    @abstractmethod
    def scrape(self, search_query: str, max_results: int = 10) -> List[Article]:
        """
        Scrape articles based on search query
        
        Args:
            search_query: Search term
            max_results: Maximum number of results to return
            
        Returns:
            List of Article objects
        """
        pass
    
    @abstractmethod
    def parse_article(self, html: str) -> Optional[Article]:
        """
        Parse article from HTML
        
        Args:
            html: HTML content
            
        Returns:
            Article object or None
        """
        pass
