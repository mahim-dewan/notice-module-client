# 📌 Notice Management Module (Next.js)

A modern, fully responsive **Notice Management Module** built with **Next.js (App Router)**, **shadcn/ui**, and **Tailwind CSS**. This module allows authors to create, publish, unpublish, and manage notices with form validation, API integration.

---

## ☯️ Quick Links
#### [Live Link⛓️‍💥](https://nebs-it-notice.vercel.app/notices)

#### [Backend GitHub⛓️‍💥](https://github.com/mahim-dewan/notice-module-server)

#### [Backend Live⛓️‍💥](https://nebs.onrender.com)

## 🚀 Features

- ✅ Fully responsive UI (mobile & desktop)
- ✅ Create Notice form with full validation
- ✅ Dropdown-based **Notice Type**
- ✅ API-based data persistence
- ✅ Success popup after notice publish
- ✅ Notice listing in table format
- ✅ Publish / Unpublish toggle for filter
- ✅ Pagination
- ✅ Built with modern Next.js App Router

---

## 🧱 Tech Stack

- **Framework**: Next.js (App Router)
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Form Validation**: Zod
- **State Management**: Context API
- **API Requests**:  Axios
- **Backend**: REST API
- **Database**: MongoDB

---

## 📁 Project Structure
``` bash
notice-module-client/
├── public/
├── src/
│   │── app/
│   │  ├── layout.js
│   │  ├── page.js
│   │  ├── not-found.js
│   │  ├── globals.css
│   │  ├── favicon.ico
│   │  └── notices/
│   │     ├── page.jsx
│   │     └── create/
│   │        └── page.jsx
│   │
│   │── components/
│   │  ├──ui/ # shadcn components
│   │  ├──layout/
│   │  │  ├──Header.jsx
│   │  │  ├──Slidebar.jsx
│   │  │  └──Sidebar.jsx
│   │  │
│   │  ├──createNotice/
│   │  │  ├──DatePickField.jsx
│   │  │  ├──NoticeBody.jsx
│   │  │  ├──SuccessPopup.jsx
│   │  │  └──UploadAttach.jsx
│   │  │
│   │  ├──NoticeManage/
│   │  │  ├──Notices.jsx
│   │  │  ├──NoticeFilterBar.jsx
│   │  │  ├──NoticeFilterPopover.jsx
│   │  │  ├──NoticeSkelator.jsx
│   │  │  └──NoticeTable.jsx
│   │  │
│   │  └──reusable/  # Reusable small
│   │
│   ├──utils/  # utilities functions
│   │   
│   ├──context/
│   │  ├──NoticeContext.jsx
│   │  ├──noticeReducer.js
│   │  └──noticeActions.js
│   │
│   ├──hooks/
│   │  └──useCreateNotice.js
│   │
│   ├──schemas/
│   │  └──notice.schema.js
│   │   
│   └──lib/
│      ├──apis.js  # all api call here
│      └──utils.js  # shadcn/ui default util
│   
├── .env.local
├── .gitignore
├── components.json
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
└── README.md

```


## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/mahim-dewan/notice-module-client.git

cd notice-module-client

```

2️⃣ Install Dependencies
```bash
npm install
```

3️⃣ Environment Configuration

Create .env.local
```bash
NEXT_PUBLIC_BASE_API = 'https://nebs.onrender.com/api'
```

4️⃣ Run Development Server
```bash
npm run dev
```

Finally open in browser 
```bash
http://localhost:3000
```

## 🧑‍💻 Author

Developed by Mahim Dewan

🔗 [portfolio](https://mahim-dewan.vercel.app/)   
🔗 [Linkedin](https://www.linkedin.com/in/mahim-dewan79/)   
🔗 [GitHub](https://github.com/mahim-dewan)   
