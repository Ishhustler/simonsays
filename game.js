var buttonsColours = ["blue", "green", "yellow", "red"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("level " + level);
    // Call the function on the first keypress
    nextSequence();
    started = true;
  }
});

$(".btn").click(function handler() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  checkAnswers(userClickedPattern.length - 1);
  playSound(userChosenColour);
  animatePress(userChosenColour);
});

function nextSequence() {
  level++;
  $("#level-title").text("level " + level);
  var randomNumber = Math.floor(Math.random() * buttonsColours.length);
  var chosenColour = buttonsColours[randomNumber];

  gamePattern.push(chosenColour);

  $("#" + chosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  var audio = new Audio(chosenColour + ".mp3");
  audio.play().catch(function (error) {
    // Autoplay was prevented.
    // You can handle this error, e.g., by showing a play button to the user.
    console.error("Autoplay prevented: ", error);
  });
}

function playSound(name) {
  var audio = new Audio(name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswers(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log("you are right");

    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(nextSequence, 1000);

      userClickedPattern = [];
    }
  } else {
    console.log("nope");
    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 100);
    $("#level-title").text(" GAME OVER, PRESS ANY KEY TO RESTART");
    startOver();
  }
}
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}
