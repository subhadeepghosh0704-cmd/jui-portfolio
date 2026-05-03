function openImage(img){
    document.getElementById("popup").style.display="flex";
    document.getElementById("popup-img").src=img.src;
}

function closeImage(){
    document.getElementById("popup").style.display="none";
}

function toggleMenu(){
    document.getElementById("menu").classList.toggle("active");
}
