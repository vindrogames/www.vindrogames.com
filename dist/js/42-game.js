
// Score fields in DOM for prev and best scores
const prevPoints = $('.prev-game-42-points');
const bestPoints = $('.best-game-42-points');
gameRoundScores = [];
// Prevent Consent Banner from flickering if consent has already been given
// Evaluates if user already has consent Mode saved on their local storage and therefore consent sent to GA
$(document).ready(() => {
  
  if(!localStorage.getItem('consentModeGa')) {

  document.querySelector('#cookie-consent-banner').style.display = 'flex';
  document.querySelector('.cookie-consent-background').style.display = 'block';
  }
  
  if(localStorage.getItem('consentGameScores')) {

    //console.log("looking for high score");
    //console.log(localStorage.getItem('consentGameScores'));
    //console.log(JSON.parse(localStorage.getItem('consentGameScores'))['prev42']);

    bestPoints.html(JSON.parse(localStorage.getItem('consentGameScores'))['best42']);
    prevPoints.html(JSON.parse(localStorage.getItem('consentGameScores'))['prev42']);
    gameRoundScores.push(JSON.parse(localStorage.getItem('consentGameScores'))['best42']);

  }
});

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

// Cookie Consent Scripts
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
    let consentModeGa = {
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'ad_storage': 'denied',
      'analytics_storage': 'granted',
    };

    // sets consentModeGa on local storage, which will be evaluated when visiting site
    localStorage.setItem('consentModeGa', JSON.stringify(consentModeGa));

    // Sends consent settings to Google. Only GA is updated AS WE DON'T DO ADS
    gtag('consent', 'update', consentModeGa);
    return "gaTrue";

  } else if (!googleAnalytics.is(':checked')) {

    // If GA is NOT checked then deny GA storage
    let consentModeGa = {
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'ad_storage': 'denied',
      'analytics_storage': 'denied',
    };

    // sets consentModeGa on local storage, which will be evaluated when visiting site
    localStorage.setItem('consentModeGa', JSON.stringify(consentModeGa));

    // Sends consent to GA
    gtag('consent', 'update', consentModeGa);
    return "gaFalse";
  }

  return ;
}

// Evaluates Game Scores Checkbox
function checkGameScores(gameScores) {
  
  if(gameScores.is(':checked')) {

    // Allow Game Scores defines an object to save in LOCAL STORAGE, no date yet.
    consentGameScores = {
      'gameScores' : 'granted',
      'best42' : 0,
      'prev42' : 0,
      'SET' : 0,
    }

    localStorage.setItem('consentGameScores', JSON.stringify(consentGameScores));

    // Returns gamesTrue or gamesFalse for update function to display checkbox ticked or not as well as to identify if we need to eliminate cookies and/or games local storage
    return 'gamesTrue';

  } else if (!gameScores.is(':checked')) {

    return 'gamesFalse';
  }
}

// Simply hides cookie banner, final function call when cookiesDone button is clicked
function hideCookiesBanner() {
  $('.cookie-consent-background').hide();
  $('#cookie-consent-banner').hide();
}

// Main function calls GA function, Games function, hides banner and returns status for gaConsent and gamesConsent
function consentUpdate() {
  let gaConsent = checkGoogleAnalytics(googleAnalyticsBtn);
  let gameConsent = checkGameScores(gameScoresBtn);
  hideCookiesBanner();

  return [gaConsent, gameConsent];
}

// Function to eliminate GA cookies, mainly for if a user updates their preferences AFTER an inicial consentMode
function eliminateAnalyticsCookies() {

  // gets cookies and splits each cookie into array
  const cookies = document.cookie.split(';');

  // Loops through each cookie looking for '_ga' and if found, sets expiry date so as to eliminate it
  cookies.forEach(cook => {

    if (cook.match('_ga')) {
      document.cookie = cook + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
  });
}

// Function for change preferences from privacy-cookie page
changeCookiesPref.on('click', () => {

  // displays banner with flex
  $('#cookie-consent-banner').css({'display' : 'flex'});
  
  // Checks if GA consent mode is saved on local storage
  if (JSON.parse(localStorage.getItem('consentModeGa'))

    // If so, checks to see if analytics storgae is denied and if so the checkbox is displayed with NO CHECK
    ['analytics_storage'] === 'denied'){
    googleAnalyticsBtn.checked = false;
  }
  
  // Same for games consent
  if (!localStorage.getItem('consenModeGa')) {
    gameScoresBtn.checked = false;
  }
});

// Done button in cookies banner calls it ALL
cookiesDone.on('click', () => {

  let consentArray = consentUpdate();
  console.log(consentArray);

  if (consentArray[0] === 'gaFalse') {
    eliminateAnalyticsCookies();
    console.log("cookies eliminated");
  }

  if (consentArray[1] === 'gamesFalse' && localStorage.getItem('consentGameScores')) {
    localStorage.removeItem('consentGameScores');
  }
});

// 42 Game Code
// Declare DOM elements as constants
const gamePositions = $('.pos-42');
const playBtn = $('#game-42-play-button');
const currentPointsHeader = $('.current-game-42-header');
const currentPoints = $('.current-game-42-points');
const main42 = $('main.game-42');
const endGameScreen = $('#end-game-42');
const endGamePlayAgain = $('#end-game-42-play-again');
const endGameAudio = new Audio("/games/42-the-game/42-end-game-sound.mp3");

let numsRound = [];
let numsToCheck = [];
let gameStart = false;
let gameOver = false;
let numsAscen = true;
let numsDescen = true;
let tempNum;
let clickEnabled = false;
let gameRoundPoints = 0;
let bestScore = 0;
let prevScore = 0;


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

  gameRoundScores.push(gameRoundPoints);

  prevScore = gameRoundPoints;
  bestScore = Math.max(...gameRoundScores);

  prevPoints.html(prevScore);
  bestPoints.html(bestScore);

  if (localStorage.getItem('consentGameScores')) {
    consentGameScores = JSON.parse(localStorage.getItem('consentGameScores'));

    consentGameScores['prev42'] = prevScore;
    consentGameScores['best42'] = bestScore;
    console.log(consentGameScores['game42']);
    localStorage.setItem('consentGameScores', JSON.stringify(consentGameScores));
  }

  gamePositions.prop('disabled', true);
  playBtn.prop('disabled', false);

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

async function endGameAnimation() {

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
    endGameAnimation();
    
    gameRoundScores.push(gameRoundPoints);

    prevScore = gameRoundPoints;
    bestScore = Math.max(...gameRoundScores);

    prevPoints.html(prevScore);
    bestPoints.html(bestScore);

    if (localStorage.getItem('consentGameScores')) {
      consentGameScores = JSON.parse(localStorage.getItem('consentGameScores'));

      consentGameScores['prev42'] = prevScore;
      consentGameScores['best42'] = bestScore;
      localStorage.setItem('consentGameScores', JSON.stringify(consentGameScores));
    }
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

      $.each(gamePositions, function(i) {

        $(this).html(j + '.');
        j++;
      });

      numsToCheck.length = 0;
      gameOver = false;
    }

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
    $(e.target).removeClass('open');
    $(e.target).addClass('filled');
    $(e.target).html(tempNum);
    numsRound[e.target.id - 1] = tempNum;


    numsToCheck = numsRound.filter(numCheck => numCheck !== '');

    if (numsToCheck.length > 1)
    {

      //gameOver = checkBoard(numsToCheck);
      if (gameOver = checkBoard(numsToCheck))
      {

        $(e.target).addClass('game-over');
        $(e.target).html('game over');
        playBtn.html('New Game');
        playBtn.addClass('game-over');
        gameStart = false;
        game42Over(gameRoundScores, gameRoundPoints);
        numsToCheck.length = 0;
        return;
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

    tempNum = generateGameNum(numsRound);
    playBtn.html(tempNum);
  }
});