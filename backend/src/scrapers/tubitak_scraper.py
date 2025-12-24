"""TÜBİTAK TR Dizin scraper implementation"""
from typing import List, Optional
from datetime import datetime
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
from src.scrapers.base_scraper import BaseScraper
from src.models import Article, Author
from src.config import settings


class TubitakScraper(BaseScraper):
    """Scraper for TÜBİTAK TR Dizin (https://search.trdizin.gov.tr)"""
    
    def __init__(self):
        super().__init__(use_selenium=True)
        self.base_url = settings.tubitak_base_url
    
    def scrape(self, search_query: str, max_results: int = 10) -> List[Article]:
        """
        Scrape articles from TÜBİTAK TR Dizin
        
        Args:
            search_query: Search term
            max_results: Maximum number of results
            
        Returns:
            List of Article objects
        """
        articles = []
        search_url = f"{self.base_url}/search?q={search_query}"
        
        try:
            # Get search results page
            page_source = self.safe_get(search_url)
            soup = BeautifulSoup(page_source, 'html.parser')
            
            # Find article containers (adjust selectors based on actual site)
            article_elements = soup.find_all('div', class_='article-item', limit=max_results)
            
            for element in article_elements:
                article = self._parse_article_element(element)
                if article:
                    articles.append(article)
                    self.logger.info(f"Scraped article: {article.title[:50]}...")
            
            self.logger.info(f"Successfully scraped {len(articles)} articles")
            
        except Exception as e:
            self.logger.error(f"Error scraping TÜBİTAK: {str(e)}")
            raise
        
        return articles
    
    def _parse_article_element(self, element) -> Optional[Article]:
        """
        Parse a single article element
        
        Args:
            element: BeautifulSoup element containing article data
            
        Returns:
            Article object or None
        """
        try:
            # Extract title
            title_elem = element.find('h3', class_='article-title')
            if not title_elem:
                return None
            title = title_elem.get_text(strip=True)
            
            # Extract authors
            authors_elem = element.find('div', class_='authors')
            authors = self._parse_authors(authors_elem) if authors_elem else []
            
            # Extract abstract
            abstract_elem = element.find('div', class_='abstract')
            abstract = abstract_elem.get_text(strip=True) if abstract_elem else None
            
            # Extract keywords
            keywords_elem = element.find('div', class_='keywords')
            keywords = self._parse_keywords(keywords_elem) if keywords_elem else []
            
            # Extract publication info
            journal_elem = element.find('span', class_='journal-name')
            journal = journal_elem.get_text(strip=True) if journal_elem else None
            
            # Extract DOI
            doi_elem = element.find('a', class_='doi-link')
            doi = doi_elem.get('href', '').replace('https://doi.org/', '') if doi_elem else None
            
            # Create Article object
            article = Article(
                title=title,
                authors=authors if authors else [Author(name="Unknown")],
                abstract=abstract,
                keywords=keywords,
                journal=journal,
                doi=doi,
                source="tubitak",
                language="tr"
            )
            
            return article
            
        except Exception as e:
            self.logger.error(f"Error parsing article element: {str(e)}")
            return None
    
    def _parse_authors(self, authors_elem) -> List[Author]:
        """Parse authors from element"""
        authors = []
        author_items = authors_elem.find_all('span', class_='author')
        
        for item in author_items:
            name = item.get_text(strip=True)
            if name:
                authors.append(Author(name=name))
        
        return authors
    
    def _parse_keywords(self, keywords_elem) -> List[str]:
        """Parse keywords from element"""
        keywords = []
        keyword_items = keywords_elem.find_all('span', class_='keyword')
        
        for item in keyword_items:
            keyword = item.get_text(strip=True)
            if keyword:
                keywords.append(keyword)
        
        return keywords
    
    def parse_article(self, html: str) -> Optional[Article]:
        """
        Parse article from HTML page
        
        Args:
            html: HTML content
            
        Returns:
            Article object or None
        """
        soup = BeautifulSoup(html, 'html.parser')
        article_elem = soup.find('div', class_='article-detail')
        
        if article_elem:
            return self._parse_article_element(article_elem)
        
        return None
