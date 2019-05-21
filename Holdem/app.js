let start_div = document.getElementById('start');
let triumphSet = [
    '♠2','♠3','♠4','♠5','♠6','♠7','♠8','♠9','♠T','♠J','♠Q','♠K','♠A',
    '◆2','◆3','◆4','◆5','◆6','◆7','◆8','◆9','◆T','◆J','◆Q','◆K','◆A',
    '♥2','♥3','♥4','♥5','♥6','♥7','♥8','♥9','♥T','♥J','♥Q','♥K','♥A',
    '♣2','♣3','♣4','♣5','♣6','♣7','♣8','♣9','♣T','♣J','♣Q','♣K','♣A'
];
let userPocket1, userPocket2;
let com1Pocket1, com1Pocket2;
let flop1, flop2, flop3, turn, river;
let userPocket1_src = document.getElementById('userPocket1').attributes['src'];
let userPocket2_src = document.getElementById('userPocket2').attributes['src'];
let com1Pocket1_src = document.getElementById('com1Pocket1').attributes['src'];
let com1Pocket2_src = document.getElementById('com1Pocket2').attributes['src'];
let flop1_src = document.getElementById('flop1').attributes['src'];
let flop2_src = document.getElementById('flop2').attributes['src'];
let flop3_src = document.getElementById('flop3').attributes['src'];
let turn_src = document.getElementById('turn').attributes['src'];
let river_src = document.getElementById('river').attributes['src'];
let user_chips = document.getElementById("user-chips");
let com1_chips = document.getElementById("com1-chips");
let turnOrder = []; let turnIndex = 0;
const playerCnt = 2;
const default_Bet = 1;


function init() {
    if (triumphSet.length < ((playerCnt*2)+8)) {
        triumphSet = [
            '♠2','♠3','♠4','♠5','♠6','♠7','♠8','♠9','♠T','♠J','♠Q','♠K','♠A',
            '◆2','◆3','◆4','◆5','◆6','◆7','◆8','◆9','◆T','◆J','◆Q','◆K','◆A',
            '♥2','♥3','♥4','♥5','♥6','♥7','♥8','♥9','♥T','♥J','♥Q','♥K','♥A',
            '♣2','♣3','♣4','♣5','♣6','♣7','♣8','♣9','♣T','♣J','♣Q','♣K','♣A'
        ];    
    }

    userPocket1_src.nodeValue = 'images/CardBack.jpg';
    userPocket2_src.nodeValue = 'images/CardBack.jpg';
    com1Pocket1_src.nodeValue = 'images/CardBack.jpg';
    com1Pocket2_src.nodeValue = 'images/CardBack.jpg';
   
    flop1_src.nodeValue = 'images/CardBack.jpg';
    flop2_src.nodeValue = 'images/CardBack.jpg';
    flop3_src.nodeValue = 'images/CardBack.jpg';
    turn_src.nodeValue  = 'images/CardBack.jpg';
    river_src.nodeValue = 'images/CardBack.jpg'; 
}

function displayTurn() {
    document.getElementById(turnOrder[turnIndex]+'Card').classList.add('turn');
    document.getElementById(turnOrder[turnIndex]+'Info').classList.add('turn');
    for (let i = 0; i < turnOrder.length; i++) {
        if(i != turnIndex) {
            document.getElementById(turnOrder[i]+'Card').classList.remove('turn');
            document.getElementById(turnOrder[i]+'Info').classList.remove('turn');
        }
    }
}

function turn_order() {
    let user_chips_val = user_chips.innerHTML;
    let com1_chips_val = com1_chips.innerHTML;
    
    if (user_chips_val == com1_chips_val) {
        turnOrder = ["user", "com1"];
    } else {
        if (user_chips_val < com1_chips_val)
            turnOrder = ["user", "com1"]
        else
            turnOrder = ["com1", "user"]
    }
    
    displayTurn();
}

function convert(letter) {
    let fileName = '';
    switch(letter.substr(0,1)) {
        case '♠':
            fileName = 'Spade_';
            break;
        case '◆':
            fileName = 'Diamond_';
            break;
        case '♥':
            fileName = 'Heart_';
            break;
        case '♣':
            fileName = 'Club_';
            break;
    }
    fileName += letter.substr(1,1);
    fileName = 'Triumph/' + fileName + '.jpg';
    return fileName;
}

// Open first 3 Community Card
function open_flop() {
    // remove 1 card
    triumphSet.pop();
    
    flop1 = triumphSet.pop();
    flop2 = triumphSet.pop();
    flop3 = triumphSet.pop();
    
    setTimeout(()=>flop1_src.nodeValue = convert(flop1),300);
    setTimeout(()=>flop2_src.nodeValue = convert(flop2),600);
    setTimeout(()=>flop3_src.nodeValue = convert(flop3),900);
}

// Open 4th Community Card
function open_turn() {
    // remove 1 card
    triumphSet.pop();
    
    turn = triumphSet.pop();
    
    turn_src.nodeValue = convert(turn);
}

// Open last Community Card
function open_river() {
    // remove 1 card
    triumphSet.pop();
    
    river = triumphSet.pop();
    
    river_src.nodeValue = convert(river);
}

function shuffle() {
    // Random Suffle
    let tmp_Set = [];
    //console.log(tmp_Set.includes(triumphSet[Math.floor(Math.random()*52)]));
    let i = 0;
    while(i < triumphSet.length) {
        var tmp = triumphSet[Math.floor(Math.random()*triumphSet.length)];
        if (!tmp_Set.includes(tmp)) {
            tmp_Set.push(tmp);
            i++;
        }
    }
    triumphSet = tmp_Set;
}

function deal() {    
    shuffle();
    
    // N Deal
    userPocket1 = triumphSet.pop();
    com1Pocket1 = triumphSet.pop();
    userPocket2 = triumphSet.pop();
    com1Pocket2 = triumphSet.pop();
    
//    console.log("userPocket : " + userPocket1 + ',' + userPocket2);
//    console.log("com1Pocket : " + com1Pocket1 + ',' + com1Pocket2);
//    console.log(triumphSet.length);
    
    userPocket1_src.nodeValue = convert(userPocket1);
    userPocket2_src.nodeValue = convert(userPocket2);
    
    open_flop();
    setTimeout(()=>open_turn(),1000);
    setTimeout(()=>open_river(),1000);
    
    com1Pocket1_src.nodeValue = convert(com1Pocket1);
    com1Pocket2_src.nodeValue = convert(com1Pocket2);
}

function start() {
    init();
    
    com1_chips.innerHTML -= default_Bet;
    user_chips.innerHTML -= default_Bet;
    //console.log(user_chips);
    
    turn_order();
    deal();
}

function main() {
    start_div.addEventListener('click', () => start());

}

main();