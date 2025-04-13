// Aggiungi classe quando si scorre la pagina
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const immagini = document.querySelectorAll(".galleria__immagine");
    let currentIndex = 0;
    
    // Crea il modal
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
        <div class="modal__contenuto">
            <span class="modal__chiudi">&times;</span>
            <button class="modal__prev">&lt;</button>
            <img class="modal__immagine" src="" alt="">
            <button class="modal__next">&gt;</button>
        </div>
    `;
    document.body.appendChild(modal);

    const modalImg = modal.querySelector(".modal__immagine");
    const chiudiBtn = modal.querySelector(".modal__chiudi");
    const prevBtn = modal.querySelector(".modal__prev");
    const nextBtn = modal.querySelector(".modal__next");

    function showImage(index) {
        currentIndex = index;
        modalImg.src = immagini[currentIndex].src;
        modalImg.alt = immagini[currentIndex].alt;
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % immagini.length;
        showImage(currentIndex);
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + immagini.length) % immagini.length;
        showImage(currentIndex);
    }

    // Aggiungi event listener per ogni immagine
    immagini.forEach((img, index) => {
        img.addEventListener("click", function() {
            modal.style.display = "block";
            showImage(index);
        });
    });

    // Event listener per i tasti freccia
    document.addEventListener("keydown", function(e) {
        if (modal.style.display === "block") {
            if (e.key === "ArrowRight") {
                nextImage();
            } else if (e.key === "ArrowLeft") {
                prevImage();
            } else if (e.key === "Escape") {
                modal.style.display = "none";
            }
        }
    });

    // Event listeners per i pulsanti prev/next
    prevBtn.addEventListener("click", prevImage);
    nextBtn.addEventListener("click", nextImage);

    // Chiudi il modal quando si clicca sulla X
    chiudiBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });

    // Chiudi il modal quando si clicca fuori dall'immagine
    modal.addEventListener("click", function(e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const galleria = document.querySelector(".galleria");
    let isDown = false;
    let startX;
    let scrollLeft;

    galleria.addEventListener("mousedown", (e) => {
        isDown = true;
        galleria.classList.add("active");
        startX = e.pageX - galleria.offsetLeft;
        scrollLeft = galleria.scrollLeft;
    });

    galleria.addEventListener("mouseleave", () => {
        isDown = false;
        galleria.classList.remove("active");
    });

    galleria.addEventListener("mouseup", () => {
        isDown = false;
        galleria.classList.remove("active");
    });

    galleria.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - galleria.offsetLeft;
        const walk = (x - startX) * 2; // Velocità di scorrimento
        galleria.scrollLeft = scrollLeft - walk;
    });

    // Scorrimento touch
    galleria.addEventListener("touchstart", (e) => {
        startX = e.touches[0].pageX;
        scrollLeft = galleria.scrollLeft;
    });

    galleria.addEventListener("touchmove", (e) => {
        const x = e.touches[0].pageX;
        const walk = (x - startX) * 2;
        galleria.scrollLeft = scrollLeft - walk;
    });
});



