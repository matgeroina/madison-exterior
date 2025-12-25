async function includePartials() {
  const blocks = document.querySelectorAll("[data-include]");

  await Promise.all(
    Array.from(blocks).map(async (el) => {
      const file = el.getAttribute("data-include");
      const res = await fetch(file);
      el.outerHTML = await res.text();
    })
  );

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const map = {
    "index.html": "index",
    "about.html": "about",
    "services.html": "services",
    "gallery.html": "gallery",
    "testimonials.html": "testimonials",
    "locations.html": "locations",
    "contact.html": "contact",
  };

  const key = map[path];
  if (key) {
    const link = document.querySelector(`.nav-link[data-nav="${key}"]`);
    if (link) link.classList.add("active");
  }
}

includePartials().catch(console.error);
(() => {
  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach((formEl) => {
    formEl.addEventListener("submit", (event) => {
      if (!formEl.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
      }

      formEl.classList.add("was-validated");
    });
  });
})();
const contactForm = document.getElementById("contactForm");
const successMsg = document.getElementById("successMsg");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();
    contactForm.classList.add("was-validated");

    if (contactForm.checkValidity()) {
      if (successMsg) successMsg.classList.remove("d-none");
      contactForm.reset();
      contactForm.classList.remove("was-validated");
    }
  });
}
const lightboxModal = document.getElementById("lightboxModal");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxCaption = document.getElementById("lightboxCaption");

if (lightboxModal) {
  lightboxModal.addEventListener("show.bs.modal", (event) => {
    const btn = event.relatedTarget;
    if (!btn) return;

    const img = btn.getAttribute("data-img");
    const title = btn.getAttribute("data-title") || "Project photo";

    if (lightboxImg) {
      lightboxImg.src = img || "";
      lightboxImg.alt = title;
    }
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxCaption) lightboxCaption.textContent = title;
  });
}
