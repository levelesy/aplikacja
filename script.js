// VARIABLES
let stockItems = document.getElementById('stock-items'),
    stockInput = document.getElementById('stock-input'),
    stockForm = document.getElementById('stock-form'),
    cartItems = document.getElementById('cart-items');

// EVENT LISTENERS
stockItems.addEventListener('click', handleStockClick);
stockForm.addEventListener('submit', addProductToStock);
document.addEventListener('DOMContentLoaded', loadItems);
document.addEventListener('DOMContentLoaded', loadCartItems);
cartItems.addEventListener('click', handleCartClick);
document.getElementById('receipt-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission behavior
    
    // Get the receipt container element
    let receiptContainer = document.getElementById('receipt-container');
    let cart = getCartFromLocalStorage();
    
    // Generate random prices for each product in the cart
    let cartWithPrices = cart.map(product => {
        let price = Math.floor(Math.random() * 21) + 5; // Generate random price between 5 and 25
        return { product, price };
    });

    // Calculate the total price by summing up all the prices in the cart
    let totalPrice = cartWithPrices.reduce((acc, item) => acc + item.price, 0);

    // Create the receipt text
    let receiptText = `
        <h4>Paragon</h4>
        <p>Data: ${new Date().toLocaleDateString()}</p>
        <p>Produkty:</p>
        <ul>
            ${cartWithPrices.map(item => `<li>${item.product}: ${item.price.toFixed(2)} zł</li>`).join('')}
        </ul>
        <p>Razem: ${totalPrice.toFixed(2)} zł</p>
    `;
    
    // Set the receipt text as the inner HTML of the receipt container
    receiptContainer.innerHTML = receiptText;
});


// FUNCTIONS
function handleStockClick(e) {
    if(e.target.classList.contains('remove-btn'))  {
        let stock = e.target.parentElement;
        // remove item from local storage
        removeFromLocalStorage(stock);
        // remove item from DOM
        stock.remove();
    } else if(e.target.classList.contains('add-btn')) {
        let stock = e.target.parentElement;
        let cart = e.target.parentElement.textContent.slice(0, -34);
        addCartToLocalStorage(cart);
        removeFromLocalStorage(stock);
        stock.remove();
    }
}

function handleCartClick(e) {
    if(e.target.classList.contains('remove-btn'))  {
        let cart = e.target.parentElement;
        let stock = e.target.parentElement.textContent.slice(0, -14);
        // remove item from local storage
        removeCartFromLocalStorage(cart);
        addToLocalStorage(stock);
        // remove item from DOM
        cart.remove();
    }
}

function addProductToStock(e) {
    e.preventDefault();
    let stock = stockInput.value;

    if(stock != '') {
        // creating a list item
        let li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = stock;

        // creating the 'X' button and appending it to 'li'
        let xBtn = document.createElement('button');
        xBtn.className = 'btn btn-dark btn-sm float-right remove-btn';
        xBtn.textContent = 'Usuń z asortymentu';
        li.appendChild(xBtn);

        // creating the '+' button and appending it to 'li'
        let addBtn = document.createElement('button');
        addBtn.className = 'btn btn-dark btn-sm float-right add-btn';
        addBtn.textContent = 'Dodaj do koszyka';
        li.appendChild(addBtn);

        // appending the item to the list
        stockItems.appendChild(li);
        stockForm.reset();
        
        // append the item to local storage array
        addToLocalStorage(stock);
        checkLocalStorage();
    }
}

function addToLocalStorage(stock) {
    let storageItems = getFromLocalStorage();
    storageItems.push(stock);
    localStorage.setItem('stock', JSON.stringify(storageItems));
}

function getFromLocalStorage() {
    let items = localStorage.getItem('stock')
    if(items === null) {
        items = [];
    }
    else {
        items = JSON.parse(items);
    }
    return items;
}

function removeFromLocalStorage(stock) {
    let liValue = stock.firstChild.textContent;
    let storageArray = getFromLocalStorage();
    storageArray.forEach(function(item, index) {
        if(item === liValue) {
            storageArray.splice(index,1);
            localStorage.setItem('stock', JSON.stringify(storageArray));
        }
        checkLocalStorage();
    })
}

// load items from local storage
function loadItems() {
    stockInput.focus();
    let items = getFromLocalStorage();
    checkLocalStorage();
    items.forEach(function(item){
        if(item != ""){
            // create li
            let li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = item;
            
            //create 'X' button
            let btn = document.createElement('button');
            btn.className = 'btn btn-dark btn-sm float-right remove-btn';
            btn.textContent = 'Usuń z asortymentu';

            //create '+' button
            let btn2 = document.createElement('button');
            btn2.className = 'btn btn-dark btn-sm float-right add-btn';
            btn2.textContent = 'Dodaj do koszyka';

            li.appendChild(btn);
            li.appendChild(btn2);
            stockItems.appendChild(li);
        }
    });
}

function checkLocalStorage() {
    let arr = getFromLocalStorage();
    if(arr.length != 0) {
        stockItems.parentElement.style.display = 'block';
    }
    else {
        stockItems.parentElement.style.display = 'none';
    }
}

// #####################################################

function addCartToLocalStorage(cart) {
    let storageItems = getCartFromLocalStorage();
    storageItems.push(cart);
    localStorage.setItem('cart', JSON.stringify(storageItems));
    checkCartLocalStorage();
}

function getCartFromLocalStorage() {
    let items = localStorage.getItem('cart')
    if(items === null) {
        items = [];
    }
    else {
        items = JSON.parse(items);
    }
    return items;
}

function removeCartFromLocalStorage(cart) {
    let liValue = cart.firstChild.textContent;
    let storageArray = getCartFromLocalStorage();
    storageArray.forEach(function(item, index) {
        if(item === liValue) {
            storageArray.splice(index,1);
            localStorage.setItem('cart', JSON.stringify(storageArray));
        }
        checkCartLocalStorage();
    })
}

// load items from local storage
function loadCartItems() {
    let items = getCartFromLocalStorage();
    checkCartLocalStorage();
    items.forEach(function(item){
        if(item != ""){
            // create li
            let li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = item;
            
            //create 'X' button
            let btn = document.createElement('button');
            btn.className = 'btn btn-dark btn-sm float-right remove-btn';
            btn.textContent = 'Usuń z koszyka';

            li.appendChild(btn);
            cartItems.appendChild(li);
        }
    });
}

function checkCartLocalStorage() {
    let arr = getCartFromLocalStorage();
    if(arr.length != 0) {
        cartItems.parentElement.style.display = 'block';
    }
    else {
        cartItems.parentElement.style.display = 'none';
    }
}