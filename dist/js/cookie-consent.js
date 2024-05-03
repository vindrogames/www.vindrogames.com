const googleAnalyticsBtn = $('#google-analytics-check');

const gameScoresBtn = $('#game-scores-check');

const cookiesDone = $('#submit-cookies');

const changeCookiesPref = $('#change-cookies-pref')


function checkGoogleAnalytics(googleAnalytics) {
  //var googleAnalyticsGranted = false;

  if (googleAnalytics.is(':checked')) {
    console.log("Google Analytics granted");

    const consentMode = {
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'ad_storage': 'denied',
      'analytics_storage': 'granted',
    };

    localStorage.setItem('consentMode', JSON.stringify(consentMode));
    return gtag('consent', 'update', consentMode);
  } else if (!googleAnalytics.is(':checked')) {

    console.log("Google Analytics NOT granted");

    const consentMode = {
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'ad_storage': 'denied',
      'analytics_storage': 'denied',
    };

    localStorage.setItem('consentMode', JSON.stringify(consentMode));
    return gtag('consent', 'update', consentMode);    
  }

  return ;
}

function checkGameScores(gameScores) {
  
  if(gameScores.is(':checled')) {

    //Allow Game Scores
  }
}

function hideCookiesBanner() {
  $('.cookie-consent-background').hide();
  $('#cookie-consent-banner').hide();
}

function cookiesUpdate() {
  checkGoogleAnalytics(googleAnalyticsBtn);
  hideCookiesBanner();
}

if(localStorage.getItem('consentMode')) {

  document.querySelector('#cookie-consent-banner').style.display = 'none';
  document.querySelector('.cookie-consent-background').style.display = 'none';
} else {

  cookiesDone.on('click', cookiesUpdate);
}

function showCookiesBanner() {
  $('#cookie-consent-banner').show();
}

changeCookiesPref.on('click', () => {
  showCookiesBanner();
  cookiesDone.on('click', cookiesUpdate);
});



