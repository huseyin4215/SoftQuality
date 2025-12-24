"""
LearnExp Gerçek Proje Entegrasyon Testleri
==========================================

Bu test dosyası, SoftQuality test projesi ile gerçek LearnExp projesini bağlar.
LearnExp'teki scraper'ları, modelleri ve fonksiyonları test eder.

Not: Bu testler çalışmadan önce:
1. LearnExp projesi C:\Users\rukiye\Desktop\LearnExp konumunda olmalı
2. backend/learnexp_config.py dosyası doğru yapılandırılmış olmalı
3. `python backend/learnexp_config.py` komutu ile doğrulama yapılmalı
"""

import pytest
import sys
from pathlib import Path

# LearnExp konfigürasyonunu import et
# Tests klasöründen backend/ klasörüne erişim için parent directory ekle
test_dir = Path(__file__).parent
backend_dir = test_dir.parent

if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

from learnexp_config import (
    LEARNEXP_ROOT,
    LEARNEXP_BACKEND,
    validate_learnexp_installation,
    import_learnexp_module
)


@pytest.fixture(scope="session", autouse=True)
def validate_learnexp():
    """
    Test suite başlamadan önce LearnExp erişilebilirliğini kontrol eder
    """
    try:
        validate_learnexp_installation()
        print(f"\n✅ LearnExp bulundu: {LEARNEXP_ROOT}")
    except FileNotFoundError as e:
        pytest.skip(f"LearnExp bulunamadı: {e}")


@pytest.mark.learnexp
class TestLearnExpConnection:
    """LearnExp projesi erişilebilir mi?"""
    
    def test_learnexp_exists(self):
        """LearnExp klasörü mevcut mu?"""
        assert LEARNEXP_ROOT.exists(), f"LearnExp bulunamadı: {LEARNEXP_ROOT}"
    
    def test_learnexp_not_empty(self):
        """LearnExp klasörü boş değil mi?"""
        contents = list(LEARNEXP_ROOT.iterdir())
        assert len(contents) > 0, "LearnExp klasörü boş!"
    
    def test_learnexp_in_python_path(self):
        """LearnExp Python path'e eklenmiş mi?"""
        assert str(LEARNEXP_ROOT) in sys.path, "LearnExp Python path'te değil!"


@pytest.mark.learnexp
class TestLearnExpModuleImport:
    """LearnExp modülleri import edilebiliyor mu?"""
    
    def test_import_attempts(self):
        """
        LearnExp'teki Django modüllerini test et
        
        LearnExp Django projesi yapısı:
        - webscraping/
        - collecterService/ (typo: collecter)  
        - api/
        - apiCallback/
        - config/
        """
        possible_imports = [
            # Django apps
            'webscraping',
            'collecterService',  # Note: typo in original
            'api',
            'apiCallback',
            'config',
            
            # Alt modüller (varsa)
            'webscraping.models',
            'collecterService.models',
            'webscraping.views',
        ]
        
        successful_imports = []
        failed_imports = []
        
        print(f"\n{'='*60}")
        print(f"Django Modül Import Testleri")
        print(f"{'='*60}")
        
        for module_name in possible_imports:
            try:
                module = __import__(module_name)
                successful_imports.append(module_name)
                print(f"✅ {module_name}")
            except ImportError as e:
                failed_imports.append((module_name, str(e)))
                print(f"❌ {module_name}: {str(e)[:50]}...")
        
        print(f"\n{'='*60}")
        print(f"📊 Sonuç: {len(successful_imports)}/{len(possible_imports)} başarılı")
        print(f"{'='*60}\n")
        
        # En az 1 Django app import edilebilmeli
        assert len(successful_imports) > 0, (
            f"Hiçbir LearnExp modülü import edilemedi!\n"
            f"Django apps bulunamadı.\n"
            f"manage.py var mı kontrol edin: {LEARNEXP_ROOT / 'backend' / 'manage.py'}"
        )


@pytest.mark.learnexp
@pytest.mark.skip(reason="LearnExp klasör yapısına göre güncellenmeli")
class TestLearnExpScrapers:
    """
    LearnExp scraper'larını test et
    
    Not: Bu testler LearnExp'teki gerçek scraper kodunu test eder.
    LearnExp klasör yapısına göre güncellenmeli!
    """
    
    def test_tubitak_scraper_exists(self):
        """TÜBİTAK scraper'ı var mı?"""
        try:
            # Örnek: LearnExp'te scraper şöyle import ediliyorsa
            # from collector_service.scrapers import TubitakScraper
            scrapers = import_learnexp_module('collector_service.scrapers')
            assert hasattr(scrapers, 'TubitakScraper')
        except ImportError:
            pytest.skip("LearnExp scraper modülü bulunamadı")
    
    def test_scraper_initialization(self):
        """Scraper başlatılabiliyor mu?"""
        try:
            scrapers = import_learnexp_module('collector_service.scrapers')
            TubitakScraper = scrapers.TubitakScraper
            scraper = TubitakScraper()
            assert scraper is not None
        except ImportError:
            pytest.skip("LearnExp scraper modülü bulunamadı")
    
    def test_scraper_has_scrape_method(self):
        """Scraper'da scrape() metodu var mı?"""
        try:
            scrapers = import_learnexp_module('collector_service.scrapers')
            TubitakScraper = scrapers.TubitakScraper
            scraper = TubitakScraper()
            assert hasattr(scraper, 'scrape')
            assert callable(getattr(scraper, 'scrape'))
        except ImportError:
            pytest.skip("LearnExp scraper modülü bulunamadı")


@pytest.mark.learnexp
@pytest.mark.skip(reason="LearnExp klasör yapısına göre güncellenmeli")
class TestLearnExpModels:
    """
    LearnExp veri modellerini test et
    
    Not: Bu testler LearnExp'teki gerçek model kodunu test eder.
    """
    
    def test_article_model_exists(self):
        """Article modeli var mı?"""
        try:
            models = import_learnexp_module('collector_service.models')
            assert hasattr(models, 'Article')
        except ImportError:
            pytest.skip("LearnExp models modülü bulunamadı")
    
    def test_author_model_exists(self):
        """Author modeli var mı?"""
        try:
            models = import_learnexp_module('collector_service.models')
            assert hasattr(models, 'Author')
        except ImportError:
            pytest.skip("LearnExp models modülü bulunamadı")


@pytest.mark.learnexp
class TestLearnExpInfo:
    """LearnExp proje bilgilerini görüntüle"""
    
    def test_show_learnexp_structure(self):
        """LearnExp klasör yapısını göster"""
        print(f"\n📂 LearnExp Klasör Yapısı:")
        print(f"   Root: {LEARNEXP_ROOT}")
        
        if LEARNEXP_ROOT.exists():
            contents = list(LEARNEXP_ROOT.iterdir())
            for item in contents:
                icon = "📁" if item.is_dir() else "📄"
                print(f"   {icon} {item.name}")
        
        # Bu test her zaman geçer, sadece bilgi amaçlı
        assert True


# ===== Test Yardımcı Fonksiyonları =====

def print_learnexp_diagnostics():
    """LearnExp bağlantı diagnostikleri"""
    print("\n" + "=" * 70)
    print("LearnExp Bağlantı Diagnostikleri")
    print("=" * 70)
    
    print(f"\n1. LearnExp Yolu:")
    print(f"   {LEARNEXP_ROOT}")
    print(f"   Var: {LEARNEXP_ROOT.exists()}")
    
    print(f"\n2. Python Path:")
    print(f"   LearnExp path'te: {str(LEARNEXP_ROOT) in sys.path}")
    
    if LEARNEXP_ROOT.exists():
        print(f"\n3. LearnExp İçeriği:")
        for item in list(LEARNEXP_ROOT.iterdir())[:10]:
            icon = "📁" if item.is_dir() else "📄"
            print(f"   {icon} {item.name}")
    
    print("\n" + "=" * 70)


if __name__ == "__main__":
    # Test dosyasını direkt çalıştırırsanız
    print_learnexp_diagnostics()
    print("\nTestleri çalıştırmak için:")
    print("  pytest backend/tests/test_learnexp_integration.py -v")
