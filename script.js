const images = [
  "1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg",
  "5.jpeg", "6.jpeg", "7.jpeg", "8.jpeg",
  "9.jpeg", "10.jpeg","11.jpeg", "12.jpeg", "13.jpeg", "14.jpeg", "15.jpeg", "16.jpeg"
];

let currentIndex = 0;

window.onload = function() {
  // Show buttons so user can retry or switch
  showButtons();

  // Ask question immediately on load for initial choice
  askQuestion();
};

function showButtons() {
  document.getElementById("gridBtn").style.display = "inline-block";
  document.getElementById("flipBtn").style.display = "inline-block";
}

function askQuestion(preferredView) {
  // If no preferredView, prompt for which view
  let choice;
  if (!preferredView) {
    choice = prompt("Enter 'grid' for Grid View or 'flip' for Flipbook View?").toLowerCase().trim();
  } else {
    // If preferredView passed from button click, ask for confirmation yes/no
    const confirmMsg = `Do you want to enter the ${preferredView} view? (yes/no)`;
    const answer = prompt(confirmMsg);
    if (!answer || answer.toLowerCase().trim() !== "yes") {
      alert("Oooh sorry cry baby, my love");
      return;
    }
    choice = preferredView;
  }

  if (choice === "grid") {
    showGrid();
  } else if (choice === "flip") {
    startFlipbook();
  } else {
    alert("Oooh sorry cry baby, my love");
  }
}

function showGrid() {
  document.getElementById("gallery").style.display = "grid";
  document.getElementById("flipbook").style.display = "none";

  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";

  images.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.className = "cry-baby-img";

    // Click to open big lightbox view
    img.addEventListener("click", () => openLightbox(src));

    gallery.appendChild(img);
  });
}

function startFlipbook() {
  document.getElementById("gallery").style.display = "none";
  document.getElementById("flipbook").style.display = "flex";

  currentIndex = 0;
  const flipImage = document.getElementById("flipImage");
  flipImage.src = images[currentIndex];
}

function nextFlipImage() {
  const flipImage = document.getElementById("flipImage");

  flipImage.classList.remove("flip");
  void flipImage.offsetWidth; // Trigger reflow for CSS animation
  flipImage.classList.add("flip");

  setTimeout(() => {
    currentIndex = (currentIndex + 1) % images.length;
    flipImage.src = images[currentIndex];
  }, 300);
}

function exitFlipbook() {
  document.getElementById("flipbook").style.display = "none";
  document.getElementById("gallery").style.display = "grid";
  showGrid();
}

// Lightbox functions
function openLightbox(src) {
  let lightbox = document.getElementById("lightbox");
  if (!lightbox) {
    createLightbox();
    lightbox = document.getElementById("lightbox");
  }
  const lightboxImg = document.getElementById("lightbox-img");
  lightboxImg.src = src;
  lightbox.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeLightbox(event) {
  if (event.target.id === "lightbox") {
    const lightbox = document.getElementById("lightbox");
    lightbox.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

function createLightbox() {
  const lightbox = document.createElement("div");
  lightbox.id = "lightbox";
  lightbox.className = "lightbox";
  lightbox.style.display = "none";
  lightbox.onclick = closeLightbox;

  const img = document.createElement("img");
  img.id = "lightbox-img";
  img.alt = "Big View";

  lightbox.appendChild(img);
  document.body.appendChild(lightbox);
}