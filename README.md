# 🚀 My Portfolio Website

A personal developer portfolio website — dark navy theme, gold accents, smooth animations.

---

## 📁 Project Structure

```
portfolio/
├── index.html          ← Main HTML file (all sections)
├── css/
│   └── style.css       ← All styles + animations
├── js/
│   └── script.js       ← All JavaScript (cursor, tilt, counters, etc.)
├── images/             ← Your images go here (see list below)
├── README.md
└── requirements.txt
```

---

## 🖼️ Images Required

Place these files inside the `images/` folder:

| File Name          | What It Is                        |
|--------------------|-----------------------------------|
| `profile.jpg`      | Your professional photo (hero)    |
| `workspace.jpg`    | Your desk/workspace photo         |
| `project1.png`     | Portfolio project 1 screenshot    |
| `project2.png`     | Portfolio project 2 screenshot    |
| `project3.png`     | Portfolio project 3 screenshot    |
| `project4.png`     | Portfolio project 4 screenshot    |
| `CV.pdf`           | Your CV/Resume PDF                |

---

## ✏️ Customization Checklist

Open `index.html` and replace all placeholder values:

- [ ] `YOUR NAME` → Your actual name (multiple places)
- [ ] `[Your City]`, `[Country]` → Your location
- [ ] `[Your Achievement]` → e.g. "1st Place Winner for XYZ"
- [ ] `[Project]` → Your flagship project name
- [ ] WhatsApp number: `+92 XXXXXXXXXX` → your number
- [ ] Email: `your@email.com` → your email
- [ ] Address in contact section → your city
- [ ] Fiverr link → your Fiverr profile URL
- [ ] Project links (`href="#"`) → actual GitHub/live links
- [ ] Stats numbers (Years, Projects, etc.) → your real numbers
- [ ] Skills and percentages in career section → your skills
- [ ] Services descriptions → your actual services
- [ ] `<title>` tag → YOUR NAME – Portfolio

---

## 📬 Formspree Setup (Contact Form)

1. Go to **https://formspree.io** and create a free account
2. Click **New Form** → name it "Portfolio Contact"
3. Copy your **Form ID** (looks like: `xabcdefg`)
4. In `index.html`, find this line:
   ```html
   <form ... action="https://formspree.io/f/YOUR_FORMSPREE_ID">
   ```
5. Replace `YOUR_FORMSPREE_ID` with your actual form ID
6. Now the contact form will email you whenever someone submits it ✅

---

## 🐙 GitHub + Deployment

### Step 1 — Create GitHub Repository
1. Go to **github.com** → click **New Repository**
2. Name it: `your-username.github.io` *(for root deployment)*  
   OR any name like `portfolio` *(for project deployment)*
3. Set to **Public**, initialize with README ✅

### Step 2 — Upload Your Project
```bash
# Option A — Git command line
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```
OR use **GitHub Desktop** or drag-and-drop upload on github.com

### Step 3 — Enable GitHub Pages
1. Go to your repo → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** / folder: **/ (root)**
4. Click **Save**
5. Your site will be live at:  
   `https://YOUR_USERNAME.github.io/YOUR_REPO/`

---

## 🔄 Updating Your Site

Just push new commits to `main` — GitHub Pages auto-deploys in ~1 min.

---

## 🎨 Features

- ✅ Custom gold cursor with trail effect
- ✅ 3D tilt animation on hero image (mouse tracking)
- ✅ Animated number counters (easeOutExpo)
- ✅ Skill bars animated on scroll
- ✅ Scroll-triggered fade/slide animations (AOS)
- ✅ Sticky navbar with active section highlight
- ✅ Mobile hamburger menu
- ✅ Contact form via Formspree (no backend needed)
- ✅ Success/error modals
- ✅ Smooth scroll
- ✅ Scroll-to-top button
- ✅ Fully responsive (mobile/tablet/desktop)