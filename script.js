const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

toggle.addEventListener("click", () => {
  menu.classList.toggle("show");
});

const chars = "!<>-_\\/[]{}—=+*^?#________";
const textDesktop = "Hi, I'm Henalvaro Farrel Bagas Qusuma";
const textHi = "Hi,";
const textNama = "I'm Henalvaro Farrel Bagas Qusuma";

function scramble(text, element) {
  let frame = 0;
  let queue = [];

  for (let i = 0; i < text.length; i++) {
    let from = chars[Math.floor(Math.random() * chars.length)];
    let to = text[i];
    let start = Math.floor(Math.random() * 80);
    let end = start + Math.floor(Math.random() * 80);
    queue.push({ from, to, start, end, char: null });
  }

  function update() {
    let output = "";
    let complete = 0;
    for (let i = 0; i < queue.length; i++) {
      let { from, to, start, end } = queue[i];
      let char = queue[i].char;
      if (frame >= end) {
        complete++;
        output += to;
      } else if (frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = chars[Math.floor(Math.random() * chars.length)];
          queue[i].char = char;
        }
        output += `<span style="opacity:0.6">${char}</span>`;
      } else {
        output += from;
      }
    }
    element.innerHTML = output;

    if (complete < queue.length) {
      requestAnimationFrame(update);
      frame++;
    }
  }

  update();
}

window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("preloader").style.display = "none";

    const halaman = document.getElementById("halaman-utama");
    halaman.style.display = "block";
    document.body.style.overflow = "auto";

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, behavior: "instant" });

    AOS.init({
      once: true,
      duration: 800,
    });

    const hi = document.getElementById("namaku-hi");
    const nama = document.getElementById("namaku");
    const namaMobile = document.getElementById("namaku-mobile");

    hi.classList.add("show-text");
    nama.classList.add("show-text");
    namaMobile.classList.add("show-text");

    setTimeout(() => {
      scramble(textDesktop, nama);
      scramble(textHi, hi);
      scramble(textNama, namaMobile);

      setTimeout(() => {
        nama.classList.add("glitch-animate");
      }, 2500);
    }, 100);
  }, 4000);
});

const faders = document.querySelectorAll(".fade-up");

const appearOptions = {
  threshold: 0.2,
};

const semuafoto = document.querySelectorAll(".foto");

semuafoto.forEach(foto => {
  foto.addEventListener('click', () => {
    lihatGambar(foto);
  });
});

function lihatGambar(img) {
  const popup = document.getElementById('popup');
  const popupImg = document.getElementById('popup-img');
  popupImg.src = img.src;
  popup.style.display = 'flex';
}

function tutupPopup() {
  document.getElementById('popup').style.display = 'none';
}

const appearOnScroll = new IntersectionObserver(function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("show");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach((fader) => {
  appearOnScroll.observe(fader);
});
