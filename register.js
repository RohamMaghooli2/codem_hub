alert("JS اجرا شد");
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
import {
    getFirestore,
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDY7CJFK8tEiHxRqAoM2Dbn0DjH-Tq02vs",
    authDomain: "codem-hub.firebaseapp.com",
    projectId: "codem-hub",
    storageBucket: "codem-hub.firebasestorage.app",
    messagingSenderId: "1031768742138",
    appId: "1:1031768742138:web:7f040ba1900de5a3ed9143"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const registerBtn = document.getElementById("registerBtn");
alert("JS اجرا شد");
registerBtn.addEventListener("click", async function () {

    const teamName = document.getElementById("teamName").value;
    const player1 = document.getElementById("player1").value;
    const player1Id = document.getElementById("player1Id").value;
    const player2 = document.getElementById("player2").value;
    const player2Id = document.getElementById("player2Id").value;

    const code = "CODM-" + (Math.floor(Math.random() * 9000) + 1000);
alert("دکمه ثبت‌نام کار می‌کند");
    try {

        await setDoc(doc(db, "registrations", code), {
            teamName: teamName,
            player1: player1,
            player1Id: player1Id,
            player2: player2,
            player2Id: player2Id,
            trackingCode: code
        });

        localStorage.setItem("trackingCode", code);

        window.location.href = "success.html";

    } catch (error) {

        console.error("خطا در ثبت نام:", error);

        alert("ثبت نام انجام نشد. دوباره تلاش کنید.");

    }

});