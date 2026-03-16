const overlay = document.getElementById("overlay");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const btnBack = document.querySelector(".btn-back");
const modal = document.getElementById("modal");
const closeModal = document.querySelector(".close");
const viewVideoBtn = document.getElementById("view-video");
const downloadVideoBtn = document.getElementById("download-video");
const downloadAppBtn = document.getElementById("download-app");

let currentVideo = null;
let currentVideoSrc = '';

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);

// Get all start buttons
for (let i = 1; i <= 8; i++) {
  const startBtn = document.getElementById(`start${i}`);
  const video = document.getElementById(`video${i}`);

  // if (Hls.isSupported()) {
  //   const hls = new Hls()
  //   hls.loadSource('output.m3u8')
  //   hls.attachMedia(video)
  // }

  startBtn.addEventListener("click", async () => {
    overlay.style.display = "none";
    canvas.style.display = "block";
    btnBack.style.display = "block";

    currentVideo = video;
    currentVideoSrc = `./assets/video${i}.mp4`;

    await video.play();
    document.documentElement.requestFullscreen();

    resizeCanvas();
    draw();
  });
}

function draw() {
  if (!currentVideo) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const centerY = canvas.height / 2;
  const radius = Math.min(canvas.width / 4, canvas.height / 2.2);

  const leftCenterX = canvas.width / 4;
  const rightCenterX = (canvas.width * 3) / 4;

  // LEFT LENS
  ctx.save();
  ctx.beginPath();
  ctx.arc(leftCenterX, centerY, radius, 0, Math.PI * 2);
  ctx.clip();

  ctx.drawImage(
    currentVideo,
    0,
    0,
    currentVideo.videoWidth,
    currentVideo.videoHeight,
    leftCenterX - radius,
    centerY - radius,
    radius * 2,
    radius * 2,
  );
  ctx.restore();

  // RIGHT LENS
  ctx.save();
  ctx.beginPath();
  ctx.arc(rightCenterX, centerY, radius, 0, Math.PI * 2);
  ctx.clip();

  ctx.drawImage(
    currentVideo,
    0,
    0,
    currentVideo.videoWidth,
    currentVideo.videoHeight,
    rightCenterX - radius,
    centerY - radius,
    radius * 2,
    radius * 2,
  );
  ctx.restore();

  requestAnimationFrame(draw);
}

btnBack.addEventListener("click", function () {
  if (currentVideo) {
    currentVideo.pause();
    currentVideo.currentTime = 0;
  }
  canvas.style.display = "none";
  btnBack.style.display = "none";
  overlay.style.display = "flex";
  modal.style.display = "none";
});

// Canvas click to show modal
canvas.addEventListener("click", function () {
  modal.style.display = "block";
});

// Close modal
closeModal.addEventListener("click", function () {
  modal.style.display = "none";
});

// View video
viewVideoBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

// Download video
downloadVideoBtn.addEventListener("click", function () {
  const link = document.createElement('a');
  link.href = currentVideoSrc;
  link.download = `video${currentVideo.id.slice(-1)}.mp4`;
  link.click();
  modal.style.display = "none";
});

// Download app (placeholder link)
downloadAppBtn.addEventListener("click", function () {
  window.open('https://example.com/download-vr-app', '_blank'); // Replace with actual app download link
  modal.style.display = "none";
});

// Close modal when clicking outside
window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/sw.js')
// }
