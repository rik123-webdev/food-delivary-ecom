document.addEventListener('DOMContentLoaded', function() {
    // Sample menu data
    const menuItems = [{
            id: 1,
            name: "Margherita Pizza",
            description: "Classic pizza with tomato sauce, mozzarella, and basil",
            price: 12.99,
            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 2,
            name: "Pepperoni Pizza",
            description: "Classic pizza with tomato sauce, mozzarella, and pepperoni",
            price: 14.99,
            image: "https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 3,
            name: "Chicken Burger",
            description: "Juicy chicken patty with lettuce, tomato, and special sauce",
            price: 9.99,
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 4,
            name: "Beef Burger",
            description: "Classic beef burger with cheese, lettuce, and pickles",
            price: 10.99,
            image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 5,
            name: "Caesar Salad",
            description: "Fresh romaine lettuce with Caesar dressing, croutons, and parmesan",
            price: 8.99,
            image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 6,
            name: "Pasta Carbonara",
            description: "Spaghetti with creamy sauce, pancetta, and parmesan",
            price: 11.99,
            image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 7,
            name: "Chocolate Cake",
            description: "Rich chocolate cake with chocolate frosting",
            price: 6.99,
            image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 8,
            name: "Cheesecake",
            description: "Classic New York cheesecake with strawberry topping",
            price: 7.99,
            image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
        }
    ];

    // DOM Elements
    const menuContainer = document.querySelector('.menu-items');
    const cartIcon = document.querySelector('.cart-icon');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const overlay = document.querySelector('.overlay');
    const closeCartBtn = document.querySelector('.close-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.total-price');
    const cartCount = document.querySelector('.cart-count');

    // Cart array
    let cart = [];

    // Initialize the app
    function init() {
        renderMenuItems();
        setupEventListeners();
        loadCart();
        updateCart();
    }

    // Render menu items
    function renderMenuItems() {
        if (!menuContainer) return;

        menuContainer.innerHTML = menuItems.map(item => `
            <div class="menu-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="menu-item-img">
                <div class="menu-item-info">
                    <h3 class="menu-item-title">${item.name}</h3>
                    <p class="menu-item-desc">${item.description}</p>
                    <div class="menu-item-bottom">
                        <span class="menu-item-price">$${item.price.toFixed(2)}</span>
                        <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Setup event listeners
    function setupEventListeners() {
        // Cart icon click
        if (cartIcon) {
            cartIcon.addEventListener('click', toggleCart);
        }

        // Close cart click
        if (closeCartBtn) {
            closeCartBtn.addEventListener('click', toggleCart);
        }

        // Overlay click
        if (overlay) {
            overlay.addEventListener('click', toggleCart);
        }

        // Event delegation for all dynamic elements
        document.addEventListener('click', function(e) {
            // Add to cart button
            if (e.target.classList.contains('add-to-cart')) {
                console.log('Add to cart button clicked');
                const id = parseInt(e.target.dataset.id);
                console.log('Product ID:', id);
                // ... rest of your code
            }


            // Remove from cart button
            if (e.target.classList.contains('cart-item-remove')) {
                const id = parseInt(e.target.dataset.id);
                removeFromCart(id);
            }

            // Decrease quantity button
            if (e.target.classList.contains('decrease')) {
                const id = parseInt(e.target.dataset.id);
                decreaseQuantity(id);
            }

            // Increase quantity button
            if (e.target.classList.contains('increase')) {
                const id = parseInt(e.target.dataset.id);
                increaseQuantity(id);
            }
        });
    }

    // Toggle cart visibility
    function toggleCart() {
        if (cartSidebar && overlay) {
            cartSidebar.classList.toggle('active');
            overlay.classList.toggle('active');
        }
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function addToCart(item) {
        const existingItem = cart.find(cartItem => cartItem.id === item.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({...item, quantity: 1 });
        }

        saveCart();
        updateCart();
    }

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function updateCart() {
        const cartContainer = document.getElementById("cart-items");
        cartContainer.innerHTML = "";
        cart.forEach(item => {
            const div = document.createElement("div");
            div.textContent = `${item.name} - ${item.quantity}`;
            cartContainer.appendChild(div);
        });
    }

    // Example usage
    document.getElementById("add-to-cart-btn").addEventListener("click", () => {
        addToCart({ id: 1, name: "Product 1", price: 50 });
    });


    // Show feedback
    const addButton = document.querySelector(`.add-to-cart[data-id="${item.id}"]`);
    if (addButton) {
        addButton.textContent = 'Added!';
        addButton.style.backgroundColor = '#5cb85c'; // Success green

        setTimeout(() => {
            addButton.textContent = 'Add to Cart';
            addButton.style.backgroundColor = '#ff6b6b'; // Original color
        }, 1000);
    }
}

// Remove item from cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCart();
}

// Decrease item quantity
function decreaseQuantity(id) {
    const item = cart.find(item => item.id === id);

    if (item) {
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            removeFromCart(id);
            return;
        }

        saveCart();
        updateCart();
    }
}

// Increase item quantity
function increaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += 1;
        saveCart();
        updateCart();
    }
}

// Update cart UI
function updateCart() {
    renderCartItems();
    updateCartTotal();
    updateCartCount();
}

// Render cart items
function renderCartItems() {
    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = cart.length > 0 ?
        cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-info">
                        <h4 class="cart-item-title">${item.name}</h4>
                        <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                        <button class="cart-item-remove" data-id="${item.id}">Remove</button>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                            <span class="quantity-value">${item.quantity}</span>
                            <button class="quantity-btn increase" data-id="${item.id}">+</button>
                        </div>
                    </div>
                </div>
            `).join('') :
        '<p class="empty-cart">Your cart is empty</p>';
}

// Update cart total
function updateCartTotal() {
    if (!cartTotal) return;

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

// Update cart count
function updateCartCount() {
    if (!cartCount) return;

    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart) || [];
        } catch (e) {
            console.error("Error parsing cart data:", e);
            cart = [];
        }
    }
}

// Initialize the app
init();
});