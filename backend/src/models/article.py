"""Article data models with Pydantic validation"""
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field, validator, HttpUrl


class Author(BaseModel):
    """Author information"""
    name: str = Field(..., min_length=1, max_length=200)
    affiliation: Optional[str] = Field(None, max_length=300)
    orcid: Optional[str] = None
    
    @validator('name')
    def validate_name(cls, v):
        """Validate author name"""
        if not v.strip():
            raise ValueError("Author name cannot be empty")
        return v.strip()
    
    class Config:
        json_schema_extra = {
            "example": {
                "name": "Ahmet Yılmaz",
                "affiliation": "İstanbul Üniversitesi",
                "orcid": "0000-0001-2345-6789"
            }
        }


class Article(BaseModel):
    """Academic article data model"""
    title: str = Field(..., min_length=5, max_length=500)
    authors: List[Author] = Field(..., min_items=1)
    abstract: Optional[str] = Field(None, max_length=5000)
    keywords: List[str] = Field(default_factory=list)
    publication_date: Optional[datetime] = None
    doi: Optional[str] = None
    url: Optional[HttpUrl] = None
    journal: Optional[str] = Field(None, max_length=300)
    volume: Optional[str] = None
    issue: Optional[str] = None
    pages: Optional[str] = None
    language: Optional[str] = Field(default="tr", max_length=10)
    source: str = Field(..., description="Data source (e.g., 'tubitak', 'dergipark')")
    
    @validator('title')
    def validate_title(cls, v):
        """Validate article title"""
        if not v.strip():
            raise ValueError("Title cannot be empty")
        return v.strip()
    
    @validator('keywords')
    def validate_keywords(cls, v):
        """Validate and clean keywords"""
        return [kw.strip() for kw in v if kw.strip()]
    
    @validator('language')
    def validate_language(cls, v):
        """Validate language code"""
        valid_languages = ['tr', 'en', 'de', 'fr', 'es']
        if v and v.lower() not in valid_languages:
            raise ValueError(f"Language must be one of {valid_languages}")
        return v.lower() if v else 'tr'
    
    class Config:
        json_schema_extra = {
            "example": {
                "title": "Yapay Zeka ve Makine Öğrenmesi Uygulamaları",
                "authors": [
                    {
                        "name": "Ahmet Yılmaz",
                        "affiliation": "İstanbul Üniversitesi"
                    }
                ],
                "abstract": "Bu çalışmada yapay zeka uygulamaları incelenmektedir.",
                "keywords": ["yapay zeka", "makine öğrenmesi"],
                "publication_date": "2024-01-15T00:00:00",
                "doi": "10.1234/example.doi",
                "journal": "Bilgisayar Bilimleri Dergisi",
                "source": "tubitak",
                "language": "tr"
            }
        }
