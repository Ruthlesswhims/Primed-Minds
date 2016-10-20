$(document).ready(function () {

        $(".team1").on("mouseenter", function(){
            $(".bio1").slideDown(100);
        });

        $(".bio1").on("mouseleave", function(){
            $(".bio1").slideUp(10);
        });
           $(".team2").on("mouseenter", function(){
            $(".bio2").slideDown(100);
        });

        $(".bio2").on("mouseleave", function(){
            $(".bio2").slideUp(10);
        });
           $(".team3").on("mouseenter", function(){
            $(".bio3").slideDown(100);
        });

        $(".bio3").on("mouseleave", function(){
            $(".bio3").slideUp(10);
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

// $(".team1").click(function(){
//         $(".bio1").toggle();
//     });
// $(".team1").hover(function() {
//         $(this).css('cursor','pointer');
//     });
// $(".team2").click(function(){
//         $(".bio2").toggle();
//     });
// $(".team2").hover(function() {
//         $(this).css('cursor','pointer');
//     });
// $(".team3").click(function(){
//         $(".bio3").toggle();
//     });
// $(".team3").hover(function() {
//         $(this).css('cursor','pointer');
//     });

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

