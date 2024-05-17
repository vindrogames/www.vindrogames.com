// Navbar animation on scroll
const navbar = $('#navbar');
let scrolled = false;

window.onscroll = function () {
  if (window.pageYOffset > 100) {
    navbar.removeClass('top');
    if (!scrolled) {
      navbar.css({'transform' : 'translateY(-70px)'});
    }
    setTimeout(function () {
      navbar.css({'transform' : 'translateY(0)'});
      scrolled = true;
    }, 200);
    } else {
      navbar.addClass('top');
      scrolled = false;
    }
};


const gamePositions = $('.pos-42');
const playBtn = $('#game-42-play-button');
const currentPointsHeader = $('.current-game-42-header');
const currentPoints = $('.current-game-42-points');
const prevPoints = $('.prev-game-42-points');
const bestPoints = $('.best-game-42-points');

let numsRound = [];
let numsToCheck = [];
let gameStart = false;
let gameOver = false;
let numsAscen = true;
let numsDescen = true;
let tempNum;
let clickEnabled = false;
let gameRoundPoints = 0;
let gameRoundScores = [];

function generateGameNum(numsRound) {

  let numGenerated = Math.floor((Math.random() * 42) + 1);

  if (numsRound.includes(numGenerated)) {

    return generateGameNum(numsRound);
  } else {
    
    return numGenerated;
  }
};

function checkAscen(numsToCheck) {

  let i = 0;
  while (i < numsToCheck.length - 1) {

    console.log("Checking Ascen " + numsToCheck[i] + " and " + numsToCheck[(i + 1)] );
    if (numsToCheck[i] > numsToCheck[(i + 1)]) {

      console.log("Ascen returns false");
      return false;
    }
    i++;
  }

  return true;
}

function checkDescen(numsToCheck) {

  let i = numsToCheck.length - 1;
  while (i > 0) {

    console.log("Checking Descen " + numsToCheck[i] + " and " + numsToCheck[(i - 1)] );
    if (numsToCheck[(i - 1)] > numsToCheck[i]) {

      console.log("Descen returns false");
      return false;
    }
    i--;
  }

  return true;
}

function checkBoard(numsToCheck) {

  console.log(numsToCheck);
  numsAscen = checkAscen(numsToCheck);
  numsDescen = checkDescen(numsToCheck);

  console.log(numsAscen);
  console.log(numsDescen);

  if (!numsAscen || !numsDescen) {

    return true;
  } else {

    return false;
  }
}

function game42Over(gameRoundScores, gameRoundPoints) {

  currentPointsHeader.html('Game ');
  currentPoints.html('Over');

  prevPoints.html(gameRoundPoints);
  gameRoundScores.push(gameRoundPoints);

  bestPoints.html(Math.max(...gameRoundScores));
  return gameOver = true;
}

function end42Game() {
  if (gameRoundPoints === 42) {

    playBtn.htmml('42: You Win');
  }
}

function animateGamePosition(pos) {

  
}

playBtn.on('click', () => {

  if (!gameStart)
  {

    if (gameOver) {

      currentPointsHeader.html('Points:');
      currentPoints.html('');
      playBtn.removeClass('game-over');
      gameRoundPoints = 0;

      gamePositions.removeClass('game-over');
      gamePositions.removeClass('filled');
      gamePositions.addClass('open');

      let j = 1;
      $.each(gamePositions, function(i){

        console.log($(this).html());
        $(this).html(j + '.');
        console.log($(this).html());
        j++;
      });
      /*
      let i = 1;
      positions42All.forEach(position => {

        if (position.classList.contains('game-over')) {

          position.classList.remove('game-over');
        }
        position.innerText = i + "."
        position.classList.remove('filled');
        position.classList.add('open');

        i++;
      });*/

      numsToCheck.length = 0;

      gameOver = false;
    }
    console.log("game starting now");
    numsRound = ['', '' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,'' ,''];
    gameStart = true;
  }

  tempNum = generateGameNum(numsRound);
  playBtn.html(tempNum);
  //await setGameNumber(tempNum, numsRound);
  playBtn.prop('disabled', true);
  gamePositions.prop('disabled', false);
});

gamePositions.on('click', (e) => {

  if ($(e.target).hasClass('open')) 
  {
    console.log("game pos clicked");
    console.log("btn open");
    $(e.target).removeClass('open');
    $(e.target).addClass('filled');
    $(e.target).html(tempNum);
    numsRound[e.target.id - 1] = tempNum;
    gamePositions.prop('disabled', true);
    playBtn.prop('disabled', false);
    playBtn.html('Next Number');
    numsToCheck = numsRound.filter(numCheck => numCheck !== '');

    if (numsToCheck.length > 1)
    {

      //gameOver = checkBoard(numsToCheck);

      if (gameOver = checkBoard(numsToCheck))
      {

        $(e.target).addClass('game-over');
        $(e.target).html('game over');
        playBtn.html('Start New Game');
        playBtn.addClass('game-over');
        gameStart = false;
        game42Over(gameRoundScores, gameRoundPoints);
        numsToCheck.length = 0;
      } 
      else 
      {
        gameRoundPoints += 3;
        currentPoints.html(gameRoundPoints);
      }
    }
    else
    {
      gameRoundPoints += 3;
      currentPoints.html(gameRoundPoints);
    }
  }
});