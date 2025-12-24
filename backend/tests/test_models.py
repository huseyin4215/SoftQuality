"""Unit tests for data models"""
import pytest
from datetime import datetime
from pydantic import ValidationError
from src.models import Article, Author


@pytest.mark.unit
class TestAuthorModel:
    """Test cases for Author model"""
    
    def test_valid_author_creation(self):
        """Test creating valid author"""
        author = Author(
            name="Dr. Ahmet Yılmaz",
            affiliation="İstanbul Üniversitesi",
            orcid="0000-0001-2345-6789"
        )
        
        assert author.name == "Dr. Ahmet Yılmaz"
        assert author.affiliation == "İstanbul Üniversitesi"
        assert author.orcid == "0000-0001-2345-6789"
    
    def test_author_name_validation(self):
        """Test author name validation"""
        # Empty name should fail
        with pytest.raises(ValidationError):
            Author(name="")
        
        # Whitespace only should fail
        with pytest.raises(ValidationError):
            Author(name="   ")
    
    def test_author_name_strip(self):
        """Test that author name is stripped"""
        author = Author(name="  Test Name  ")
        assert author.name == "Test Name"
    
    def test_minimal_author(self):
        """Test creating author with only required fields"""
        author = Author(name="Test Author")
        assert author.name == "Test Author"
        assert author.affiliation is None
        assert author.orcid is None


@pytest.mark.unit
class TestArticleModel:
    """Test cases for Article model"""
    
    def test_valid_article_creation(self, sample_article_data):
        """Test creating valid article"""
        article = Article(**sample_article_data)
        
        assert article.title == sample_article_data["title"]
        assert len(article.authors) == 2
        assert article.source == "tubitak"
        assert article.language == "tr"
    
    def test_article_title_validation(self):
        """Test article title validation"""
        # Empty title should fail
        with pytest.raises(ValidationError):
            Article(
                title="",
                authors=[Author(name="Test")],
                source="tubitak"
            )
        
        # Too short title should fail
        with pytest.raises(ValidationError):
            Article(
                title="ABC",  # Less than 5 characters
                authors=[Author(name="Test")],
                source="tubitak"
            )
    
    def test_article_requires_authors(self):
        """Test that article requires at least one author"""
        with pytest.raises(ValidationError):
            Article(
                title="Test Article Title",
                authors=[],  # Empty authors list
                source="tubitak"
            )
    
    def test_keywords_validation(self):
        """Test keywords are cleaned and validated"""
        article = Article(
            title="Test Article",
            authors=[Author(name="Test")],
            keywords=["  keyword1  ", "", "keyword2", "   "],
            source="tubitak"
        )
        
        # Empty keywords should be filtered out
        assert len(article.keywords) == 2
        assert "keyword1" in article.keywords
        assert "keyword2" in article.keywords
    
    def test_language_validation(self):
        """Test language code validation"""
        # Valid language
        article = Article(
            title="Test Article",
            authors=[Author(name="Test")],
            source="tubitak",
            language="en"
        )
        assert article.language == "en"
        
        # Invalid language should fail
        with pytest.raises(ValidationError):
            Article(
                title="Test Article",
                authors=[Author(name="Test")],
                source="tubitak",
                language="invalid"
            )
    
    def test_default_values(self):
        """Test model default values"""
        article = Article(
            title="Test Article Title",
            authors=[Author(name="Test Author")],
            source="tubitak"
        )
        
        assert article.keywords == []
        assert article.language == "tr"
        assert article.abstract is None
        assert article.doi is None
    
    def test_article_title_strip(self):
        """Test that title is stripped"""
        article = Article(
            title="  Test Title  ",
            authors=[Author(name="Test")],
            source="tubitak"
        )
        assert article.title == "Test Title"


@pytest.mark.schema
class TestSchemaValidation:
    """Test schema validation scenarios"""
    
    def test_complete_article_schema(self, sample_article_data):
        """Test complete article with all fields"""
        article = Article(**sample_article_data)
        
        # Validate as dict
        article_dict = article.model_dump()
        assert "title" in article_dict
        assert "authors" in article_dict
        assert "source" in article_dict
    
    def test_invalid_data_types(self):
        """Test that invalid data types are rejected"""
        with pytest.raises(ValidationError):
            Article(
                title=123,  # Should be string
                authors=[Author(name="Test")],
                source="tubitak"
            )
        
        with pytest.raises(ValidationError):
            Article(
                title="Test",
                authors="not a list",  # Should be list
                source="tubitak"
            )
