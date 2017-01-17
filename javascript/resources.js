$(document).ready(function() {
    $(".team1").on("mouseenter", function() {
        $(".bio1").slideDown(100);
    });
    $(".team2").on("mouseenter", function() {
        $(".bio2").slideDown(100);
    });
    $(".team3").on("mouseenter", function() {
        $(".bio3").slideDown(100);
    });
    // move mouse to disappear / show cursor
    $(".col-1-3").on("mouseleave", function() {
        $(".bio1").slideUp(100);
    });
    $(".team1").hover(function() {
        $(this).css('cursor', 'pointer');
    });
    $(".col-2-3").on("mouseleave", function() {
        $(".bio2").slideUp(100);
    });
    $(".team2").hover(function() {
        $(this).css('cursor', 'pointer');
    });
    $(".col-3-3").on("mouseleave", function() {
        $(".bio3").slideUp(100);
    });
    $(".team3").hover(function() {
        $(this).css('cursor', 'pointer');
    });


})

console.log('jquery works')