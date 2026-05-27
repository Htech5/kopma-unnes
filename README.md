# KOPMA UNNES

Official website for KOPMA UNNES, built with Next.js App Router.

---

## About

KOPMA UNNES is a digital platform developed for the Student Cooperative of Universitas Negeri Semarang. This website provides information about organizational profiles, events, membership, inventory, business units, and cooperative services.

The project is designed with a modern, scalable, and responsive architecture to support organizational digital transformation and improve accessibility for students and members.

---

## Project Structure

```bash
.
├── app/
│   ├── acara/
│   ├── api/
│   ├── inventaris/
│   ├── jne-kopma/
│   ├── keanggotaan/
│   ├── kopmart/
│   ├── profil/
│   ├── struktur-organisasi/
│   ├── toga-kopma/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.js
│   ├── page.js
│   ├── robots.js
│   └── sitemap.js
├── public/
│   ├── images/
│   └── pdf.worker.min.js
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
└── README.md
```

---

## Main Features

- Responsive modern landing page
- Organization profile page
- Event and activity information
- Membership information system
- Inventory management page
- KOPMA business unit pages
- SEO optimization using sitemap and robots configuration
- Mobile-friendly user interface

---

## Main Routes

| Route | Description |
|---|---|
| `/` | Homepage |
| `/profil` | Organization profile |
| `/struktur-organisasi` | Organizational structure |
| `/acara` | Events and activities |
| `/keanggotaan` | Membership information |
| `/inventaris` | Inventory page |
| `/kopmart` | KOPMA marketplace/business unit |
| `/jne-kopma` | JNE KOPMA service |
| `/toga-kopma` | Graduation gown service |

---

## Tech Stack

### Frontend
- Next.js
- React.js
- JavaScript
- CSS

### Development Tools
- ESLint
- PostCSS
- Git & GitHub

### Deployment
- Vercel

---

## Getting Started

### Clone Repository

```bash
git clone https://github.com/Htech5/kopma-unnes.git
```

### Navigate to Project Directory

```bash
cd kopma-unnes
```

### Install Dependencies

```bash
npm install
```

---

## Running Development Server

Start the local development server:

```bash
npm run dev
```

Open your browser and visit:

```bash
http://localhost:3000
```

---

## Production Build

Build the application for production:

```bash
npm run build
```

Run the production server:

```bash
npm run start
```

---

## Available Scripts

```bash
npm run dev
```
Run development server.

```bash
npm run build
```
Build project for production.

```bash
npm run start
```
Start production server.

```bash
npm run lint
```
Run ESLint checks.

---

## Documentation Structure

Recommended documentation structure:

```bash
docs/
├── setup.md
├── deployment.md
├── architecture.md
├── pages.md
├── api.md
├── assets.md
└── contribution.md
```

| File | Description |
|---|---|
| `setup.md` | Local installation and setup guide |
| `deployment.md` | Production deployment guide |
| `architecture.md` | Project architecture explanation |
| `pages.md` | Pages and routes documentation |
| `api.md` | API route documentation |
| `assets.md` | Public assets management |
| `contribution.md` | Contribution workflow and coding standards |

---

## SEO Configuration

This project includes:

- `robots.js` for search engine crawling configuration
- `sitemap.js` for sitemap generation
- Optimized metadata structure using Next.js App Router

---

## Deployment

This project is recommended to be deployed using Vercel.

Build command:

```bash
npm run build
```

Production start command:

```bash
npm run start
```

---

## Repository

GitHub Repository:

https://github.com/Htech5/kopma-unnes

---

## Maintainer

KOPMA UNNES Development Team

---

## License

This project is developed for organizational and educational purposes under KOPMA UNNES.
