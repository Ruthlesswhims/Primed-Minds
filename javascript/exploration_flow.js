// find the URL parameters
// i.e. http://website.com/index.html?param1=x&param2=y
//      returns param1 = x, param2 = y
var urlParams;
var currentIndex = 0;
(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query)) {
       urlParams[decode(match[1])] = decode(match[2]);
    }

    // console.log(urlParams);
    if(urlParams.length == 0) {
        urlParams["s"] = 0;
    }
})();


function changeSlide() {
    // if already has slide param
    if ( urlParams["s"] != null) {
        // for safety, make sure index exists 
        var numSlides = document.querySelectorAll("#slide").length-1;
        if (urlParams["s"] < 0 || urlParams["s"] > numSlides) {
            currentIndex = 0; // if it does not exist, just go to slide 0
        } else {
            currentIndex = parseInt(urlParams["s"]);
        }
        cycleItems();
    }
    window.history.pushState(urlParams, "", "?s=" + currentIndex);
}

// actually cycle the slides 
function cycleItems() {
    // get all slides 
    var items = document.querySelectorAll("#slide");
    var item = document.getElementsByClassName('slide')[currentIndex];
    for(var i=0; i<items.length; i++) {
        items[i].style.display = 'none';
    }
    item.style.display = 'inline-block';
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        console.log('ended')
    }
}

$(function() {
    $(".meter > span").each(function() {
        $(this)
            .data("origWidth", $(this).width())
            .width(0)
            .animate({
                width: $(this).data("origWidth")
            }, 1200);
    });
});

// when the page loads
$(document).ready(function () {
    // call this so that if url sent with a specific slide number, it will start at that slide
    changeSlide();
    //slider
    var items = $('#main #slide');

    $('#increment').animate(({
                    'width': '+=' + 20*currentIndex + '%'
                }));


    function slideIncrement(n) {
        if (!n) {
            currentIndex += 1;
            if (currentIndex < 5) {
                cycleItems();
                $('#increment').animate(({
                    'width': '+=' + 20 + '%'
                }));
            } else {
                currentIndex = 4;
            }
        } else {
            currentIndex += n;
            if (currentIndex < 5) {
                cycleItems();
                $('#increment').animate(({
                    'width': '+=' + 20 * n + '%'
                }));
            } else {
                currentIndex = 4;
            }
        }
        cycleItems();
            window.history.pushState(urlParams, "", "?s=" + currentIndex);

    }

    function slideDecrement(n) {
        if (!n) {
            currentIndex -= 1;
            if (currentIndex >= 0) {
                $('#increment').animate(({
                    'width': '-=' + 20 + '%'
                }))
                cycleItems();
            } else {
                currentIndex = 0
            }

        } else {
            currentIndex -= n;
            if (currentIndex >= 0) {
                $('#increment').animate(({
                    'width': '-=' + 20 * n + '%'
                }))
                cycleItems();
            } else {
                currentIndex = 0
            }
        }
        cycleItems();
            window.history.pushState(urlParams, "", "?s=" + currentIndex);    }


    $('.right-arrow').on('click', function() {
        slideIncrement();
        // $('.left-arrow').show();
    });

    $('.left-arrow').on('click', function() {
        slideDecrement();
    });

    var $lengthOfProgress = $('.progress-tooltip ul li');

    $lengthOfProgress.on('click', function() {
        var $this = $(this);
        var newIndex = 0;
        if ($this.index() > currentIndex) {
            newIndex = $this.index() - currentIndex;
            slideIncrement(newIndex);
        } else {
            newIndex = currentIndex - $this.index();
            slideDecrement(newIndex);
        }
        cycleItems();
    });
});
