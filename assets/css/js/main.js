document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");

  // If this page has no toggle button, skip safely.
  if (!toggle) return;

  const saved = localStorage.getItem("portfolio-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = saved || (prefersDark ? "dark" : "light");

  applyTheme(initialTheme);

  toggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("portfolio-theme", next);
  });

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    toggle.textContent = theme === "dark" ? "☀️" : "🌙";
    toggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    toggle.setAttribute("title", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  }

  // Existing skill-bar animation logic (safe guard if section exists)
  const skillBars = document.querySelectorAll(".skill-bar");
  if (skillBars.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const bar = entry.target;
          const percent = bar.dataset.skill || "0";
          const label = bar.querySelector("span");
          if (label) label.textContent = `${percent}%`;
          bar.classList.add("is-visible");
          bar.style.setProperty("--target-width", `${percent}%`);
        });
      },
      { threshold: 0.5 }
    );

    skillBars.forEach((bar) => observer.observe(bar));
  }
});