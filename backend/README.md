# LearnExp Veri Toplama Modülü Test Otomasyonu - Backend

Bu backend altyapısı, LearnExp akademik içerik toplama sisteminin "Collector Service" modülü için sürdürülebilir ve etkili bir Yazılım Kalite Güvencesi (SQA) alt yapısı sağlar.

## 📋 Proje Özeti

TÜBİTAK TR Dizin gibi kaynaklardan veri toplayan web scraper'ların otomatik testini yapmak için geliştirilmiş kapsamlı test altyapısı.

### Özellikler

- ✅ **PyTest Framework**: Modern ve esnek test yapısı
- ✅ **Mock Server**: Gerçek sitelere yük bindirmeden test
- ✅ **Schema Validation**: Pydantic ile veri doğrulama
- ✅ **Selenium Tests**: Dinamik web sitesi testleri
- ✅ **CI/CD Pipeline**: GitHub Actions ile otomatik test
- ✅ **Allure Reports**: Detaylı test raporlama
- ✅ **Coverage Reports**: Kod kapsama analizi

## 📁 Proje Yapısı

```
backend/
├── src/                      # Ana kaynak kodları
│   ├── models/              # Veri modelleri (Pydantic)
│   │   └── article.py       # Article ve Author modelleri
│   ├── scrapers/            # Web scraper'lar
│   │   ├── base_scraper.py  # Temel scraper sınıfı
│   │   └── tubitak_scraper.py
│   ├── config.py            # Yapılandırma yönetimi
│   └── logger.py            # Loglama sistemi
├── tests/                    # Test dosyaları
│   ├── conftest.py          # Pytest fixtures
│   ├── test_models.py       # Model testleri
│   └── test_scrapers.py     # Scraper testleri
├── mock_server/             # Test için mock server
│   └── app.py               # Flask mock server
├── reports/                 # Test raporları (auto-generated)
├── logs/                    # Log dosyaları (auto-generated)
├── requirements.txt         # Python bağımlılıkları
├── pytest.ini              # PyTest yapılandırması
└── .env.example            # Örnek environment dosyası
```

## 🚀 Kurulum

### Gereksinimler

- Python 3.9+
- Google Chrome (Selenium için)
- Git

### Adım 1: Python Sanal Ortamı Oluşturma

```bash
cd backend
python -m venv venv
```

### Adım 2: Sanal Ortamı Aktif Etme

**Windows:**
```bash
venv\Scripts\activate
```

**macOS/Linux:**
```bash
source venv/bin/activate
```

### Adım 3: Bağımlılıkları Yükleme

```bash
pip install -r requirements.txt
```

### Adım 4: Environment Dosyası Oluşturma

```bash
copy .env.example .env
```

`.env` dosyasını gerektiğinde düzenleyin.

## 🧪 Testleri Çalıştırma

### Tüm Testleri Çalıştırma

```bash
pytest
```

### Belirli Test Kategorilerini Çalıştırma

```bash
# Sadece unit testler
pytest -m unit

# Sadece schema validation testleri
pytest -m schema

# Sadece integration testleri
pytest -m integration

# Sadece functional testler (Selenium)
pytest -m functional
```

### Coverage Raporuyla Testleri Çalıştırma

```bash
pytest --cov=src --cov-report=html
```

Coverage raporu `reports/coverage/index.html` dosyasında oluşturulur.

### Allure Raporuyla Testleri Çalıştırma

```bash
# Testleri çalıştır
pytest --alluredir=reports/allure-results

# Raporu oluştur ve görüntüle
allure serve reports/allure-results
```

### Paralel Test Çalıştırma

```bash
pytest -n 4  # 4 paralel worker ile
```

## 🎭 Mock Server

Mock server, gerçek web sitelerine bağlanmadan testleri çalıştırmanıza olanak tanır.

### Mock Server'ı Başlatma

```bash
cd mock_server
python app.py
```

Mock server `http://localhost:5000` adresinde çalışır.

### Mock Endpoints

- `GET /` - Sağlık kontrolü
- `GET /search` - Mock arama sonuçları
- `GET /article/<id>` - Mock makale detayı
- `GET /broken-page` - Hata testi için bozuk sayfa
- `GET /health` - Health check

## 📊 Test Kategorileri

### Unit Tests
- Model validasyonu
- Veri dönüşümleri
- Temel fonksiyonlar

### Schema Validation Tests
- Pydantic model doğrulama
- Veri formatı kontrolleri
- Zorunlu alan kontrolleri

### Integration Tests
- Mock server ile entegrasyon
- Veritabanı işlemleri (gelecekte)

### Functional Tests
- Selenium ile web testi
- Scraper fonksiyonelliği
- End-to-end senaryolar

## 🔧 Yapılandırma

Environment değişkenleri (`.env` dosyasında):

```env
# Genel
ENVIRONMENT=development

# Mock Server
MOCK_SERVER_HOST=localhost
MOCK_SERVER_PORT=5000
USE_MOCK_SERVER=true

# Selenium
SELENIUM_HEADLESS=true
SELENIUM_TIMEOUT=30
BROWSER=chrome

# Scraping
TUBITAK_BASE_URL=https://search.trdizin.gov.tr
REQUEST_TIMEOUT=30
RETRY_ATTEMPTS=3

# Loglama
LOG_LEVEL=INFO
LOG_FILE=logs/learnexp.log
```

## 🔍 Kod Kalitesi

### Linter ve Format Araçları Çalıştırma

```bash
# Code formatting (Black)
black src/ tests/

# Linting (Flake8)
flake8 src/ tests/ --max-line-length=100

# Type checking (MyPy)
mypy src/

# Code quality (Pylint)
pylint src/
```

## 📈 CI/CD Pipeline

GitHub Actions otomatik olarak:

1. Her commit'te testleri çalıştırır
2. Coverage raporları oluşturur
3. Allure raporları üretir
4. Kod kalitesini kontrol eder
5. Her gün düzenli test çalıştırır (site değişikliklerini yakalamak için)

## 🐛 Debugging

### Selenium Headless Modunu Kapatma

`.env` dosyasında:
```env
SELENIUM_HEADLESS=false
```

### Log Seviyesini Değiştirme

```env
LOG_LEVEL=DEBUG
```

### Belirli Bir Testi Debug Etme

```bash
pytest tests/test_scrapers.py::TestTubitakScraperFunctional::test_scraper_initialization -v -s
```

## 📝 Yeni Test Ekleme

1. `tests/` klasöründe yeni test dosyası oluşturun
2. Test fonksiyonlarını `test_` ile başlatın
3. Uygun marker ekleyin (`@pytest.mark.unit`, vb.)
4. `conftest.py`'de gerekli fixture'ları tanımlayın

Örnek:

```python
import pytest
from src.models import Article

@pytest.mark.unit
def test_my_feature():
    """Test description"""
    # Test implementation
    assert True
```

## 🤝 Katkıda Bulunma

1. Feature branch oluşturun
2. Değişikliklerinizi yapın
3. Testleri ekleyin/güncelleyin
4. Tüm testlerin geçtiğinden emin olun
5. Pull request açın

## 📚 Kaynaklar

- [PyTest Documentation](https://docs.pytest.org/)
- [Selenium Documentation](https://selenium-python.readthedocs.io/)
- [Pydantic Documentation](https://docs.pydantic.dev/)
- [Allure Framework](https://docs.qameta.io/allure/)

## 📞 İletişim

Proje Sahibi: Hüseyin Sarıbuğa (22290202)
Ders: YMH429 – Yazılım Kalite Güvencesi ve Testi

---

**Not**: Bu proje YMH429 dersi kapsamında geliştirilmiştir.
