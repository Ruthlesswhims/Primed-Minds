$(document).ready(function () {

// Add cards to <div id="cards"></div>
for (var i = 0; i < 8; i++) {
    $('#cards').append('<div id="' + 'card' + i + 
        '" class="card" ondrop="drop(event)" ondragover="allowDrop(event)">' +
        '<img class="handle" src="assets/card/handle.png"></span></div>');
}

var cardCount = 0;

$('.card').hide();
$('#draw1').click(function() {
    if (cardCount >= 8) {
        document.getElementById("text_bubble").innerHTML = "Uh oh! No more cards left.";
    } else {
        $('#card' + cardCount).show(500);
        cardCount++;
    }
});


$('#reset').click(function() {
    $('.card').hide(200);
    cardCount = 0;
});

$(function() {
    $(".sortable").sortable({ handle: '.handle' });
    $(".sortable").disableSelection();
});

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function dropTrash(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var el = document.getElementById(data);
    var index = findCardIndex(el.parentNode.id);
    console.log("removing " + data + " from card: " + index);
    var dataSubstring = data.substring(0, data.indexOf("_"));
    var deleted = cards[index].images.delete(dataSubstring);
    console.log(dataSubstring + " is deleted: " + deleted);
    el.parentNode.removeChild(el);
    findCardError();
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var nodeCopy = document.getElementById(data).cloneNode(true);
    if (ev.target.childNodes.length < 4) {
        var index = findCardIndex(ev.target.id);
        var contains = cards[index].images.has(data);
        console.log(contains);
        if (contains) {
            document.getElementById("text_bubble").innerHTML = "Oops, you can't repeat monsters on a card!";
        } else {
            nodeCopy.id += ("_" + index);
            ev.target.appendChild(nodeCopy);
            cards[index].images.add(data);
            console.log("adding " + data + " to " + index)
            findCardError();
        }
    } else {
        document.getElementById("text_bubble").innerHTML = "Sorry! No more than 3 monsters per card";
    }
}

// Array of cards (objects).
var cards = [];

// Create 8 cards & push to array of cards.
for (var i = 0; i < 8; i++) {
    // Temporary object
    var tempCard = {
        // Each card gets a name: card0, card1, etc.
        name: 'card' + i,
        // By default, each card is invalid (red).
        valid: false,
        // At the start, cards don't have any images.
        // imageName: numPresent,
        images: new Set(),
    }

    // Add temp card to array of cards.
    cards.push(tempCard);
}

function clearCards() {
    for (var i = 0; i < cards.length; i++) {
        document.getElementById(cards[i].name).style.backgroundColor = "#ffdd54";
        var el = document.getElementById(cards[i].name);
        // Should always have one child (the handle span, which is always child[0])
        while (el.childNodes.length != 1) {
            el.removeChild(el.childNodes[1]);
        }

        cards[i].images.clear();
        cards[i].valid = false;
    }
}

/*
 * Find index of a card in 'cards' array based on its name.
 * Returns -1 if card is not found.
 * Returns card index (in this case 0 - 6) if found.
 */
function findCardIndex(cardName) {
    // Set index to -1 (not found) by default. If found, we'll overwrite this.
    var index = -1;

    // Iterate through all the cards.
    for (var i = 0; i < cards.length; i++) {
        if (cards[i].name == cardName) {
            // Card name found. Set index & end looop.
            index = i;
            break;
        }
    }

    return index;
} /*END findCardIndex()*/

// Finds the first error, if any
function findCardError() {
    var foundError = false;
    var i = 0;
    while (!foundError && i < cards.length) {
        for (var j = 0; j < cards.length; j++) {
            // don't compare to itself
            if (i != j) {
                // only cards with 3 monsters should be compared
                if (cards[i].images.size == 3 && cards[j].images.size == 3) {
                    var matches = 0;
                    cards[j].images.forEach(function(image) {
                        if (cards[i].images.has(image)) {
                            matches++;
                        }
                    });
                    if (matches != 1) {
                        foundError = true;
                        cards[i].valid = false;
                        cards[j].valid = false;
                        var text = "Oh no! ";
                        if (matches == 0) {
                            text = "Oops! These two cards don't have a match.";
                        } else {
                            text = "Oh no! Cards can only match ONE monster.";
                        }
                        colorErrors(i, j, text);
                    } else {
                        cards[i].valid = true;
                        cards[j].valid = true;
                    }
                }
            }
        }
        i++;
    }
    if (!foundError) {
        colorCards();
    }
}

// Color cards x and y red, rest of the cards should be yellow
function colorErrors(x, y, text) {
    document.getElementById(cards[x].name).style.backgroundColor = "#f5493d";
    document.getElementById(cards[y].name).style.backgroundColor = "#f5493d";
    for (var i = 0; i < cards.length; i++) {
        if (i != x && i != y) {
            document.getElementById(cards[i].name).style.backgroundColor = "#ffdd54";
            document.getElementById("text_bubble").innerHTML = text;
        }
    }

}

// Called if no error was found
// Color all matching cards green, non-matched cards yellow
function colorCards() {
    for (var i = 0; i < cards.length; i++) {
        if (cards[i].images.size != 3) {
            document.getElementById(cards[i].name).style.backgroundColor = "#ffdd54";
        } else {
            if (cards[i].valid) {
                document.getElementById(cards[i].name).style.backgroundColor = "#53dd25";
                document.getElementById("text_bubble").innerHTML = "Great job! Can you match more cards?";
            } else {
                document.getElementById(cards[i].name).style.backgroundColor = "#ffdd54";
            }
        }
    }
}


});