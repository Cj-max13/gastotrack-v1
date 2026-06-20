# 🚀 Deploy GastoTrack to GitHub

## 📋 **Step-by-Step Guide**

---

## **Step 1: Create GitHub Repository**

### **1.1 Go to GitHub**
```
https://github.com
```

### **1.2 Create New Repository**
1. Click the **"+"** icon (top right) → **"New repository"**
2. Fill in details:
   - **Repository name:** `gastotrack` or `gastotrack-mobile`
   - **Description:** `Smart expense tracking app with AI insights`
   - **Visibility:** 
     - ✅ **Public** - Anyone can see (recommended for portfolio)
     - ⬜ **Private** - Only you can see
   - **Initialize:** 
     - ⬜ Don't check any boxes (we already have code)
3. Click **"Create repository"**

### **1.3 Copy Repository URL**
You'll see something like:
```
https://github.com/YOUR_USERNAME/gastotrack.git
```
**Copy this URL!**

---

## **Step 2: Initialize Git in Your Project**

Open PowerShell in your GastoTrack folder:

```powershell
cd C:\Users\Chris\Documents\Gastotrack
```

### **2.1 Check if Git is Installed**
```powershell
git --version
```

**If not installed:**
- Download from: https://git-scm.com/download/win
- Install with default options
- Restart PowerShell

### **2.2 Configure Git** (First time only)
```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### **2.3 Initialize Git Repository**
```powershell
git init
```

Should see: `Initialized empty Git repository`

---

## **Step 3: Prepare Files for GitHub**

### **3.1 Check What Files Will Be Uploaded**
```powershell
git status
```

This shows all files that will be included.

**Good:** Should see:
- ✅ Mobile app code
- ✅ Backend code
- ✅ Documentation files
- ✅ README.md
- ✅ .gitignore

**Bad:** Should NOT see:
- ❌ node_modules/
- ❌ .env files
- ❌ vendor/
- ❌ build/ folders

If you see these, `.gitignore` is working! ✅

### **3.2 Review .gitignore** (Already created for you)
```
.gitignore already excludes:
✓ Sensitive files (.env)
✓ Dependencies (node_modules, vendor)
✓ Build files (*.apk, build/)
✓ IDE files (.vscode, .idea)
✓ Logs and cache
```

---

## **Step 4: Add Files to Git**

### **4.1 Stage All Files**
```powershell
git add .
```

### **4.2 Verify What's Staged**
```powershell
git status
```

Should show files in green (ready to commit)

### **4.3 Create First Commit**
```powershell
git commit -m "Initial commit: GastoTrack expense tracking app with AI insights"
```

**Commit message guidelines:**
- First line: Brief summary
- Optional: Detailed description

Example:
```powershell
git commit -m "Initial commit: GastoTrack expense tracking app

Features:
- React Native mobile app with Expo
- Laravel REST API backend
- AI-powered spending insights
- Budget management
- E-wallet auto-capture
- Complete admin panel"
```

---

## **Step 5: Connect to GitHub**

### **5.1 Add Remote Repository**
```powershell
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/gastotrack.git
```

### **5.2 Verify Remote**
```powershell
git remote -v
```

Should show:
```
origin  https://github.com/YOUR_USERNAME/gastotrack.git (fetch)
origin  https://github.com/YOUR_USERNAME/gastotrack.git (push)
```

---

## **Step 6: Push to GitHub**

### **6.1 Set Default Branch Name**
```powershell
git branch -M main
```

### **6.2 Push Code**
```powershell
git push -u origin main
```

**Authentication:**
- GitHub may ask for username/password
- **Use Personal Access Token instead of password**

**How to get token:**
1. Go to GitHub → Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. Generate new token
4. Select scopes: `repo` (full control)
5. Generate token
6. **Copy and save it** (you won't see it again!)
7. Use token as password when pushing

**Or use GitHub CLI:**
```powershell
# Install GitHub CLI
winget install --id GitHub.cli

# Login
gh auth login
```

### **6.3 Verify Upload**
Go to: `https://github.com/YOUR_USERNAME/gastotrack`

You should see all your files! ✅

---

## **Step 7: Add Additional Files** (Optional)

### **7.1 Create LICENSE**

Create `LICENSE` file:
```
MIT License

Copyright (c) 2026 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### **7.2 Add Contributing Guidelines**

Create `CONTRIBUTING.md`:
```markdown
# Contributing to GastoTrack

Thank you for considering contributing!

## How to Contribute

1. Fork the repository
2. Create feature branch
3. Make your changes
4. Test thoroughly
5. Submit pull request

## Code Style

- Follow existing code style
- Comment complex logic
- Write meaningful commit messages

## Reporting Bugs

Use GitHub Issues with:
- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
```

### **7.3 Commit and Push**
```powershell
git add LICENSE CONTRIBUTING.md
git commit -m "Add LICENSE and CONTRIBUTING guidelines"
git push
```

---

## **Step 8: Enhance Your Repository**

### **8.1 Add Topics/Tags**

On GitHub:
1. Go to your repository
2. Click ⚙️ (Settings icon) next to "About"
3. Add topics:
   ```
   react-native, expo, laravel, expense-tracker, 
   mobile-app, php, android, ai, budget-management
   ```

### **8.2 Add Repository Description**

Same settings dialog:
- **Description:** `Smart expense tracking mobile app with AI-powered insights, budget management, and e-wallet auto-capture. Built with React Native (Expo) and Laravel.`
- **Website:** (if you deploy backend)

### **8.3 Enable Features**

Repository → Settings → Features:
- ✅ Issues
- ✅ Projects (for task management)
- ✅ Wiki (for detailed docs)

---

## **Step 9: Create Releases** (Optional)

### **9.1 Tag Your Version**
```powershell
git tag -a v1.0.0 -m "Release v1.0.0 - Initial public release"
git push origin v1.0.0
```

### **9.2 Create Release on GitHub**

1. Go to repository → Releases
2. Click **"Create a new release"**
3. Choose tag: `v1.0.0`
4. Release title: `v1.0.0 - Initial Release`
5. Description:
```markdown
## 🎉 Initial Release

### Features
- Complete expense tracking system
- AI-powered spending insights
- Budget management
- E-wallet auto-capture
- Admin panel
- Analytics with charts

### Downloads
- APK: `app-debug.apk` (attached)

### Setup
See README.md for installation instructions
```
6. **Attach APK** (optional)
7. Click **"Publish release"**

---

## **Step 10: Update README** (Personalize)

Edit `README.md`:

```markdown
Replace placeholders:
- YOUR_USERNAME → your GitHub username
- your.email@example.com → your email
- Your Name → your name

Add screenshots:
1. Take screenshots of your app
2. Upload to `screenshots/` folder
3. Reference in README
```

Commit changes:
```powershell
git add README.md
git commit -m "Update README with personal information"
git push
```

---

## 🎯 **Quick Deploy Script**

Create `deploy-to-github.ps1`:

```powershell
# Quick GitHub Deploy Script
Write-Host "Deploying GastoTrack to GitHub..." -ForegroundColor Green

# Add all changes
git add .

# Commit
$message = Read-Host "Commit message"
git commit -m "$message"

# Push
git push

Write-Host "✓ Deployed to GitHub!" -ForegroundColor Green
```

**Usage:**
```powershell
.\deploy-to-github.ps1
```

---

## 📊 **Folder Structure on GitHub**

Your repository will look like:
```
gastotrack/
├── .gitignore
├── README.md
├── LICENSE
├── CONTRIBUTING.md
├── backend/
│   └── app/                 # Laravel backend
├── mobile/                  # React Native app
├── Documentation files      # All .md files
└── Build scripts            # .cmd, .ps1 files
```

---

## 🔄 **Future Updates**

### **When you make changes:**

```powershell
# 1. Check what changed
git status

# 2. Stage changes
git add .

# 3. Commit
git commit -m "Add: description of changes"

# 4. Push
git push
```

### **Commit message guidelines:**
```
Add: new feature
Fix: bug fix
Update: modify existing feature
Remove: delete feature
Docs: documentation changes
Style: formatting, no code change
Refactor: code restructuring
Test: add tests
```

---

## 🌟 **Make Your Repository Stand Out**

### **1. Add Badges** (top of README.md)

```markdown
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Platform](https://img.shields.io/badge/platform-Android-green.svg)
![Stars](https://img.shields.io/github/stars/YOUR_USERNAME/gastotrack)
![Forks](https://img.shields.io/github/forks/YOUR_USERNAME/gastotrack)
```

### **2. Add Screenshots**

Create `screenshots/` folder:
```powershell
mkdir screenshots
# Add images: dashboard.png, analytics.png, etc.
```

Update README:
```markdown
## Screenshots

| Dashboard | Analytics | Budget |
|-----------|-----------|--------|
| ![Dashboard](screenshots/dashboard.png) | ![Analytics](screenshots/analytics.png) | ![Budget](screenshots/budget.png) |
```

### **3. Add Demo Video**

Upload demo video to YouTube, add to README:
```markdown
## Demo

[![Demo Video](https://img.youtube.com/vi/YOUR_VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)
```

---

## ✅ **Checklist: Is Your Repository Ready?**

- [ ] Repository created on GitHub
- [ ] Code pushed successfully
- [ ] README.md is complete and personalized
- [ ] .gitignore excludes sensitive files
- [ ] LICENSE file added
- [ ] Repository description and topics set
- [ ] No sensitive data (passwords, API keys) in code
- [ ] Documentation files included
- [ ] Screenshots added (optional)
- [ ] Release created (optional)

---

## 🎉 **Success!**

Your GastoTrack project is now on GitHub!

**Share it:**
- Portfolio: Add to your resume/portfolio
- LinkedIn: Share the repository link
- Twitter: Tweet about your project
- Dev.to: Write a blog post

**Repository URL:**
```
https://github.com/YOUR_USERNAME/gastotrack
```

---

## 💡 **Pro Tips**

1. **Regular commits:** Commit often with clear messages
2. **Branches:** Use branches for new features
3. **Issues:** Track bugs and features in GitHub Issues
4. **Projects:** Use GitHub Projects for task management
5. **Wiki:** Add detailed documentation in Wiki
6. **Discussions:** Enable for community questions
7. **Star your own repo:** It shows it's active 😄

---

**Congratulations! Your project is now open source!** 🎊
