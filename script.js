const audio = document.querySelector("#theme-song");
const enterButton = document.querySelector("[data-enter-page]");
const toggleButton = document.querySelector("[data-toggle-audio]");
const volumeControl = document.querySelector("[data-volume-control]");
const audioStatuses = document.querySelectorAll("[data-audio-status]");
const isLandingPage = document.body.classList.contains("landing-page");
const isShipwreckPage = document.body.classList.contains("shipwreck-page");
const isCelebrationPage = document.body.classList.contains("celebration-page");

const setStatus = (message) => {
  audioStatuses.forEach((status) => {
    status.textContent = message;
  });
};

const setToggleLabel = () => {
  if (!toggleButton || !audio) {
    return;
  }

  toggleButton.textContent = audio.paused ? "Play Music" : "Pause Music";
};

const playTheme = async () => {
  if (!audio) {
    return false;
  }

  try {
    audio.volume = volumeControl ? Number(volumeControl.value) : 0.7;
    await audio.play();
    sessionStorage.setItem("themeSongStarted", "true");
    setStatus("Music is playing.");
    setToggleLabel();
    return true;
  } catch (error) {
    sessionStorage.removeItem("themeSongStarted");
    setStatus("Add assets/little-mermaid-theme.mp3 to play the song.");
    setToggleLabel();
    return false;
  }
};

if (enterButton) {
  enterButton.addEventListener("click", async () => {
    const nextPage = enterButton.getAttribute("data-enter-page");
    await playTheme();

    if (nextPage) {
      window.location.href = nextPage;
    }
  });
}

if (toggleButton && audio) {
  toggleButton.addEventListener("click", async () => {
    if (audio.paused) {
      await playTheme();
    } else {
      audio.pause();
      sessionStorage.removeItem("themeSongStarted");
      setStatus("Music is paused.");
      setToggleLabel();
    }
  });
}

if (volumeControl && audio) {
  audio.volume = Number(volumeControl.value);
  volumeControl.addEventListener("input", () => {
    audio.volume = Number(volumeControl.value);
  });
}

if (audio) {
  audio.addEventListener("play", setToggleLabel);
  audio.addEventListener("pause", setToggleLabel);
  audio.addEventListener("error", () => {
    setStatus("Add assets/little-mermaid-theme.mp3 to play the song.");
    setToggleLabel();
  });
}

if (sessionStorage.getItem("themeSongStarted") === "true") {
  playTheme();
} else {
  setToggleLabel();
}

if (isLandingPage && window.gsap) {
  const { gsap } = window;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReducedMotion) {
    gsap.to(".hero-shell", {
      y: -14,
      x: 6,
      rotation: 0.45,
      duration: 4.8,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });

    gsap.to(".light-rays", {
      x: 36,
      rotation: 2.4,
      duration: 7.5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });

    gsap.to(".caustics-one", {
      x: 44,
      y: 18,
      rotation: 5,
      duration: 9,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });

    gsap.to(".caustics-two", {
      x: -34,
      y: 24,
      rotation: -4,
      duration: 11,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });

    gsap.to(".sway-grass", {
      skewX: 5,
      x: 8,
      duration: 3.6,
      stagger: 0.45,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });

    gsap.to(".marine-snow i", {
      x: "random(-18, 22)",
      y: "random(18, 46)",
      opacity: "random(0.24, 0.66)",
      duration: "random(4.5, 8)",
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: {
        each: 0.18,
        from: "random"
      }
    });

    gsap.to(".bubbles span", {
      x: "random(-18, 24)",
      scale: "random(0.82, 1.16)",
      duration: "random(2.5, 4.8)",
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: 0.12
    });
  }
}

if (isShipwreckPage && window.gsap) {
  const { gsap } = window;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReducedMotion) {
    gsap.to(".shipwreck-art", {
      y: -10,
      rotation: -3.8,
      duration: 5.8,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });

    gsap.to(".wreck-mast", {
      skewX: 1.5,
      duration: 4.6,
      transformOrigin: "50% 90%",
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });

    gsap.to(".deep-caustics", {
      x: 34,
      y: 18,
      rotation: 3,
      duration: 10,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });

    gsap.to(".reef", {
      skewX: 4,
      x: 7,
      duration: 4.2,
      stagger: 0.35,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });
  }
}

if (isCelebrationPage) {
  const confetti = document.querySelector("[data-confetti]");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (confetti) {
    const colors = ["#ffd166", "#ff6f61", "#ffb6b9", "#8df0dc", "#1ecad3", "#fff6dc"];

    for (let index = 0; index < 64; index += 1) {
      const piece = document.createElement("span");
      piece.style.setProperty("--left", `${Math.random() * 100}%`);
      piece.style.setProperty("--delay", `${Math.random() * -5}s`);
      piece.style.setProperty("--speed", `${3.2 + Math.random() * 3.8}s`);
      piece.style.setProperty("--drift", `${Math.random() * 8 - 4}rem`);
      piece.style.setProperty("--spin", `${Math.random() > 0.5 ? 1 : -1}`);
      piece.style.setProperty("--confetti-color", colors[index % colors.length]);
      confetti.appendChild(piece);
    }
  }

  if (window.gsap && !prefersReducedMotion) {
    const { gsap } = window;

    gsap.fromTo(
      ".mermaid-drop",
      { y: "-120vh", rotation: -14, opacity: 0 },
      { y: 0, rotation: 0, opacity: 1, duration: 2.2, ease: "bounce.out", delay: 0.35 }
    );

    gsap.to(".mermaid-drop", {
      y: -10,
      rotation: 2,
      duration: 4.2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: 2.5
    });

    gsap.from(".final-panel", {
      y: 32,
      opacity: 0,
      duration: 1.1,
      ease: "power2.out",
      delay: 1.05
    });
  }
}
