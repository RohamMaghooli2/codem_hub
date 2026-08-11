const trackingInput = document.getElementById("trackingInput");
const trackingBtn = document.getElementById("trackingBtn");
const trackingResult = document.getElementById("trackingResult");

trackingBtn.addEventListener("click", function () {

    const enteredCode = trackingInput.value.trim().toUpperCase();

    if (enteredCode === "") {
        trackingResult.innerHTML =
            '<div class="tracking-message error">⚠️ کد پیگیری را وارد کنید.</div>';
        return;
    }

    const savedOrder = localStorage.getItem("codemLastOrder");

    if (savedOrder === null) {
        trackingResult.innerHTML =
            '<div class="tracking-message error">❌ هیچ سفارشی در این دستگاه پیدا نشد.</div>';
        return;
    }

    let order;

    try {
        order = JSON.parse(savedOrder);
    } catch (error) {
        trackingResult.innerHTML =
            '<div class="tracking-message error">❌ اطلاعات سفارش خراب است.</div>';
        return;
    }

    if (!order.trackingCode) {
        trackingResult.innerHTML =
            '<div class="tracking-message error">❌ کد پیگیری سفارش پیدا نشد.</div>';
        return;
    }

    if (order.trackingCode.toUpperCase() !== enteredCode) {

        trackingResult.innerHTML =
            '<div class="tracking-message error">❌ کد پیگیری اشتباه است.</div>';

        return;
    }

    let productsHTML = "";

    if (Array.isArray(order.products)) {

        order.products.forEach(function (product) {

            const quantity = Number(product.quantity) || 1;
            const price = Number(product.price) || 0;

            productsHTML += 
                <div class="tracking-product">

                    <div>
                        <strong>${product.name}</strong>
                        <span>تعداد: ${quantity}</span>
                    </div>

                    <b>
                        ${(price * quantity).toLocaleString("fa-IR")}
                        تومان
                    </b>

                </div>
            ;

        });

    }

    trackingResult.innerHTML = 
        <div class="tracking-success">

            <div class="tracking-success-icon">
                ✅
            </div>

            <h2>سفارش پیدا شد</h2>

            <p class="tracking-code">
                ${order.trackingCode}
            </p>

            <div class="tracking-status">

                <span>وضعیت سفارش</span>

                <strong>
                    🟡 در حال بررسی
                </strong>

            </div>

            <div class="tracking-info">

                <p>
                    👤 نام:
                    <strong>${order.customerName}</strong>
                </p>

                <p>
                    📱 شماره تماس:
                    <strong>${order.customerPhone}</strong>
                </p>

                <p>
                    📍 آدرس:
                    <strong>${order.customerAddress}</strong>
                </p>

            </div>

            <div class="tracking-products">

                <h3>🛍️ محصولات سفارش</h3>

                ${productsHTML}

            </div>

        </div>
    ;
});