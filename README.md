# سیستم جامع برنامه‌ریزی دروس دانشگاهی

## درباره پروژه
سیستم کامل و حرفه‌ای برنامه‌ریزی دروس دانشگاهی با پشتیبانی کامل فارسی RTL و تقویم شمسی.

## ویژگی‌ها
- 🇮🇷 پشتیبانی کامل فارسی RTL
- 📅 تقویم شمسی ایرانی
- 🎯 تشخیص هوشمند تداخل
- 🖱️ Drag & Drop برای برنامه‌ریزی
- 📊 گزارش‌گیری پیشرفته
- 📱 طراحی Responsive
- 🌓 Dark/Light Mode
- 📤 صادرات چندگانه (PDF, Excel, JSON)

## نصب و راه‌اندازی

### پیش‌نیازها
- Node.js 18+
- MongoDB 6+
- Docker (اختیاری)

### راه‌اندازی سریع
```bash
# کلون پروژه
git clone <repository-url>
cd university-scheduling-system

# نصب وابستگی‌ها
npm run install:all

# راه‌اندازی پایگاه داده
npm run seed

# اجرای پروژه
npm run dev
```

### با Docker
```bash
docker-compose up -d
```

## استفاده
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- MongoDB: localhost:27017

## مستندات
- [راهنمای API](docs/API.md)
- [راهنمای توسعه](docs/DEVELOPMENT.md)
- [راهنمای کاربری فارسی](docs/USER_GUIDE_FA.md)

## لایسنس
MIT License