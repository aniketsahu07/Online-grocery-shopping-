const products = [
  {
    id: 1,
    name: "Apple",
    category: "fruits",
    price: 120,
    unit: "1 kg",
    image:
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Banana",
    category: "fruits",
    price: 60,
    unit: "1 dozen",
    image:
      "https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Potato",
    category: "vegetables",
    price: 40,
    unit: "1 kg",
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Tomato",
    category: "vegetables",
    price: 50,
    unit: "1 kg",
    image:
      "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "Milk",
    category: "dairy",
    price: 32,
    unit: "1 litre",
    image:
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    name: "Paneer",
    category: "dairy",
    price: 90,
    unit: "200 g",
    image:
      "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    name: "Chips",
    category: "snacks",
    price: 30,
    unit: "1 pack",
    image:
      "https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    name: "Biscuits",
    category: "snacks",
    price: 25,
    unit: "1 pack",
    image:
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 9,
    name: "Orange",
    category: "fruits",
    price: 95,
    unit: "1 kg",
    image:
      "https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 10,
    name: "Mango",
    category: "fruits",
    price: 140,
    unit: "1 kg",
    image:
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 11,
    name: "Onion",
    category: "vegetables",
    price: 35,
    unit: "1 kg",
    image:
      "https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 12,
    name: "Carrot",
    category: "vegetables",
    price: 55,
    unit: "1 kg",
    image:
      "https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 13,
    name: "Curd",
    category: "dairy",
    price: 40,
    unit: "400 g",
    image:
      "https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 14,
    name: "Butter",
    category: "dairy",
    price: 58,
    unit: "100 g",
    image:
      "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 15,
    name: "Namak Para",
    category: "snacks",
    price: 45,
    unit: "1 pack",
    image:
      "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 16,
    name: "Roasted Peanuts",
    category: "snacks",
    price: 70,
    unit: "250 g",
    image:
      "https://images.unsplash.com/photo-1612203985729-70726954388c?auto=format&fit=crop&w=800&q=80"
  }
];

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const cartItemsContainer = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const cartPanel = document.getElementById("cartPanel");
const cartToggle = document.getElementById("cartToggle");
const closeCart = document.getElementById("closeCart");
const checkoutBtn = document.getElementById("checkoutBtn");

const cart = new Map();

function renderProducts(items) {
  productGrid.innerHTML = "";

  if (!items.length) {
    productGrid.innerHTML = "<p>No products found.</p>";
    return;
  }

  items.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <img class="product-image" src="${product.image}" alt="${product.name}" loading="lazy" />
      <h4>${product.name}</h4>
      <p>Category: ${capitalize(product.category)}</p>
      <p>Pack: ${product.unit}</p>
      <div class="product-price">₹${product.price}</div>
      <button class="primary-btn" data-id="${product.id}">Add to Cart</button>
    `;

    productGrid.appendChild(card);
  });
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function filterProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;

  const filtered = products.filter((product) => {
    const matchName = product.name.toLowerCase().includes(query);
    const matchCategory = category === "all" || product.category === category;
    return matchName && matchCategory;
  });

  renderProducts(filtered);
}

function addToCart(productId) {
  const selectedProduct = products.find((product) => product.id === productId);
  if (!selectedProduct) {
    return;
  }

  const existingItem = cart.get(productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.set(productId, { ...selectedProduct, quantity: 1 });
  }

  renderCart();
}

function updateQuantity(productId, change) {
  const item = cart.get(productId);
  if (!item) {
    return;
  }

  item.quantity += change;

  if (item.quantity <= 0) {
    cart.delete(productId);
  }

  renderCart();
}

function renderCart() {
  const cartItems = Array.from(cart.values());

  if (!cartItems.length) {
    cartItemsContainer.innerHTML = '<p class="empty">Your cart is empty.</p>';
    cartTotal.textContent = "₹0";
    cartCount.textContent = "0";
    return;
  }

  cartItemsContainer.innerHTML = "";

  let totalPrice = 0;
  let totalItems = 0;

  cartItems.forEach((item) => {
    totalPrice += item.price * item.quantity;
    totalItems += item.quantity;

    const cartItemEl = document.createElement("div");
    cartItemEl.className = "cart-item";
    cartItemEl.innerHTML = `
      <div class="cart-item-row">
        <div class="cart-item-product">
          <img class="cart-thumb" src="${item.image}" alt="${item.name}" loading="lazy" />
          <strong>${item.name}</strong>
        </div>
        <span>₹${item.price * item.quantity}</span>
      </div>
      <small>${item.unit}</small>
      <div class="qty-controls">
        <button data-action="decrease" data-id="${item.id}" aria-label="Decrease quantity">-</button>
        <span>${item.quantity}</span>
        <button data-action="increase" data-id="${item.id}" aria-label="Increase quantity">+</button>
      </div>
    `;

    cartItemsContainer.appendChild(cartItemEl);
  });

  cartTotal.textContent = `₹${totalPrice}`;
  cartCount.textContent = `${totalItems}`;
}

productGrid.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof HTMLElement)) {
    return;
  }

  if (!target.matches("button[data-id]")) {
    return;
  }

  const productId = Number(target.dataset.id);
  addToCart(productId);
});

cartItemsContainer.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof HTMLElement)) {
    return;
  }

  if (!target.matches("button[data-action]")) {
    return;
  }

  const productId = Number(target.dataset.id);
  const action = target.dataset.action;
  const change = action === "increase" ? 1 : -1;
  updateQuantity(productId, change);
});

searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);

cartToggle.addEventListener("click", () => {
  cartPanel.classList.add("open");
  cartPanel.setAttribute("aria-hidden", "false");
});

closeCart.addEventListener("click", () => {
  cartPanel.classList.remove("open");
  cartPanel.setAttribute("aria-hidden", "true");
});

checkoutBtn.addEventListener("click", () => {
  if (!cart.size) {
    alert("Cart empty hai. Pehle products add karo.");
    return;
  }

  alert("Order placed successfully! FreshBasket choose karne ke liye thanks.");
  cart.clear();
  renderCart();
  cartPanel.classList.remove("open");
  cartPanel.setAttribute("aria-hidden", "true");
});

renderProducts(products);
renderCart();
