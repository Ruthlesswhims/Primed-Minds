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

(function() {
	function setCurrent(val) {
		$("$(" + val + ")").addClass("current");
	}
});