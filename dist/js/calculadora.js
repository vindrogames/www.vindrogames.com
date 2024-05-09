const championsAudio = new Audio("/madrid-calculator/intro-uefa-champions-league.mp3");
const siuAudio = new Audio("/madrid-calculator/siuuu.mp3")

const championsBtn = $('#champions');
const equalsBtn = $('#equals');
const audioBtn = $('.btn-audio');

championsBtn.on('click', (e) => {

  if (e.target.classList.contains('play')) {
    championsAudio.play();
  }
});

equalsBtn.on('click', (e) => {

  if (e.target.classList.contains('play')) {
    siuAudio.play();
  }
});

audioBtn.on('click', () => {

  championsBtn.toggleClass('play');
  equalsBtn.toggleClass('play');
  audioBtn.toggleClass('off');
});



