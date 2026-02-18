const start = document.getElementById("start");
const overlay = document.getElementById("overlay");
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);

start.addEventListener("click", async () => {
  overlay.style.display = "none";
  canvas.style.display = "block";

  await video.play();
  document.documentElement.requestFullscreen();

  resizeCanvas();
  draw();
});

function draw() {
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
    video,
    0,
    0,
    video.videoWidth,
    video.videoHeight,
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
    video,
    0,
    0,
    video.videoWidth,
    video.videoHeight,
    rightCenterX - radius,
    centerY - radius,
    radius * 2,
    radius * 2,
  );
  ctx.restore();

  requestAnimationFrame(draw);
}
