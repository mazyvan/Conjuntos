$(document).ready(function () {
  $('.navbar-collapse a').click(function () {
    setTimeout(() => $(".navbar-collapse").collapse('hide') , 100); 
  });
});