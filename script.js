const product = {
  id: "datafono-epayco-compacto",
  name: "Datáfono compacto ePayco",
  price: Number(document.querySelector("[data-product-price]")?.dataset.productPrice || 129900),
};

const state = {
  cart: [],
};

const currencyFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

const elements = {
  body: document.body,
  menuToggle: document.querySelector(".menu-toggle"),
  navLinks: document.querySelector(".nav-links"),
  productQuantity: document.querySelector("[data-product-quantity]"),
  productMinus: document.querySelector("[data-product-minus]"),
  productPlus: document.querySelector("[data-product-plus]"),
  addToCart: document.querySelector("[data-add-to-cart]"),
  cartItems: document.querySelector("[data-cart-items]"),
  cartCount: document.querySelector("[data-cart-count]"),
  cartSubtotal: document.querySelector("[data-cart-subtotal]"),
  cartTotal: document.querySelector("[data-cart-total]"),
  checkoutLink: document.querySelector("[data-checkout-link]"),
  checkoutForm: document.querySelector("[data-checkout-form]"),
  checkoutQuantity: document.querySelector("[data-checkout-quantity]"),
  paymentTotal: document.querySelector("[data-payment-total]"),
  formMessage: document.querySelector("[data-form-message]"),
};

function injectRecaudoRefinement() {
  if (!document.querySelector(".stats-strip")) {
    const hero = document.querySelector(".hero");
    const stats = document.createElement("section");
    stats.className = "stats-strip";
    stats.setAttribute("aria-label", "Indicadores de confianza para comercios");
    stats.innerHTML = `
      <div class="stats-strip-inner" data-stagger>
        <article class="stat-item">
          <strong>Tarjetas</strong>
          <span>Debito y credito en el punto de venta</span>
        </article>
        <article class="stat-item">
          <strong>Movilidad</strong>
          <span>Cobra en local, feria o domicilio</span>
        </article>
        <article class="stat-item">
          <strong>Seguro</strong>
          <span>Pagos presenciales protegidos</span>
        </article>
        <article class="stat-item">
          <strong>Control</strong>
          <span>Consulta y gestiona tus ventas</span>
        </article>
      </div>
    `;
    hero?.insertAdjacentElement("afterend", stats);
  }

  if (document.querySelector("#recaudo-refinement-styles")) {
    return;
  }

  const faqTitle = document.querySelector("#faq-title");
  const faqHeading = document.querySelector(".faq .section-heading");
  const faqEyebrow = document.querySelector(".faq .eyebrow");

  if (faqTitle) {
    faqTitle.textContent = "Preguntas frecuentes sobre datáfonos ePayco";
  }

  if (faqHeading && !faqHeading.querySelector("p")) {
    const copy = document.createElement("p");
    copy.textContent = "Resolvemos las dudas más comunes sobre cómo comprar, recibir y empezar a usar tu datáfono.";
    faqHeading.appendChild(copy);
  }

  faqEyebrow?.remove();

  return;

  const style = document.createElement("style");
  style.id = "recaudo-refinement-styles";
  style.textContent = `
    :root{--color-red:#ff1523;--color-red-dark:#cc0f1c;--color-red-soft:#fff0f1;--color-black:#171717;--color-ink:#252525;--color-muted:#606060;--color-border:#e4e4e2;--color-soft:#f7f7f5;--color-soft-strong:#f0f0ee;--shadow-soft:0 22px 54px rgba(23,23,23,.08);--shadow-card:0 12px 28px rgba(23,23,23,.05);}
    body{background:var(--color-soft);}
    .site-header{border-bottom-color:var(--color-border);background:rgba(247,247,245,.94);}
    .brand-logo-link{background:transparent;padding:0;box-shadow:none;}
    .brand-logo{width:118px;}
    .nav-links a{color:var(--color-muted);font-size:.86rem;font-weight:800;}
    .nav-cta,.btn-primary{background:var(--color-red);box-shadow:0 12px 24px rgba(255,21,35,.2);}
    .nav-cta:hover,.btn-primary:hover{background:var(--color-red-dark);}
    .hero{padding-block:58px 64px;}
    .hero::before{height:520px;background:radial-gradient(circle at 78% 18%,rgba(255,225,27,.16),transparent 28%),radial-gradient(circle at 10% 8%,rgba(255,21,35,.07),transparent 24%),linear-gradient(180deg,#fff 0%,var(--color-soft) 82%);}
    .eyebrow{border-color:rgba(255,21,35,.22);border-radius:8px;color:var(--color-red-dark);}
    .hero-visual,.showcase-media{border-color:var(--color-border);background:linear-gradient(180deg,var(--color-black) 0 42px,transparent 42px),radial-gradient(circle at 74% 24%,rgba(255,225,27,.22),transparent 28%),linear-gradient(135deg,rgba(255,21,35,.08),transparent 36%),#fff;}
    .hero-visual::after,.showcase-media::after{content:"";position:absolute;top:16px;left:18px;width:10px;height:10px;border-radius:999px;background:var(--color-red);box-shadow:18px 0 0 #f59e0b,36px 0 0 #22c55e;}
    .stats-strip{width:100%;max-width:none;background:var(--color-black);color:#fff;}
    .stats-strip::after{content:"";display:block;height:4px;background:linear-gradient(90deg,var(--color-red),var(--color-product-yellow));}
    .stats-strip-inner{display:grid;width:min(100% - 32px,var(--max-width));gap:18px;margin-inline:auto;padding-block:28px;}
    .stat-item{display:grid;gap:4px;min-height:76px;align-content:center;border-left:1px solid rgba(255,255,255,.16);padding-left:16px;}
    .stat-item strong{color:#fff;font-size:clamp(1.25rem,3vw,1.85rem);line-height:1;}
    .stat-item span{max-width:220px;color:#c9c9c7;font-size:.9rem;font-weight:700;}
    .benefits,.product-section,.trust,.faq{background:radial-gradient(circle at 86% 8%,rgba(255,225,27,.12),transparent 24%),var(--color-soft);}
    .feature-card,.trust-grid article,.cart-card,.checkout-form,.steps-list li{box-shadow:none;}
    .feature-card,.trust-grid article,.feature-rail article,.order-panel,.checkout-form{border-color:var(--color-border);}
    .feature-card:hover,.trust-grid article:hover,.feature-rail article:hover{transform:translateY(-2px);border-color:rgba(255,21,35,.24);transition:transform 180ms ease,border-color 180ms ease;}
    .purchase-section{background:linear-gradient(180deg,#fff 0%,var(--color-soft) 100%);}
    .faq{background:radial-gradient(circle at 12% 0%,rgba(255,21,35,.07),transparent 26%),var(--color-soft);}
    .faq .section-heading{max-width:780px;}
    .faq-list{counter-reset:faq-counter;max-width:980px;margin-inline:auto;gap:10px;}
    .faq details{counter-increment:faq-counter;border:1px solid var(--color-border);border-radius:8px;background:#fff;box-shadow:none;}
    .faq summary{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:16px;align-items:center;min-height:72px;padding:18px 20px;color:var(--color-black);font-weight:900;}
    .faq summary::before{content:counter(faq-counter,decimal-leading-zero);display:inline-grid;min-width:42px;height:30px;place-items:center;border-radius:6px;background:var(--color-red-soft);color:var(--color-red-dark);font-size:.78rem;font-weight:900;}
    .faq summary::after{content:"+";float:none;display:grid;width:32px;height:32px;place-items:center;border-radius:6px;background:var(--color-black);color:#fff;font-size:1.2rem;line-height:1;}
    .faq details[open]{border-color:rgba(255,21,35,.28);}
    .faq details[open] summary{border-bottom:1px solid var(--color-border);}
    .faq details[open] summary::after{content:"-";background:var(--color-red);}
    .faq p{border-top:0;padding:18px 22px 22px 78px;color:var(--color-muted);font-size:1rem;}
    .faq{width:100%;max-width:none;padding:72px max(24px,calc((100% - var(--max-width))/2)) 18px;background:#f7f7f5;}
    .faq .section-heading{max-width:610px;margin-bottom:56px;gap:18px;}
    .faq .section-heading .eyebrow{display:none;}
    .faq .section-heading h2{max-width:590px;color:#171717;font-size:clamp(2.45rem,5.4vw,4.35rem);line-height:.98;letter-spacing:0;}
    .faq .section-heading p{max-width:560px;color:#606060;font-size:1.04rem;line-height:1.75;}
    .faq-list{display:grid;max-width:100%;margin-inline:0;gap:0;border-top:1px solid #e4e4e2;border-bottom:1px solid #e4e4e2;counter-reset:none;}
    .faq details{border:0;border-bottom:1px solid #e4e4e2;border-radius:0;background:transparent;box-shadow:none;counter-increment:none;overflow:hidden;}
    .faq details:last-child{border-bottom:0;}
    .faq summary{display:grid;grid-template-columns:minmax(0,1fr) 30px;gap:24px;min-height:73px;align-items:center;padding:20px 0;color:#171717;font-size:1rem;font-weight:900;line-height:1.28;list-style:none;}
    .faq summary::before{content:none;display:none;}
    .faq summary::after{content:"+";display:grid;width:28px;height:28px;place-items:center;border:1px solid #e4e4e2;border-radius:999px;background:transparent;color:#606060;font-size:1.12rem;font-weight:900;line-height:1;}
    .faq details[open]{border-color:#e4e4e2;}
    .faq details[open] summary{border-bottom:0;}
    .faq details[open] summary::after{content:"-";background:transparent;color:#ff1523;}
    .faq p{max-width:760px;border-top:0;padding:0 58px 24px 0;color:#606060;font-size:1rem;line-height:1.72;}
    .final-cta{background:radial-gradient(circle at 88% 10%,rgba(255,225,27,.35),transparent 26%),var(--color-red);}
    @media (min-width:700px){.stats-strip-inner{grid-template-columns:repeat(4,minmax(0,1fr));}}
    @media (min-width:820px){.faq{padding-block:90px 18px;}}
    @media (max-width:560px){.faq{padding-inline:18px;padding-top:58px;}.faq .section-heading{margin-bottom:38px;}.faq .section-heading h2{font-size:clamp(2.15rem,12vw,3.1rem);}.faq summary{min-height:68px;padding-block:18px;}.faq p{padding-right:40px;}}
    @media (max-width:560px){.faq summary{grid-template-columns:minmax(0,1fr) 30px;gap:12px;min-height:68px;}.faq summary::before{display:none;}.faq p{padding:0 40px 22px 0;}}
  `;
  document.head.appendChild(style);

  const exactFaqStyle = document.createElement("style");
  exactFaqStyle.id = "faq-reference-exact-styles";
  exactFaqStyle.textContent = `
    body .faq.section-shell,body .faq{width:100%;max-width:none;margin:0;padding:86px max(56px,calc((100vw - var(--max-width))/2)) 18px;background:#f7f7f5}
    body .faq .section-heading{display:block;max-width:620px;margin:0 0 56px}
    body .faq .section-heading .eyebrow{display:none}
    body .faq .section-heading h2{max-width:620px;color:#171717;font-size:clamp(2.6rem,5vw,4.5rem);font-weight:900;line-height:.98;letter-spacing:0}
    body .faq .section-heading p{max-width:560px;margin-top:20px;color:#606060;font-size:1.05rem;line-height:1.8}
    body .faq-list{display:block;max-width:none;margin:0;border-top:1px solid #e4e4e2;border-bottom:1px solid #e4e4e2}
    body .faq details{border:0;border-bottom:1px solid #e4e4e2;border-radius:0;background:transparent;box-shadow:none;overflow:hidden}
    body .faq details:last-child{border-bottom:0}
    body .faq summary{display:flex;min-height:73px;align-items:center;justify-content:space-between;gap:24px;padding:0;color:#171717;font-size:1rem;font-weight:900;line-height:1.3;cursor:pointer;list-style:none}
    body .faq summary::-webkit-details-marker{display:none}
    body .faq summary::before{content:none;display:none}
    body .faq summary::after{content:"+";display:grid;flex:0 0 auto;width:28px;height:28px;place-items:center;border:1px solid #e4e4e2;border-radius:50%;background:transparent;color:#606060;font-size:1.12rem;font-weight:900;line-height:1}
    body .faq details[open] summary{border-bottom:0}
    body .faq details[open] summary::after{content:"-";background:transparent;color:#606060}
    body .faq p{max-width:760px;margin:0;border-top:0;padding:0 58px 24px 0;color:#606060;font-size:1rem;line-height:1.75}
    @media (max-width:720px){body .faq.section-shell,body .faq{padding:62px 24px 14px}body .faq .section-heading{margin-bottom:42px}body .faq .section-heading h2{font-size:clamp(2.25rem,11vw,3.25rem)}}
  `;
  document.head.appendChild(exactFaqStyle);

  const checkoutStyle = document.createElement("style");
  checkoutStyle.id = "checkout-stepper-styles";
  checkoutStyle.textContent = `
    .checkout-form{grid-template-columns:1fr}
    .checkout-steps{position:relative;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:0;grid-column:1/-1;margin:4px 0 8px}
    .checkout-steps::before{content:"";position:absolute;top:18px;right:9%;left:9%;height:2px;background:#e4e4e2}
    .checkout-step{position:relative;z-index:1;display:grid;justify-items:center;gap:8px;border:0;background:transparent;color:#a8afbd;padding:0;font-weight:900}
    .checkout-step span{display:grid;width:36px;height:36px;place-items:center;border-radius:50%;background:#eef0f3;color:#a8afbd;font-size:.9rem;transition:background 180ms ease,color 180ms ease,transform 180ms ease}
    .checkout-step strong{font-size:.85rem}
    .checkout-step.is-active,.checkout-step.is-complete{color:#ff5a00}
    .checkout-step.is-active span,.checkout-step.is-complete span{background:#ff5a00;color:#fff;transform:translateY(-1px)}
    .checkout-step.is-complete span{font-size:0}
    .checkout-step.is-complete span::before{content:"✓";font-size:1rem}
    .checkout-step-panel{display:none;grid-column:1/-1;gap:16px}
    .checkout-step-panel.is-active{display:grid}
    .step-actions{display:grid;grid-column:1/-1;gap:10px}
    .payment-checklist{display:grid;gap:10px;grid-column:1/-1;border:1px solid #e4e4e2;border-radius:8px;background:#fff;padding:16px}
    .payment-checklist span{position:relative;padding-left:24px;color:#606060;font-weight:800}
    .payment-checklist span::before{content:"✓";position:absolute;left:0;color:#0f8b5f;font-weight:900}
    @media (min-width:560px){.checkout-step-panel.is-active{grid-template-columns:repeat(2,minmax(0,1fr))}.checkout-step-panel .form-field-full,.checkout-step-panel .payment-summary,.checkout-step-panel .btn-full,.checkout-step-panel .delivery-note{grid-column:1/-1}.step-actions{grid-template-columns:1fr 1fr}.step-actions .btn:only-child{grid-column:1/-1}}
    @media (max-width:560px){.checkout-steps{grid-template-columns:repeat(2,minmax(0,1fr));row-gap:18px}.checkout-steps::before{display:none}.checkout-step strong{font-size:.78rem}}
  `;
  document.head.appendChild(checkoutStyle);
}

function formatCurrency(value) {
  return currencyFormatter.format(value).replace(/\s?COP/, " COP");
}

function clampQuantity(value) {
  const numericValue = Number.parseInt(value, 10);
  return Number.isFinite(numericValue) && numericValue > 0 ? numericValue : 1;
}

function getCartItem() {
  return state.cart.find((item) => item.id === product.id);
}

function getSelectedQuantity() {
  return clampQuantity(elements.productQuantity.value);
}

function setProductQuantity(quantity) {
  elements.productQuantity.value = clampQuantity(quantity);
}

function getCartTotals() {
  const quantity = getCartItem()?.quantity || 0;
  const subtotal = quantity * product.price;

  return {
    quantity,
    subtotal,
    total: subtotal,
  };
}

function getCheckoutQuantity() {
  const cartQuantity = getCartItem()?.quantity;
  return cartQuantity || clampQuantity(elements.checkoutQuantity.value);
}

function updatePaymentSummary() {
  const quantity = getCheckoutQuantity();
  elements.checkoutQuantity.value = quantity;
  elements.paymentTotal.textContent = formatCurrency(quantity * product.price);
}

function renderCart() {
  const totals = getCartTotals();
  elements.cartItems.innerHTML = "";
  elements.cartCount.textContent = `${totals.quantity} ${totals.quantity === 1 ? "producto" : "productos"}`;
  elements.cartSubtotal.textContent = formatCurrency(totals.subtotal);
  elements.cartTotal.textContent = formatCurrency(totals.total);

  if (!totals.quantity) {
    const emptyCart = document.createElement("p");
    emptyCart.className = "empty-cart";
    emptyCart.textContent = "Tu carrito está vacío. Agrega un datáfono para continuar.";
    elements.cartItems.appendChild(emptyCart);
    updatePaymentSummary();
    return;
  }

  const item = getCartItem();
  const cartItem = document.createElement("article");
  cartItem.className = "cart-item";
  cartItem.innerHTML = `
    <div class="cart-item-info">
      <strong>${item.name}</strong>
      <span>${formatCurrency(item.price)} x ${item.quantity}</span>
    </div>
    <div class="cart-actions">
      <div class="cart-mini-control" aria-label="Cantidad en carrito">
        <button type="button" data-cart-decrease aria-label="Disminuir cantidad">-</button>
        <span>${item.quantity}</span>
        <button type="button" data-cart-increase aria-label="Aumentar cantidad">+</button>
      </div>
      <button class="remove-item" type="button" data-cart-remove>Eliminar</button>
    </div>
  `;

  elements.cartItems.appendChild(cartItem);
  updatePaymentSummary();
}

function addToCart(quantity = 1) {
  const item = getCartItem();

  if (item) {
    item.quantity += clampQuantity(quantity);
  } else {
    state.cart.push({
      ...product,
      quantity: clampQuantity(quantity),
    });
  }

  renderCart();
}

function updateCartQuantity(quantity) {
  const item = getCartItem();

  if (!item) {
    state.cart.push({
      ...product,
      quantity: clampQuantity(quantity),
    });
  } else {
    item.quantity = clampQuantity(quantity);
  }

  renderCart();
}

function removeFromCart() {
  state.cart = state.cart.filter((item) => item.id !== product.id);
  renderCart();
}

function showFormMessage(message, type = "success") {
  elements.formMessage.textContent = message;
  elements.formMessage.classList.remove("is-success", "is-error");
  elements.formMessage.classList.add(type === "error" ? "is-error" : "is-success");
}

function setSubmitLoading(button, isLoading) {
  if (!button) {
    return;
  }

  if (isLoading) {
    button.dataset.originalText = button.textContent;
    button.textContent = "Preparando pago...";
    button.disabled = true;
    return;
  }

  button.textContent = button.dataset.originalText || "Pagar con ePayco";
  button.disabled = false;
}

function setupInlineValidation() {
  const fields = Array.from(elements.checkoutForm.querySelectorAll("input, select, textarea"));

  fields.forEach((field) => {
    field.addEventListener("blur", () => {
      field.classList.toggle("is-valid", field.checkValidity() && Boolean(field.value));
      field.classList.toggle("is-invalid", !field.checkValidity() && Boolean(field.value));
    });

    field.addEventListener("input", () => {
      if (!field.classList.contains("is-invalid")) {
        return;
      }

      field.classList.toggle("is-invalid", !field.checkValidity());
      field.classList.toggle("is-valid", field.checkValidity());
    });
  });
}

function setupCheckoutStepper() {
  buildCheckoutStepperMarkup();

  const stepsContainer = document.querySelector(".checkout-steps");
  const panels = Array.from(document.querySelectorAll("[data-step-panel]"));
  const triggers = Array.from(document.querySelectorAll("[data-step-trigger]"));
  const nextButtons = Array.from(document.querySelectorAll("[data-step-next]"));
  const prevButtons = Array.from(document.querySelectorAll("[data-step-prev]"));

  if (!panels.length || !triggers.length) {
    return;
  }

  let activeStep = 0;

  function setStep(step) {
    activeStep = Math.max(0, Math.min(step, panels.length - 1));
    const progress = panels.length > 1 ? (activeStep / (panels.length - 1)) * 100 : 0;

    stepsContainer?.style.setProperty("--step-progress", `${progress}%`);

    panels.forEach((panel, index) => {
      panel.classList.toggle("is-active", index === activeStep);
      panel.toggleAttribute("hidden", index !== activeStep);
    });

    triggers.forEach((trigger, index) => {
      trigger.classList.toggle("is-active", index === activeStep);
      trigger.classList.toggle("is-complete", index < activeStep);
      trigger.setAttribute("aria-current", index === activeStep ? "step" : "false");
    });

    if (window.gsap && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.gsap.fromTo(
        panels[activeStep],
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.28, ease: "power2.out" }
      );
    }

    updatePaymentSummary();
  }

  function validateStep(step) {
    const fields = Array.from(panels[step].querySelectorAll("input, select, textarea"));
    const invalidField = fields.find((field) => !field.checkValidity());

    if (invalidField) {
      invalidField.classList.add("is-invalid");
      invalidField.reportValidity();
      return false;
    }

    return true;
  }

  nextButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (validateStep(activeStep)) {
        setStep(activeStep + 1);
      }
    });
  });

  prevButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setStep(activeStep - 1);
    });
  });

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const requestedStep = Number.parseInt(trigger.dataset.stepTrigger, 10);

      if (requestedStep <= activeStep) {
        setStep(requestedStep);
        return;
      }

      if (validateStep(activeStep)) {
        setStep(Math.min(requestedStep, activeStep + 1));
      }
    });
  });

  setStep(0);
}

function buildCheckoutStepperMarkup() {
  if (document.querySelector("[data-step-panel]") || !elements.checkoutForm) {
    return;
  }

  const form = elements.checkoutForm;
  const intro = form.querySelector(".form-intro");
  const fields = {
    name: document.querySelector("#customer-name")?.closest(".form-field"),
    email: document.querySelector("#customer-email")?.closest(".form-field"),
    phone: document.querySelector("#customer-phone")?.closest(".form-field"),
    city: document.querySelector("#customer-city")?.closest(".form-field"),
    address: document.querySelector("#customer-address")?.closest(".form-field"),
    business: document.querySelector("#business-type")?.closest(".form-field"),
    quantity: document.querySelector("#checkout-quantity")?.closest(".form-field"),
  };
  const paymentSummary = form.querySelector(".payment-summary");
  const submitButton = form.querySelector("button[type='submit']");
  const formMessage = elements.formMessage;

  const stepper = document.createElement("div");
  stepper.className = "checkout-steps";
  stepper.setAttribute("aria-label", "Progreso de compra");
  stepper.innerHTML = `
    <button class="checkout-step is-active" type="button" data-step-trigger="0"><span>1</span><strong>Contacto</strong></button>
    <button class="checkout-step" type="button" data-step-trigger="1"><span>2</span><strong>Datos</strong></button>
    <button class="checkout-step" type="button" data-step-trigger="2"><span>3</span><strong>Envío</strong></button>
    <button class="checkout-step" type="button" data-step-trigger="3"><span>4</span><strong>Pago</strong></button>
  `;

  const contactPanel = createStepPanel(0, "Datos de contacto");
  appendIfExists(contactPanel, fields.name);
  appendIfExists(contactPanel, fields.email);
  appendIfExists(contactPanel, fields.phone);
  contactPanel.appendChild(createActions({ next: true }));

  const dataPanel = createStepPanel(1, "Datos del negocio");
  appendIfExists(dataPanel, fields.business);
  appendIfExists(dataPanel, fields.quantity);
  appendIfExists(dataPanel, fields.city);
  dataPanel.appendChild(createActions({ prev: true, next: true }));

  const shippingPanel = createStepPanel(2, "Datos de envío");
  appendIfExists(shippingPanel, fields.address);
  shippingPanel.appendChild(createSelectField("delivery-method", "deliveryMethod", "Tipo de envío", [
    "Envío a domicilio",
    "Entrega coordinada con asesor",
    "Recoger en punto autorizado",
  ]));
  shippingPanel.appendChild(createSelectField("delivery-time", "deliveryTime", "Horario preferido", [
    "Mañana",
    "Tarde",
    "Horario flexible",
  ]));
  const deliveryNote = document.createElement("div");
  deliveryNote.className = "delivery-note form-field-full";
  deliveryNote.innerHTML = "<strong>Envío:</strong> confirma disponibilidad y tiempos según tu ciudad.";
  shippingPanel.appendChild(deliveryNote);
  shippingPanel.appendChild(createActions({ prev: true, next: true }));

  const paymentPanel = createStepPanel(3, "Resumen y pago");
  appendIfExists(paymentPanel, paymentSummary);
  const checklist = document.createElement("div");
  checklist.className = "payment-checklist";
  checklist.innerHTML = "<span>Datos de contacto listos</span><span>Información del negocio completa</span><span>Envío preparado</span>";
  paymentPanel.appendChild(checklist);
  const paymentActions = createActions({ prev: true });
  appendIfExists(paymentActions, submitButton);
  paymentPanel.appendChild(paymentActions);

  intro?.insertAdjacentElement("afterend", stepper);
  stepper.insertAdjacentElement("afterend", contactPanel);
  contactPanel.insertAdjacentElement("afterend", dataPanel);
  dataPanel.insertAdjacentElement("afterend", shippingPanel);
  shippingPanel.insertAdjacentElement("afterend", paymentPanel);
  appendIfExists(form, formMessage);
}

function createStepPanel(step, label) {
  const panel = document.createElement("section");
  panel.className = `checkout-step-panel${step === 0 ? " is-active" : ""}`;
  panel.dataset.stepPanel = String(step);
  panel.setAttribute("aria-label", label);
  return panel;
}

function createActions({ prev = false, next = false }) {
  const actions = document.createElement("div");
  actions.className = "step-actions";

  if (prev) {
    const prevButton = document.createElement("button");
    prevButton.className = "btn btn-secondary btn-full";
    prevButton.type = "button";
    prevButton.dataset.stepPrev = "";
    prevButton.textContent = "Volver";
    actions.appendChild(prevButton);
  }

  if (next) {
    const nextButton = document.createElement("button");
    nextButton.className = "btn btn-primary btn-full";
    nextButton.type = "button";
    nextButton.dataset.stepNext = "";
    nextButton.textContent = "Continuar";
    actions.appendChild(nextButton);
  }

  return actions;
}

function createSelectField(id, name, label, options) {
  const field = document.createElement("div");
  field.className = "form-field";
  field.innerHTML = `
    <label for="${id}">${label}</label>
    <select id="${id}" name="${name}" required>
      <option value="">Selecciona una opción</option>
      ${options.map((option) => `<option>${option}</option>`).join("")}
    </select>
  `;
  return field;
}

function appendIfExists(parent, child) {
  if (parent && child) {
    parent.appendChild(child);
  }
}

function animateCartPulse() {
  if (!window.gsap || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  window.gsap.fromTo(
    ".order-panel",
    { scale: 0.985 },
    { scale: 1, duration: 0.35, ease: "power2.out" }
  );
}

function setupGsapAnimations() {
  if (!window.gsap || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const gsap = window.gsap;
  const hasScrollTrigger = Boolean(window.ScrollTrigger);

  if (hasScrollTrigger) {
    gsap.registerPlugin(window.ScrollTrigger);
  }

  gsap.from(".hero-copy > *", {
    autoAlpha: 0,
    y: 28,
    duration: 0.75,
    ease: "power3.out",
    stagger: 0.08,
  });

  gsap.from(".hero-visual", {
    autoAlpha: 0,
    y: 34,
    scale: 0.96,
    duration: 0.9,
    ease: "power3.out",
  });

  gsap.to(".dataphone", {
    y: -12,
    rotate: -3,
    duration: 3,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });

  gsap.to(".showcase-device", {
    y: -16,
    rotate: -2,
    duration: 3.2,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });

  gsap.to(".floating-ticket", {
    y: -10,
    duration: 2.4,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    stagger: 0.25,
  });

  const revealElements = gsap.utils.toArray("[data-animate]");
  const staggerGroups = gsap.utils.toArray("[data-stagger]");

  if (!hasScrollTrigger) {
    gsap.from(revealElements, {
      autoAlpha: 0,
      y: 26,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.06,
    });
    gsap.from("[data-stagger] > *", {
      autoAlpha: 0,
      y: 24,
      duration: 0.65,
      ease: "power3.out",
      stagger: 0.07,
    });
    return;
  }

  revealElements.forEach((element) => {
    gsap.from(element, {
      autoAlpha: 0,
      y: 30,
      duration: 0.78,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 84%",
      },
    });
  });

  staggerGroups.forEach((group) => {
    gsap.from(group.children, {
      autoAlpha: 0,
      y: 24,
      duration: 0.65,
      ease: "power3.out",
      stagger: 0.08,
      scrollTrigger: {
        trigger: group,
        start: "top 84%",
      },
    });
  });

  gsap.from(".faq details", {
    autoAlpha: 0,
    y: 18,
    duration: 0.5,
    ease: "power2.out",
    stagger: 0.05,
    scrollTrigger: {
      trigger: ".faq-list",
      start: "top 82%",
    },
  });
}

function closeMobileMenu() {
  elements.navLinks.classList.remove("is-open");
  elements.body.classList.remove("menu-open");
  elements.menuToggle.setAttribute("aria-expanded", "false");
}

elements.menuToggle.addEventListener("click", () => {
  const isOpen = elements.navLinks.classList.toggle("is-open");
  elements.body.classList.toggle("menu-open", isOpen);
  elements.menuToggle.setAttribute("aria-expanded", String(isOpen));
});

elements.navLinks.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    closeMobileMenu();
  }
});

elements.productMinus.addEventListener("click", () => {
  setProductQuantity(getSelectedQuantity() - 1);
});

elements.productPlus.addEventListener("click", () => {
  setProductQuantity(getSelectedQuantity() + 1);
});

elements.productQuantity.addEventListener("input", () => {
  setProductQuantity(getSelectedQuantity());
});

elements.addToCart.addEventListener("click", () => {
  addToCart(getSelectedQuantity());
  animateCartPulse();
  showFormMessage("Datáfono agregado. Revisa el carrito y completa tus datos para pagar.", "success");
});

elements.cartItems.addEventListener("click", (event) => {
  const item = getCartItem();

  if (!item) {
    return;
  }

  if (event.target.matches("[data-cart-increase]")) {
    updateCartQuantity(item.quantity + 1);
    animateCartPulse();
  }

  if (event.target.matches("[data-cart-decrease]")) {
    item.quantity > 1 ? updateCartQuantity(item.quantity - 1) : removeFromCart();
    animateCartPulse();
  }

  if (event.target.matches("[data-cart-remove]")) {
    removeFromCart();
    animateCartPulse();
  }
});

elements.checkoutLink.addEventListener("click", (event) => {
  if (!getCartItem()) {
    event.preventDefault();
    document.querySelector("#checkout").scrollIntoView({ behavior: "smooth", block: "start" });
    showFormMessage("Agrega al menos un datáfono al carrito para finalizar la compra.", "error");
  }
});

elements.checkoutQuantity.addEventListener("input", () => {
  updateCartQuantity(elements.checkoutQuantity.value);
});

elements.checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!getCartItem()) {
    showFormMessage("Agrega al menos un datafono al carrito para finalizar la compra.", "error");
    document.querySelector(".order-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  if (!elements.checkoutForm.checkValidity()) {
    elements.checkoutForm.reportValidity();
    showFormMessage("Revisa los campos pendientes antes de continuar con el pago.", "error");
    return;
  }

  const submitButton = elements.checkoutForm.querySelector("button[type='submit']");
  const quantity = getCheckoutQuantity();
  const total = quantity * product.price;
  const formData = new FormData(elements.checkoutForm);
  setSubmitLoading(submitButton, true);

  const order = {
    reference: `EPAYCO-DAT-${Date.now()}`,
    amount: total,
    currency: "COP",
    description: `${quantity} datáfono(s) ePayco`,
    buyer: {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      city: formData.get("city"),
      address: formData.get("address"),
      businessType: formData.get("businessType"),
      deliveryMethod: formData.get("deliveryMethod"),
      deliveryTime: formData.get("deliveryTime"),
    },
  };

  /*
    Integración futura con ePayco Checkout:
    - Carga el script oficial de ePayco en index.html.
    - Crea el handler con tu llave pública.
    - Usa order.reference, order.amount, order.currency, order.description y order.buyer.
    - Agrega las URL de respuesta y confirmación que validará tu backend.
    - Reemplaza este mensaje por handler.open(data) o el método vigente de ePayco Checkout.
  */
  console.info("Orden lista para ePayco Checkout", order);
  window.setTimeout(() => {
    setSubmitLoading(submitButton, false);
    showFormMessage(`Checkout preparado por ${formatCurrency(total)}. Conecta el script de ePayco para procesar el pago real.`);
  }, 650);
});

injectRecaudoRefinement();
setupCheckoutStepper();
setupInlineValidation();
renderCart();
window.addEventListener("load", setupGsapAnimations);
