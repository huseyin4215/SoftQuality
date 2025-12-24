@echo off
REM =========================================
REM LearnExp Otomatik Test Script
REM SoftQuality -> LearnExp Entegrasyon
REM =========================================

echo.
echo ========================================
echo LearnExp Otomatik Test Sistemi
echo ========================================
echo.

REM Sanal ortamı kontrol et
if not exist "venv\Scripts\activate.bat" (
    echo [HATA] Sanal ortam bulunamadi!
    echo Lutfen once: python -m venv venv
    pause
    exit /b 1
)

REM Sanal ortami aktif et
echo [1/5] Sanal ortam aktif ediliyor...
call venv\Scripts\activate.bat

REM LearnExp baglantisini dogrula
echo.
echo [2/5] LearnExp baglantisi dogrulanıyor...
python learnexp_config.py
if errorlevel 1 (
    echo.
    echo [HATA] LearnExp baglantisi hatali!
    echo Lutfen learnexp_config.py dosyasini kontrol edin.
    pause
    exit /b 1
)

REM SoftQuality testlerini calistir
echo.
echo [3/5] SoftQuality testleri calıstırılıyor...
pytest tests/ -m "unit or schema or integration" -v --tb=short
if errorlevel 1 (
    echo.
    echo [UYARI] Bazi SoftQuality testleri basarisiz!
)

REM LearnExp entegrasyon testlerini calistir
echo.
echo [4/5] LearnExp entegrasyon testleri calıstırılıyor...
pytest tests/test_learnexp_integration.py -m learnexp -v --tb=short
if errorlevel 1 (
    echo.
    echo [UYARI] Bazi LearnExp testleri basarisiz!
    echo LearnExp klasor yapisini kontrol edin.
)

REM Coverage raporu olustur
echo.
echo [5/5] Coverage raporu olusturuluyor...
pytest --cov=src --cov-report=html --cov-report=term

echo.
echo ========================================
echo Test Tamamlandi!
echo ========================================
echo.
echo Raporlar:
echo   - Coverage: reports\coverage\index.html
echo   - Test: reports\pytest_report.html
echo.

REM Test sonuclarini goster
echo Sonuc ozeti pytest ciktisinda goruntulenebilir.
echo.

pause
