Link to the work-in-progress pen right [here](https://codepen.io/borntofrappe/pen/JvZGdj).

# Preface

The purpose of this project is create a Tic-Tac-Toe game, and in so doing complete the third and penultimate project for the @freecodecamp curriculum, in the line of "Advanced Front-End Web Development Projects".

The project itself needs to fulfill a series of user stories:

- it is possible to play a tic-tac-toe game with the computer
- once a game it's over, a new one will start
- it is possible to pick and choose whether to play as X or O.

There's also a bonus-points user story to be fulfilled:

- it is never actually possible to win a game with the computer.

This last feature seems to be rather challenging. As the project itself is not straightforward, it will be relegated to V2.

# First Thoughts

Admittedly, this project stomped me a little. Repeatedly I decided to do something else, like setting up a workflow with gulp, instead of actually tackling the aforementioned user stories.

Hopefully, starting anyway will lead somewhere.

I started wondering about the canvas element, but later started to ponder about a simple grid structure.

# Plan

V1: create a grid of nine squares in which, whenever the user clicks a square, you display an X right smack in the center of the simple shape

V1.5: instead of always displaying X, alternatively display X and O.

These first versions are actuallly easier than anticipated. All that is required is an event listener attached to each square and a function which includes x and o alternatively (based on the even/odd nature of a counter variable) and if no prior text is already in the interacting square.

```JS
// target the squares of the grid
const squares = document.querySelectorAll(".grid .square");

// listen for a click event on all squares
squares.forEach(square => square.addEventListener("click", function(e) {
    // if the square has no text in it, draw x or o depending on which character should be included 
    // else do nothing
    if(square.textContent == "") {
        drawXandO(e);
    }
}));

// initialize a variable to iteratively include x and o
let counter = 1;
function drawXandO(e) {
    // e.target relates to the particular div which is actually clicked
    // console.log(e.target);

    // draw an x, always
    // e.target.textContent = "x";

    // draw x and o alternatively (as counter is initially 1, the script runs first the else statement)
    if(counter % 2 == 0) {
        e.target.textContent = "o";
    }
    else {
        e.target.textContent = "x";
    }
    // remove the cursor pointer for the selected square 
    e.target.style.cursor = "default";
    
    // increment counter, allowing for the variable to be iteratively even and odd
    counter++;
}
```

From this structure, without adding the computer playing the game, some considerations must be weighed as to find out when the game ought to end.

Beside the obvious and rather simpler instance in which all squares contain text, the game should end if somebody (o or x) wins...which begs the question of how to code such an occasion.

For the former case, it is actually straightforwards and even more ideas than one come to mind.

It is possible to loop over all squares, and check if not a single one contains text. It is also possible to use the fabricated `counter` variable. Indeed logging this variable will make this choice obvious.

At the end of the `draw()` function, this variable always stores the value of 10 (starting from 1, with 9 increments).

If this variable is equal to such value, it is possible to "clear" the grid.

```JS
// if all squares contain text
if(counter == 10) {
    // after 1.5 seconds, clear all text from the grid
    setTimeout(() => squares.forEach(square => square.textContent = ""), 1500);
}
```

This allows to reach the current version V1.8: display x and o alternatiely and clear the grid when all squares contain either. To display x and o again.

Still quite few features need to be included. The computer playing each alternate turn, the user selecting whether to play x and o, and the essential feature of ending the game early, if a winning condition is met...

I should probably start with the latter, as it is appears to be the most demanding of the bunch.
