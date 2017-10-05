var count = 0;
var score = 0;

// return random integer between low and high (inclusive)
function random(low,high) { return Math.floor((Math.random() * (high-low+1)) + low); }

// press ENTER KEY
$('#answer').keyup(function(event){
  if(event.keyCode == 13 && enterCriteria() && ($('#answer').val() != '' || count==maxQ)){
    count++;
    $('.progressbar').css('width',count/maxQ*100 + '%');
    var a = $('#answer').val().toUpperCase();
    if (a == q) {
      score++;
      correctMessage(a);
    } else {
      incorrectMessage(a,q);
    }

    $('#answer').val('');
    if (count < maxQ) {
      q = newQ();
    } else if (count == maxQ){
      showResult();
      $('#answer').attr('placeholder', 'press [enter] to restart');
      $('#answer').val('');
      if (score == maxQ) init();
    } else {
      restart();
      q = newQ();
    }
  }
})

// show result
function showResult() { $('#question').text('score: ' + score + '/' + maxQ); }

// restart
function restart() {
  count = 0;
  score = 0;
  $('#feedback').text('');
  $('#answer').attr('placeholder', 'answer');
  $('.progressbar').css('width',0);
  $('#answer').focus();
}

// ask first question
var q = newQ();

// focus on answer input
$('#answer').focus();

// launch animation for firework
animate();
