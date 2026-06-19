// DOM Elements Setup
const cartToggleBtn = document.getElementById('cart-toggle-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCartBtn = document.getElementById('close-cart');
const sidebarOverlay = document.getElementById('sidebar-overlay');

const cartCountElement = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalPriceElement = document.getElementById('cart-total-price');
const addButtons = document.querySelectorAll('.add-btn');

let cart = [];

// Toggle Sidebar Logic
function toggleCart() {
    cartSidebar.classList.toggle('active');
    sidebarOverlay.classList.toggle('active');
}

cartToggleBtn.addEventListener('click', toggleCart);
closeCartBtn.addEventListener('click', toggleCart);
sidebarOverlay.addEventListener('click', toggleCart);


addButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const productBox = e.target.closest('.box');
        const id = productBox.getAttribute('data-id');
        const name = productBox.getAttribute('data-name');
        const price = parseInt(productBox.getAttribute('data-price'));
        const img = productBox.getAttribute('data-img');

       
        cart.push({ id, name, price, img });
        
        updateCartUI();
    });
});


function updateCartUI() {
    
    cartCountElement.textContent = cart.length;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="empty-msg">Your cart is empty.</p>`;
        cartTotalPriceElement.textContent = "₹0";
        return;
    }

    
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price;
        const itemRow = document.createElement('div');
        itemRow.classList.add('cart-item-card');
        itemRow.innerHTML = `
            <div class="cart-item-img" style="background-image: url('${item.img}')"></div>
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>₹${item.price.toLocaleString('en-IN')}</p>
            </div>
        `;
        cartItemsContainer.appendChild(itemRow);
    });

    
    cartTotalPriceElement.textContent = `₹${total.toLocaleString('en-IN')}`;
}