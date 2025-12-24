# SoftQuality - LearnExp Test & QA Projesi

## 🎯 Proje Amacı

**SoftQuality**, **LearnExp** akademik içerik toplama sisteminin kalite güvencesini sağlayan **bağımsız bir test projesidir**.

- ✅ LearnExp'i otomatik test eder
- ✅ Gerçek zamanlı test raporları sunar
- ✅ CI/CD ile sürekli kalite kontrolü
- ✅ Web dashboard ile görselleştirme

---

## 📂 Proje Yapısı

```
SoftQuality/
├── backend/                      # Test altyapısı
│   ├── tests/                    # Test dosyaları
│   │   ├── test_models.py       # Veri modeli testleri
│   │   ├── test_scrapers.py     # Scraper testleri
│   │   └── test_learnexp_integration.py  # LearnExp entegrasyon testleri
│   ├── src/                      # Demo scraper'lar
│   ├── mock_server/              # Mock test server'ı
│   ├── learnexp_config.py        # LearnExp bağlantı ayarları
│   ├── api_server.py             # Test sonuçları API
│   └── run_learnexp_tests.bat    # Otomatik test script'i
│
├── components/                   # Frontend dashboard
│   ├── ReportsView.tsx          # Canlı test raporları
│   ├── BackendTestsView.tsx     # Backend testleri görünümü
│   └── ...
│
├── .github/workflows/            # CI/CD
│   └── learnexp_tests.yml       # Otomatik test workflow
│
└── docs/                         # Dokümantasyon
    ├── LEARNEXP_TEST_REHBERI.md
    ├── BACKEND_API_INTEGRATION.md
    └── TERMINAL_KOMUTLARI.md
```

---

## 🔗 LearnExp Entegrasyonu

### **Ön Koşul**

LearnExp projesi şu yolda olmalı:
```
C:\Users\rukiye\Desktop\LearnExp
```

### **Doğrulama**

LearnExp bağlantısını kontrol edin:
```bash
cd backend
python learnexp_config.py
```

**Beklenen çıktı:**
```
✅ LearnExp klasörü bulundu: C:\Users\rukiye\Desktop\LearnExp
✅ LearnExp Python path'e eklendi
📂 LearnExp içeriği (X öğe):
   📁 collector_service
   📁 models
   📄 README.md
   ...
```

---

## 🚀 Test Çalıştırma

### **Yöntem 1: Otomatik Script (Önerilen)**

```bash
cd backend
run_learnexp_tests.bat
```

**Bu script:**
1. ✅ Sanal ortamı aktif eder
2. ✅ LearnExp bağlantısını doğrular
3. ✅ SoftQuality testlerini çalıştırır (unit, schema, integration)
4. ✅ LearnExp entegrasyon testlerini çalıştırır
5. ✅ Coverage raporu oluşturur

---

### **Yöntem 2: Manuel Test**

```bash
cd backend
venv\Scripts\activate

# LearnExp bağlantısını doğrula
python learnexp_config.py

# Tüm testleri çalıştır
pytest -v

# Sadece LearnExp testleri
pytest -m learnexp -v

# Sadece SoftQuality testleri
pytest -m "unit or schema" -v
```

---

## 📊 Test Kategorileri

### **🔷 SoftQuality Testleri** (Demo)
Test altyapısı demonstrasyonu - LearnExp bağımsız çalışır.

| Kategori | Marker | Açıklama | Test Sayısı |
|----------|--------|----------|-------------|
| **Unit** | `@pytest.mark.unit` | Veri modeli testleri | 13 |
| **Schema** | `@pytest.mark.schema` | Pydantic validation | 2 |
| **Integration** | `@pytest.mark.integration` | Mock server testleri | 3 |
| **Functional** | `@pytest.mark.functional` | Selenium testleri | 5 |

**Komut:**
```bash
pytest -m "unit or schema or integration" -v
```

---

### **🔶 LearnExp Entegrasyon Testleri** (Gerçek)
LearnExp projesini otomatik test eder.

| Test Sınıfı | Açıklama | Durum |
|-------------|----------|-------|
| `TestLearnExpConnection` | LearnExp erişilebilirliği | ✅ Aktif |
| `TestLearnExpModuleImport` | Modül import testleri | ✅ Aktif |
| `TestLearnExpScrapers` | Scraper testleri | ⏸️ Skip (güncellenmeli) |
| `TestLearnExpModels` | Model testleri | ⏸️ Skip (güncellenmeli) |

**Komut:**
```bash
pytest -m learnexp -v
```

---

## 🔧 LearnExp Testlerini Aktif Etme

### **Adım 1: LearnExp Klasör Yapısını Öğrenin**

```bash
cd C:\Users\rukiye\Desktop\LearnExp
dir
```

Şu klasörleri arayın:
- `collector_service/` veya `src/` veya `app/`
- `scrapers/` veya `collectors/`
- `models/`

---

### **Adım 2: learnexp_config.py'yi Güncelleyin**

`backend/learnexp_config.py` dosyasını açın ve yolları güncelleyin:

```python
# Örnek: LearnExp yapısı collector_service/ değil de src/ ise
LEARNEXP_COLLECTORS = LEARNEXP_ROOT / "src"  # Buraya gerçek yolunuzu yazın
LEARNEXP_SCRAPERS = LEARNEXP_COLLECTORS / "scrapers"
```

---

### **Adım 3: test_learnexp_integration.py'yi Güncelleyin**

`backend/tests/test_learnexp_integration.py` içinde:

```python
# @pytest.mark.skip satırlarını kaldırın
@pytest.mark.learnexp
class TestLearnExpScrapers:
    """Skip'i kaldırarak aktif edin"""
    
    def test_tubitak_scraper_exists(self):
        # LearnExp'teki gerçek import yolunu kullanın
        from collector_service.scrapers import TubitakScraper  # Gerçek yolunuz
        assert hasattr(Tubi takScraper, 'scrape')
```

---

## 📈 Frontend Dashboard

### **Başlatma**

```bash
# Terminal 1: Backend API Server
cd backend
venv\Scripts\activate
python api_server.py

# Terminal 2: Frontend Dev Server
cd ..
npm run dev
```

### **Erişim**

http://localhost:3000

**Özellikler:**
- ✅ Canlı test sonuçları
- ✅ 30 saniyede bir otomatik yenileme
- ✅ 7 günlük test trendi
- ✅ Coverage grafiği
- ✅ Test detayları

---

## 🤖 CI/CD Otomasyonu

### **GitHub Actions Workflow**

Dosya: `.github/workflows/learnexp_tests.yml`

**Çalışma Zamanları:**
- ✅ Her commit'te (push/pull request)
- ✅ Her 6 saatte bir (scheduled)
- ✅ Manuel tetikleme (workflow_dispatch)

**Ne Yapar:**
1. SoftQuality'yi checkout eder
2. LearnExp'i checkout eder
3. Python ve bağımlılıkları kurar
4. Tüm testleri çalıştırır
5. Test raporlarını artifact olarak kaydeder

---

## 📋 Test Sonuçları

### **Terminal Çıktısı**

```
tests/test_models.py::TestArticleModel::test_valid_article_creation PASSED
tests/test_learnexp_integration.py::TestLearnExpConnection::test_learnexp_exists PASSED

===== 25 passed, 1 failed in 2.15s =====
```

### **HTML Raporu**

Coverage raporu: `backend/reports/coverage/index.html`

**Hedef:** En az %80 coverage

---

## 🐛 Sorun Giderme

### **Problem 1: "LearnExp bulunamadı"**

**Çözüm:**
```bash
# LearnExp yolunu kontrol edin
dir C:\Users\rukiye\Desktop\LearnExp

# learnexp_config.py'deki yolu güncelleyin
LEARNEXP_ROOT = Path(r"GERÇEK_YOL")
```

---

### **Problem 2: "Import hatası"**

**Sebep:** LearnExp klasör yapısı farklı olabilir.

**Çözüm:**
```bash
# LearnExp yapısını görüntüleyin
python backend/learnexp_config.py

# Import yollarını güncelleyin
from GERÇEK_MODÜL_ADI import TubitakScraper
```

---

### **Problem 3: "Testler skip ediliyor"**

**Sebep:** `@pytest.mark.skip` decorator'ı aktif.

**Çözüm:**
`test_learnexp_integration.py` dosyasında `@pytest.mark.skip` satırlarını kaldırın.

---

## 📚 Dokümantasyon

- **[LEARNEXP_TEST_REHBERI.md](LEARNEXP_TEST_REHBERI.md)** - Detaylı test rehberi
- **[BACKEND_API_INTEGRATION.md](BACKEND_API_INTEGRATION.md)** - API entegrasyonu
- **[backend/TERMINAL_KOMUTLARI.md](backend/TERMINAL_KOMUTLARI.md)** - Terminal komutları
- **[backend/README.md](backend/README.md)** - Backend dokümantasyonu

---

## 🎓 Proje Teslimi

### **Hazır Raporlar:**

1. **Test Sonuçları:** 23 SoftQuality test + X LearnExp test
2. **Coverage:** %75+ (SoftQuality) + LearnExp coverage
3. **Frontend Dashboard:** http://localhost:3000 ekran görüntüsü
4. **HTML Raporları:** `backend/reports/`

### **Demo:**

```bash
# 1. Backend testleri göster
cd backend
run_learnexp_tests.bat

# 2. Frontend dashboard'u göster
npm run dev
# http://localhost:3000 → "Test Raporları"

# 3. LearnExp bağlantısını göster
python learnexp_config.py
pytest -m learnexp -v
```

---

## 🚀 Hızlı Başlangıç

```bash
# 1. Backend kurulumu
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

# 2. LearnExp bağlantısını doğrula
python learnexp_config.py

# 3. Testleri çalıştır
run_learnexp_tests.bat

# 4. Frontend başlat (opsiyonel)
cd ..
npm install
npm run dev
```

---

## 👨‍💻 Geliştirici

**Hüseyin Sarıbuğa** (22290202)  
**YMH429 - Yazılım Kalite Güvencesi ve Testi**  
2025-2026 Güz Dönemi

---

## 📄 Lisans

Bu proje akademik amaçlar için geliştirilmiştir.

---

**🎉 SoftQuality ile LearnExp'iniz sürekli test edilir ve kalite garanti altındadır!**
