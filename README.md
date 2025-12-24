# QA-Pro | Yazılım Kalite Güvencesi ve Test Otomasyon Merkezi

> 🚀 Modern test otomasyon paneli - Frontend, Backend, CI/CD ve Report takibi için tümleşik çözüm

<div align="center">

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2.3-61dafb)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-purple)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

</div>

## 📋 İçindekiler

- [Özellikler](#özellikler)
- [Teknoloji Stack'i](#teknoloji-stacki)
- [Kurulum](#kurulum)
- [Kullanım](#kullanım)
- [Proje Yapısı](#proje-yapısı)
- [Katkıda Bulunma](#katkıda-bulunma)

## ✨ Özellikler

- **Mimari Görüntüleme** - Proje mimarisini görselleştirme
- **Frontend Test Yönetimi** - Frontend testleri izleme ve çalıştırma
- **Backend API Testleri** - API endpoint'lerinin test edilmesi
- **CI/CD Pipeline Takibi** - Sürekli entegrasyon ve dağıtım durumu
- **Test Raporları** - Detaylı test raporları ve analizler
- **Test Runner** - Testleri doğrudan panelden çalıştırma
- **Gerçek Zamanlı Takip** - Canlı test sonuçları ve istatistikler

## 🛠 Teknoloji Stack'i

### Frontend
- **React** - UI kütüphanesi
- **TypeScript** - Tür güvenliği
- **Vite** - Hızlı build tool
- **Tailwind CSS** - Stil yönetimi
- **Recharts** - Grafik ve şartlar
- **Lucide React** - İkon kütüphanesi

### Geliştirme
- **Node.js** - Runtime environment
- **npm** - Paket yöneticisi

## 📦 Kurulum

### Ön Koşullar
- Node.js 16+ ve npm

### Adımlar

1. **Depoyu klonlayın**
   ```bash
   git clone https://github.com/username/qa-pro.git
   cd qa-pro
   ```

2. **Bağımlılıkları yükleyin**
   ```bash
   npm install
   ```

3. **Geliştirme sunucusunu başlatın**
   ```bash
   npm run dev
   ```

4. **Tarayıcıyı açın**
   ```
   http://localhost:3000
   ```

## 🚀 Kullanım

### Geliştirme

```bash
# Geliştirme sunucusunu başlat (Hot reload ile)
npm run dev
```

### Üretim Derlemesi

```bash
# Üretim için uygulamayı derle
npm build
```

### Derlemeyi Önizle

```bash
# Derlenen uygulamayı önizle
npm run preview
```

## 📁 Proje Yapısı

```
SoftQuality/
├── components/                       # React bileşenleri
│   ├── ArchitectureView.tsx          # Mimari yapı görüntüsü
│   ├── BackendTestsView.tsx          # Backend test yönetimi
│   ├── FrontendTestsView.tsx         # Frontend test yönetimi
│   ├── CicdView.tsx                  # CI/CD pipeline takibi
│   ├── ReportsView.tsx               # Test raporları
│   └── TestRunner.tsx                # Test çalıştırıcı
├── App.tsx                           # Ana uygulama bileşeni
├── constants.tsx                     # Sabitler ve konfigürasyonlar
├── types.ts                          # TypeScript tür tanımları
├── index.tsx                         # React giriş noktası
├── index.html                        # HTML şablonu
├── index.css                         # Global stiller
├── metadata.json                     # Proje metadata'sı
├── package.json                      # Proje bağımlılıkları
├── package-lock.json                 # Bağımlılık lock dosyası
├── tsconfig.json                     # TypeScript yapılandırması
├── vite.config.ts                    # Vite derleme yapılandırması
├── .gitignore                        # Git ignore kuralları
└── README.md                         # Bu dosya
```

## 🔧 Yapılandırma

### Environment Değişkenleri

`.env.local` dosyası oluşturarak gerekli environment değişkenlerini ayarlayabilirsiniz:

```env
VITE_API_URL=http://localhost:3000
VITE_TEST_TIMEOUT=30000
```

## 📝 Lisans

Bu proje MIT Lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakınız.

## 🤝 Katkıda Bulunma

Katkılarınız hoş geldiniz! Lütfen aşağıdaki adımları izleyin:

1. Depoyu fork'layın
2. Feature branch'i oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişiklikleri commit'leyin (`git commit -m 'Add some AmazingFeature'`)
4. Branch'e push'layın (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

## 📞 İletişim

Sorularınız veya önerileriniz için:
- GitHub Issues açınız
- Email: [your-email@example.com](mailto:your-email@example.com)

---

<div align="center">

⭐ Bu projeyi beğendiyseniz, lütfen star vermeyi unutmayın!

</div>
