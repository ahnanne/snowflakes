const NUMBER_OF_SNOWFLAKES = 300;
const SNOWFLAKE_FIELDS = 6; // 눈송이 구조체의 필드 개수
const MARGIN = 10;

async function loadWasm() {
  try {
    const response = await fetch("./snowflakes.wasm"); // WASM 파일 가져오기
    const bytes = await response.arrayBuffer();
    const { instance } = await WebAssembly.instantiate(bytes, {});

    return instance.exports;
  }
  catch (error) {
    console.error("Failed to load WASM: ", error);
    return null;
  }
}

// HTML 파싱 직후 wasm 받아오기
document.addEventListener("DOMContentLoaded", async function () {
  try {
    const wasm = await loadWasm();
    if (wasm) {
      window.wasmExports = wasm; // 전역 변수에 저장
    }
  }
  catch (error) {
    console.error("Failed to load WASM: ", error);
  }
});

const mutObserver = new MutationObserver(() => {
  if (window.wasmExports) {
    const canvas = document.getElementById("canvas");
    if (canvas) {
      const ctx = canvas.getContext("2d");

      const width = document.documentElement.clientWidth - MARGIN;
      const height = document.documentElement.clientHeight - MARGIN;
      canvas.width = width;
      canvas.height = height;

      window.wasmExports.init_snowflakes(width, height);

      const snowflakes = new Float32Array( // 숫자 하나 당 4 byte
        window.wasmExports.memory.buffer, // 버퍼(wasm가 사용하는 메모리 공간 전체) - Emscripten 기본값은 16MB(256 페이지, byte length=16908288)
        window.wasmExports.get_snowflakes(), // 버퍼의 어느 지점부터 데이터를 읽을지 전달
        NUMBER_OF_SNOWFLAKES * SNOWFLAKE_FIELDS, // 읽어올 요소의 개수 (눈송이 100개 * 눈송이 구조체 필드 개수 -> 총 1200 byte)
      );

      const render = () => {
        window.wasmExports.update_snowflakes(canvas.width, canvas.height);

        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "rgba(0, 0, 0, 0.1)";

          for (let i = 0; i < snowflakes.length; i += SNOWFLAKE_FIELDS) {
            const gradient = ctx.createRadialGradient(
              snowflakes[i],
              snowflakes[i + 1],
              0,
              snowflakes[i],
              snowflakes[i + 1],
              snowflakes[i + 5],
            );

            gradient.addColorStop(
              0,
              `rgba(255, 255, 255, ${snowflakes[i + 4]})`
            );
            gradient.addColorStop(
              0,
              `rgba(210, 236, 242, ${snowflakes[i + 4]})`
            );
            gradient.addColorStop(
              0,
              `rgba(237, 247, 249, ${snowflakes[i + 4]})`
            );

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(snowflakes[i], snowflakes[i + 1], snowflakes[i + 5], 0, Math.PI * 2);
            ctx.fill();

            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowColor = "#fafafa60";
            ctx.shadowBlur = 7;
          }
        }

        requestAnimationFrame(render);
        // https://developer.mozilla.org/ko/docs/Web/API/Window/requestAnimationFrame
      };

      render();
    }

    mutObserver.disconnect();
  }
});

mutObserver.observe(document.documentElement, {
  childList: true,
  subtree: true,
});

function clientResize() {
  canvas.width = document.documentElement.clientWidth - MARGIN;
  canvas.height = document.documentElement.clientHeight - MARGIN;

  w = canvas.width;
  h = canvas.height;
}

window.addEventListener("resize", clientResize);