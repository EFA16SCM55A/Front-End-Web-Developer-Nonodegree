

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
        temporaryValue=array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] =temporaryValue;
    }

    return array;
}


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


//Create a list that holds openned card
let ListOpennedCards =[];
//Create a list that holds the matched cards
let ListOfCardsToFlush = []
//to keep the number of matched card
let matched=0;
//to keep the number of moves
let moves = 0;
//to keep the lenght for openned card
let lengthList=0;
//to keep the lenght for list of matched card
let lengthListToFlush=0;
// Create the state of whether the clock is on or off
let clockOff = true;
// Create the state of whether the star is checked or not
let checkStar = true;
//to keep the number of stars
let stars = 0;
//to keep the time
let time = 0;
//to keep the interval
let clockId;
//to keep the card from document
const ListOfcards = document.querySelectorAll('.card'); 
//to keep the deck from document
const deck=document.querySelector('.deck');
/*This function to shuffle the cards*/
function shuffleTheCards(){
const CardsToShuffle= Array.from(document.querySelectorAll('.deck li'));
const CardsHaveShuffled= shuffle(CardsToShuffle); 
for(card of CardsHaveShuffled){
  deck.appendChild(card);
}}
/*by clicking on the deck, checking no more two card open, match, 
seting the clock, insert to the lists, counting moves, stars, and after completing
the matching show the result*/
deck.addEventListener('click', event => {
     const clickTarget = event.target;
     if (clickTarget.classList.contains('card') &&
         !clickTarget.classList.contains('open') &&
         !clickTarget.classList.contains('match') &&
         ListOpennedCards.length < 2 &&
         !ListOpennedCards.includes(clickTarget)){
            if (clockOff == true) {
                startTheClock();
                clockOff = false;
            }
            OpenShowCard(clickTarget);
            insertToListOpennedCards(clickTarget);
         if (ListOpennedCards.length === 2) {
            CheckForMatch();
            countMoves();
            console.log(matched);
            checkToRateTheGame();
            if (matched === 8) 
               {CloseTheGame();}
         }
     }
 })
/*by clicking on the deck, toggle the card
open and show it */
function OpenShowCard(clickTarget) {
    clickTarget.classList.toggle('open');
    clickTarget.classList.toggle('show');
}
/* to toggle the card back */
function removeOpenShowCard(card) {
   card.classList.remove('open');
   card.classList.remove('show');
}
/* to toggle the matched card back */
function removeMatch(card) {
   card.classList.remove('open');
   card.classList.remove('show');
   card.classList.remove('match');
}
/* to add the oppened card to the list */
function insertToListOpennedCards(clickTarget){
  ListOpennedCards.push(clickTarget);
}
/* to add the matched card to the list  */
function insertToListOfCardsToFlush(cardToFlush){
   ListOfCardsToFlush.push(cardToFlush);
}
/* to check if the card match */
function CheckForMatch() {
    if (ListOpennedCards[0].firstElementChild.className ===
        ListOpennedCards[1].firstElementChild.className) {
            matched=matched+1;
            ListOpennedCards[0].classList.toggle('match');
            ListOpennedCards[1].classList.toggle('match');
            insertToListOfCardsToFlush(ListOpennedCards[0]);
            insertToListOfCardsToFlush(ListOpennedCards[1]);
            ListOpennedCards = [];
            checkStar = true;

    } else {
        setTimeout(()=>{
          removeOpenShowCard(ListOpennedCards[0]);
          removeOpenShowCard(ListOpennedCards[1]);
          ListOpennedCards=[];
        }, 1000);
    checkStar = false;
    }
}
/* to count number of moves */
function countMoves() {
    moves++;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;
}
/* to rate the player's performance */
function checkToRateTheGame() {
	stars = CountTheStars();
    if (moves >= 2 && stars>1) {
      if(checkStar === false){
        const starList = document.querySelectorAll('.stars li');
        for (star of starList) {
          if (star.style.display !== 'none'){
             star.style.display = 'none';
             break;}
      }
    }
  }
}
/* to calculate the time of playing*/
function calculateTime() { 
    const clock = document.querySelector('.clock');
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const hours = Math.floor(time / 1000 / 60 / 60);
    if (hours<10 && minutes<10 && seconds < 10) {
        clock.innerHTML = `0${hours}:0${minutes}:0${seconds}`;
    } else if(hours>10 && minutes>10 && seconds>10) {
        clock.innerHTML = `${hours}:${minutes}:${seconds}`;
    }else if(hours<10 && minutes>10 && seconds>10) {
        clock.innerHTML = `0${hours}:${minutes}:${seconds}`;
    }else if(hours<10 && minutes<10 && seconds>10) {
        clock.innerHTML = `0${hours}:0${minutes}:${seconds}`;
    }else if(hours<10 && minutes>10 && seconds<10) {
        clock.innerHTML = `0${hours}:${minutes}:0${seconds}`;
    }else if(hours>10 && minutes<10 && seconds>10) {
        clock.innerHTML = `${hours}:0${minutes}:${seconds}`;
    }else if(hours>10 && minutes<10 && seconds<10) {
        clock.innerHTML = `${hours}:0${minutes}:0${seconds}`;
    }else if(hours>10 && minutes>10 && seconds<10) {
        clock.innerHTML = `${hours}:${minutes}:0${seconds}`;
    }
}
/* to start the time of playing*/
function startTheClock() { 
        clockId = setInterval(() => {
        time++;
        calculateTime();}, 1000);
}
/* to stop the time of playing*/
function stopTheClock() {
    clearInterval(clockId);
    clockOff = true;
}
/* to replay the game*/
function replayTheGame(){
  restartTheGame();
  CloseTheMessage();
}
/* to close the congratulations message*/
function CloseTheMessage() {
    const modal = document.querySelector('.backgroundTheMessage');
    modal.classList.toggle('hide');
    //console.log('close')
}
/* to show the resualt for the Game*/
function ShowTheResualtForGame() {
	const movesInformation = document.querySelector('.movesInfo');
	 //console.log(movesInformation);
	 movesInformation.innerHTML = `Moves = ${moves}`;
    const timeInformation= document.querySelector('.timeInfo');
    //console.log(timeInformation);
    const clockTime = document.querySelector('.clock').innerHTML;
    timeInformation.innerHTML = `Time = ${clockTime}`;
    const starsInformation = document.querySelector('.starsInfo');
    //console.log(starsInformation);
    stars = CountTheStars();
    starsInformation.innerHTML =  `Stars = ${stars}`;
}
/* to count the stars*/
function CountTheStars() {
    const stars = document.querySelectorAll('.stars li');
    starCount = 0;
    for (star of stars) {
        if (star.style.display !== 'none') {
            starCount=starCount+1;}}
    return starCount;
}
/* to close the game*/
function CloseTheGame(){
   stopTheClock();
   ShowTheResualtForGame();
   CloseTheMessage();
}
/* to restart the game*/
function restartTheGame () {
	lengthList=ListOpennedCards.length;
	//console.log(lengthList);
	for (i = 0; i < lengthList; i++){
	removeOpenShowCard(ListOpennedCards[i]);}
	lengthListToFlush=ListOfCardsToFlush.length;
	console.log(lengthListToFlush);
	console.log(ListOfCardsToFlush);
	for (j = 0; j < lengthListToFlush; j++){
	removeMatch(ListOfCardsToFlush[j]);}
	shuffleTheCards();
    stopTheClock();
    matched=0;
    clockOff = true;
    checkStar = true;
    time=0;
    calculateTime();
    moves=0;
    document.querySelector('.moves').innerHTML=moves;
    stars=0;
    const starList=document.querySelectorAll('.stars li');
    for (star of starList){
        star.style.display='inline';
    }
}
/* clicking close button, close the message*/
document.querySelector('.buttonClose').addEventListener('click',()=>{CloseTheMessage();});
/* clicking replay button, replay the game*/
document.querySelector('.buttonReplay').addEventListener('click',()=>{ replayTheGame();});
/* clicking restart icon, restart the game*/
document.querySelector('.restart').addEventListener('click', () => {restartTheGame();});
