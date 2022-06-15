/*
By Matt05 Developer
https://matt05.ml
04.12.2021
*/

let buttonId = [
    "piano-cartesiano",
    "punto-medio",
    "distanza-punti",
    "le-rette",
    "retta-passante-punto",
    "intersezione-due-rette",
    "rette-perpendicolari",
    "retta-passante-due-punti",
    "coeff-retta-due-punti",
    "distanza-punto-p"
];


buttonId.forEach(function(item, index, array) {
    $("#"+item).click(function() {
        $("#loader").fadeIn("fast");
        $('.div-content-card').load("./pages/geometria-analitica/"+item+".html", function() {
            $('.card-content').fadeIn()
                .css({top:1000})
                .animate({top:70}, 500, function() {
                    $('#card-container').attr('style','display:none !important');
                    $('.footer').hide();
                });
                $("#loader").fadeOut("fast");
            });
    });
});


$("#card-close").click(function() {
    $('.card-content').fadeIn()
        .css({top:70})
        .animate({top:1000}, 300, function() {
        $('.div-content-card').empty();
    });
    $("#card-container").fadeIn("fast",function() {
            $('.footer').fadeIn("fast");
        });
});