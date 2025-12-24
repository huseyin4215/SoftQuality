"""Utility functions for testing"""
import os
import sys
from pathlib import Path


def get_project_root() -> Path:
    """Get project root directory"""
    return Path(__file__).parent.parent


def ensure_logs_dir():
    """Ensure logs directory exists"""
    logs_dir = get_project_root() / "logs"
    logs_dir.mkdir(exist_ok=True)
    return logs_dir


def ensure_reports_dir():
    """Ensure reports directory exists"""
    reports_dir = get_project_root() / "reports"
    reports_dir.mkdir(exist_ok=True)
    return reports_dir
