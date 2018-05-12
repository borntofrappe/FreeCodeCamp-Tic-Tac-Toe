// target the squares in the grid in which to show the x(s) and o(s)
const squares = document.querySelectorAll(".container .grid .square");
// target the header in which to show the result of the game
const headerResult = document.querySelector(".container h2");

// listen for a click event on all squares
squares.forEach(square => square.addEventListener("click", function(e) {
    // if the square has no text in it, draw x or o depending on which character should be included 
    // else do nothing
    if(square.textContent == "") {
        drawXO(e);
    }
}));

// initialize a variable to incremented which each call to drawXO(), to include alternatively x and o
let counter = 1;
function drawXO(e) {
    // e.target relates to the particular div which is actually clicked
    // draw x and o alternatively (as counter is initially 1, the script runs first the else statement)
    if(counter % 2 == 0) {
        e.target.textContent = "o";
    }
    else {
        e.target.textContent = "x";
    }
    // remove the style of the empty class (cursor pointer and hover state) 
    e.target.classList.remove("empty");
    
    // increment counter, allowing for the variable to be iteratively even and odd
    counter++;
    

    // check for a victory condition    
    checkforVictory();

    // check if all squares have some text in them (draw) 
    if(counter == 10) {
        // call a function to clear the grid
        clearGrid();
    }
    
}

// define a function to clear the grid of all text, after as much time as reasonable to assess the result
function clearGrid() {
    setTimeout(function() {
        // for each square, remove all text, reapply the class of empty
        squares.forEach(square => {
            square.textContent = "";
            square.classList.add("empty");
        });
        // for the header, reset its value to the original state and remove the result class
        headerResult.textContent = "Victory for";
        headerResult.classList.remove("result");
        // reset the counter variable to 1
        counter = 1;
    }, 1000);
}


// define a function to check for victorious patterns
function checkforVictory() {
    // create a string in which to include the pattern given by the 9 squares
    let squareValues = '';
    // loop through all squares, including the text value if present or a whitespace otherwise
    squares.forEach(square => {
        if(square.textContent) {
            squareValues += square.textContent;
        }
        else {
            squareValues += " ";
        }
    });

    // squareValues is now something in the form of 'x  o  x o'

    // check for all possible victorious outcomes (8), at which point call a function to show the result with the value which is repeated thrice as argument
    if(squareValues[0] == squareValues[1] && squareValues[0] == squareValues[2]) {
        showResult(squareValues[0]);
    }
    else if(squareValues[0] == squareValues[3] && squareValues[0] == squareValues[6]) {
        showResult(squareValues[0]);
    }
    else if(squareValues[0] == squareValues[4] && squareValues[0] == squareValues[8]) {
        showResult(squareValues[0]);
    }
    else if(squareValues[1] == squareValues[4] && squareValues[1] == squareValues[7]) {
        showResult(squareValues[1]);
    }
    else if(squareValues[2] == squareValues[4] && squareValues[2] == squareValues[6]) {
        showResult(squareValues[2]);
    }
    else if(squareValues[2] == squareValues[5] && squareValues[2] == squareValues[8]) {
        showResult(squareValues[2]);
    }
    else if(squareValues[3] == squareValues[4] && squareValues[3] == squareValues[5]) {
        showResult(squareValues[3]);
    }
    else if(squareValues[6] == squareValues[7] && squareValues[6] == squareValues[8]) {
        showResult(squareValues[6]);
    }
}

// define a function which shows the result if the value which is repeated thrice is different than whitespace
function showResult(thriceRepeated) {
    if(thriceRepeated != " ") {
        headerResult.textContent = "Victory to " + thriceRepeated;
        headerResult.classList.add("result");
        // clear the grid similarly to how you'd clear the grid in a draw
        clearGrid();
    }    
}