var buttonColours = ["red", "blue", "green", "yellow"];


var gamePattern = [];
var userClickedPattern = [];

function nextSequence()
{
  userClickedPattern = [];
   level++;
   
   $("#level-title").text("Level " + level);

   var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

   
    playSound(randomChosenColour);

    //var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
   // audio.play();

}


$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
 // console.log(userClickedPattern);
 //1. In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played.
 playSound(userChosenColour);
 animatePress(userChosenColour);
 checkAnswer(userClickedPattern.length-1);
});

function playSound(name)
{
  //  gamePattern.push(randomChosenColour);
 //3. Take the code we used to play sound in the nextSequence() function and add it to playSound().
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour)
{
    $ ("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $ ("#" + currentColour).removeClass("pressed");
    },100);
}

var level = 0;
var startes = false;

$(document).keypress(function(){
  
  if(!startes)
  {
    $('#level-title').text("Level " + level);
    nextSequence();
    startes = false;
  }

});

//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

  //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length){

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {

    console.log("wrong");
    playSound("wrong");

    $('body').addClass("game-over");

    setTimeout(function(){
      $('body').removeClass("game-over");

    },200);
    $('#level-title').text("Game Over, Press Any Key to Restart");
  }

}