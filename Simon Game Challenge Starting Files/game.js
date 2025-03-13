var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClicked = [];
var level = 0;
var buttonClicked = false;

//adding to the sequence that the game sets
function nextSequence() {
    //random number aligns with random color
    userClicked = [];
    level++;
    //changes H1 to follow level increments
    $("#level-title").text("Level " + level);

    var randomNum = Math.floor(Math.random() * 4);
    gamePattern.push(buttonColors[randomNum]);
    animation(buttonColors[randomNum]);
    //displays for as long as there is items in the pattern

    // for(var i = 0; i < gamePattern.length; i++){
    //     animation(gamePattern[i]);
    // };
   
    
    //console.log(gamePattern);
}

function animation(color) {
    //blinks the color passed in for the clicks and sequences
    $("#" + color).fadeOut(100).fadeIn(100);
    //plays the audio 
    var audio = new Audio("./sounds/" + color + ".mp3");
    //audio.play();
}
//Button being clicked by the mouse
$(".btn").click(function(){
    var userColorClicked = $(this).attr("id");
    animation(userColorClicked);
    //Array keeps track of sequence inputted by the user
    userClicked.push(userColorClicked);
    //console.log(userClicked);
    checkAnswer(userClicked.length-1);        
    }
);
function startOver(){
    buttonClicked = false;
    level = 0;
    gamePattern = [];
}

//Intial start to the game is a keyboard stroke
$(document).on("keypress", function () {
    if(!buttonClicked) {
        nextSequence();
        buttonClicked = true;
        //console.log(buttonClicked);
    };
});
//checks user input with gamepattern
function checkAnswer(currentLevel){
    //needs to check each item on the lists
        //if they are equal then it calls the game functions
        if(userClicked[currentLevel] === gamePattern[currentLevel]){
            if(userClicked.length === gamePattern.length){
                setTimeout(function(){
                    nextSequence();
                },1000);
            }
            //console.log(userInput === gamePattern);
        //if not then the game is over
        } else {
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            }, 500);
            $("h1").text("Game Over, Press Any Key to Restart");
            startOver();
        }
}

