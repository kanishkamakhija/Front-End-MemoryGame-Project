/*
 * Create a list that holds all of your cards
 */
var list_cards = ["fa fa-diamond","fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube" ];

var card1, card2;
var open_list = [];
var match_list = [];
window.onload = function() {
    list_cards = shuffle(list_cards);
    shuffle_cards(list_cards);
};

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
            console.log(curr);
        }
}

function ismatch()
{
    let class1 = $(open_list[0]).children('i').attr('class');
    let class2 = $(open_list[1]).children('i').attr('class');
    console.log("class1:",class1);
    console.log("class2:",class2);
    if(class1 === class2)
    {
        console.log("match card");
        $(open_list[0]).addClass("match");
        $(open_list[1]).addClass("match");
        match_list.push(open_list[0]);
        match_list.push(open_list[1]);
    }
    else {
        console.log("mismatch card");
        $(open_list[0]).removeClass("open show");
        $(open_list[1]).removeClass("open show");
    }
    open_list.length = 0;
    return;
}

$(document).ready(function() {
    $("ul.deck li").click(function() {
        open_list.push(this);
        $(this).addClass("show open");
        console.log(open_list);
        if(open_list.length === 2)
        {
            setTimeout(ismatch, 3000);
        }
        console.log(match_list);
    });

    //lid.classsList.toggle('flip');

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
