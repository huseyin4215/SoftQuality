"""
LearnExp Proje Yolu Konfigürasyonu
SoftQuality → LearnExp Entegrasyon Ayarları
"""
import os
import sys
from pathlib import Path

# ===== LearnExp Proje Yolu =====
LEARNEXP_ROOT = Path(r"C:\Users\rukiye\Desktop\LearnExp")
LEARNEXP_BACKEND = LEARNEXP_ROOT / "backend"

# LearnExp Python path'e ekleniyor
# Django projesi olduğu için backend klasörünü ekliyoruz
if str(LEARNEXP_BACKEND) not in sys.path:
    sys.path.insert(0, str(LEARNEXP_BACKEND))

# ===== LearnExp Modül Yolları =====
# LearnExp Django projesi yapısı:
# - webscraping/ : Web scraping modülü
# - collecterService/ : Veri toplama servisi (typo: collecter)
# - api/ : REST API
# - apiCallback/ : Callback API
# - config/ : Django config

LEARNEXP_WEBSCRAPING = LEARNEXP_BACKEND / "webscraping"
LEARNEXP_COLLECTORS = LEARNEXP_BACKEND / "collecterService"  # Note: typo in original
LEARNEXP_API = LEARNEXP_BACKEND / "api"
LEARNEXP_CONFIG = LEARNEXP_BACKEND / "config"


def validate_learnexp_installation():
    """
    LearnExp projesinin varlığını ve erişilebilirliğini kontrol eder.
    
    Returns:
        bool: Proje erişilebilir mi?
    
    Raises:
        FileNotFoundError: LearnExp bulunamadı
        ImportError: LearnExp modülleri import edilemiyor
    """
    # 1. Root klasör kontrolü
    if not LEARNEXP_ROOT.exists():
        raise FileNotFoundError(
            f"❌ LearnExp projesi bulunamadı!\n"
            f"   Aranan yol: {LEARNEXP_ROOT}\n"
            f"   Lütfen learnexp_config.py dosyasındaki LEARNEXP_ROOT değişkenini güncelleyin."
        )
    
    # 2. Backend klasör kontrolü
    if not LEARNEXP_BACKEND.exists():
        raise FileNotFoundError(
            f"❌ LearnExp backend klasörü bulunamadı!\n"
            f"   Aranan yol: {LEARNEXP_BACKEND}\n"
        )
    
    print(f"✅ LearnExp bulundu: {LEARNEXP_ROOT}")
    print(f"✅ Backend klasörü: {LEARNEXP_BACKEND}")
    
    # 3. Django manage.py kontrolü
    manage_py = LEARNEXP_BACKEND / "manage.py"
    if manage_py.exists():
        print(f"✅ Django projesi tespit edildi (manage.py mevcut)")
    
    # 4. İçerik kontrolü
    contents = list(LEARNEXP_BACKEND.iterdir())
    print(f"\n📂 LearnExp/backend içeriği ({len(contents)} öğe):")
    for item in sorted(contents)[:15]:  # İlk 15 öğe
        if item.name in ['venv', '__pycache__', 'db.sqlite3']:
            continue
        icon = "📁" if item.is_dir() else "📄"
        print(f"   {icon} {item.name}")
    
    # 5. Python path kontrolü
    if str(LEARNEXP_BACKEND) in sys.path:
        print(f"\n✅ LearnExp/backend Python path'e eklendi")
    else:
        print(f"\n⚠️  LearnExp/backend Python path'te değil, ekleniyor...")
        sys.path.insert(0, str(LEARNEXP_BACKEND))
    
    return True


def get_learnexp_info():
    """LearnExp proje bilgilerini döndürür"""
    info = {
        'root': str(LEARNEXP_ROOT),
        'exists': LEARNEXP_ROOT.exists(),
        'is_in_path': str(LEARNEXP_ROOT) in sys.path,
    }
    
    if LEARNEXP_ROOT.exists():
        info['contents'] = [item.name for item in LEARNEXP_ROOT.iterdir()]
    
    return info


def import_learnexp_module(module_name):
    """
    LearnExp modülünü import eder
    
    Args:
        module_name: Import edilecek modül adı (örn: 'collector_service.scrapers')
    
    Returns:
        Imported module
    
    Example:
        >>> scrapers = import_learnexp_module('collector_service.scrapers')
        >>> scraper = scrapers.TubitakScraper()
    """
    try:
        # Python path'e eklendi mi kontrol et
        if str(LEARNEXP_ROOT) not in sys.path:
            sys.path.insert(0, str(LEARNEXP_ROOT))
        
        # Modülü import et
        module = __import__(module_name, fromlist=[''])
        print(f"✅ Import başarılı: {module_name}")
        return module
    
    except ImportError as e:
        print(f"❌ Import hatası: {module_name}")
        print(f"   Hata: {str(e)}")
        print(f"   Çözüm: LearnExp klasör yapısını kontrol edin")
        raise


# ===== Test Modu =====
if __name__ == "__main__":
    print("=" * 60)
    print("LearnExp Konfigürasyon Doğrulaması")
    print("=" * 60)
    
    try:
        validate_learnexp_installation()
        
        print("\n" + "=" * 60)
        print("LearnExp Bilgileri:")
        print("=" * 60)
        info = get_learnexp_info()
        for key, value in info.items():
            print(f"{key}: {value}")
        
        print("\n✅ Konfigürasyon başarılı!")
        print("\nŞimdi testleri çalıştırabilirsiniz:")
        print("  pytest -m learnexp -v")
        
    except Exception as e:
        print(f"\n❌ Hata: {str(e)}")
        print("\nLearnExp klasör yapınızı kontrol edin ve")
        print("learnexp_config.py dosyasını güncelleyin.")
