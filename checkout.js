const checkoutItems = document.getElementById("checkoutItems");
const checkoutTotal = document.getElementById("checkoutTotal");
const submitOrder = document.getElementById("submitOrder");

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

function formatPrice(price) {

    return Number(price).toLocaleString("fa-IR");

}

function showOrder() {

    const cart = getCart();

    checkoutItems.innerHTML = "";

    if (cart.length === 0) {

        checkoutItems.textContent =
            "سبد خرید شما خالی است.";

        checkoutTotal.textContent = "۰";

        submitOrder.disabled = true;

        return;
    }

    submitOrder.disabled = false;

    let total = 0;

    cart.forEach(function(product) {

        const item = document.createElement("div");

        item.className = "checkout-item";

        const name = document.createElement("span");

        name.textContent =
            product.name + " × " + product.quantity;

        const price = document.createElement("strong");

        price.textContent =
            formatPrice(
                Number(product.price) *
                Number(product.quantity)
            ) + " تومان";

        item.appendChild(name);

        item.appendChild(price);

        checkoutItems.appendChild(item);

        total =
            total +
            Number(product.price) *
            Number(product.quantity);

    });

    checkoutTotal.textContent =
        formatPrice(total);
}

submitOrder.addEventListener("click", function() {

    const name =
        document.getElementById("customerName").value.trim();

    const phone =
        document.getElementById("customerPhone").value.trim();

    const address =
        document.getElementById("customerAddress").value.trim();

    if (name === "") {

        alert("لطفاً نام و نام خانوادگی را وارد کنید.");

        return;
    }

    if (phone === "") {

        alert("لطفاً شماره تماس را وارد کنید.");

        return;
    }

    if (address === "") {

        alert("لطفاً آدرس را وارد کنید.");

        return;
    }

    const cart = getCart();

    if (cart.length === 0) {

        alert("سبد خرید شما خالی است.");

        return;
    }

    const trackingCode =
        "CODS-" +
        (Math.floor(Math.random() * 900000) + 100000);

    const order = {

        trackingCode: trackingCode,

        customerName: name,

        customerPhone: phone,

        customerAddress: address,

        products: cart,

        date: new Date().toISOString()

    };

    localStorage.setItem(
        "codemLastOrder",
        JSON.stringify(order)
    );

    localStorage.setItem(
        "codemTrackingCode",
        trackingCode
    );

    localStorage.removeItem("codemCart");

    alert(
        "سفارش شما با موفقیت ثبت شد.\n\nکد پیگیری: " +
        trackingCode
    );

    window.location.href = "success-order.html";

});

showOrder();