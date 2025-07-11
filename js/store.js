document.addEventListener('DOMContentLoaded', () => {
    const storeProductsContainer = document.getElementById('store-products');
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');

    // === Cart Functions ===
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const exists = cart.find(item => item.name === product.name);
        if (exists) {
            exists.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
    }

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountElements = document.querySelectorAll('#cart-count');
        cartCountElements.forEach(el => {
            el.textContent = count;
        });
    }

    function renderProducts(productList) {
        storeProductsContainer.innerHTML = '';
        productList.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-img">
                    <img src="${product.image}" alt="${product.name}" />
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="product-price">
                        <i class="fas fa-coins"></i> Ksh ${product.price.toLocaleString()}
                    </div>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
            `;
            storeProductsContainer.appendChild(card);

            // Attach add-to-cart logic
            card.querySelector('.add-to-cart').addEventListener('click', () => {
                addToCart(product);
            });
        });
    }

    // === Search Functionality ===
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );
        renderProducts(filtered);
    });

    // === Sort Functionality ===
    sortSelect.addEventListener('change', () => {
        let sorted = [...products];
        const value = sortSelect.value;

        if (value === 'price-low-high') {
            sorted.sort((a, b) => a.price - b.price);
        } else if (value === 'price-high-low') {
            sorted.sort((a, b) => b.price - a.price);
        }

        renderProducts(sorted);
    });

    // === Initial Load ===
    renderProducts(products);
    updateCartCount();
});
