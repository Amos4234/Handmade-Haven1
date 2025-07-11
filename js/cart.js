document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const subtotalEl = document.getElementById("subtotal");
  const totalEl = document.getElementById("total");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const clearCartBtn = document.getElementById("clearCartBtn");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function formatCurrency(value) {
    return `Ksh ${value.toLocaleString()}`;
  }

  function updateTotals() {
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    subtotalEl.textContent = formatCurrency(subtotal);
    totalEl.textContent = formatCurrency(subtotal);
  }

  function renderCart() {
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `<p style="text-align:center; padding: 40px;">Your cart is empty.</p>`;
      subtotalEl.textContent = "Ksh 0";
      totalEl.textContent = "Ksh 0";
      return;
    }

    cart.forEach((item, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "cart-item";

      itemDiv.innerHTML = `
        <div class="cart-item-left">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
          <div class="cart-item-info">
            <h3><i class="fas fa-tag" style="color: var(--primary-color);"></i> ${item.name}</h3>
            <p class="cart-item-price"><i class="fas fa-coins" style="color: var(--primary-color);"></i> ${formatCurrency(item.price)}</p>
          </div>
        </div>
        <div class="cart-controls">
          <button class="quantity-btn decrease" data-index="${index}"><i class="fas fa-minus"></i></button>
          <span class="quantity-display">${item.quantity}</span>
          <button class="quantity-btn increase" data-index="${index}"><i class="fas fa-plus"></i></button>
          <button class="remove-btn" data-index="${index}" title="Remove item"><i class="fas fa-trash-alt"></i></button>
        </div>
      `;

      cartItemsContainer.appendChild(itemDiv);
    });

    updateTotals();
    bindCartButtons();
  }

  function bindCartButtons() {
    document.querySelectorAll(".increase").forEach(btn =>
      btn.addEventListener("click", e => {
        const index = e.currentTarget.dataset.index;
        cart[index].quantity++;
        saveCart();
        renderCart();
      })
    );

    document.querySelectorAll(".decrease").forEach(btn =>
      btn.addEventListener("click", e => {
        const index = e.currentTarget.dataset.index;
        if (cart[index].quantity > 1) {
          cart[index].quantity--;
        } else {
          cart.splice(index, 1);
        }
        saveCart();
        renderCart();
      })
    );

    document.querySelectorAll(".remove-btn").forEach(btn =>
      btn.addEventListener("click", e => {
        const index = e.currentTarget.dataset.index;
        cart.splice(index, 1);
        saveCart();
        renderCart();
      })
    );
  }

  clearCartBtn.addEventListener("click", () => {
    if (confirm("Clear all items from your cart?")) {
      cart = [];
      saveCart();
      renderCart();
    }
  });

  // === Simulated Checkout ===
  const checkoutModal = document.getElementById("checkoutModal");
  const confirmCheckout = document.getElementById("confirmCheckout");
  const checkoutStatus = document.getElementById("checkoutStatus");
  const checkoutName = document.getElementById("checkoutName");
  const checkoutEmail = document.getElementById("checkoutEmail");
  const checkoutAddress = document.getElementById("checkoutAddress");

  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    checkoutModal.style.display = "flex";
    checkoutStatus.textContent = "";
    checkoutName.value = "";
    checkoutEmail.value = "";
    checkoutAddress.value = "";
  });

  confirmCheckout.addEventListener("click", () => {
    const name = checkoutName.value.trim();
    const email = checkoutEmail.value.trim();
    const address = checkoutAddress.value.trim();

    if (!name || !email || !address) {
      checkoutStatus.textContent = "Please fill in all fields.";
      checkoutStatus.className = "status-text error";
      return;
    }

    checkoutStatus.textContent = "Processing order...";
    checkoutStatus.className = "status-text";

    setTimeout(() => {
      const orderId = "ORD" + Math.floor(100000 + Math.random() * 900000);
      checkoutStatus.textContent = `✅ Order Placed Successfully!\nOrder ID: ${orderId}`;
      checkoutStatus.className = "status-text success";

      cart = [];
      saveCart();
      renderCart();
    }, 3000);
  });

  // === M-Pesa Simulated Payment ===
  const mpesaBtn = document.getElementById("mpesaPayBtn");
  const mpesaModal = document.getElementById("mpesaModal");
  const confirmMpesa = document.getElementById("confirmMpesa");
  const mpesaPhone = document.getElementById("mpesaPhone");
  const mpesaStatus = document.getElementById("mpesaStatus");

  if (mpesaBtn) {
    mpesaBtn.addEventListener("click", () => {
      mpesaModal.style.display = "flex";
      mpesaStatus.textContent = "";
      mpesaPhone.value = "";
    });

    confirmMpesa.addEventListener("click", () => {
      const phone = mpesaPhone.value.trim();

      if (!/^07\d{8}$/.test(phone)) {
        mpesaStatus.textContent = "Invalid phone number.";
        mpesaStatus.className = "status-text error";
        return;
      }

      mpesaStatus.textContent = "Processing payment...";
      mpesaStatus.className = "status-text";

      setTimeout(() => {
        const fakeCode = "MP" + Math.floor(100000 + Math.random() * 900000);
        mpesaStatus.textContent = `✅ Payment Successful\nTransaction Code: ${fakeCode}`;
        mpesaStatus.className = "status-text success";

        cart = [];
        saveCart();
        renderCart();
      }, 3000);
    });

    window.addEventListener("click", e => {
      if (e.target === mpesaModal) {
        mpesaModal.style.display = "none";
      }
      if (e.target === checkoutModal) {
        checkoutModal.style.display = "none";
      }
    });
  }

  renderCart();
});
