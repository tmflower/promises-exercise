// NUMBER FACTS

// 1. Single number fact

let fact = document.querySelector('#fact')

axios.get(`http://numbersapi.com/random/trivia?json`)
    .then(res => {
        fact.innerText = res.data.text
    })
    .catch(err => {
        console.log(err)
    })



// 2. Multiple number facts

let numberFacts = []
let list = document.querySelector('#multFacts')

for (let i = 0; i <= 10; i++) {
   numberFacts.push(axios.get(`http://numbersapi.com/${i}/trivia?json`))
}

Promise.all(numberFacts)
    .then(allNums => {
        for (let num of allNums) {
            let numFact = num.data.text;
            let item = document.createElement('li');
            item.innerText = numFact;
            list.append(item);
        }
    })
    .catch(err => {
        console.log(err)
    }) 



// 3. Four facts on favorite number

let fact1 = document.querySelector('#fact1')
let fact2 = document.querySelector('#fact2')
let fact3 = document.querySelector('#fact3')
let fact4 = document.querySelector('#fact4')

function getFacts() {
    return new Promise(function (resolve, reject) {
        let res = axios.get(`http://numbersapi.com/13/trivia?json`)
        resolve(res);
        reject(err);
    })
}

getFacts()
    .then(res => {
        fact1.innerText = res.data.text
    return getFacts()
    })
    .then(res => {
        fact2.innerText = res.data.text
    return getFacts()
    })
    .then(res => {
        fact3.innerText = res.data.text
    return getFacts()
    })
    .then(res => {
        fact4.innerText = res.data.text
    })
    .catch(err => {
        console.log(err)
    })


// DECK OF CARDS

// 1. Request a single card

let res = axios.get(`http://deckofcardsapi.com/api/deck/new/draw/?count=1`)
    .then(res => {
        console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`)
    })
    .catch(err => {
        console.log(err)
    })



// 2. Request 2 cards from same deck

let deck_id = "new"

function drawCards() {
    return new Promise(function(resolve, reject) {
        res = axios.get(`http://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
        resolve(res)
        reject(err)
    })
}

drawCards()
    .then(res => {
        console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit} from DECK ${res.data.deck_id}`)
        deck_id = res.data.deck_id;
        return deck_id
    })
    .then(res => {
        deck_id = deck_id
        return axios.get(`http://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
    })
    .then(res => {
        console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit} from DECK ${res.data.deck_id}`)
        deck_id = res.data.deck_id;
    })
    

// 3. Draw all cards in deck using button on HTML page.

let card = document.querySelector('#card')
let btn = document.querySelector('button')

btn.addEventListener('click', function() {
    console.log('you clicked!')
    showCard();
})

let allCards = [];

res = axios.get(`http://deckofcardsapi.com/api/deck/new/`)
    .then(res => {
        console.log(res);
        deck_id = res.data.deck_id;
        console.log(`NEW DECK ID: ${deck_id}`);
        return deck_id;
    })
    .then(res => {
        deck_id = deck_id;
        console.log(`DECK ID AGAIN: ${deck_id}`)
    })

for (let i = 1; i<=52; i++) {
    allCards.push(axios.get(`http://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`))
}


let val;
let suit;
let cardsInfo = []

Promise.all(allCards)
    .then(cardsArr => {
        for(res of cardsArr) {
            // console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`);
            val = res.data.cards[0].value;
            suit = res.data.cards[0].suit
            cardsInfo.push({val, suit});
        }            
    })
    .catch(err => {
        console.log(err)
    })

console.log(cardsInfo)
function showCard() {
    if (cardsInfo.length === 0) {
        alert("No more cards!")
    }
    else {
        val = cardsInfo[0].val;
        suit = cardsInfo[0].suit;
        let newCard = document.createElement('li');
        newCard.innerText = (`${val} of ${suit}`);
        card.append(newCard);
        cardsInfo.shift();  
    }
}