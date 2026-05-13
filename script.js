const currency = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

const state = {
  unitPrice: 46410,
  quantity: 1,
  cartQuantity: 0,
  currentStep: 1,
};

const productQuantity = document.querySelector("#product-quantity");
const checkoutQuantity = document.querySelector("#checkout-quantity");
const addToCartButton = document.querySelector("#add-to-cart");
const cartItems = document.querySelector("#cart-items");
const cartCount = document.querySelector("#cart-count");
const cartSubtotal = document.querySelector("#cart-subtotal");
const cartTotal = document.querySelector("#cart-total");
const paymentTotal = document.querySelector("#payment-total");
const checkoutForm = document.querySelector("#checkout-form");
const formMessage = document.querySelector("#form-message");
const nextStepButton = document.querySelector("#next-step");
const prevStepButton = document.querySelector("#prev-step");
const payButton = document.querySelector("#pay-button");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#main-menu");

function formatMoney(value) {
  return currency.format(value).replace("COP", "").trim();
}

function clampQuantity(value) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

function syncQuantity(value) {
  state.quantity = clampQuantity(value);
  productQuantity.value = state.quantity;
  checkoutQuantity.value = state.cartQuantity || state.quantity;
}

function updateCart() {
  const subtotal = state.cartQuantity * state.unitPrice;
  cartCount.textContent = `${state.cartQuantity} producto${state.cartQuantity === 1 ? "" : "s"}`;
  cartSubtotal.textContent = formatMoney(subtotal);
  cartTotal.textContent = formatMoney(subtotal);
  paymentTotal.textContent = formatMoney(subtotal);
  checkoutQuantity.value = state.cartQuantity || state.quantity;

  if (state.cartQuantity === 0) {
    cartItems.innerHTML = '<p class="cart-empty">Tu carrito está vacío.</p>';
    return;
  }

  cartItems.innerHTML = `
    <div class="cart-item">
      <div>
        <strong>Terminal ePayco</strong>
        <span>${formatMoney(state.unitPrice)} x ${state.cartQuantity}</span>
      </div>
      <div class="cart-controls" aria-label="Controles del carrito">
        <button type="button" data-cart-action="minus" aria-label="Quitar una unidad">-</button>
        <strong>${state.cartQuantity}</strong>
        <button type="button" data-cart-action="plus" aria-label="Agregar una unidad">+</button>
        <button type="button" data-cart-action="remove" aria-label="Eliminar producto">×</button>
      </div>
    </div>
  `;
}

function setStep(step) {
  state.currentStep = Math.min(4, Math.max(1, step));

  document.querySelectorAll("[data-step-panel]").forEach((panel) => {
    panel.classList.toggle("is-active", Number(panel.dataset.stepPanel) === state.currentStep);
  });

  document.querySelectorAll("[data-step-target]").forEach((button) => {
    const buttonStep = Number(button.dataset.stepTarget);
    button.classList.toggle("is-active", buttonStep === state.currentStep);
    button.classList.toggle("is-complete", buttonStep < state.currentStep);
  });

  checkoutForm.dataset.firstStep = String(state.currentStep === 1);
  checkoutForm.dataset.finalStep = String(state.currentStep === 4);
}

function fieldsForCurrentStep() {
  const panel = document.querySelector(`[data-step-panel="${state.currentStep}"]`);
  return [...panel.querySelectorAll("input, select")];
}

function validateCurrentStep() {
  const fields = fieldsForCurrentStep();
  const invalid = fields.find((field) => !field.checkValidity());

  if (invalid) {
    invalid.reportValidity();
    return false;
  }

  return true;
}

function showMessage(message, isSuccess = false) {
  formMessage.textContent = message;
  formMessage.classList.toggle("success", isSuccess);
}

function preparePaymentPayload() {
  const data = new FormData(checkoutForm);
  return {
    reference: `TERMINAL-${Date.now()}`,
    amount: state.cartQuantity * state.unitPrice,
    currency: "COP",
    quantity: state.cartQuantity,
    buyer: {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      city: data.get("city"),
      address: data.get("address"),
      businessType: data.get("businessType"),
    },
  };
}

document.querySelectorAll("[data-qty-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const delta = button.dataset.qtyAction === "increase" ? 1 : -1;
    syncQuantity(state.quantity + delta);
  });
});

productQuantity.addEventListener("input", () => syncQuantity(productQuantity.value));

checkoutQuantity.addEventListener("input", () => {
  state.cartQuantity = clampQuantity(checkoutQuantity.value);
  updateCart();
});

addToCartButton.addEventListener("click", () => {
  state.cartQuantity += state.quantity;
  updateCart();
  showMessage("Producto agregado. Continúa con tus datos para finalizar.", true);
});

cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("[data-cart-action]");
  if (!button) return;

  if (button.dataset.cartAction === "plus") state.cartQuantity += 1;
  if (button.dataset.cartAction === "minus") state.cartQuantity = Math.max(0, state.cartQuantity - 1);
  if (button.dataset.cartAction === "remove") state.cartQuantity = 0;

  updateCart();
});

document.querySelectorAll("[data-step-target]").forEach((button) => {
  button.addEventListener("click", () => {
    const targetStep = Number(button.dataset.stepTarget);
    if (targetStep <= state.currentStep || validateCurrentStep()) {
      setStep(targetStep);
      showMessage("");
    }
  });
});

nextStepButton.addEventListener("click", () => {
  if (!validateCurrentStep()) return;
  setStep(state.currentStep + 1);
  showMessage("");
});

prevStepButton.addEventListener("click", () => {
  setStep(state.currentStep - 1);
  showMessage("");
});

checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (state.cartQuantity < 1) {
    showMessage("Agrega al menos un datáfono al carrito para finalizar la compra.");
    return;
  }

  if (!checkoutForm.checkValidity()) {
    checkoutForm.reportValidity();
    return;
  }

  const payload = preparePaymentPayload();
  console.info("Payload listo para ePayco Checkout:", payload);

  showMessage("Datos listos. Conecta aquí el script oficial de ePayco Checkout para abrir la pasarela.", true);

  /*
    Ejemplo de integración futura:
    const handler = ePayco.checkout.configure({
      key: "TU_LLAVE_PUBLICA",
      test: false
    });

    handler.open({
      name: "Terminal ePayco",
      description: `${payload.quantity} datáfono(s) Terminal ePayco`,
      invoice: payload.reference,
      currency: payload.currency,
      amount: payload.amount,
      tax_base: "0",
      tax: "0",
      country: "CO",
      lang: "es",
      external: "false",
      response: "https://tu-dominio.com/respuesta",
      confirmation: "https://tu-dominio.com/confirmacion",
      name_billing: payload.buyer.name,
      email_billing: payload.buyer.email,
      mobilephone_billing: payload.buyer.phone,
      address_billing: payload.buyer.address
    });
  */
});

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

function initAnimations() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion || !window.gsap) return;

  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".site-header", {
    y: -24,
    opacity: 0,
    duration: 0.45,
    ease: "power2.out",
  });

  gsap.utils.toArray("[data-reveal]").forEach((element, index) => {
    gsap.fromTo(
      element,
      { y: 34, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.58,
        delay: Math.min(index % 4, 3) * 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 86%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  gsap.utils.toArray(".hero-product img, .measure-front, .faq-visual img").forEach((element) => {
    gsap.to(element, {
      yPercent: -5,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.35,
      },
    });
  });
}

syncQuantity(1);
updateCart();
setStep(1);
window.addEventListener("load", initAnimations);
