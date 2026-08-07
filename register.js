const registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", function () {

    const code = "CODM-" + (Math.floor(Math.random() * 9000) + 1000);

    localStorage.setItem("trackingCode", code);

    window.location.href = "success.html";

});