////// UI Interactions ///////

// find the URL parameters
var urlParams;
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
    // changeSlide();
})();


function changeSlide() {
    // if already has slide param
    if ( urlParams["slide"] != null) {
        currentIndex = urlParams["slide"];
        // cycleItems();
    }

    window.history.pushState(urlParams, "", "?slide=" + currentIndex);
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

var currentIndex;
$(document).ready(function () {
    //slider
    var neutralWidth = 0;
    currentIndex = 0;
    var items = $('#main #slide'),
        itemAmt = items.length;

    function cycleItems() {
        var item = $('#main #slide').eq(currentIndex);
        items.hide();
        item.css('display', 'inline-block');
    }

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
        changeSlide();
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
        changeSlide();
    }


    $('.right-arrow').on('click', function() {
        slideIncrement();
        $('.left-arrow').show();
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
