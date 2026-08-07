const trackingCode = localStorage.getItem("trackingCode");

const codeBox = document.getElementById("trackingCode");

if (trackingCode) {
    codeBox.textContent = trackingCode;
}