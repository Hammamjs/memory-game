document.querySelector('.control-game span').onclick = function () {


    let theName = prompt('what is Your Name');
    if(theName === null || theName === '') {
        document.querySelector('.name span').innerHTML = 'unknown';
    }else {
        document.querySelector('.name span').innerHTML = theName;
    }

    this.parentElement.remove();

    timer();
}


if (localStorage.getItem('name') !== '' ) {
    // playerScore();
}



let duration = 1000;

let containerBlock = document.querySelector('.game-holder');

let blocks = Array.from(containerBlock.children);

let orderRange = [...Array(blocks.length).keys()];

// let orderRange = Array.from(Array(blocks.length).keys());

shuffle(orderRange);

blocks.forEach(((block , index) => {
    block.style.order = orderRange[index];

    block.addEventListener('click' , () => {
    flipped(block);

    let flippedBox = blocks.filter(flippedBox => flippedBox.classList.contains('is-flipped'));

    if (flippedBox.length === 2) {
        stopClicking();
        isMatched(flippedBox[0] , flippedBox[1]);
    } 
})


}));


function shuffle(arr) {
    let current = arr.length,
    temp , random;
    while (current > 0) {
    random = Math.floor(Math.random() * current)
    current--;
        temp = arr[current];
        arr[current] = arr[random];
        arr[random] = temp;
    }

    return arr;
} 



function flipped(selected) {
    selected.classList.add('is-flipped')
}


function stopClicking() {

    containerBlock.classList.add('no-clicking');

    setTimeout (() => {
    containerBlock.classList.remove('no-clicking');
    }, duration)
}

let wrongs = 0;

function isMatched(firstCard , secondCard) {
    if (firstCard.dataset.dr === secondCard.dataset.dr) {

        firstCard.classList.remove('is-flipped');
        secondCard.classList.remove('is-flipped');


    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    document.getElementById('succes').play();

    }else {
        wrongs++;
        setTimeout(() => {
            firstCard.classList.remove('is-flipped');
            secondCard.classList.remove('is-flipped');
    document.getElementById('fail').play();

        document.querySelector('.wrong span').innerHTML = parseInt(wrongs);


        localStorage.setItem('score' , wrongs);

        }, duration);
    }

}


function timer() {

blocks.forEach(flippedBox => flippedBox.classList.add('is-flipped'));

    setTimeout(() => {
blocks.forEach(flippedBox => flippedBox.classList.remove('is-flipped'));
} , 2000)


    setInterval(() => {
    document.getElementById('main').play();
});

let minutes = document.querySelector('.time .minutes');
let seconds = document.querySelector('.time .seconds');

    // let timer = time;


    let timer = setInterval(() => {

        seconds.innerHTML--;

        (seconds.innerHTML < 10) ? seconds.innerHTML  = '0' +  seconds.innerHTML : seconds.innerHTML;

        if (seconds.innerHTML <= '00') {
            minutes.innerHTML -= 1;
            seconds.innerHTML = 59;
        }

        if (minutes.innerHTML < '00') {

            seconds.innerHTML--;

            
        }

        if(minutes.innerHTML === '0' && seconds.innerHTML === '0') {
            clearInterval(timer);                        
        }

    let flippedBox = blocks.filter(flippedBox => flippedBox.classList.contains('matched'));

    

        if(minutes.innerHTML === '0' && seconds.innerHTML === '0' && flippedBox.length !== containerBlock.children.length - 3) {
            let div = document.querySelector('div');
            let spantext = document.querySelector('span');
            div.className = 'loser';
            let spanTxt = document.createTextNode(` Sorry you didnt succeded refresh the page to play again`);
            spantext.appendChild(spanTxt)
            div.append(spantext);
            document.body.append(div);

    containerBlock.classList.add('no-clicking');
        }

        if(minutes.innerHTML !== '0' && seconds.innerHTML !== '0' && flippedBox.length === containerBlock.children.length - 3) {
            clearInterval(timer);

            let div = document.querySelector('div');
            let spantext = document.querySelector('span');
            div.className = 'winner';

            let spanTxt = document.createTextNode(` Congratulations ! You win in the Game with ${wrongs} mistakes`)
            spantext.appendChild(spanTxt)
            div.append(spantext);
            document.body.append(div);

    containerBlock.classList.add('no-clicking');

        }

        // console.log(containerBlock.children.length)

    }, duration)

}


function playerScore() {
    
    let scoreDiv = document.createElement('div');
    scoreDiv.className = 'score';
    let playerSpan = document.createElement('span');
    let scoreSpan = document.createElement('span');
    let playerName = document.createTextNode('Player : ' + localStorage.getItem('name'));
    let playerWrongs = document.createTextNode('wrongs : ' + localStorage.getItem('score'));

    playerSpan.append(playerName);
    scoreSpan.append(playerWrongs);

    scoreDiv.append(playerSpan);
    scoreDiv.append(scoreSpan);


    document.querySelector('.container').appendChild(scoreDiv);

}
