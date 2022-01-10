// FIXME: class
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const PARTICLES_ON_SCREEN = 245;
const particlesArray = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let w = canvas.width;
let h = canvas.height;

function random(min, max) {
  return min + Math.random() * (max - min + 1);
}

function clientResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  w = canvas.width;
  h = canvas.height;
}

window.addEventListener("resize", clientResize);

function createSnowFlakes() {
  for (let i = 0; i < PARTICLES_ON_SCREEN; i++) {
    particlesArray.push({
      x: Math.random() * w,
      y: Math.random() * h,
      opacity: Math.random(),
      speedX: random(-5, 5),
      speedY: random(1, 20),
      radius: random(0.5, 2.8),
    });
  }
}

function drawSnowFlakes() {
  for (let i = 0; i < PARTICLES_ON_SCREEN; i++) {
    const gradient = ctx.createRadialGradient(
      particlesArray[i].x, // 시작 원의 x축 좌표
      particlesArray[i].y, // 시작 원의 y축 좌표
      0, // 시작 원의 반지름
      particlesArray[i].x, // 끝 원의 x축 좌표
      particlesArray[i].y, // 끝 원의 y축 좌표
      particlesArray[i].radius // 끝 원의 반지름
    );

    gradient.addColorStop(
      0,
      `rgba(255, 255, 255, ${particlesArray[i].opacity})`
    );
    gradient.addColorStop(
      0,
      `rgba(210, 236, 242, ${particlesArray[i].opacity})`
    );
    gradient.addColorStop(
      0,
      `rgba(237, 247, 249, ${particlesArray[i].opacity})`
    );

    ctx.beginPath();
    /**
     * adds a circular arc to the current sub-path
     * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
     */
    ctx.arc(
      particlesArray[i].x, // 호의 x축 중심
      particlesArray[i].y, // 호의 y축 중심
      particlesArray[i].radius, // 호의 반지름
      0, // 호 시작점 (0 radians (0°))
      Math.PI * 2, // 호 끝점 (π = 180°, 2π = 360°)
      false // 반시계 방향 여부 (default - false)
    );

    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowColor = "#fafafa60";
    ctx.shadowBlur = 7;
  }
}

function moveSnowFlakes() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].x += particlesArray[i].speedX;
    particlesArray[i].y += particlesArray[i].speedY;

    if (particlesArray[i].y > h) {
      particlesArray[i].x = Math.random() * w * 1.5;
      particlesArray[i].y = -50;
    }
  }
}

function updateSnowFall() {
  ctx.clearRect(0, 0, w, h);
  drawSnowFlakes();
  moveSnowFlakes();
}

window.setInterval(updateSnowFall, 50);
createSnowFlakes();
