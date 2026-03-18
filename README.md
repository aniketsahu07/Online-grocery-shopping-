# FreshBasket – Online Grocery Shopping Website

FreshBasket is a responsive front-end grocery shopping website built using only **HTML, CSS, and JavaScript**.
It includes product browsing, filtering, cart management, and a simple login/create-account flow with local storage.

## ✨ Features

- Modern responsive UI for desktop and mobile
- Grocery product listing with images
- Search by product name
- Category-based filtering (Fruits, Vegetables, Dairy, Snacks)
- Add to cart with live item count
- Quantity increase/decrease in cart
- Dynamic cart total calculation
- Login and Create Account page
- Account creation and login verification using `localStorage`
- Auto-redirect to homepage after successful login

## 📂 Project Structure

- `index.html` – Main shopping homepage
- `style.css` – Complete styling for homepage + auth page
- `script.js` – Product rendering, filtering, cart logic
- `login.html` – Login / Create Account UI
- `login.js` – Auth mode switch + form validation + localStorage auth

## 🚀 How to Run Locally

1. Clone or download the project.
2. Open project folder in VS Code.
3. Start a local server (example):
   - `npx serve -l 5500 .`
4. Open in browser:
   - Home: `http://localhost:5500`
   - Login: `http://localhost:5500/login.html`

## 🧪 Suggested Test Flow

1. Open login page.
2. Create a new account.
3. Login with same credentials.
4. Verify redirect to homepage.
5. Add products to cart and update quantities.
6. Complete checkout flow.

## 🛠️ Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (ES6)

## 📌 Notes

- This is a front-end project; no backend/database is used.
- Authentication is demo-level and stored in browser local storage.

## 👨‍💻 Author

Created by Aniket Sahu
GitHub: https://github.com/aniketsahu07
