
/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
var player_name1 = document.querySelector('#name-0');
var player_name2 = document.querySelector('#name-1');
var score1 = document.querySelector('#score-0');
var score2 = document.querySelector('#score-1');
var new_gameBtn = document.querySelector('.btn-new');
var current_score1 = document.getElementById('current-0');
var current_score2 = document.getElementById('current-1');
var rollImage = document.getElementById('dice_img');
var active1 = document.querySelector('.player-0-panel');
var active2 = document.querySelector('.player-1-panel');
var rolldice_btn  = document.getElementById('roll_btn');
var holdBtn = document.querySelector('.btn-hold');
var dice_numbers  =[1,2,3,4,5,6]
var move_player1 = true;

function rollthedice(){
  for( var i = 0; i < dice_numbers.length; i++){
    var randomDiceNumber = dice_numbers[Math.random() * dice_numbers.length | 0];
    var selectedDiceNumber = 'assets/dice-' + randomDiceNumber + '.png';
    rollImage.setAttribute('src',selectedDiceNumber)
  }
  currentScore(randomDiceNumber);
}
function moveChange(){
  if(active1.classList.contains('active')){
    active1.classList.remove('active');
    active2.classList.add('active');
    move_player1 = false;
  }else{
    active2.classList.remove('active');
    active1.classList.add('active');
    move_player1 = true;
  }
}
function currentScore(dicenumber){
  if(move_player1){
    if(dicenumber !== 1){
      Number(dicenumber);
      var round_score1 = Number(current_score1.textContent) + dicenumber;
      current_score1.textContent = round_score1;
    }else{
      current_score1.textContent = 0;
      moveChange();
    }
  }else{
    if(dicenumber !== 1){
      var round_score1 = Number(current_score2.textContent) + dicenumber;
      current_score2.textContent = round_score1;
    }else{
      current_score2.textContent = 0;
      moveChange();
    }
  }
};
function holdNumbers(){
  if(move_player1){
    var player1_score = Number(score1.textContent) + Number(current_score1.textContent);
    score1.textContent = player1_score;
    current_score1.textContent = 0 ;
    moveChange();
  }else{
    var player2_score = Number(score2.textContent) + Number(current_score2.textContent);
    score2.textContent = player2_score;
    current_score2.textContent = 0 ;
    moveChange();
  }
  whoWin();
}
function whoWin(){
  var new_game_span = document.querySelector('.newgame');
  var i = 10;
 if(score1.textContent >= 10){
   active1.classList.add('winner');
   rolldice_btn.disabled = true;
   holdBtn.disabled = true;
   moveChange();
   player_name1.textContent = "WINNER!";
   countdown();
 }else if(score2.textContent >= 10){
   active2.classList.add('winner');
   moveChange();
   player_name2.textContent = "WINNER!";
   rolldice_btn.disabled = true;
   holdBtn.disabled = true;
   countdown();
 }
 function countdown(){
   var cnt = setInterval(function(){
              i--;
              new_game_span.textContent = "NEW GAME IN " + i;
              if(i === 0){
                  newGame();
                  clearInterval(cnt);
                  new_game_span.textContent = "NEW GAME";
              }
            },1000);
          }
}
function newGame(){
  //LOSOWANIE KTO ZACZYNA - dopisz.
  rolldice_btn.disabled = false;
  holdBtn.disabled = false;
  player_name1.textContent = "PLAYER 1";
  player_name2.textContent = "PLAYER 2";
  active1.classList.remove('winner');
  active2.classList.remove('winner');
  current_score1.textContent = 0 ;
  current_score2.textContent = 0 ;
  score1.textContent = 0;
  score2.textContent = 0;
  rollImage.setAttribute('src','assets/dice-start.png');
}
new_gameBtn.addEventListener('click',newGame);
holdBtn.addEventListener('click',holdNumbers);
rolldice_btn.addEventListener('click',rollthedice);
