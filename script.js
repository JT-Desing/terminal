const product = {
  id: "datafono-epayco-compacto",
  name: "Datafono compacto ePayco",
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
    .final-cta{background:radial-gradient(circle at 88% 10%,rgba(255,225,27,.35),transparent 26%),var(--color-red);}
    @media (min-width:700px){.stats-strip-inner{grid-template-columns:repeat(4,minmax(0,1fr));}}
    @media (max-width:560px){.faq summary{grid-template-columns:minmax(0,1fr) auto;gap:12px;min-height:64px;}.faq summary::before{display:none;}.faq p{padding:16px 18px 20px;}}
  `;
  document.head.appendChild(style);
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
    emptyCart.textContent = "Tu carrito esta vacio. Agrega un datafono para continuar.";
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
  showFormMessage("Datafono agregado. Revisa el carrito y completa tus datos para pagar.", "success");
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
    showFormMessage("Agrega al menos un datafono al carrito para finalizar la compra.", "error");
  }
});

elements.checkoutQuantity.addEventListener("input", () => {
  updateCartQuantity(elements.checkoutQuantity.value);
});

elements.checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const quantity = getCheckoutQuantity();
  const total = quantity * product.price;
  const formData = new FormData(elements.checkoutForm);

  const order = {
    reference: `EPAYCO-DAT-${Date.now()}`,
    amount: total,
    currency: "COP",
    description: `${quantity} datafono(s) ePayco`,
    buyer: {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      city: formData.get("city"),
      address: formData.get("address"),
      businessType: formData.get("businessType"),
    },
  };

  console.info("Orden lista para ePayco Checkout", order);
  showFormMessage(`Checkout preparado por ${formatCurrency(total)}. Conecta el script de ePayco para procesar el pago real.`);
});

injectRecaudoRefinement();
renderCart();
window.addEventListener("load", setupGsapAnimations);
