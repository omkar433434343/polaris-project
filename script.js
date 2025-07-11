const track = document.getElementById("beltTrack");
let position = 0;
const speed = 0.5; // Adjust to control speed

// Get width of the first image including gap
const firstImage = track.querySelector("img");
const imageWidth = firstImage.offsetWidth + 20; // 20px = CSS gap

function animate() {
  position -= speed;
  track.style.transform = `translateX(${position}px)`;

  // When one full image has moved left, rotate it
  if (Math.abs(position) >= imageWidth) {
    // Move the first image to the end
    const first = track.children[0];
    track.appendChild(first);
    // Reset the translate to match new order
    position += imageWidth;
    track.style.transform = `translateX(${position}px)`;
  }

  requestAnimationFrame(animate);
}

window.onload = () => {
  animate();
};

