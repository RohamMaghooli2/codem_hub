const cartItems = document.getElementById("cartItems");
const emptyCart = document.getElementById("emptyCart");
const cartSummary = document.getElementById("cartSummary");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

function getCart() {
    const data = localStorage.getItem("codemCart");

    if (data === null) {
        return [];
    }

    try {
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem("codemCart", JSON.stringify(cart));
}

function formatPrice(price) {
    return Number(price).toLocaleString("fa-IR");
}

function renderCart() {

    const cart = getCart();

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        emptyCart.style.display = "block";
        cartSummary.style.display = "none";

        return;
    }

    emptyCart.style.display = "none";
    cartSummary.style.display = "block";

    let total = 0;
    let count = 0;

    cart.forEach(function(product, index) {

        total = total + Number(product.price) * Number(product.quantity);
        count = count + Number(product.quantity);

        const item = document.createElement("div");

        item.className = "cart-item";

        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name;

        const info = document.createElement("div");

        info.className = "cart-item-info";

        const title = document.createElement("h3");
        title.textContent = product.name;

        const price = document.createElement("p");
        price.textContent = formatPrice(product.price) + " تومان";

        const quantityBox = document.createElement("div");

        quantityBox.className = "quantity-box";

        const plusButton = document.createElement("button");

        plusButton.className = "quantity-btn";
        plusButton.textContent = "+";

        plusButton.addEventListener("click", function() {

            const newCart = getCart();

            newCart[index].quantity =
                Number(newCart[index].quantity) + 1;

            saveCart(newCart);

            renderCart();
        });

        const quantity = document.createElement("span");

        quantity.textContent = product.quantity;

        const minusButton = document.createElement("button");

        minusButton.className = "quantity-btn";
        minusButton.textContent = "-";

        minusButton.addEventListener("click", function() {

            const newCart = getCart();

            newCart[index].quantity =
                Number(newCart[index].quantity) - 1;

            if (newCart[index].quantity <= 0) {
                newCart.splice(index, 1);
            }

            saveCart(newCart);

            renderCart();
        });

        const removeButton = document.createElement("button");

        removeButton.className = "remove-cart";
        removeButton.textContent = "حذف";

        removeButton.addEventListener("click", function() {

            const newCart = getCart();

            newCart.splice(index, 1);

            saveCart(newCart);

            renderCart();
        });

        quantityBox.appendChild(plusButton);
        quantityBox.appendChild(quantity);
        quantityBox.appendChild(minusButton);

        info.appendChild(title);
        info.appendChild(price);
        info.appendChild(quantityBox);

        item.appendChild(image);
        item.appendChild(info);
        item.appendChild(removeButton);

        cartItems.appendChild(item);
    });

    cartCount.textContent = count.toLocaleString("fa-IR");

    cartTotal.textContent = formatPrice(total);
}

if (checkoutBtn) {

    checkoutBtn.addEventListener("click", function() {

        const cart = getCart();

        if (cart.length === 0) {

            alert("سبد خرید شما خالی است.");

            return;
        }

        alert("سبد خرید آماده ثبت سفارش است.");

    });
}

renderCart();