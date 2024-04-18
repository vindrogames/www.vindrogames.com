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

$('#hero a, .btn').on('click', function (e) {
  if (this.hash !== '') {
      e.preventDefault();

      const hash = this.hash;

      $('html, body').animate({
          scrollTop: $(hash).offset().top - 200,
      },800);
  }
});

// Footer social resize


if (window.innerWidth < 453){

  console.log("small window");
  $('.fab').removeClass('fa-4x').addClass('fa-2x');
} else if (window.innerWidth > 452 && $('.fa-2x')){
  
  $('.fab').removeClass('.fa-2x').addClass('fa-4x');
}

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



