gamePattern = [];
userClickedPattern = [];

buttonColours = ["red", "blue", "green", "yellow"];

started = false;
level = 0;


// Reconoce boton para comenzar el juego
$(document).keypress(function() {
    if (!started) {
        $("h1").text(`Level ${level}`);
        nextSequense();
        started = true;
    }
});

// Evento click, ejecuta sonido, animacion y chequea respuesta
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

// Funcion que chequea respuesta 
function checkAnswer(currentLevel) {
    
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequense();
            }, 1000);
        } 
    } else {
        playSound("wrong");
        animateError();
        startOver();
    }
}

function nextSequense() {
    userClickedPattern = [];
    
    level++;
    $("h1").text("Level " + level);
    // Generador de numero random entre 0 y 3
    var randomNumber = (Math.floor(Math.random()*4));
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(75).fadeIn(75);
    playSound(randomChosenColour);
}

// Animacion cada vez que se hace click a un boton
function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

// Asocia audio con el color seleccionado por la funcion "randomChosenColour"
function playSound(name) {
    var audio = new Audio(src=`./sounds/${name}.mp3`);
    audio.play();
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
    started = false;
}