console.log("CODM Hub");

window.onload = function(){

setTimeout(function(){

document.getElementById("splash").style.display="none";

},2000);

}

function showTab(tab){

document.querySelectorAll(".tab-content").forEach(item=>{

item.style.display="none";

});

document.getElementById(tab).style.display="block";

document.querySelectorAll(".tab-btn").forEach(btn=>{

btn.classList.remove("active");

});

event.target.classList.add("active");

}
