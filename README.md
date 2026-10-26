# Arduino Atölyesi

Çocuklar için sade, Türkçe bir Arduino eğitim sitesi. React + Vite + MDX ile hazırlanmıştır. Sol tarafta gruplu dersler, sağ tarafta ders içeriği bulunur. Mobilde ders menüsü açılıp kapanır.

## Çalıştırma

Node.js 22.12+ veya 24 kullanın.

```sh
npm install
npm run dev
```

Üretim çıktısı: `npm run build`. Statik dosyalar `dist/` dizinine yazılır. `npm run preview` ile üretim çıktısını yerel olarak açabilirsiniz. Ana çalışma klasöründeki `npm run dev` ve `npm run build` komutları da bu projeye yönlendirilir.

## İçerik düzenleme

Bütün dersler `content/lessons/*.mdx` altında. Mevcut bir dosyayı düzenlemek yeterli; geliştirme sunucusu içeriği yeniler. Yeni ders için bu klasöre `.mdx` dosyası ekleyin:

```mdx
export const meta = {
  title: "Yeni ders",
  description: "Dersi anlatan kısa bir açıklama.",
  group: "Birlikte üretelim",
  order: 10,
  duration: 15,
};

## İlk bölüm

Buraya açıklamanızı yazın. **Kalın metin**, listeler, bağlantılar,
tablolar ve kod blokları kullanabilirsiniz.

<Callout title="Bir ipucu">Kısa bir hatırlatma.</Callout>

<Quiz
  question="Sorunuz?"
  options={["Birinci seçenek", "İkinci seçenek", "Üçüncü seçenek"]}
  answer={0}
  explanation="Doğru yanıtın açıklaması."
/>
```

Dosya adı dersin bağlantısını oluşturur: `10-yeni-ders.mdx` → `/#10-yeni-ders`. Var olan dosyaları yeniden adlandırmak eski bağlantıları ve kayıtlı ilerlemeyi etkiler. Her derse benzersiz bir `order` değeri verin; menü ve önceki/sonraki sırası otomatik oluşur. `group` aynı olan dersler aynı başlık altında toplanır. Grupları ardışık sıralamak için aynı grubun `order` değerlerini art arda kullanın. Yayındaki içeriği güncellemek için yeniden build ve deploy gerekir.

Eklenebilen bileşenler:

- `<BoardIntro />`: Arduino tanıtım görseli.
- `<LearningGoals items={['Hedef 1', 'Hedef 2', 'Hedef 3']} />`: Öğrenme hedefleri.
- `<Callout title="İpucu" type="tip">...</Callout>`: Bilgi kutusu; `note` tipi de var.
- `<Quiz question="..." options={['A', 'B']} answer={0} explanation="..." />`: Küçük soru. `answer`, doğru seçeneğin sıfırdan başlayan indeksidir.
- `<BlinkLab />`: Bekleme süresi değiştirilebilen temsili LED uygulaması; fiziksel karta bağlanmaz.
- Üç ters tırnak ve `cpp` ile açılan standart Markdown kod blokları: Kopyalama düğmesi otomatik eklenir.

MDX, JavaScript/JSX çalıştırabilir. Ders dosyaları öğretmen tarafından kaynak kodda düzenlenir; öğrencilere içerik yükleme alanı sunulmaz.

## İlerleme ve erişim

Tamamlanan dersler tarayıcının `localStorage` alanında saklanır. Hesap, sunucu veritabanı veya cihazlar arasında eşitleme yoktur. Aynı tarayıcı profilini kullanan öğrenciler aynı ilerlemeyi görür. Tamamlandı düğmesine yeniden basarak ders işaretini kaldırabilirsiniz.

Sites yayını başlangıçta özeldir; öğrencilere açılmadan önce yayın erişimi ayrıca düzenlenmelidir. Statik `dist/` çıktısı başka bir statik barındırma hizmetine de taşınabilir. Ders bağlantıları hash kullandığı için sunucu yönlendirme kuralı gerektirmez.

Örnek donanım dersleri Arduino Uno R3 içindir. Kart görseli ve LED deneyi temsilidir. Donanım bağlantıları öğretmen gözetiminde yapılmalıdır.

## Dosya yapısı

```text
content/lessons/  Derslerin MDX dosyaları
src/main.jsx     Arayüz ve ders bileşenleri
src/styles.css   Duyarlı görünüm
public/          Statik dosyalar
vite.config.js   Vite ve MDX ayarları
```

Yazı tipleri Google Fonts üzerinden yüklenir; bağlantı olmadığında sistem sans-serif yazı tipi kullanılır.
