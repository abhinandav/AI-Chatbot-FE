# AI Chat Bot Frontend 💻


### 📦 1. Create the React App
Use Vite for fast setup:

```bash
npm create vite@latest news-chat-fe --template react
cd news-chat-fe
npm install
```

### 💨 2. Install Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Update tailwind.config.js:

```bash
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
]
```

### Update src/index.css:
```bash
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 📁 4. Basic Folder Structure

```bash
src/
│
├── components/
│   └── ChatWindow.jsx
├── App.jsx
├── index.css
└── main.jsx
```
