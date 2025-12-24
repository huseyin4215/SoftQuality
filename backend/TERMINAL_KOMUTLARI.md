# Terminal Komutları - Backend Kurulum Rehberi

Bu dosya, backend projesini kurmak ve çalıştırmak için gereken tüm terminal komutlarını içerir.

## 📋 Kurulum Adımları

### 1. Backend Klasörüne Giriş
```bash
cd c:\Users\rukiye\Desktop\SoftQuality\backend
```

### 2. Python Sanal Ortamı Oluşturma
```bash
python -m venv venv
```

### 3. Sanal Ortamı Aktif Etme
```bash
venv\Scripts\activate
```
> Not: Aktif edildiğinde terminal önünde (venv) yazısı görünecek

### 4. Pip'i Güncelleme
```bash
python -m pip install --upgrade pip
```

### 5. Gerekli Paketleri Yükleme
```bash
pip install -r requirements.txt
```
> Bu işlem birkaç dakika sürebilir. Tüm test framework'leri, Selenium, Pydantic vb. yüklenecek.

### 6. Environment Dosyası Oluşturma
```bash
copy .env.example .env
```

### 7. Log Klasörünü Oluşturma
```bash
mkdir logs
mkdir reports
```

## ✅ Kurulum Testi

### Pytest'in Kurulumunu Kontrol Etme
```bash
pytest --version
```

### Python Paketlerini Listeleme
```bash
pip list
```

## 🧪 Testleri Çalıştırma

### Tüm Testleri Çalıştırma
```bash
pytest
```

### Unit Testleri Çalıştırma
```bash
pytest -m unit -v
```

### Schema Validation Testleri
```bash
pytest -m schema -v
```

### Scraper Testleri (Functional)
```bash
pytest -m functional -v
```

### Coverage Raporu ile Test
```bash
pytest --cov=src --cov-report=html
```
> Coverage raporu: `reports\coverage\index.html`

### Allure Raporu ile Test
```bash
pytest --alluredir=reports/allure-results
```

Allure raporunu görüntülemek için (Allure kuruluysa):
```bash
allure serve reports/allure-results
```

## 🎭 Mock Server Çalıştırma

### Mock Server'ı Başlatma
```bash
python mock_server\app.py
```
> Server http://localhost:5000 adresinde çalışacak

### Mock Server Test Etme
Tarayıcıda açın:
```
http://localhost:5000/health
http://localhost:5000/search
```

## 🔍 Kod Kalitesi Kontrolleri

### Black ile Kod Formatlama
```bash
black src/ tests/
```

### Flake8 ile Kod Analizi
```bash
flake8 src/ tests/ --max-line-length=100
```

### MyPy ile Tip Kontrolü
```bash
mypy src/ --ignore-missing-imports
```

### Pylint ile Kod Kalitesi
```bash
pylint src/
```

## 🐛 Debug ve Geliştirme

### Belirli Bir Test Dosyasını Çalıştırma
```bash
pytest tests/test_models.py -v
```

### Belirli Bir Test Fonksiyonunu Çalıştırma
```bash
pytest tests/test_models.py::TestArticleModel::test_valid_article_creation -v
```

### Detaylı Log ile Test
```bash
pytest -v -s --log-cli-level=DEBUG
```

### Test Cache'i Temizleme
```bash
pytest --cache-clear
```

## 📦 Yeni Paket Ekleme

Yeni bir Python paketi eklemek için:
```bash
pip install <paket-adi>
pip freeze > requirements.txt
```

## 🔄 Sanal Ortamı Kapatma

İşiniz bittiğinde:
```bash
deactivate
```

## 🗑️ Temizlik Komutları

### Test Dosyalarını Temizleme
```bash
rmdir /s /q .pytest_cache
rmdir /s /q reports
rmdir /s /q logs
rmdir /s /q __pycache__
```

### Python Cache Temizleme
```bash
for /r %i in (__pycache__) do @rmdir /s /q "%i"
for /r %i in (*.pyc) do @del "%i"
```

## 📊 Yararlı Komutlar

### Yüklü Paketleri Gösterme
```bash
pip list
```

### Belirli Paket Bilgisi
```bash
pip show pytest
```

### Bağımlılık Ağacı
```bash
pip install pipdeptree
pipdeptree
```

### Python Versiyonunu Kontrol
```bash
python --version
```

## 🔧 Sorun Giderme

### ChromeDriver Hatası
Eğer Selenium ChromeDriver hatası alırsanız:
```bash
pip install --upgrade webdriver-manager
```

### Import Hatası
Python path sorunları için:
```bash
set PYTHONPATH=%PYTHONPATH%;%CD%
```

### Permission Hatası
Admin olarak terminal açın veya:
```bash
pip install --user <paket-adi>
```

## 📝 Git Komutları (Opsiyonel)

Projeyi Git'e eklemek için:
```bash
cd c:\Users\rukiye\Desktop\SoftQuality
git add backend/
git commit -m "Backend test infrastructure added"
git push
```

## 🚀 Production

### Production için Test
```bash
set ENVIRONMENT=production
pytest -m "not slow"
```

### Paralel Test Çalıştırma
```bash
pytest -n 4
```

---

## ⚠️ Önemli Notlar

1. **Sanal ortamı aktif edin**: Her yeni terminal oturumunda `venv\Scripts\activate` çalıştırın
2. **Python versiyonu**: Python 3.9 veya üzeri gerekli
3. **Chrome**: Selenium testleri için Google Chrome kurulu olmalı
4. **Internet**: İlk kurulumda paket indirmek için internet gerekli
5. **.env dosyası**: Gizli bilgiler içerebilir, Git'e eklemeyin

## 🎯 Hızlı Başlangıç (Tek Komut)

Tüm kurulum adımlarını tek seferde yapmak için:
```bash
cd c:\Users\rukiye\Desktop\SoftQuality\backend && python -m venv venv && venv\Scripts\activate && python -m pip install --upgrade pip && pip install -r requirements.txt && copy .env.example .env && mkdir logs && mkdir reports && pytest -m unit -v
```

---

**Not**: Herhangi bir sorun yaşarsanız, önce sanal ortamın aktif olduğundan ve doğru klasörde olduğunuzdan emin olun.
