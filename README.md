# 📱 GastoTrack - Smart Expense Tracking App

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Platform](https://img.shields.io/badge/platform-Android-green.svg)
![Status](https://img.shields.io/badge/status-Active-success.svg)

**GastoTrack** is a full-stack expense tracking mobile application built with React Native (Expo) and Laravel. It features AI-powered spending insights, budget management, and automatic transaction capture from e-wallet notifications.

---

## ✨ Features

### 📊 Core Features
- ✅ **Expense & Income Tracking** - Add, edit, delete transactions
- ✅ **Budget Management** - Set monthly budgets per category
- ✅ **Smart Dashboard** - Real-time spending overview
- ✅ **Advanced Analytics** - Pie charts, bar charts, trend analysis
- ✅ **AI Chatbot** - Get spending insights powered by Google Gemini
- ✅ **Category Management** - 8 pre-configured categories
- ✅ **Search & Filter** - Find transactions easily
- ✅ **Auto-Capture** - Automatically capture e-wallet transactions (GCash, Maya)

### 🔐 Security
- ✅ JWT Authentication
- ✅ Role-based access control (User/Admin)
- ✅ Secure password hashing
- ✅ Account activation system

### 👨‍💼 Admin Features
- ✅ User management
- ✅ Transaction oversight
- ✅ Category management
- ✅ System-wide analytics
- ✅ Settings control

---

## 🛠️ Tech Stack

### **Mobile App**
- **Framework:** React Native with Expo
- **Navigation:** Expo Router (file-based routing)
- **State Management:** React Hooks
- **Charts:** React Native Chart Kit
- **API Client:** Axios
- **Native Modules:** Java (for notification capture)

### **Backend API**
- **Framework:** Laravel 13
- **Database:** SQLite (MySQL/PostgreSQL ready)
- **Authentication:** JWT
- **AI:** Google Gemini API
- **Language:** PHP 8.2+

---

## 📸 Screenshots

> Add screenshots here when available

---

## 🚀 Quick Start

### **Prerequisites**

- **Mobile Development:**
  - Node.js 18+ and npm
  - Android Studio (for Android development)
  - Expo CLI

- **Backend:**
  - PHP 8.2+
  - Composer
  - SQLite (or MySQL/PostgreSQL)

---

## 📦 Installation

### **1. Clone Repository**

```bash
git clone https://github.com/YOUR_USERNAME/gastotrack.git
cd gastotrack
```

---

### **2. Backend Setup**

```bash
# Navigate to backend
cd backend/app

# Install dependencies
composer install

# Copy environment file
copy .env.example .env

# Generate app key
php artisan key:generate

# Configure database in .env
# For SQLite (default):
DB_CONNECTION=sqlite

# For MySQL:
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=gastotrack_db
# DB_USERNAME=your_user
# DB_PASSWORD=your_password

# Set JWT secret in .env
JWT_SECRET=your-secret-key-here

# (Optional) Add Gemini API key for AI chatbot
GEMINI_API_KEY=your-gemini-api-key

# Run migrations and seed database
php artisan migrate:fresh --seed

# Start development server
php artisan serve
```

**Default Admin Credentials:**
- Email: `admin@gastotrack.com`
- Password: `Admin@1234`

---

### **3. Mobile App Setup**

```bash
# Navigate to mobile folder
cd mobile

# Install dependencies
npm install

# For Android: Prebuild native modules
npx expo prebuild --platform android

# Start development server
npx expo start
```

---

### **4. Configuration**

Update API URL in `mobile/constants/config.js`:

```javascript
// For Android Emulator
export const API_BASE_URL = 'http://10.0.2.2:8000/api';

// For Physical Device (replace with your PC's IP)
export const API_BASE_URL = 'http://192.168.x.x:8000/api';

// For Production
export const API_BASE_URL = 'https://your-domain.com/api';
```

---

## 📱 Running the App

### **Option 1: Android Emulator**

```bash
# Make sure backend is running
cd backend/app
php artisan serve

# In another terminal, run mobile app
cd mobile
npx expo run:android
```

### **Option 2: Physical Device**

```bash
# Build APK
cd mobile/android
./gradlew assembleDebug

# APK location: app/build/outputs/apk/debug/app-debug.apk
# Copy to phone and install
```

Or use the provided build scripts:
```bash
# Windows
.\build-apk.cmd

# PowerShell
.\build-apk.ps1
```

---

## 🏗️ Project Structure

```
gastotrack/
├── backend/
│   └── app/                    # Laravel backend
│       ├── app/
│       │   ├── Http/
│       │   │   ├── Controllers/    # API controllers
│       │   │   └── Middleware/     # JWT, Admin middleware
│       │   ├── Models/             # Eloquent models
│       │   └── Services/           # Business logic
│       ├── database/
│       │   ├── migrations/         # Database schema
│       │   └── seeders/            # Initial data
│       └── routes/
│           └── api.php             # API routes
│
├── mobile/
│   ├── app/                    # Expo Router screens
│   │   ├── auth/               # Login, Register
│   │   ├── tabs/               # Main app tabs
│   │   └── chatbot.jsx         # AI chatbot
│   ├── Components/             # Reusable components
│   │   ├── ui/                 # UI components
│   │   ├── transaction/        # Transaction components
│   │   ├── budget/             # Budget components
│   │   └── charts/             # Chart components
│   ├── hooks/                  # Custom React hooks
│   ├── services/               # API services
│   ├── constants/              # Config, colors
│   └── android/                # Native Android code
│       └── app/src/main/java/  # Java notification modules
│
├── .gitignore
├── README.md
└── Documentation files...
```

---

## 📚 API Endpoints

### **Public Endpoints**
```
POST   /api/register          # Register new user
POST   /api/login             # User login
```

### **Protected Endpoints** (Requires JWT)
```
GET    /api/me                # Get current user
GET    /api/transactions      # Get user transactions
POST   /api/transactions      # Create transaction
DELETE /api/transactions/{id} # Delete transaction
GET    /api/categories        # Get categories
GET    /api/budgets           # Get budgets
POST   /api/budgets           # Set/update budget
GET    /api/dashboard         # Get dashboard data
GET    /api/analytics         # Get analytics data
POST   /api/chatbot           # Chat with AI
```

### **Admin Endpoints** (Requires Admin Role)
```
GET    /api/admin/users               # List all users
POST   /api/admin/users/{id}/toggle   # Activate/deactivate user
GET    /api/admin/transactions        # All transactions
GET    /api/admin/analytics           # System analytics
... and more
```

Full API documentation: See `backend/app/routes/api.php`

---

## 🎨 Customization

### **Adding New Categories**

Edit `backend/app/database/seeders/CategorySeeder.php`:

```php
Category::create([
    'name' => 'Your Category',
    'icon' => 'icon-name',
    'color' => '#FF5733',
]);
```

Then run: `php artisan db:seed --class=CategorySeeder`

### **Changing Theme Colors**

Edit `mobile/constants/colors.js`:

```javascript
export const colors = {
  primary: '#4A90E2',
  secondary: '#50C878',
  // ... customize as needed
};
```

### **Configure AI Chatbot**

Set Gemini API key in `backend/app/.env`:
```
GEMINI_API_KEY=your-api-key-here
```

Get API key from: https://makersuite.google.com/app/apikey

---

## 🧪 Testing

### **Backend Tests**
```bash
cd backend/app
php artisan test
```

### **Mobile Tests**
```bash
cd mobile
npm test
```

### **Manual Testing Checklist**

See `QUICK_TEST.txt` for comprehensive testing guide.

---

## 🚢 Deployment

### **Backend Deployment**

Deploy to any PHP hosting:
- Heroku
- DigitalOcean
- AWS
- Laravel Forge
- Shared hosting

Update `mobile/constants/config.js` with production URL.

### **Mobile App Deployment**

**Build Release APK:**
```bash
cd mobile/android
./gradlew assembleRelease
```

**Submit to Google Play Store:**
1. Sign APK with release keystore
2. Create Play Store listing
3. Upload APK
4. Submit for review

---

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `backend/app/.env` | Backend configuration |
| `mobile/constants/config.js` | API URL configuration |
| `mobile/app.json` | Expo configuration |
| `.gitignore` | Files to exclude from Git |

---

## 📖 Documentation

- **Setup Guide:** `SETUP_COMPLETE.md`
- **Build APK:** `BUILD_APK.md`
- **Testing Guide:** `TEST_APK_GUIDE.md`
- **Emulator Guide:** `EMULATOR_GUIDE.md`
- **Project Status:** `PROJECT_STATUS.md`

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- React Native & Expo teams
- Laravel framework
- Google Gemini AI
- All open-source contributors

---

## 📊 Project Stats

- **Lines of Code:** ~7,000+
- **Files:** 78+
- **Languages:** PHP, JavaScript, Java, Kotlin
- **Development Time:** 40+ hours
- **Features:** 20+

---

## 🐛 Known Issues

- E-wallet auto-capture requires notification access permission
- AI chatbot requires Gemini API key
- iOS version not yet available

---

## 🗺️ Roadmap

- [ ] iOS version
- [ ] Dark mode
- [ ] Biometric authentication
- [ ] Export transactions (CSV/PDF)
- [ ] Multi-currency support
- [ ] Recurring transactions
- [ ] Expense splitting
- [ ] Cloud backup

---

## 💬 Support

If you encounter any issues or have questions:

1. Check the documentation files
2. Search existing [Issues](https://github.com/YOUR_USERNAME/gastotrack/issues)
3. Create a new issue if needed

---

## ⭐ Show Your Support

If you find this project useful, please consider giving it a star ⭐

---

**Made with ❤️ and ☕**
