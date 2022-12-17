/*
    Civicamente
    Github: @Matt0550
    License: MIT
*/

let enabledModules = {
    "geometria-analitica": {
        "name": "Geometria analitica",
        "description": "Teoria della geometria analitica",
        "files": {
            "piano-cartesiano.html": {
                "name": "Piano cartesiano",
                "description": "Rappresentazione delle coordinate in un piano cartesiano"
            },
            "punto-medio.html": {
                "name": "Punto medio",
                "description": "Formula ed applicazione"
            },
            "distanza-punti.html": {
                "name": "Distanza tra due punti",
                "description": "Formula e calcolo del perimetro e area di un triangolo"
            },
            "le-rette.html": {
                "name": "Le rette parallele agli assi",
                "description": "Rette parallele, generiche, implicite ed esplicite"
            },
            "retta-passante-punto.html": {
                "name": "Retta passante per un punto",
                "description": "Formula ed applicazione"
            },
            "intersezione-due-rette.html": {
                "name": "Punto di intersezione tra due rette",
                "description": "Formula ed applicazione con sistema di Kramer"
            },
            "rette-perpendicolari.html": {
                "name": "Rette parallele e perpendicolari",
                "description": "Coefficiente angolare delle rette parallele e perpendicolari"
            },
            "retta-passante-due-punti.html": {
                "name": "Retta passante per due punti",
                "description": "Formula ed applicazione"
            },
            "coeff-retta-due-punti.html": {
                "name": "Coefficiente angolare di una retta passante per due punti",
                "description": "Formula ed applicazione"
            },
            "distanza-punto-p.html": {
                "name": "Distanza di un punto P",
                "description": "Formula ed applicazione"
            }


        }
    },
    "numeri-complessi": {
        "name": "Numeri complessi",
        "description": "Teoria dei numeri complessi",
        "files": {
            "introduzione.html": {
                "name": "Numeri complessi",
                "description": "Definizione e rappresentazione"
            },
            "modulo-e-opposti.html": {
                "name": "Modulo e opposti",
                "description": "Modulo e opposti di un numero complesso"
            },
            "somma-e-differenza.html": {
                "name": "Somma e differenza",
                "description": "Somma e differenza di due numeri complessi"
            },
            "prodotto-e-divisione.html": {
                "name": "Prodotto e divisione",
                "description": "Prodotto e divisione di due numeri complessi"
            },
        }
    },
}

// For each module in enabledModules create a card element in index
$.each(enabledModules, function(module, pages) {
    // Replace - with _
    module = module.replace(/-/g, "_");

    $("#selectArgumentDiv").append(`
        <div class="card">
            <div class="card-body" id="${module}">
                <h4 class="card-title">${pages["name"]}</h4>
                <i class="fas fa-arrow-right position-absolute top-50 end-0 translate-middle-y"></i>
                <h6 class="text-muted card-subtitle mb-2">${pages["description"]}</h6>
            </div>
        </div>
    `);

    $("#contentCards").append(`
        <div class="card-group" id="contentDiv-${module}" style="display: none !important;"></div>
    `);

    $.each(pages["files"], function(fileName, content) {
        var idName = module + "-" + fileName.replace(".html", "")
        $("#contentDiv-" + module).append(`
            <div class="card">
                <div class="card-body" id="${idName}">
                    <h4 class="card-title">${content["name"]}</h4>
                    <i class="fas fa-arrow-right position-absolute top-50 end-0 translate-middle-y"></i>
                    <h6 class="text-muted card-subtitle mb-2">${content["description"]}</h6>
                </div>
            </div>
        `);

         // When a card is clicked, show the corresponding section
        $("#selectArgumentDiv").on("click", "#" + module, function() {        
            $("#backToSection").fadeIn("fast");
            $("#backToSection").attr("onclick", "backToSection()");
            $("#selectArgumentDiv").fadeOut("fast", function() {
                $("#contentDiv-" + module).fadeIn("fast");
                $("#contentCards").fadeIn("fast");
            });
        });    

        // When a card is clicked, load the corresponding file in the card
        $("#contentDiv-" + module).on("click", "#" + idName, function() {
            $("#loader").fadeIn("fast");
            // Replace _ with - in module name
            module = module.replace(/_/g, "-");
            $('.div-content-card').load("./pages/" + module + "/" + fileName, function(responseTxt, statusTxt, xhr) {
                if(statusTxt == "success") {
                    $("custom-image").each(function() {
                        var fileName = $(this).attr("file-name");
                        var altText = $(this).attr("alt");
                        var classes = $(this).attr("class");
                        var style = $(this).attr("style");
                    
                        insertImage(fileName, altText, classes, style, this);
                    });
                    
                    $('.card-content').fadeIn()
                    .css({top:1000})
                    .animate({top:70}, 500, function() {
                        $('#card-container').attr('style','display:none !important');
                        $('.footer').hide();
                    });
                    $("#loader").fadeOut("fast");
                }
                if(statusTxt == "error") {
                    $("#loader").fadeOut("fast");
                    alert("Error: " + xhr.status + ": " + xhr.statusText);
                }
            });
        });
    });
});

function backToSection() {
    try {
        // Find the current section using the id of the displayed div (contentDiv + module name)
        var currentModule = $("#contentCards").find(".card-group").filter(function() {
            return $(this).css("display") != "none";
        }).attr("id").split("-")[1];
    } catch (error) {
        // If an error occurs, reload the page to reset the state of the sections
        console.log("Error: " + error);
        location.reload();
    }
    
    $("#contentDiv-" + currentModule).fadeOut("fast", function() {
        $("#selectArgumentDiv").fadeIn("fast");
        $("#backToSection").fadeOut("fast");
        $("#contentCards").hide();
    });
}

function insertImage(fileName, altText, classes, style, element) {
    console.log("Inserting image " + fileName + " with alt text " + altText + " and classes " + classes);
    // In contentCard, find the current section using the id of the displayed div (contentDiv + module name) the class is card-group
    var currentModule = $("#contentCards").find(".card-group").filter(function() {
        return $(this).css("display") != "none";
    }).attr("id").split("-")[1];

    // Replace _ with - in module name
    currentModule = currentModule.replace(/_/g, "-");

    var image = `<img src="./pages/${currentModule}/images/${fileName}" alt="${altText}" class="${classes}" style="${style}">`;
    $(element).replaceWith(image);
}

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