$(document).ready(function () {
        $(".team1").on("mouseenter", function(){
            $(".bio1").slideDown(1000);
        });

        $(".bio1").on("mouseleave", function(){
            $(".bio1").slideUp();
        });
           $(".team2").on("mouseenter", function(){
            $(".bio2").slideDown(1000);
        });

        $(".bio2").on("mouseleave", function(){
            $(".bio2").slideUp();
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