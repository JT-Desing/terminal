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

  const quantity = getCheckoutQuantity();
  const total = quantity * product.price;
  const formData = new FormData(elements.checkoutForm);

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
  showFormMessage(`Checkout preparado por ${formatCurrency(total)}. Conecta el script de ePayco para procesar el pago real.`);
});

renderCart();
window.addEventListener("load", setupGsapAnimations);
