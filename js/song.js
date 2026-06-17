(function () {
  var audio = document.getElementById("bgMusic");
  var btn = document.getElementById("musicToggle");
  if (!audio || !btn) return;
  var iconOff = btn.querySelector(".music-icon--off");
  var iconOn = btn.querySelector(".music-icon--on");
  var playing = false;

  function setPlaying(on) {
    playing = on;
    iconOff.style.display = on ? "none" : "block";
    iconOn.style.display = on ? "block" : "none";
    btn.setAttribute("aria-label", on ? "Silenciar música" : "Activar música");
  }

  function tryPlay() {
    audio.play().then(function () { setPlaying(true); }).catch(function () {});
  }

  tryPlay();

  document.addEventListener("click", function autoStart() {
    if (!playing) tryPlay();
    document.removeEventListener("click", autoStart);
  });

  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    if (playing) { audio.pause(); setPlaying(false); }
    else { tryPlay(); }
  });
})();
