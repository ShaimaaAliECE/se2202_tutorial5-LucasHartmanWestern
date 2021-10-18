let nextPlayer; // takes a value of either 'X' or 'O' according to the game turns

// initialize the game
nextPlayer = prompt("Which player will you start as? X or O?");
if(nextPlayer != 'X' && nextPlayer != 'O')
    nextPlayer = 'X';

// use the value stored in the nextPlayer variable to indicate who the next player is
let nextPlayerlbl = document.getElementById('next-lbl');
nextPlayerlbl.textContent = nextPlayer;

//This call will create the buttons needed for the gameboard.
createGameBoard();

function createGameBoard()
{
    // Programatically add a button with square brackets enclosing an empty space to each cell in the gameboard
    let cells = document.querySelectorAll('td');
    let htmlToAdd = `<button>[ ]</button>`;

    for(let i = 0; i < cells.length; i++)
    {
        cells[i].innerHTML = htmlToAdd;
    }
};

// Programatically add 'takeCell' as an event listener to all the buttons on the board
let btns = document.querySelectorAll('button');
for (let i=0; i<btns.length; i++)
{
    btns[i].addEventListener('click', (event) => { takeCell(event)});
}

// This function will be used to respond to a click event on any of the board buttons.
function takeCell(event)
{
    /*
        When the button is clicked, the space inside its square brackets is replaced by the value in the nextPlayer before switching it
    */
    let eventTarget = event.target;
    eventTarget.textContent = `[` + nextPlayer + `]`;

    // Make sure the button is clickable only once (I didn't mention how to do that, look it up :) )
    eventTarget.setAttribute('disabled','disabled');

    if(nextPlayer == 'X')
        nextPlayer = 'O';
    else
        nextPlayer = 'X';
    
    nextPlayerlbl.textContent = nextPlayer;

    // Check if the game is over
    if (isGameOver())
    {
        // let the label with the id 'game-over-lbl' display the words 'Game Over' inside <h1> element
        let gameOverLbl = document.querySelector('#game-over-lbl');
        gameOverLbl.innerHTML = "<h1>Game Over</h1>";
    }

    // I'll leave declaring the winner for your intrinsic motivation, it's not required for this assignment 
    checkForWinner();
};

function checkForWinner()
{
    // This function checks for a vertical, horizontal, and diagonal victory by either player
    let buttonArray = document.querySelectorAll('button');
    let gameOverLbl = document.querySelector('#game-over-lbl');
    let playerWon;

    // Check for horizontal victory
    for(let i = 0; i < buttonArray.length; i += 3)
    {
        if(buttonArray[i].textContent != "[ ]" && buttonArray[i].textContent == buttonArray[i + 1].textContent && buttonArray[i].textContent == buttonArray[i + 2].textContent)
        {
            playerWon = buttonArray[i].textContent.slice(1,2);
            gameOverLbl.innerHTML = "<h1>" + playerWon + ' Wins</h1>';
        }  
    }

    // Check for vertical victory
    for(let i = 0; i < (buttonArray.length / 3); i++)
    {
        if(buttonArray[i].textContent != "[ ]" && buttonArray[i].textContent == buttonArray[i + 3].textContent && buttonArray[i].textContent == buttonArray[i + 6].textContent)
        {
            playerWon = buttonArray[i].textContent.slice(1,2);
            gameOverLbl.innerHTML = "<h1>" + playerWon + ' Wins</h1>';
        }
    }

    // Check for diagonal victory
    if(buttonArray[0].textContent != "[ ]" && buttonArray[0].textContent == buttonArray[4].textContent && buttonArray[0].textContent == buttonArray[8].textContent)
    {
        playerWon = buttonArray[0].textContent.slice(1,2);
        gameOverLbl.innerHTML = "<h1>" + playerWon + ' Wins</h1>';
    }
    if(buttonArray[2].textContent != "[ ]" && buttonArray[2].textContent == buttonArray[4].textContent && buttonArray[2].textContent == buttonArray[6].textContent)
    {
        playerWon = buttonArray[2].textContent.slice(1,2);
        gameOverLbl.innerHTML = "<h1>" + playerWon + ' Wins</h1>';
    }
    
    // Disable all the buttons
    if(playerWon)
    {
        for(let i = 0; i < buttonArray.length; i++)
        {
            buttonArray[i].disabled = true;
        }
    }
};

function isGameOver()
{
    // This function returns true if all the buttons are disabled and false otherwise
    let buttonArray = document.querySelectorAll('button');
    let disabledCount = 0;

    for(let i = 0; i < buttonArray.length; i++)
    {
        if(buttonArray[i].disabled)
            disabledCount++;
    }

    if (disabledCount == buttonArray.length)
        return true;
    else
        return false;
};