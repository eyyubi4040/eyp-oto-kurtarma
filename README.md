# 🚗 EYP Oto Kurtarma - Kırşehir 7/24 Oto Çekici & Yol Yardım

Kırşehir merkezi, çevre ilçeleri (Mucur, Kaman, Akpınar, Çiçekdağı, Boztepe, Akçakent) ve transit otoyol hatlarında (D-260, Kırşehir-Kayseri, Kırşehir-Ankara) 7/24 kesintisiz oto çekici, kayar kasa kurtarıcı, ahtapot vinç ve yol yardım hizmeti sunan kurumsal web uygulaması.

---

## ⚡ Özellikler
- **Temiz URL Mimarisi (Clean URLs):** `.html` uzantısız modern rota yapısı (`/hakkimizda`, `/hizmetler`, `/bolgeler`, `/fiyat-hesapla`, `/iletisim`).
- **Canlı GPS Konum Paylaşımı:** Tek tıkla WhatsApp üzerinden anlık enlem-boylam koordinatı gönderme desteği.
- **Dinamik Mesafe & Fiyat Hesaplayıcı:** Kırşehir ve çevre ilçeler arası anlık çekici ücret hesaplama motoru.
- **Ultra Hızlı ve Optimize:** WebP/JPG optimize görseller, Gzip sıkıştırma ve Nginx statik önbellekleme.
- **Dokploy & Docker Uyumlu:** Tek tıkla canlıya alınabilir, üretim standartlarında `Dockerfile` ve sağlık kontrolü (`HEALTHCHECK`).

---

## 🚀 Dokploy Dağıtım Rehberi (Deployment)

1. **Dokploy Kontrol Paneline Giriş Yapın.**
2. **Applications** sekmesinden **Create Application** butonuna tıklayın.
3. **Source Type:** `GitHub` seçin.
4. **Repository:** `eyyubi4040/eyp-oto-kurtarma` reposunu seçin.
5. **Branch:** `main`
6. **Build Type:** `Dockerfile` (otomatik algılanır).
7. **Port:** `80`
8. **Deploy** butonuna tıklayarak yayına alın.

---

## 💻 Yerel Geliştirme (Local Development)

```bash
# Geliştirme sunucusunu başlatın (Bun)
bun run dev

# Veya statik dosya sunucusu ile
bun x serve . -p 3000
```

---

## ☁️ Google Cloud Storage (GCS) Varlık Senkronizasyonu

```bash
bun run sync
```
Varlıklar doğrudan `https://storage.googleapis.com/eycodex/eyp-oto-kurtarma/` üzerinden servis edilir.
