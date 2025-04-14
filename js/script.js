document.addEventListener("DOMContentLoaded", () => {
    // SIGN UP
    const signupForm = document.getElementById("signupForm");
  
    if (signupForm) {
      signupForm.addEventListener("submit", function (e) {
        e.preventDefault();
  
        const name = document.getElementById("signupName").value.trim();
        const email = document.getElementById("signupEmail").value.trim();
        const password = document.getElementById("signupPassword").value;
        const confirm = document.getElementById("signupConfirm").value;
        const error = document.getElementById("signupError");
  
        error.textContent = "";
  
        if (!name || !email || !password || !confirm) {
          error.textContent = "Please fill in all fields.";
          return;
        }
  
        if (password.length < 6) {
          error.textContent = "Password must be at least 6 characters.";
          return;
        }
  
        if (password !== confirm) {
          error.textContent = "Passwords do not match.";
          return;
        }
  
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", password);
  
        alert("Sign Up successful! You can now sign in.");
        window.location.href = "signin.html";
      });
    }
  
    // SIGN IN
    const signinForm = document.getElementById("signinForm");
  
    if (signinForm) {
      signinForm.addEventListener("submit", function (e) {
        e.preventDefault();
  
        const email = document.getElementById("signinEmail").value.trim();
        const password = document.getElementById("signinPassword").value;
        const error = document.getElementById("signinError");
  
        const storedEmail = localStorage.getItem("userEmail");
        const storedPassword = localStorage.getItem("userPassword");
  
        if (!email || !password) {
          error.textContent = "Please enter both email and password.";
          return;
        }
  
        if (email === storedEmail && password === storedPassword) {
          alert("Sign In successful!");
          window.location.href = "playlist.html";
        } else {
          error.textContent = "Invalid email or password.";
        }
      });
    }
  
    // SEARCH
    const searchInput = document.getElementById("searchInput");
    const songCards = document.querySelectorAll(".song-card");
  
    if (searchInput) {
      searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        songCards.forEach(card => {
          const title = card.querySelector("p").textContent.toLowerCase();
          card.style.display = title.includes(searchTerm) ? "flex" : "none";
        });
      });
    }
  
    // ONE AUDIO AT A TIME + VISUAL INDICATOR
    const allAudios = document.querySelectorAll("audio");
  
    allAudios.forEach((audio) => {
      audio.addEventListener("play", () => {
        allAudios.forEach((other) => {
          if (other !== audio) {
            other.pause();
            other.closest(".song-card")?.classList.remove("playing");
          }
        });
        audio.closest(".song-card")?.classList.add("playing");
      });
  
      audio.addEventListener("pause", () => {
        audio.closest(".song-card")?.classList.remove("playing");
      });
    });
  });
  