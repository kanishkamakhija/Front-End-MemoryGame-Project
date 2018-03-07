
 /*global $, jQuery*/
 /*
  * Create a list that holds all of your cards
  */
var list_cards = ["fa fa-diamond","fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube" ];

// Container to fetch start ratings
var container = $(".fa.fa-star");

// List to match the open cards and save the finally matched cards
var open_list = [];
var match_list = [];
let click=false;
var countDown;

// Fetch the modal to display the status of end game
var modals = document.getElementById('win-modal');
// Button that allows to play again
var playagnBtn = document.getElementsByClassName('close')[0];
//Count the number of moves of aplayer
var open_modal = document.getElementById("open_modal");

//Function to shuffle the cards
function shuffleit() {
    list_cards = shuffle(list_cards);
    shuffle_cards(list_cards);
};

// Shuffle cards on loading the game
window.onload = shuffleit();
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function shuffle_cards(array)
{
    var list = $(".deck li");
    for(var i = 0; i < list.length; i++)
        {
            var curr = list[i];
            curr = curr.getElementsByTagName("i")[0].setAttribute("class", array[i]);
        }
}


//Tracks the performance by changinf the start ratings
function moves1(){
  if (document.getElementById("numberMoves").innerText ==16){
      $(container[2]).removeClass("fa fa-star") ;
  }
  else if (document.getElementById("numberMoves").innerText ==32) {
    $(container[1]).removeClass("fa fa-star");
  }


}

//Function that checks whether the two open cards are matching or not
function ismatch()
{
    let class1 = $(open_list[0]).children('i').attr('class');
    let class2 = $(open_list[1]).children('i').attr('class');

    if(class1 === class2)
    {

        $(open_list[0]).addClass("match");
        $(open_list[1]).addClass("match");
        match_list.push(open_list[0]);
        match_list.push(open_list[1]);
    }
    else {
        $(open_list[0]).removeClass("open show");
        $(open_list[1]).removeClass("open show");
    }
    open_list.length = 0;
    return;
}


//Function that displays the content of number of moves, start rating and timings in which user won the game
function win(){
  if (match_list.length === 16){
    clearInterval(timer);
    let newP = document.createElement('p');
    modals.style.display = 'block';
    newP.textContent = "You Win in " + document.getElementById("numberMoves").innerText + " moves. With a star rating of " + $(".fa.fa-star").length + " in " + document.getElementById("minutes").innerText + " minutes and "+  document.getElementById("seconds").innerText + " seconds. Do you want to play again...? Click OK to continue.";
    open_modal.appendChild(newP);
    modal();
  }
}

function modal() {
  window.addEventListener('click', outsideClick);
}

// Function to close modal
function closeModal() {
  click = false;
  modals.style.display = 'none';
  $("ul.deck li").removeClass("open show match");
  list_cards = shuffle(list_cards);
  shuffle_cards(list_cards);
  reset();
}

// Function to close modal if outside click
function outsideClick(e) {
  if (e.target == modal) {
    modals.style.display = 'none';
    $("ul.deck li").removeClass("open show match");
    list_cards = shuffle(list_cards);
    shuffle_cards(list_cards);
  }
  reset();
}


//Function to flip the cars by removing class open and show
function flipping() {
  if ( $(".open").length===1){
     $('.card').removeClass('open').removeClass('show');
     open_list = [];
     setTimeout(remove,701)
document.getElementById("numberMoves").innerText--;
  }
}

//Function that starts the timer when the first card is clicked
  function timer(){
      var sec = 0;
      function pad ( val ) { return val > 9 ? val : "0" + val; }
          countDown = setInterval( function(){
          document.getElementById("seconds").innerHTML=pad(++sec%60);
          document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10));
          if (match_list.length === 16){
                 clearInterval(countDown);
           }
         }, 1000);
  }


//Funtion to empty the match list
function remove (){
    match_list.pop();
    match_list.pop();
  }


//Function to reset the game to its initiall stage
function reset (){
    $(".card").removeClass("match").removeClass("open").removeClass("show");
    document.getElementById("numberMoves").innerText = 0;
    $(container).addClass("fa fa-star");
    list_cards = shuffle(list_cards);
    shuffle_cards(list_cards);
    match_list = [];
    document.getElementById("minutes").innerHTML='00';
    document.getElementById("seconds").innerHTML='00';
    click = false;
    clearInterval(countDown);
}

$(document).ready(function() {

    $("div.restart i").click(function() {
    click = false;
    reset();
    $(container).addClass("fa fa-star");
    });

    $("#win-modal").click(function() {
      window.location.reload();

    });

    $("ul.deck li").click(function() {
      console.log(click);
    if (!click)
    {
    timer();
    }
    moves1();
    click=true;
    open_list.push(this);
    $(this).addClass("show open");
    if(open_list.length === 2)
    {
      document.getElementById("numberMoves").innerText++;
      setTimeout(flipping, 402);
      setTimeout(ismatch,700);
      setTimeout(win,1000);
    }
    });
});








/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
