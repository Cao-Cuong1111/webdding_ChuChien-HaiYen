# Thiệp Cưới Online - Enhanced Version 🎉

Chúc mừng! Bạn đã có một thiệp cưới online tuyệt đẹp với nhiều hiệu ứng và tính năng hiện đại.

## ✨ Tính năng nổi bật

- **Slideshow ảnh cưới** tự động với điều khiển thủ công
- **Nhạc nền** với bộ điều khiển phát/dừng
- **Đếm ngược** đến ngày trọng đại
- **Hiệu ứng động** với trái tim bay lượn
- **Responsive design** tương thích mọi thiết bị
- **Cá nhân hóa** tên khách mời qua URL

## 🎨 Cách tùy chỉnh

### 1. Thay đổi thông tin cưới

Chỉnh sửa file `index.html`:

```html
<!-- Thay đổi tên cô dâu chú rể -->
<h2 class="bride-name">Tên Cô Dâu</h2>
<h2 class="groom-name">Tên Chú Rể</h2>

<!-- Thay đổi ngày giờ cưới -->
<p class="date">Thứ Bảy, 01 tháng 01 năm 2026</p>
<p class="time">Lúc 18:00 (Đôn khách: 17:00)</p>

<!-- Thay đổi địa điểm -->
<p class="location">Tại: Nhà hàng XYZ...</p>
```

### 2. Thay thế ảnh slideshow

Chỉnh sửa mảng `weddingImages` trong file `script.js`:

```javascript
const weddingImages = [
  "path/to/your/wedding/photo1.jpg",
  "path/to/your/wedding/photo2.jpg",
  "path/to/your/wedding/photo3.jpg",
  "path/to/your/wedding/photo4.jpg",
  "path/to/your/wedding/photo5.jpg",
];
```

**Khuyến nghị kích thước ảnh:** 800x600px hoặc tỷ lệ tương tự

### 3. Thay đổi nhạc nền

Thay thế đường dẫn trong file `index.html`:

```html
<source src="path/to/your/wedding/music.mp3" type="audio/mpeg" />
```

**Định dạng hỗ trợ:** MP3, WAV, OGG

### 4. Tùy chỉnh màu sắc

Chỉnh sửa file `style.css`:

```css
/* Màu chủ đạo - tím lãng mạn */
--primary-color: #8b008b;
--secondary-color: #e91e63;

/* Màu nền gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

## 🚀 Cách sử dụng

1. **Upload lên hosting** (GitHub Pages, Netlify, Vercel, etc.)
2. **Chia sẻ URL** cho khách mời
3. **Cá nhân hóa** bằng cách thêm `?khach=tên-khách` vào URL

Ví dụ:

```
https://your-domain.com/?khach=nguyen-van-a
```

## 📱 Tính năng tương tác

- **Chuột**: Hover để dừng slideshow
- **Bàn phím**:
  - Mũi tên trái/phải: Điều khiển slideshow
  - Space: Phát/dừng nhạc
- **Mobile**: Vuốt trái/phải để chuyển ảnh

## 🔧 Troubleshooting

**Nếu nhạc không tự động phát:**

- Một số trình duyệt chặn autoplay
- Khách mời cần click nút nhạc để bật

**Nếu slideshow không hoạt động:**

- Kiểm tra đường dẫn ảnh có đúng không
- Đảm bảo ảnh có thể truy cập công khai

## 📋 Checklist trước khi sử dụng

- [ ] Thay thế ảnh mẫu bằng ảnh cưới thật
- [ ] Upload nhạc nền lãng mạn
- [ ] Cập nhật thông tin ngày giờ địa điểm
- [ ] Test trên nhiều thiết bị
- [ ] Kiểm tra các đường link

## 🎵 Gợi ý nhạc nền

- "A Thousand Years" - Christina Perri
- "All of Me" - John Legend
- "Perfect" - Ed Sheeran
- "Can't Help Falling in Love" - Elvis Presley

## 📞 Hỗ trợ

Nếu cần giúp đỡ tùy chỉnh thêm, hãy liên hệ với nhà phát triển!

---

_Tạo bởi ❤️ với tình yêu và sự lãng mạn_
 webdding_ChuChien-HaiYen
