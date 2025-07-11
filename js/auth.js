document.addEventListener("DOMContentLoaded", () => {
  // === LOGIN FORM ===
  const loginForm = document.getElementById("loginForm");
  const loginError = document.getElementById("loginError");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!email || !password) {
        loginError.textContent = "Please fill in all fields.";
        return;
      }

      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (!storedUser || storedUser.email !== email || storedUser.password !== password) {
        loginError.textContent = "Invalid email or password.";
        return;
      }

      loginError.textContent = "";
      alert("Login successful!");
      window.location.href = "index.html";
    });
  }

  // === REGISTER FORM ===
  const registerForm = document.getElementById("registerForm");
  const registerError = document.getElementById("registerError");

  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("regEmail").value.trim();
      const password = document.getElementById("regPassword").value.trim();
      const confirmPassword = document.getElementById("confirmPassword").value.trim();

      if (!name || !email || !password || !confirmPassword) {
        registerError.textContent = "Please fill in all fields.";
        return;
      }

      if (password !== confirmPassword) {
        registerError.textContent = "Passwords do not match.";
        return;
      }

      const user = { name, email, password };
      localStorage.setItem("user", JSON.stringify(user));

      registerError.textContent = "";
      alert("Registration successful!");
      window.location.href = "login.html";
    });
  }
});
