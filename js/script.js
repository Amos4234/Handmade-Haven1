// === Mobile Navigation ===
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('toggle');
});

navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('toggle');
    });
});

// === Hero Slideshow ===
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

if (slides.length > 0) {
    showSlide(currentSlide);
    setInterval(nextSlide, 6000); // 6 seconds
}

// === Product Data ===
const products = [
    {
        id: 1,
        name: "Bead Necklace",
        description: "Colorful handmade bead necklace from local artisans",
        price: 850,
        image: "images/bead-necklace.jpg",
        category: "jewelry"
    },
    {
        id: 2,
        name: "Woven Basket",
        description: "Strong and stylish basket made with sisal and leather",
        price: 1200,
        image: "images/woven-basket.jpg",
        category: "home"
    },
    {
        id: 3,
        name: "Clay Pot",
        description: "Traditional clay pot perfect for cooking or decoration",
        price: 950,
        image: "images/clay-pot.jpg",
        category: "pottery"
    },
    {
        id: 4,
        name: "Hand Beads",
        description: "Handcrafted colorful beads bracelet set",
        price: 400,
        image: "images/hand-beads.jpg",
        category: "jewelry"
    },
    {
        id: 5,
        name: "Decorated Gourds",
        description: "Uniquely painted calabashes with African designs",
        price: 1350,
        image: "images/gourds.jpg",
        category: "decor"
    },
    {
        id: 6,
        name: "Painted Mug",
        description: "Custom hand-painted ceramic coffee mug",
        price: 650,
        image: "images/painted-mug.jpg",
        category: "kitchen"
    },
    {
        id: 7,
        name: "Wooden Spoon Set",
        description: "Smooth polished wood spoons, perfect for cooking",
        price: 550,
        image: "images/wooden-spoon.jpg",
        category: "kitchen"
    },
    {
        id: 8,
        name: "Woven Scarf",
        description: "Soft woolen scarf, handwoven with care",
        price: 1150,
        image: "images/woven-scarf.jpg",
        category: "textiles"
    },
    {
        id: 9,
        name: "Leather Bag",
        description: "Durable hand-stitched bag made from genuine leather",
        price: 3200,
        image: "images/leather-bag.jpg",
        category: "fashion"
    }
];

// === Inject Featured Products ===
const productsGrid = document.querySelector('.products-grid');
if (productsGrid) {
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-id', product.id);
        card.innerHTML = `
            <div class="product-img">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">
                    <i class="fas fa-coins"></i> Ksh ${product.price.toLocaleString()}
                </div>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

// === Add to Cart Functionality ===
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(item => item.name === product.name);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// === Attach Event to Add-to-Cart Buttons ===
document.addEventListener('click', e => {
    if (e.target.classList.contains('add-to-cart')) {
        const id = parseInt(e.target.getAttribute('data-id'));
        const product = products.find(p => p.id === id);
        if (product) addToCart(product);
    }
});

// === Horizontal Scroll Logic ===
const slider = document.querySelector('.products-slider');
const leftArrow = document.querySelector('.slider-arrow.left');
const rightArrow = document.querySelector('.slider-arrow.right');

if (slider && leftArrow && rightArrow) {
    leftArrow.addEventListener('click', () => {
        slider.scrollBy({ left: -300, behavior: 'smooth' });
    });

    rightArrow.addEventListener('click', () => {
        slider.scrollBy({ left: 300, behavior: 'smooth' });
    });
}

// === Cart Count in Navbar ===
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('#cart-count');
    cartCountElements.forEach(el => {
        el.textContent = count;
    });
}

updateCartCount();
