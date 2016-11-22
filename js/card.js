// Add cards to <div id="cards"></div>
// Format: <div id="CARD_NAME">CARD_NAME</div>
for(var i = 0; i < 8; i++){
	$('#cards').append('<div id="' + 'card' + i + '" class="card" ondrop="drop(event)" ondragover="allowDrop(event)"><img class="handle" src="assets/handle.png"></span></div>');
  // $('#cards').append('<div id="' + cards[i].name + '" class="card"></div>');
}

var cardCount = 0;

$('.card').hide();
$('#draw1').click(function(){
    if (cardCount >= 8) {
      document.getElementById("text_bubble").innerHTML = "Uh oh! No more cards left.";
    } else {
        $('#card' + cardCount).show(500);
        cardCount++;
    }
});


$('#reset').click(function(){
  $('.card').hide(200);
  cardCount = 0;
});

$(function() {
    $(".sortable").sortable({ handle: '.handle' });
    $(".sortable").disableSelection();
});