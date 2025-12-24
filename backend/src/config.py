"""Configuration management for LearnExp Collector Service"""
import os
from pathlib import Path
from pydantic_settings import BaseSettings
from pydantic import Field


class Settings(BaseSettings):
    """Application settings loaded from environment variables"""
    
    # Environment
    environment: str = Field(default="development", env="ENVIRONMENT")
    
    # Mock Server
    mock_server_host: str = Field(default="localhost", env="MOCK_SERVER_HOST")
    mock_server_port: int = Field(default=5000, env="MOCK_SERVER_PORT")
    use_mock_server: bool = Field(default=True, env="USE_MOCK_SERVER")
    
    # Selenium
    selenium_headless: bool = Field(default=True, env="SELENIUM_HEADLESS")
    selenium_timeout: int = Field(default=30, env="SELENIUM_TIMEOUT")
    selenium_implicit_wait: int = Field(default=10, env="SELENIUM_IMPLICIT_WAIT")
    browser: str = Field(default="chrome", env="BROWSER")
    
    # Scraping
    tubitak_base_url: str = Field(
        default="https://search.trdizin.gov.tr", 
        env="TUBITAK_BASE_URL"
    )
    request_timeout: int = Field(default=30, env="REQUEST_TIMEOUT")
    retry_attempts: int = Field(default=3, env="RETRY_ATTEMPTS")
    retry_delay: int = Field(default=2, env="RETRY_DELAY")
    
    # Logging
    log_level: str = Field(default="INFO", env="LOG_LEVEL")
    log_file: str = Field(default="logs/learnexp.log", env="LOG_FILE")
    
    # Testing
    run_slow_tests: bool = Field(default=False, env="RUN_SLOW_TESTS")
    parallel_workers: int = Field(default=4, env="PARALLEL_WORKERS")
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False
    
    @property
    def mock_server_url(self) -> str:
        """Get full mock server URL"""
        return f"http://{self.mock_server_host}:{self.mock_server_port}"
    
    @property
    def base_dir(self) -> Path:
        """Get base directory of the project"""
        return Path(__file__).parent.parent


# Global settings instance
settings = Settings()
