const form = document.getElementById("leadForm");
const feedback = document.getElementById("formFeedback");
const yearEl = document.getElementById("year");
const supportTabs = Array.from(document.querySelectorAll("[data-support-tab]"));
const supportPanels = Array.from(document.querySelectorAll(".support-panel"));
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.getElementById("mobileMenu");

function closeMobileMenu() {
  if (!menuToggle || !mobileMenu) return;
  menuToggle.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Menu openen");
  mobileMenu.classList.remove("is-open");
  mobileMenu.hidden = true;
}

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.classList.toggle("is-open");
    mobileMenu.classList.toggle("is-open", isOpen);
    mobileMenu.hidden = !isOpen;
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Menu sluiten" : "Menu openen");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });
}

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

if (form && feedback) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) {
      feedback.textContent = "Vul alle verplichte velden in, dan nemen wij snel contact op.";
      return;
    }

    feedback.textContent = "Bedankt! Uw bericht is ontvangen. Wij nemen zo snel mogelijk contact met u op.";
    form.reset();
  });
}

const serviceAccordionItems = Array.from(document.querySelectorAll(".service-accordion-item"));

function setAccordionItemState(item, isOpen) {
  const trigger = item.querySelector(".service-accordion-trigger");
  const panel = item.querySelector(".service-accordion-panel");
  if (!trigger || !panel) return;

  item.classList.toggle("is-open", isOpen);
  trigger.setAttribute("aria-expanded", String(isOpen));
  panel.hidden = !isOpen;
}

if (serviceAccordionItems.length) {
  const desktopAccordion = window.matchMedia("(min-width: 961px)");

  function syncDefaultAccordion() {
    if (desktopAccordion.matches && !serviceAccordionItems.some((item) => item.classList.contains("is-open"))) {
      setAccordionItemState(serviceAccordionItems[0], true);
    }
  }

  serviceAccordionItems.forEach((item) => {
    const trigger = item.querySelector(".service-accordion-trigger");
    if (!trigger) return;

    trigger.addEventListener("click", () => {
      const willOpen = !item.classList.contains("is-open");

      serviceAccordionItems.forEach((other) => {
        setAccordionItemState(other, other === item && willOpen);
      });
    });
  });

  syncDefaultAccordion();
  desktopAccordion.addEventListener("change", syncDefaultAccordion);
}

if (supportTabs.length && supportPanels.length) {
  supportTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.getAttribute("data-support-tab");
      if (!targetId) return;

      supportTabs.forEach((item) => {
        item.classList.remove("is-active");
        item.setAttribute("aria-selected", "false");
      });

      supportPanels.forEach((panel) => {
        const isTarget = panel.id === targetId;
        panel.classList.toggle("is-active", isTarget);
        panel.hidden = !isTarget;
      });

      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
    });
  });
}
