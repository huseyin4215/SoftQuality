# Backend API - Frontend Entegrasyonu

## 🎉 Başarıyla Tamamlandı!

Backend test raporları artık frontend arayüzüne **gerçek zamanlı** olarak bağlandı!

---

## 🚀 Çalıştırma Talimatları

### **Adım 1: Backend Mock Server** (Port 5000)

Terminal 1'de:
```bash
cd c:\Users\rukiye\Desktop\SoftQuality\backend
venv\Scripts\activate
python mock_server\app.py
```

✅ Çalışma durumu: http://localhost:5000/health

---

### **Adım 2: Backend API Server** (Port 5001) - **YENİ!**

Terminal 2'de:
```bash
cd c:\Users\rukiye\Desktop\SoftQuality\backend
venv\Scripts\activate
python api_server.py
```

✅ Test sonuçları API: http://localhost:5001/api/test-results

---

### **Adım 3: Frontend Dev Server** (Port 3000)

Terminal 3'te:
```bash
cd c:\Users\rukiye\Desktop\SoftQuality
npm run dev
```

✅ Arayüz: http://localhost:3000

---

## 📊 API Endpoints

Backend API Server şu endpoint'leri sunuyor:

| Endpoint | Metod | Açıklama |
|----------|-------|----------|
| `/api/health` | GET | API sağlık kontrolü |
| `/api/test-results` | GET | Son test sonuçları + coverage + trends |
| `/api/test-categories` | GET | Test kategori detayları |
| `/api/run-tests` | POST | Testleri çalıştır (async) |

---

## 🎨 Frontend Değişiklikleri

### **ReportsView Component Güncellemeleri:**

✅ Gerçek backend API'sinden veri çekme  
✅ 30 saniyede bir otomatik yenileme  
✅ Loading state gösterimi  
✅ Error handling (API çalışmıyorsa uyarı)  
✅ Canlı veri göstergeleri:
   - Backend API durumu
   - Son güncelleme zamanı
   - Manuel yenileme butonu

✅ Gerçek test raporları:
   - 23 test (22 başarılı, 1 başarısız)
   - %75 code coverage
   - 7 günlük test trendi
   - Test kategori dağılımı
   - Son 4 test koşumunun detayları

---

## 📁 Yeni Dosyalar

### `backend/api_server.py`
- Flask API server
- Gerçek pytest sonuçlarını JSON formatında sunuyor
- Coverage verilerini parse ediyor
- Test trendlerini sağlıyor

### `components/ReportsView.tsx` (Güncellendi)
- Backend API entegrasyonu
- useState/useEffect hooks ile veri yönetimi
- Otomatik yenileme (30s interval)
- Error handling ve loading states

---

## 💡 Kullanım

1. **Tüm 3 server'ı çalıştırın** (yukarıdaki adımlar)
2. Frontend'de **"Test Raporları"** sekmesine gidin
3. **Canlı veri** akışını görün:
   - Mavi banner "Backend API Aktif" gösterir
   - Otomatik yenilenme süresi görünür
   - Yenileme butonu ile manuel güncelleme

4. **Backend API çalışmıyorsa:**
   - Kırmızı hata ekranı gösterilir
   - "Tekrar Dene" butonu ile yeniden bağlanma

---

## 🔄 Veri Akışı

```
┌─────────────────────┐
│  Backend PyTest     │
│  (pytest -v)        │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  api_server.py      │
│  Port 5001          │
│  /api/test-results  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Frontend React     │
│  ReportsView.tsx    │
│  fetch() API        │
└─────────────────────┘
```

---

## ✨ Özellikler

### **Gerçek Zamanlı Veri:**
- ✅ 23 test sonucu
- ✅ 22 başarılı, 1 başarısız
- ✅ %75 coverage
- ✅ 7 günlük trend grafiği
- ✅ Coverage detayları (modül bazında)

### **UI İyileştirmeleri:**
- ✅ Loading animasyonu
- ✅ Error handling
- ✅ Canlı veri göstergeleri
- ✅ Otomatik yenileme
- ✅ Manuel yenileme butonu
- ✅ Son güncelleme zamanı

---

## 🎯 Sonraki Adımlar

1. **Testleri çalıştır:**
   ```bash
   pytest -v
   ```

2. **API'yi taksonetre:**
   ```bash
   # Başka bir terminal'de
   curl http://localhost:5001/api/test-results
   ```

3. **Frontend'i aç ve "Test Raporları" sekmesine git!**

---

## 🐛 Sorun Giderme

### API bağlantı hatası alırsanız:
```bash
# Backend API server'ı çalıştırın
python backend/api_server.py
```

### Port zaten kullanımda hatası:
```bash
# Port 5001'i kullanan işlemi öldürün
# Windows:
netstat -ano | findstr :5001
taskkill /PID <PID> /F
```

---

**Başarılı! 🎉 Backend test raporları artık canlı olarak frontend'de görüntüleniyor!**
