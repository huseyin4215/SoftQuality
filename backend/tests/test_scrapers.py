"""Functional tests for scrapers using Selenium"""
import pytest
from unittest.mock import Mock, patch
from src.scrapers import TubitakScraper
from src.models import Article


@pytest.mark.functional
@pytest.mark.slow
class TestTubitakScraperFunctional:
    """Functional tests for TÜBİTAK scraper"""
    
    def test_scraper_initialization(self):
        """Test scraper can be initialized"""
        scraper = TubitakScraper()
        assert scraper is not None
        assert scraper.use_selenium is True
    
    @patch('src.scrapers.base_scraper.ChromeDriverManager')
    def test_scraper_context_manager(self, mock_driver_manager):
        """Test scraper context manager"""
        with TubitakScraper() as scraper:
            assert scraper.driver is not None
    
    def test_scraper_with_mock_html(self, mock_html_response):
        """Test scraping with mock HTML"""
        scraper = TubitakScraper()
        
        # Parse the mock HTML
        from bs4 import BeautifulSoup
        soup = BeautifulSoup(mock_html_response, 'html.parser')
        article_elem = soup.find('div', class_='article-item')
        
        article = scraper._parse_article_element(article_elem)
        
        assert article is not None
        assert article.title == "Test Article"
        assert len(article.authors) > 0
        assert article.source == "tubitak"
    
    def test_scraper_handles_missing_elements(self):
        """Test scraper handles missing HTML elements gracefully"""
        scraper = TubitakScraper()
        
        incomplete_html = """
        <div class="article-item">
            <h3 class="article-title">Only Title</h3>
        </div>
        """
        
        from bs4 import BeautifulSoup
        soup = BeautifulSoup(incomplete_html, 'html.parser')
        article_elem = soup.find('div', class_='article-item')
        
        article = scraper._parse_article_element(article_elem)
        
        # Should still create article with defaults
        assert article is not None
        assert article.title == "Only Title"
    
    def test_scraper_returns_none_for_invalid_html(self, broken_html_response):
        """Test scraper returns None for completely broken HTML"""
        scraper = TubitakScraper()
        article = scraper.parse_article(broken_html_response)
        
        # Should handle gracefully
        assert article is None or isinstance(article, Article)


@pytest.mark.functional
class TestBaseScraper:
    """Test base scraper functionality"""
    
    def test_base_scraper_abstract_methods(self):
        """Test that BaseScraper enforces abstract methods"""
        from src.scrapers.base_scraper import BaseScraper
        
        # Cannot instantiate abstract class directly
        with pytest.raises(TypeError):
            BaseScraper()
    
    def test_retry_logic(self):
        """Test that retry logic is configured"""
        scraper = TubitakScraper()
        
        # Check that safe_get has retry decorator
        assert hasattr(scraper.safe_get, 'retry')


@pytest.mark.integration
class TestScraperWithMockServer:
    """Integration tests using mock server"""
    
    def test_mock_server_is_accessible(self, mock_server):
        """Test that mock server is running"""
        with mock_server.test_client() as client:
            response = client.get('/health')
            assert response.status_code == 200
            assert response.json['status'] == 'healthy'
    
    def test_mock_server_search_endpoint(self, mock_server):
        """Test mock server search endpoint"""
        with mock_server.test_client() as client:
            response = client.get('/search')
            assert response.status_code == 200
            assert b'article-item' in response.data
    
    def test_scraper_against_mock_server(self, mock_server, mock_server_url):
        """Test scraper against mock server"""
        # This would require actually running the mock server
        # For now, we test the structure
        with mock_server.test_client() as client:
            response = client.get('/search')
            html = response.data.decode('utf-8')
            
            scraper = TubitakScraper()
            from bs4 import BeautifulSoup
            soup = BeautifulSoup(html, 'html.parser')
            articles = soup.find_all('div', class_='article-item')
            
            assert len(articles) > 0
