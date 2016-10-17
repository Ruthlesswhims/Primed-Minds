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