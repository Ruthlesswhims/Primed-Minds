$(document).ready(function () {

     $(window).scroll(function () {
      // Get the height of the banner,
      // and then set your menu.
      var bannerHeight = $('.nav_wrapper').height();
      // console.log(bannerHeight);
    if ($(window).scrollTop() > bannerHeight) {
      $('#nav_bar').addClass('navbar-fixed');
    }
    if ($(window).scrollTop() < bannerHeight) {
      $('#nav_bar').removeClass('navbar-fixed');
    }
  });

        $(".team1").on("mouseenter", function(){
            $(".bio1").slideDown(100);
        });

        $(".bio1").on("mouseleave", function(){
            $(".bio1").slideUp(100);
        });
           $(".team2").on("mouseenter", function(){
            $(".bio2").slideDown(100);
        });

        $(".bio2").on("mouseleave", function(){
            $(".bio2").slideUp(100);
        });
           $(".team3").on("mouseenter", function(){
            $(".bio3").slideDown(100);
        });

        $(".bio3").on("mouseleave", function(){
            $(".bio3").slideUp(100);
        });

$(".q1").click(function(){
        $(".a1").toggle();
    });
$(".q1").hover(function() {
        $(this).css('cursor','pointer');
    });
$(".q2").click(function(){
        $(".a2").toggle();
    });
$(".q2").hover(function() {
        $(this).css('cursor','pointer');
    });
$(".q3").click(function(){
        $(".a3").toggle();
    });
$(".q3").hover(function() {
        $(this).css('cursor','pointer');
    });
$(".q4").click(function(){
        $(".a4").toggle();
    });
$(".q4").hover(function() {
        $(this).css('cursor','pointer');
    });
$(".q5").click(function(){
        $(".a5").toggle();
    });
$(".q5").hover(function() {
        $(this).css('cursor','pointer');
    });
$(".q6").click(function(){
        $(".a6").toggle();
    });
$(".q6").hover(function() {
        $(this).css('cursor','pointer');
    });
    });

(function($) {
		$(function() {

$('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      hover: true, // Activate on hover
      belowOrigin: true, // Displays dropdown below the button
      constrainwidth: false, 
    }
  );

		}); // End Document Ready
})(jQuery); // End of jQuery name space

