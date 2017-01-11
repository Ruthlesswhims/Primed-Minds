$(document).ready(function () {
    // ABOUT PAGE - team bios 
    // on hover, appear
    $(".team1").on("mouseenter", function(){
        $(".bio1").slideDown(100);
    });
    $(".team2").on("mouseenter", function(){
        $(".bio2").slideDown(100);
    });
    $(".team3").on("mouseenter", function(){
        $(".bio3").slideDown(100);
    });
    // move mouse to disappear / show cursor
    $(".col-1-3").on("mouseleave", function(){
            $(".bio1").slideUp(100);
    });
    $(".team1").hover(function() {
        $(this).css('cursor','pointer');
    });
    $(".col-2-3").on("mouseleave", function(){
            $(".bio2").slideUp(100);
    });
    $(".team2").hover(function() {
        $(this).css('cursor','pointer');
    });
    $(".col-3-3").on("mouseleave", function(){
            $(".bio3").slideUp(100);
    });
    $(".team3").hover(function() {
        $(this).css('cursor','pointer');
    });

    // ABOUT PAGE - FAQ 
    $("#q1").click(function(){
        $("#a1").toggle();
        $("#q1-plus").html($("#q1-plus").html() == '+' ? '-' : '+');
    });
    $("#q1").hover(function() {
        $(this).css('cursor','pointer');
    });
    $("#q2").click(function(){
        $("#a2").toggle();
        $("#q2-plus").html($("#q2-plus").html() == '+' ? '-' : '+');
    });
    $("#q2").hover(function() {
        $(this).css('cursor','pointer');
    });
    $("#q3").click(function(){
        $("#a3").toggle();
        $("#q3-plus").html($("#q3-plus").html() == '+' ? '-' : '+');
    });
    $("#q3").hover(function() {
        $(this).css('cursor','pointer');
    });
    $("#q4").click(function(){
        $("#a4").toggle();
        $("#q4-plus").html($("#q4-plus").html() == '+' ? '-' : '+');
    });
    $("#q4").hover(function() {
        $(this).css('cursor','pointer');
    });
    $("#q5").click(function(){
        $("#a5").toggle();
        $("#q5-plus").html($("#q5-plus").html() == '+' ? '-' : '+');
    });
    $("#q5").hover(function() {
        $(this).css('cursor','pointer');
    });
});