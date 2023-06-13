gamePattern = [];

userClickedPattern = [];

buttonColours = ["red", "blue", "green", "yellow"];

level = 0;



function nextSequense() {

    // Generador de numero random entre 0 y 3
    var randomNumber = (Math.floor(Math.random()*4));
    var randomChosenColour;

    //Selecciona un color de buttonColours y lo agrega a gamePattern 
    for (var i = 0; i < 4; i++) {
        if (randomNumber === i) {
            randomChosenColour = buttonColours[i];
            gamePattern.push(randomChosenColour);
            break;
        }
    }

    $("#"+randomChosenColour).fadeOut(75).fadeIn(75);
    playSound(randomChosenColour);
    
    level++;
    $("h1").text("Level " + level);
}



// Push de los colores que fueron clickeados
for (i = 0; i < 4; i++) {
    $("#"+buttonColours[i]).click(function() {
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        console.log(userClickedPattern);
    })
}

/*$(document).click(function() {
    nextSequense();
});*/

function playSound(name) {

// Asocia audio con el color seleccionado por la funcion "randomChosenColour"

    switch (name) {
        case "red":
            var red = new Audio(src="./sounds/red.mp3");
            red.play();
            break;

        case "blue":
            var blue = new Audio(src="./sounds/blue.mp3");
            blue.play();
            break;

        case "green":
            var green = new Audio(src="./sounds/green.mp3");
            green.play();
            break;

        case "yellow":
            var yellow = new Audio(src="./sounds/yellow.mp3");
            yellow.play();
            break;

        default:
            break;
    }
}

// Animacion cada vez que se hace click a un boton
function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function animateError() {
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    $(document).keydown(function() {
        startOver()
        nextSequense();
    })
}

// Evento click, ejecuta sonido, animacion y chequea respuesta
$(".btn").click(function() {
    var colour = $(this).attr("id");
    playSound(colour);
    animatePress(colour);
    checkAnswer(userClickedPattern.length-1);
});

// Reconoce boton para comenzar el juego
$(document).keypress(function(event) {
    if (event.key === "a") {
        $("h1").text("Level 0");
        nextSequense();
    }
});

// Funcion que chequea respuesta 
function checkAnswer(currentLevel) {
    var wrong = new Audio(src="./sounds/wrong.mp3");
    if (currentLevel === gamePattern.length-1) {
        if (userClickedPattern.toString() === gamePattern.toString()) {
            setTimeout(function(){
                nextSequense();
            }, 1000);
            userClickedPattern = [];
        } else {
            wrong.play();
            animateError();
            startOver();
        }
    } else if (currentLevel !== gamePattern.length-1) {
        for (i = 0; i < userClickedPattern.length; i++) {
            if (gamePattern[i] === userClickedPattern[i]) {
                continue;
            } else {
                wrong.play();
                animateError();
                startOver()
            }
        }
    }
}