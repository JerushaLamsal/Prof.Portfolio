document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const storageKey = "portfolio-theme";

  function applyTheme(theme, persist = true) {
    root.setAttribute("data-theme", theme);

    if (themeToggle) {
      const isDark = theme === "dark";
      themeToggle.textContent = isDark ? "☀️" : "🌙";
      themeToggle.setAttribute("aria-pressed", isDark ? "true" : "false");
      themeToggle.setAttribute("title", isDark ? "Switch to light mode" : "Switch to dark mode");
    }

    if (persist) localStorage.setItem(storageKey, theme);
  }

  const savedTheme = localStorage.getItem(storageKey);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(savedTheme || (prefersDark ? "dark" : "light"), false);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next, true);
    });
  }

  const skillBars = document.querySelectorAll(".skill-bar");
  if (skillBars.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const bar = entry.target;
        const percent = bar.dataset.skill || "0";
        bar.style.setProperty("--target-width", percent + "%");
        bar.classList.add("is-visible");
        const label = bar.querySelector("span");
        if (label) label.textContent = percent + "%";
      });
    }, { threshold: 0.45 });

    skillBars.forEach((bar) => observer.observe(bar));
  }
});