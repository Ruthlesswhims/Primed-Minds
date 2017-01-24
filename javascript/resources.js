$(document).ready(function() {
    // on hover, appear
    $(".src1").on("mouseenter", function() {
        $(".bio1").slideDown(100);
        $(".bio1").css("display", "table");
        $(".bio2").hide();
        $(".bio3").hide();
    });
    $(".src2").on("mouseenter", function() {
        $(".bio2").slideDown(100);
        $(".bio2").css("display", "table");
        $(".bio1").hide();
        $(".bio3").hide();
    });
    $(".src3").on("mouseenter", function() {
        $(".bio3").slideDown(100);
        $(".bio3").css("display", "table");
        $(".bio1").hide();
        $(".bio2").hide();
    });

    $(".src1,.src2,.src3").hover(function() {
        $(this).css('cursor', 'pointer');
    });

    // if moving back up to header - get rid of bios 
    $(".header").on("mouseenter", function() {
        $(".bio1").slideUp(100);
        $(".bio2").slideUp(100);
        $(".bio3").slideUp(100);
    });
    // if moving down to contact button - get rid of bios
    $("#contact").on("mouseenter", function() {
        $(".bio1").slideUp(100);
        $(".bio2").slideUp(100);
        $(".bio3").slideUp(100);
    });
});