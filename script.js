const audio = document.querySelector("#theme-song");
const enterButton = document.querySelector("[data-enter-page]");
const toggleButton = document.querySelector("[data-toggle-audio]");
const volumeControl = document.querySelector("[data-volume-control]");
const audioStatuses = document.querySelectorAll("[data-audio-status]");

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
