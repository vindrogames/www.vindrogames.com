const navbar = $('#navbar');
const navbarHam = $('#navbar-hamburger');
const hamburgerToggle = $('#hamburger-toggler');
const hamToggleContainer = $('#hamburger-container');
const hamburgerMenu = $('nav#hamburger-menu');
const hamburgerNav = $('nav#hamburger-menu ul');

// Navbar animation on scroll
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


// Smooth Scroll
$('#home-smooth-scroll').on('click', function (e) {
  if (this.hash !== '') {
      e.preventDefault();

      const hash = this.hash;

      $('html, body').animate({
          scrollTop: $(hash).offset().top - 200,
      },800);
  }
});

// Timeline Script
const items = document.querySelectorAll('#timeline li');
const isInViewport = el => {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
    (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

const run = () =>
  items.forEach(item => {
    if (isInViewport(item)) {
      item.classList.add('show');
    }
});

// Events Timeline Script
window.addEventListener('load', run);
window.addEventListener('resize', run);
window.addEventListener('scroll', run);



