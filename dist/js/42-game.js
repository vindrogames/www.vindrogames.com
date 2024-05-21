const navbar = $('#navbar');
const navbarHam = $('#navbar-hamburger');
const hamburgerToggle = $('#hamburger-toggler');
const hamToggleContainer = $('#hamburger-container');
const hamburgerMenu = $('nav#hamburger-menu');
const hamburgerNav = $('nav#hamburger-menu ul');

// Navbar animation on scroll (Same as in index file)
let scrolled = false;

window.onscroll = function () {
  if (window.pageYOffset > 100) {
    navbar.removeClass('top');
    navbarHam.removeClass('top');
    if (!scrolled) {
      navbar.css({'transform' : 'translateY(-70px)'});
      navbarHam.css({'transform' : 'translateY(-70px)'});
    }
    setTimeout(function () {
      navbar.css({'transform' : 'translateY(0)'});
      navbarHam.css({'transform' : 'translateY(0)'});
      scrolled = true;
    }, 200);
    } else {
      navbar.addClass('top');
      navbarHam.addClass('top');
      scrolled = false;
    }
};

// Hamburger-menu
// First menu slides in then display Nav ul
function showHamburgerNav()
{
  return new Promise((resolve) => 
  {
    setTimeout(() =>
    {
      resolve(hamburgerNav.css('display', 'flex'));
    }, 400);
  });
}

async function showHamburgerMenu() {

  hamburgerMenu.css('display', 'block');
  hamburgerMenu.addClass('open');
  await showHamburgerNav();
}

// First Display none Nav ul then menu slides out
function hideHamburgerMenu() {

  return new Promise((resolve) => 
    {
      setTimeout(() =>
      {
        resolve(hamburgerMenu.removeClass('open'));
      }, 200);
    });
}

async function hideHamburgerNav()
{
  hamburgerNav.css('display', 'none');
  await hideHamburgerMenu();
}

hamburgerToggle.on('click', (e) => {

  console.log("Toggle Clicked");
  
  hamburgerToggle.toggleClass('open');
  hamToggleContainer.toggleClass('open');
  if ($(e.target).hasClass('open'))
  {
    console.log("Has Hamburger Class");
    showHamburgerMenu()
  }
  else
  {
    hideHamburgerNav();
  }
})

// Checkboxes and submit button in banner
const googleAnalyticsBtn = $('#google-analytics-check');
const gameScoresBtn = $('#game-scores-check');
const cookiesDone = $('#submit-cookies');

// link to bring cookies banners back to change preferences
const changeCookiesPref = $('#change-cookies-pref')

// Evaluates GA checkbox
function checkGoogleAnalytics(googleAnalytics) {

  // Checks to see if GA checkbox is checked
  if (googleAnalytics.is(':checked')) {

    // Defines consent Mode value pairs to be sent to GA as well as saved on local storage of user
    const consentMode = {
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'ad_storage': 'denied',
      'analytics_storage': 'granted',
    };

    // sets consentMode on local storage, which will be evaluated when visiting site
    localStorage.setItem('consentMode', JSON.stringify(consentMode));

    // Sends consent settings to Google. Only GA is updated AS WE DON'T DO ADS
    gtag('consent', 'update', consentMode);
    return "gaTrue";
  } else if (!googleAnalytics.is(':checked')) {

    // If GA is NOT checked then deny GA storage
    const consentMode = {
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'ad_storage': 'denied',
      'analytics_storage': 'denied',
    };

    // sets consentMode on local storage, which will be evaluated when visiting site
    localStorage.setItem('consentMode', JSON.stringify(consentMode));

    // Sends consent to GA
    gtag('consent', 'update', consentMode);
    return "gaFalse";
  }

  return ;
}

// Evaluates Game Scores Checkbox
function checkGameScores(gameScores) {
  
  if(gameScores.is(':checked')) {

    //Allow Game Scores
  }
}

function hideCookiesBanner() {
  $('.cookie-consent-background').hide();
  $('#cookie-consent-banner').hide();
}


function consentUpdate() {
  let gaConsent = checkGoogleAnalytics(googleAnalyticsBtn);
  let gameConsent = checkGameScores(gameScoresBtn);
  hideCookiesBanner();

  return [gaConsent, gameConsent];
}

// Evaluates if user already has consent Mode saved on their local storage and therefore consent sent to GA
if(localStorage.getItem('consentMode')) {

  document.querySelector('#cookie-consent-banner').style.display = 'none';
  document.querySelector('.cookie-consent-background').style.display = 'none';
} else {

  cookiesDone.on('click', consentUpdate);
}

function showCookiesBanner() {
  $('#cookie-consent-banner').show();
}


function eliminateAnalyticsCookies() {

  const cookies = document.cookie.split(';');

  cookies.forEach(cook => {

    if (cook.match('_ga')) {
      document.cookie = cook + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
  });
}

changeCookiesPref.on('click', () => {
  showCookiesBanner();

  cookiesDone.on('click', () => {
    if (consentUpdate()[0] === "gaFalse") {
      eliminateAnalyticsCookies()
    };
  });
});

// 42 Game Code
const gamePositions = $('.pos-42');
const playBtn = $('#game-42-play-button');
const currentPointsHeader = $('.current-game-42-header');
const currentPoints = $('.current-game-42-points');
const prevPoints = $('.prev-game-42-points');
const bestPoints = $('.best-game-42-points');
const main42 = $('main.game-42');
const endGameScreen = $('#end-game-42');
const endGamePlayAgain = $('#end-game-42-play-again');
const endGameAudio = new Audio("/42-the-game/42-end-game-sound.mp3");

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

  let numGenerated = Math.floor((Math.random() * 14) + 1);

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

endGamePlayAgain.on('click', (e) => {

  main42.removeClass('end-game-2');
  gamePositions.each((i, pos) => {
    $(pos).removeClass('end-game-2');
    $(pos).addClass('open');
  });
  endGameScreen.css({'display': 'none'});
  playBtn.html('Start New Game');
  currentPoints.html('0');

});

function sleep(ms) {
  return new Promise ((resolve) => setTimeout(resolve, ms));
};

async function animateGamePosition() {

  endGameAudio.play();
  main42.addClass('end-game-1');

  console.log("animation called");
  // First positions animation with background + text + button change
  for (const pos of gamePositions) {
    $(pos).removeClass('filled');
    $(pos).addClass('end-game-1');
    await sleep(21);
  }
  // Second positions animation with background + text + button change
  await sleep(1800);
  main42.removeClass('end-game-1');
  main42.addClass('end-game-2');

  for (const pos of gamePositions) {
    $(pos).removeClass('end-game-1');
    $(pos).addClass('end-game-2');
    await sleep(21);
  }

  // Show end game div
  await sleep(750);
  endGameScreen.css({'display': 'flex'});
}

function checkEndGame() {
  if (gameRoundPoints === 42) {

    console.log("entering end game if");
    playBtn.html('42: You Win');
    animateGamePosition();
    prevPoints.html(gameRoundPoints);
    bestPoints.html(gameRoundPoints);
  }
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
        checkEndGame();
      }
    }
    else
    {
      gameRoundPoints += 3;
      currentPoints.html(gameRoundPoints);
    }
  }
});