<<<<<<< HEAD
// Array of cards (objects).
var cards = [];

// Create 7 cards & push to array of cards.
for(var i = 0; i < 8; i++){
  
  // Temporary object
  var tempCard = {
  
    // Each card gets a name: card0, card1, etc.
    name: 'card' + i,
    // By default, each card is invalid (red).
    valid: false,
    // At the start, cards don't have any images.
    image: null,
  }

    // Add temp card to array of cards.
    cards.push(tempCard);
}

// Add cards to <div id="cards"></div>
// Format: <div id="CARD_NAME">CARD_NAME</div>
for(var i = 0; i < cards.length; i++){
	$('#cards').append('<div id="' + cards[i].name + '" class="card">' + cards[i].name + '</div>');
}

// Wait for the page to load.		
$(function(){

	// Dragable character images.
	$(".image").draggable();

	// Droppable cards.
	$('.card').droppable({

          // Triggered when a character is dropped.
	  drop: function (event, ui) {

            // find index of this card using findCardIndex() function created below.
            var index = findCardIndex($(this).attr('id'));
    
            // Using the 'index' found above, set 'image' for this card.
            cards[index].image = ui.draggable.attr('image');
            
            // Validate cards setting their 'valid' key to TRUE or FALSE using function created below.
            validateCards();
            // Color cards based on 'valid' key using function created below.
            colorCards();
          },
	}); /* $('.card').droppable({}); */

});	/* END $(function(){}); */


/*
 * Find index of a card in 'cards' array based on its name.
 * Returns -1 if card is not found.
 * Returns card index (in this case 0 - 6) if found.
 */
function findCardIndex(cardName) {
	// Set index to -1 (not found) by default. If found, we'll overwrite this.
	var index = -1;

	// Iterate through all the cards.
	for(var i = 0; i < cards.length; i++){
          if (cards[i].name == cardName) {
              // Card name found. Set index & end looop.
              index = i;
              break;
          }
	}

        return index;
} /*END findCardIndex()*/


			/*
			 * Iterate through 'cards' array and set 'valid' key to TRUE or FALSE.
 			 * By default, set 'valid' for all cards to FALSE.
			 * Set 'valid' is TRUE if at least one other card has the same letter.
			 */
			function validateCards() {
				// First loop here using 'i'.
				for (var i = 0; i < cards.length; i++) {
					// By default set all 'valid' to FALSE.
					cards[i].valid = false;

					// Second loop using 'j'.
					for (var j = 0; j < cards.length; j++) {

						// IF statements checks for 3 conditions:
						// 1) 'i' cannot be the same as 'j'. Comparing cards[0].letter to cards[0].letter will always be TRUE, so we dont' want that.
						// 2) cards[i].letter cannot be NULL. If NULL, means there is no card there, so it has to be FALSE.
						// 3) If cards[i].letter and cards[j].letter have same letter, there is a match.
						if (i != j
								&& cards[i].image != null 
								&& cards[i].image == cards[j].image) {
							// There is a match. set 'valid' of card[i] to TRUE and end the loop, moving on to next card.
							cards[i].valid = true;
							break;
						}
					}
				}
			} /*END validateCards()*/

			/*
			 * Go through each card and color them using 'invalid-card' and 'valid-card' classes defined in CSS.
			 * If 'valid' is TRUE, remove 'invalid-card' class and add 'valid-card' class.
			 * If 'valid' is FALSE, remove 'valid-card' class and add 'invalid-card' class.
			 */
			function colorCards(){
				for (var i = 0; i < cards.length; i++) {
					if (cards[i].valid) {
						$('#' + cards[i].name).removeClass('invalid-card');
						$('#' + cards[i].name).addClass('valid-card');
					} else {
						$('#' + cards[i].name).removeClass('valid-card');
						$('#' + cards[i].name).addClass('invalid-card');
					}
				}
			} /*END colorCards()*/
=======
$( function() {
  $( ".cardDeck" ).draggable({ containment: "#main", scroll: false });
  $( ".obj" ).draggable({ containment: "#main", scroll: false });
} );

var images = [];
    images[0] = 'assets/blackPom.jpg';
    images[1] = 'assets/bwPom.jpg';
    images[2] = 'assets/bluePom.jpg';
    images[3] = 'assets/greenPom.jpg';
    images[4] = 'assets/orangePom.jpg';
    images[5] = 'assets/purplePom.jpg';
    images[6] = 'assets/redPom.jpg';

function selectRandomObj() {
    var random = Math.floor(Math.random() * 7);
  
    document.querySelector('#objects img').src = images[random];
}
>>>>>>> feliped
