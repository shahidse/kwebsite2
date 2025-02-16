document.addEventListener("DOMContentLoaded", () => {
  console.log('loaded js')
  const languageToggle = document.getElementById("language-toggle");
  const languageDropdown = document.getElementById("language-dropdown");
  const languageLinks = document.querySelectorAll(".lang-option");
  const selectedFlag = document.getElementById("selected-flag");

  // Show/hide language dropdown
  languageToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    languageDropdown.classList.toggle("hidden");
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (event) => {
    if (!languageToggle.contains(event.target) && !languageDropdown.contains(event.target)) {
      languageDropdown.classList.add("hidden");
    }
  });

  // Handle language selection
  languageLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const selectedLang = link.getAttribute("data-lang");
      const flagSrc = link.getAttribute("data-flag");

      selectedFlag.src = flagSrc; // Update flag icon
      localStorage.setItem("selectedLang", selectedLang); // Store language preference

      changeLanguage(selectedLang);
      languageDropdown.classList.add("hidden");
    });
  });

  // Function to change language
  function changeLanguage(lang) {
    if (!translations[lang]) return;

    document.querySelectorAll("[data-lang]").forEach((element) => {
      const key = element.getAttribute("data-lang");
      if (translations[lang][key]) {
        element.textContent = translations[lang][key];
      }
    });
  }

  // Load saved language from localStorage
  const savedLang = localStorage.getItem("selectedLang") || "en";
  changeLanguage(savedLang);
});
