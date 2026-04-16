const showLoginBtn = document.getElementById("showLogin");
const showSignupBtn = document.getElementById("showSignup");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const authMessage = document.getElementById("authMessage");
const ACCOUNTS_KEY = "freshbasket_accounts";

function getAccounts() {
  const rawAccounts = localStorage.getItem(ACCOUNTS_KEY);

  if (!rawAccounts) {
    return [];
  }

  try {
    const parsedAccounts = JSON.parse(rawAccounts);
    return Array.isArray(parsedAccounts) ? parsedAccounts : [];
  } catch {
    return [];
  }
}

function saveAccounts(accounts) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

function setMode(mode) {
  const isLoginMode = mode === "login";

  showLoginBtn.classList.toggle("active", isLoginMode);
  showSignupBtn.classList.toggle("active", !isLoginMode);

  showLoginBtn.setAttribute("aria-selected", String(isLoginMode));
  showSignupBtn.setAttribute("aria-selected", String(!isLoginMode));

  loginForm.classList.toggle("hidden", !isLoginMode);
  signupForm.classList.toggle("hidden", isLoginMode);

  authMessage.textContent = "";
  authMessage.className = "auth-message";
}

function showMessage(text, success) {
  authMessage.textContent = text;
  authMessage.className = success ? "auth-message success" : "auth-message error";
}

showLoginBtn.addEventListener("click", () => setMode("login"));
showSignupBtn.addEventListener("click", () => setMode("signup"));

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!email || !password) {
    showMessage("Please enter both email and password.", false);
    return;
  }

  const accounts = getAccounts();
  const matchedAccount = accounts.find(
    (account) => account.email.toLowerCase() === email.toLowerCase() && account.password === password
  );

  if (!matchedAccount) {
    showMessage("Invalid login details. Please create an account or use valid credentials.", false);
    return;
  }

  showMessage("Login successful. Redirecting to the homepage...", true);
  loginForm.reset();

  setTimeout(() => {
    window.location.href = "index.html";
  }, 700);
});

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  const confirmPassword = document.getElementById("signupConfirm").value.trim();

  if (!name || !email || !password || !confirmPassword) {
    showMessage("All fields are required to create an account.", false);
    return;
  }

  if (password.length < 6) {
    showMessage("Password must be at least 6 characters long.", false);
    return;
  }

  if (password !== confirmPassword) {
    showMessage("Password and confirm password do not match.", false);
    return;
  }

  const accounts = getAccounts();
  const alreadyExists = accounts.some(
    (account) => account.email.toLowerCase() === email.toLowerCase()
  );

  if (alreadyExists) {
    showMessage("An account with this email already exists. Please log in.", false);
    return;
  }

  accounts.push({ name, email, password });
  saveAccounts(accounts);

  showMessage("Account created successfully. Please log in.", true);
  signupForm.reset();
  setMode("login");

  const loginEmailInput = document.getElementById("loginEmail");
  loginEmailInput.value = email;
});
