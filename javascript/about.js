$(document).ready(function() {
    // ABOUT PAGE - team bios 
    // on hover, appear
    $(".team1").on("mouseenter", function() {
        $(".bio1").slideDown(100);
        $(".bio1").css("display", "table");
    });
    $(".team2").on("mouseenter", function() {
        $(".bio2").slideDown(100);
        $(".bio2").css("display", "table");
    });
    $(".team3").on("mouseenter", function() {
        $(".bio3").slideDown(100);
        $(".bio3").css("display", "table");
    });
     $(".team1").on("mouseleave", function() {
        $(".bio1").slideUp(100);
        // $(".bio1").css("display", "table");
    });
    $(".team2").on("mouseleave", function() {
        $(".bio2").slideUp(100);
        // $(".bio2").css("display", "table");
    });
    $(".team3").on("mouseleave", function() {
        $(".bio3").slideUp(100);
        // $(".bio2").css("display", "table");
    });

    //partner mouse over
    $(".partner1").on("mouseenter", function() {
        $(".pbio1").slideDown(100);
        $(".pbio1").css("display", "table");
    });
    $(".partner2").on("mouseenter", function() {
        $(".pbio2").slideDown(100);
        $(".pbio2").css("display", "table");
    });

    // move mouse to disappear / show cursor
    $(".partner1").on("mouseleave", function() {
        $(".pbio1").slideUp(100);
    });

    $(".partner2").on("mouseleave", function() {
        $(".pbio2").slideUp(100);
    });

    $(".team1,.team2,.team3").hover(function() {
        $(this).css('cursor', 'pointer');
    });

    // ABOUT PAGE - FAQ 
    // keep tracks of which are open 
    var question_status = [];
    // initally, all statuses are false (meaning closed)
    for (var i=0; i<6; i++) {
        question_status[i] = false;
    }

    $("#q1").click(function() {
        expandAnswer(1);
    });
    $("#q1").hover(function() {
        $(this).css('cursor', 'pointer');
    });
    $("#q2").click(function() {
        expandAnswer(2);
    });
    $("#q2").hover(function() {
        $(this).css('cursor', 'pointer');
    });
    $("#q3").click(function() {
        expandAnswer(3);
    });
    $("#q3").hover(function() {
        $(this).css('cursor', 'pointer');
    });
    $("#q4").click(function() {
        expandAnswer(4);
    });
    $("#q4").hover(function() {
        $(this).css('cursor', 'pointer');
    });
    $("#q5").click(function() {
        expandAnswer(5);
    });
    $("#q5").hover(function() {
        $(this).css('cursor', 'pointer');
    });
    $("#q6").click(function() {
        expandAnswer(6);
    });
    $("#q6").hover(function() {
        $(this).css('cursor', 'pointer');
    });

    function expandAnswer(num) {
        // close all other questions
        for (var i=0; i<question_status.length; i++) {
            $("#a" + (i+1)).slideUp(175);
        }

        // if not already open, expand the answer
        if (!question_status[num-1]) {
            $("#a" + num).slideDown(175);
            question_status[num-1] = true;
        } else {
            // mark as collapsed
            question_status[num-1] = false;
        }
    }

    $(".partner1,.partner2,.partner3").hover(function() {
        $(this).css('cursor', 'pointer');
    });

    $(".partner1").on("mouseleave", function() {
        $(".pbio1").slideUp(100);
    });
    $(".partner2").on("mouseleave", function() {
        $(".pbio2").slideUp(100);
    });


});