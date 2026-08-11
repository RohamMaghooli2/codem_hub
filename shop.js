const buttons = document.querySelectorAll(".add-cart");

buttons.forEach(function(button) {

    button.addEventListener("click", function() {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);
        const image = button.dataset.image;

        let cart = JSON.parse(
            localStorage.getItem("codemCart") || "[]"
        );

        const existingProduct = cart.find(function(product) {
            return product.name === name;
        });

        if (existingProduct) {

            existingProduct.quantity =
                Number(existingProduct.quantity) + 1;

        } else {

            cart.push({
                name: name,
                price: price,
                image: image,
                quantity: 1
            });

        }

        localStorage.setItem(
            "codemCart",
            JSON.stringify(cart)
        );

        button.textContent = "✅ اضافه شد";

        setTimeout(function() {
            button.textContent = "افزودن به سبد 🛒";
        }, 1000);

    });

});