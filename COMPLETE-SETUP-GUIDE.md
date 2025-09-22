# راهنمای کامل راه‌اندازی سیستم برنامه‌ریزی دروس دانشگاهی

## 🎯 مراحل راه‌اندازی (کمترین کار برای شما!)

### گام ۱: دانلود و آماده‌سازی

```bash
# کلون پروژه (یا دانلود فایل‌ها)
git clone <repository-url>
cd university-scheduling-system

# اجرای اسکریپت نصب خودکار
chmod +x setup.sh
./setup.sh
```

### گام ۲: راه‌اندازی سریع

```bash
# گزینه ۱: با Docker (آسان‌ترین روش)
docker-compose up -d

# گزینه ۲: دستی
npm run dev
```

### گام ۳: دسترسی

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000  
- **MongoDB**: mongodb://localhost:27017

## 📁 ساختار کامل پروژه

```
university-scheduling-system/
├── 📂 frontend/                 # React + Next.js Frontend
│   ├── 📂 src/
│   │   ├── 📂 components/       # کامپوننت‌های React
│   │   │   ├── 📂 common/       # کامپوننت‌های مشترک
│   │   │   │   ├── Layout.tsx
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── Loading.tsx
│   │   │   │   └── Button.tsx
│   │   │   ├── 📂 schedule/     # مدیریت برنامه‌ها
│   │   │   │   ├── ScheduleList.tsx
│   │   │   │   ├── ScheduleEditor.tsx
│   │   │   │   ├── TimetableView.tsx
│   │   │   │   └── ConflictIndicator.tsx
│   │   │   ├── 📂 course/       # مدیریت دروس
│   │   │   │   ├── CourseList.tsx
│   │   │   │   ├── CourseForm.tsx
│   │   │   │   └── CourseSearch.tsx
│   │   │   └── 📂 reports/      # گزارش‌ها و آمار
│   │   │       ├── Dashboard.tsx
│   │   │       ├── Analytics.tsx
│   │   │       └── ExportPanel.tsx
│   │   ├── 📂 pages/            # صفحات Next.js
│   │   │   ├── _app.tsx
│   │   │   ├── _document.tsx
│   │   │   ├── dashboard.tsx
│   │   │   ├── login.tsx
│   │   │   └── schedules/
│   │   ├── 📂 hooks/            # React Hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useSchedule.ts
│   │   │   └── useConflictDetection.ts
│   │   ├── 📂 utils/            # ابزارهای کمکی
│   │   │   ├── api.ts
│   │   │   ├── conflictDetection.ts
│   │   │   └── persianCalendar.ts
│   │   └── 📂 styles/           # استایل‌های CSS
│   │       ├── globals.css
│   │       └── rtl.css
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js       # تنظیمات RTL
│   └── tsconfig.json
│
├── 📂 backend/                  # Node.js + Express Backend
│   ├── 📂 src/
│   │   ├── 📂 controllers/      # کنترلرهای API
│   │   │   ├── authController.ts
│   │   │   ├── scheduleController.ts
│   │   │   ├── courseController.ts
│   │   │   └── conflictController.ts
│   │   ├── 📂 models/           # مدل‌های MongoDB
│   │   │   ├── User.ts
│   │   │   ├── Schedule.ts
│   │   │   └── Course.ts
│   │   ├── 📂 routes/           # مسیرهای API
│   │   │   ├── auth.ts
│   │   │   ├── schedules.ts
│   │   │   └── courses.ts
│   │   ├── 📂 middleware/       # Middleware ها
│   │   │   ├── auth.ts
│   │   │   ├── validation.ts
│   │   │   └── errorHandler.ts
│   │   ├── 📂 services/         # سرویس‌های تجاری
│   │   │   ├── conflictDetectionService.ts
│   │   │   ├── exportService.ts
│   │   │   └── emailService.ts
│   │   └── 📂 config/           # تنظیمات
│   │       └── database.ts
│   ├── package.json
│   ├── server.ts
│   ├── app.ts
│   └── tsconfig.json
│
├── 📂 shared/                   # فایل‌های مشترک
│   ├── 📂 types/                # تعاریف TypeScript
│   ├── 📂 constants/            # ثابت‌های پروژه
│   └── 📂 validation/           # اعتبارسنجی
│
├── 📂 docker/                   # Docker configs
│   ├── Dockerfile.frontend
│   ├── Dockerfile.backend
│   └── docker-compose.yml
│
├── 📂 docs/                     # مستندات
│   ├── API.md
│   ├── DEVELOPMENT.md
│   └── USER_GUIDE_FA.md
│
├── 📂 scripts/                  # اسکریپت‌های کمکی
│   ├── setup.sh                # نصب خودکار
│   ├── deploy.sh               # استقرار
│   └── seed-database.js        # داده‌های نمونه
│
├── README.md
├── package.json                 # Root package
└── .gitignore
```

## 🔧 فایل‌های کلیدی ایجاد شده

### Frontend Files
✅ **React Components کامل با RTL**
- Layout, Header, Sidebar با پشتیبانی فارسی
- Dashboard با نمودارهای تعاملی
- TimetableView با Drag & Drop
- CourseForm با اعتبارسنجی
- ConflictIndicator برای نمایش تداخل‌ها

✅ **Next.js Configuration**
- RTL support کامل
- TypeScript configuration
- Tailwind CSS با plugins فارسی
- PWA ready

### Backend Files  
✅ **Express Server کامل**
- Authentication با JWT
- MongoDB models با validation
- Conflict detection algorithms
- Export services (PDF, Excel, JSON)
- Security middleware کامل

✅ **Database Schema**
- User model با settings
- Schedule model با Persian fields
- Course model با time slots
- Conflict detection logic

### DevOps Files
✅ **Docker Configuration**
- Multi-stage builds
- Production ready
- MongoDB container
- Health checks

✅ **Scripts**
- setup.sh برای نصب خودکار
- deploy.sh برای استقرار
- Environment templates

## 🚀 راه‌اندازی سریع (۳ دستور!)

```bash
# ۱. اجرای اسکریپت نصب
./setup.sh

# ۲. شروع development
npm run dev

# ۳. باز کردن مرورگر
open http://localhost:3000
```

## 🐳 راه‌اندازی با Docker (۱ دستور!)

```bash
docker-compose up -d
```

## ✨ ویژگی‌های پیاده‌سازی شده

### ✅ پشتیبانی کامل فارسی RTL
- تمام UI components با direction: rtl
- فونت‌های فارسی (IRANSans, Vazir)
- تقویم شمسی با روزهای فارسی
- Tailwind CSS با RTL plugins

### ✅ مدیریت برنامه‌های درسی
- ایجاد، ویرایش، حذف برنامه‌ها
- کپی و کلون برنامه‌ها
- مدیریت چندین برنامه همزمان
- انتخاب برنامه فعال

### ✅ مدیریت دروس
- افزودن درس با اطلاعات کامل
- انتخاب زمان‌های متعدد (نظری، عملی، تمرین)
- مدیریت اطلاعات امتحانات
- رنگ‌بندی و دسته‌بندی

### ✅ تشخیص هوشمند تداخل
- تداخل زمانی بین دروس
- تداخل استاد (یک استاد، دو کلاس همزمان)
- تداخل مکان (دو کلاس، یک مکان)
- نمایش بصری تداخل‌ها

### ✅ جدول زمانی تعاملی
- Drag & Drop برای جابجایی دروس
- نمایش هفتگی (شنبه تا پنج‌شنبه)
- رنگ‌بندی دروس
- Tooltip با جزئیات

### ✅ صادرات چندگانه
- PDF با قالب‌های زیبا
- Excel برای تحلیل
- JSON برای backup
- PNG/JPG برای sharing
- QR Code برای دسترسی سریع

### ✅ گزارش‌گیری پیشرفته
- Dashboard با آمار کلی
- نمودارهای تعاملی
- آمار واحدها و ساعات
- گزارش تداخل‌ها

### ✅ امنیت و عملکرد
- JWT Authentication
- Input validation
- Rate limiting
- XSS و CSRF protection
- MongoDB sanitization

## 📱 صفحات پیاده‌سازی شده

1. **صفحه ورود** - با validation کامل
2. **داشبورد** - آمار و نمودارها  
3. **مدیریت برنامه‌ها** - CRUD کامل
4. **ویرایش برنامه** - Drag & Drop editor
5. **لیست دروس** - جستجو و فیلتر
6. **گزارش‌ها** - Analytics و charts
7. **تنظیمات** - User preferences

## 🔄 API Endpoints آماده

```
AUTH:
POST /api/auth/login
POST /api/auth/register
GET  /api/auth/me

SCHEDULES:
GET    /api/schedules
POST   /api/schedules
PUT    /api/schedules/:id
DELETE /api/schedules/:id

COURSES:
GET    /api/courses
POST   /api/courses
PUT    /api/courses/:id
DELETE /api/courses/:id

CONFLICTS:
GET /api/conflicts/:scheduleId
POST /api/conflicts/resolve

EXPORT:
GET /api/export/pdf/:scheduleId
GET /api/export/excel/:scheduleId
GET /api/export/json/:scheduleId
```

## 🎯 دستورات مفید

```bash
# Development
npm run dev              # شروع development
npm run build           # Build برای production
npm run test            # اجرای تست‌ها
npm run lint            # بررسی کد

# Docker
docker-compose up -d              # شروع همه سرویس‌ها
docker-compose down              # توقف سرویس‌ها
docker-compose logs backend     # مشاهده لاگ‌ها

# Database
npm run seed            # ایجاد داده‌های نمونه
npm run migrate         # اجرای migrations
```

## 🛠️ تنظیمات اضافی

### Environment Variables
فایل‌های `.env` و `.env.local` از `.example` کپی شده‌اند. فقط مقادیر secret ها را تغییر دهید:

```bash
# backend/.env
JWT_SECRET=your-secret-key-here
MONGODB_URI=your-mongodb-connection

# frontend/.env.local  
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### MongoDB Setup
```bash
# Local MongoDB
mongod --dbpath ./data

# یا با Docker
docker run -d -p 27017:27017 --name mongodb mongo:6.0
```

## 🎉 نتیجه

**✅ کل سیستم آماده است!**

- **50+ فایل** کامل ایجاد شد
- **Frontend**: React 18 + Next.js 14 + RTL
- **Backend**: Node.js + Express + MongoDB  
- **Docker**: Production ready
- **Scripts**: نصب خودکار
- **Documentation**: کامل فارسی

**فقط ۳ دستور برای شروع:**
1. `./setup.sh`
2. `npm run dev`  
3. `open http://localhost:3000`

🚀 **سیستم کاملاً آماده استفاده در دانشگاه‌ها!**