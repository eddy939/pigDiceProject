var Pig = {
  user1: 0,
  user2: 0,
  currentScore: 0,
  activePlayer: 1,
  rollDice: function(){
    var roll = Math.floor(Math.random() * 6) + 1;
    if (roll === 1) {
      this.currentScore = 0;
      this.subActivePlayer();
    }
    else {
      this.currentScore += roll;
    }
    return roll;
  },
  subActivePlayer: function(){
    if(this.activePlayer === 1){
      this.user1 += this.currentScore;
      this.activePlayer = 2;
    }else{
      this.user2 += this.currentScore;
      this.activePlayer = 1;user1score
    }
  },
  hold: function(){
    this.subActivePlayer();
    this.currentScore = 0;
  }
};

$(document).ready(function(){
  var game = Object.create(Pig);
  var user1wins = 0;
  var user2wins = 0;
  var checkPlayer = function() {
    var player = game.activePlayer;
    if (player === 1) {
      $("h2#user1").css('color', 'green');
      $("h2#user2").css('color', 'grey');
      $("#user2buttons").hide();
      $("#user1buttons").show();
    } else {
      $("h2#user2").css('color', 'green');
      $("h2#user1").css('color', 'grey');
      $("#user1buttons").hide();
      $("#user2buttons").show();
    }
  };

  checkPlayer();


  var playerRoll = function() {
    var dice = game.rollDice();
    var output = "&#x268" + (dice-1) + ";";
     $("#showdice").html(output);
     $("#dice").text(dice);
     alterUserAndRefreshScores();
  }

  $("button#roll").click(function(){
    playerRoll();
  });

  $("button#hold").click(function(){
    game.hold();
    alterUserAndRefreshScores();
  });

  $(document).keypress(function(event) {
    if((event.which == 122) && (game.activePlayer===1)){
      playerRoll();
    }else if((event.which == 47) && (game.activePlayer == 2)){
      playerRoll();
    }else if((event.which == 32)){
      game.hold();
      alterUserAndRefreshScores();
    }
  });


  var alterUserAndRefreshScores = function(){
    winCheck();
    refreshScores();
    checkPlayer();
  }

  var winCheck = function(){
    if(game.user1 >= 100){
      alert("user one wins!!");
      game = Object.create(Pig);
      user1wins+=1;
      $("#user1wins").text(user1wins);
    } else if (game.user2 >= 100){
      alert("user two wins!!");
      game = Object.create(Pig);
      user2wins+=1;
      $("#user2wins").text(user2wins);
    }
  };

  var refreshScores = function(){
    $("#user1score").text(game.user1);
    $("#user2score").text(game.user2);
    $("#current").text(game.currentScore);
  }

});
