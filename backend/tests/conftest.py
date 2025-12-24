"""Pytest fixtures and configuration"""
import pytest
import os
import sys
from pathlib import Path

# Add src to path
backend_dir = Path(__file__).parent.parent
sys.path.insert(0, str(backend_dir))

from mock_server.app import create_app
from src.config import settings


@pytest.fixture(scope="session")
def mock_server():
    """Start mock Flask server for testing"""
    app = create_app()
    app.config['TESTING'] = True
    return app


@pytest.fixture(scope="session")
def mock_server_url():
    """Get mock server URL"""
    return settings.mock_server_url


@pytest.fixture
def sample_article_data():
    """Sample article data for testing"""
    return {
        "title": "Test Article Title",
        "authors": [
            {"name": "Test Author 1", "affiliation": "Test University"},
            {"name": "Test Author 2"}
        ],
        "abstract": "This is a test abstract",
        "keywords": ["test", "sample", "article"],
        "publication_date": "2024-01-15T00:00:00",
        "doi": "10.1234/test.doi",
        "journal": "Test Journal",
        "source": "tubitak",
        "language": "tr"
    }


@pytest.fixture
def sample_invalid_article_data():
    """Invalid article data for testing validation"""
    return {
        "title": "",  # Invalid: empty title
        "authors": [],  # Invalid: no authors
        "source": "tubitak"
    }


@pytest.fixture(autouse=True)
def reset_env():
    """Reset environment before each test"""
    # Set test environment
    os.environ['ENVIRONMENT'] = 'test'
    os.environ['USE_MOCK_SERVER'] = 'true'
    yield
    # Cleanup after test


@pytest.fixture
def mock_html_response():
    """Mock HTML response for scraper testing"""
    return """
    <html>
    <body>
        <div class="article-item">
            <h3 class="article-title">Test Article</h3>
            <div class="authors">
                <span class="author">Test Author</span>
            </div>
            <div class="abstract">Test abstract</div>
            <div class="keywords">
                <span class="keyword">test</span>
            </div>
            <span class="journal-name">Test Journal</span>
        </div>
    </body>
    </html>
    """


@pytest.fixture
def broken_html_response():
    """Broken HTML for testing error handling"""
    return """
    <html>
    <body>
        <div class="wrong-class">
            <!-- Missing expected elements -->
        </div>
    </body>
    </html>
    """
