const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const year = document.querySelector("[data-year]");

const updateHeader = () => {
  const forceSolid = header?.hasAttribute("data-solid-header");
  header?.classList.toggle("is-scrolled", Boolean(forceSolid) || window.scrollY > 12);
};

navToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("is-open");
  header?.classList.toggle("is-open", Boolean(isOpen));
  navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("is-open");
    header?.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

if (year) {
  year.textContent = String(new Date().getFullYear());
}

const supportForm = document.querySelector("[data-support-form]");

supportForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!supportForm.checkValidity()) {
    supportForm.reportValidity();
    return;
  }

  const formData = new FormData(supportForm);
  const name = formData.get("name");
  const email = formData.get("email");
  const topic = formData.get("topic");
  const message = formData.get("message");
  const subject = encodeURIComponent(`GranFeick support: ${topic}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\nMessage:\n${message}`
  );

  window.location.href = `mailto:support@granfeick.com?subject=${subject}&body=${body}`;
});
