// target the button which toggles the settings' panel
const toggleModal = document.querySelector(".container button");
// target the settings' panel
const modal = document.querySelector(".container .modal");
// target the input[type="radio"] as to retrieve the values set up in the settings' panel
const inputRadios = document.querySelectorAll(".container .modal fieldset input[type='radio']");

// create two variables for 1) the chosen opponent and 1) the chosen sign
// set them to the default value chosen for the input[type='radio']
let opponent = "human",
    side = "x";

// listen for a click event on the toggleModal button, at which point toggle the class of active on the modal div, to show/hide the modal itself
toggleModal.addEventListener("click", () => modal.classList.toggle("active"));

// listen for a change event on the input elements, at which point alter the opponent and side variables according to the selection
inputRadios.forEach(inputRadio => inputRadio.addEventListener("change", updateSettings));

// define a function to update the settings behind the game
function updateSettings(e) {
    // e.target.name relates to the chosen input elements (opponent or side, as per the HTML attribute)
    // e.target.value relates to the value of the selected input field 

    // according to the input elements altered, update the connected variable with the new value
    if(e.target.name == "opponent") {
        opponent = e.target.value;
    } 
    else if(e.target.name == "side") {
        side = e.target.value;
    }
}

// target the squares in the grid [in which to show the x(s) and o(s)]
const squares = document.querySelectorAll(".container .grid .square");
// target the header in which to show the result of the game
const headerResult = document.querySelector(".container h1");

// store in an array the patterns which describe a victory, with regular expressions
const winningRegex = [
    /^(\w)\1\1/, 
    /^(\w)..\1..\1/, 
    /^(\w)...\1...\1/,
    /^.(\w)..\1..\1/,
    /^..(\w).\1.\1/,
    /^..(\w)..\1..\1/,
    /^..(\w).\1.\1/,
    /^...(\w)\1\1/,
    /^......(\w)\1\1/
    ];


// listen for a click event on all squares, at which point trigger a function which checks the individual square in case x or o should be included in it
squares.forEach(square => square.addEventListener("click", checkSquare));


// define a function which checks if the square has no text in it
function checkSquare(e) {
    // e.target relates to the particular square which was clicked
    let target = e.target;
    // call a function to include an 'x' or 'o' sign, if no text is present in the square 
    // otherwise do nothing
    if(target.textContent == "") {
        drawXO(target, side);
    }
}


// initialize a variable incremented which each call to drawXO(), to include alternatively x and o
let counter = 1;

// define a variable to include x and o in the squares, whichever character was not previously used
function drawXO(square) {
    // initialize two sides for 'x' and 'o', according to the value stored in side ('human' by default, later possibly altered with the radio buttons)
    let sideOne = side;
    let sideTwo = (side == "o") ? "x":"o";

    // include x and o alternatively (as counter is initially 1, the script runs first the else statement)
    if(counter % 2 == 0) {
        square.textContent = sideTwo;
    }
    else {
        square.textContent = sideOne;  
    }

    // remove the style of the empty class (cursor pointer and hover state) 
    square.classList.remove("empty");
    // remove the possibility of changing the settings once the first sign is included in the grid
    modal.classList.remove("active");
    toggleModal.style.display ="none";
    
    // increment counter, allowing for the variable to be iteratively even and odd and include x and o
    counter++;

    // check for a victory condition (the function returns 'early victory' if a winning pattern is found in the grid) 
    let outcome = checkforVictory();
    // check for a draw unless a victory has already occurred
    if(outcome != "early victory") {
        checkForDraw(counter);    
        
        // if opponent is set to computer, call a function to include the choice of the computer, passing as argument "x" or "o", whichever side was not chosen by the player
        if(opponent == "computer") {
            letComputerPlay(sideTwo);
        }
    }
}


// define a function which allows for the computer to include an X or O in the grid, in one of the available squares
function letComputerPlay(computerSide) {
    // consider all the squares with a class of empty
    let emptySquares = document.querySelectorAll(".container .grid .empty");
    // select a random square among the node list just retrieved

    let randomSquareIndex = Math.floor(Math.random()*emptySquares.length);
    // target the random, empty square
    let randomEmptySquare = emptySquares[randomSquareIndex];

    // include "x" or "o", whichever sign was not chosen by the player, in one of the available empty squares
    randomEmptySquare.textContent = computerSide;
    // remove a class of empty from the affected element 
    randomEmptySquare.classList.remove("empty");

    // increment counter, allowing the player to use only one of the two signs, consistently throughout the game
    counter++;

    // check for a victory condition    
    let outcome = checkforVictory();
    // check for a draw, unless a victory has already occurred
    if(outcome != "early victory") {
        checkForDraw(counter);    
    }
}


// define a function to check if either side has won the game
function checkforVictory() {
    // create a string [in which to include the pattern given by the 9 squares]
    let gridPattern = '';
    // loop through all squares, including the text value if present or a whitespace otherwise
    squares.forEach(square => {
        if(square.textContent) {
            gridPattern += square.textContent;
        }
        else {
            gridPattern += " ";
        }
    });

    // gridPattern is now something in the form of 'x  o  x o'
    // loop through the array of winning possibilities
    for(let i = 0; i < winningRegex.length; i++) {
        // IF A MATCH IS FOUND, gridPattern.match(winningRegex[i]) returns an array
        // array with the matching regex as its first item and the value captured in (parens) as its second
        // this second value is exactly what is needed to describe who won the game
        let match = gridPattern.match(winningRegex[i]);

        // if gridPattern.match(winningRegex[i]) is true [the match() method has returned an array]
        if(match) {
            // store in a variable the character captured by the regex [which describes the winning side]
            let matchWinner = match[1];
            // display the result in the header
            dislpayResult("Victory to " + matchWinner + "!");
            // clear the grid
            clearGrid();

            // return a value which is used to stop the call to the checkForDraw() function
            return "early victory";
        }
    }
}


// define a function which checks if the game ends in a draw (all characters are included in the grid)
function checkForDraw(signs) {
    // if signs (representing the counter variable) has reachd 10 (starting from 1, including 9 'x' and 'o')
    if(signs == 10) {
        // display the result in the header
        dislpayResult("It's a draw");
        // clear the grid to play again, much alike the checkForVictory() function
        clearGrid();
    }
}


// define a function to clear the grid of all text, after as much time as reasonable to assess the result of the game
function clearGrid() {
    // immediately remove the event listener from all squares [to avoid including additional characters when a winner is described]
    squares.forEach(square => {
        // also remove the class of empty to make the squares visually not click-able
        square.classList.remove("empty");
        square.removeEventListener("click", checkSquare);
    });

    // after 2 seconds
    setTimeout(function() {
        // for each square, remove all text, reapply the class of empty, reattach the event listener
        squares.forEach(square => {
            square.textContent = "";
            square.classList.add("empty");
            square.addEventListener("click", checkSquare);
        });
        // for the header, remove the .result class [which makes it visible] 
        headerResult.classList.remove("result");

        // for the settings, make the toggle button once more visible (the settins' panel can be re-shown through this button)
        toggleModal.style.display = "block";

        // reset the counter variable to 1
        counter = 1;
    }, 2000);
}


// define a function which includes the argument as the text of the main header
function dislpayResult(result) {
    headerResult.textContent = result;
    // also add a .result class to show the result in the page [by default, the header is hidden]
    headerResult.classList.add("result");
}


