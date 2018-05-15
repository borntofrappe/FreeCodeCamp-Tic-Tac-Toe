Link to the work-in-progress pen right [here](https://codepen.io/borntofrappe/full/JvZGdj/).

# Preface

The purpose of this project is create a Tic-Tac-Toe game, and in so doing complete the third and penultimate project for the @freecodecamp curriculum, in the line of "Advanced Front-End Web Development Projects".

The project itself needs to fulfill a series of user-stories:

- it is possible to play a tic-tac-toe game with the computer
- once a game it's over, a new one will start
- it is possible to pick and choose whether to play as X or O.

There's also a bonus-points user-story to be fulfilled:

- it is never actually possible to win a game with the computer.

This last feature seems to be rather daunting. As the project itself is already challenging, the bonus-points user-story will be postponed for a later update.

# Versions

I tried working with versions once before, and I'd figure I'd extend this approach for a larger-scale project such as this one. A good excuse to validate/destroy the usefulness of the methodology. I work in increments, building feature upon feature from the smallest, most innocuous and seemingly inconsequential steps to the final project.

**V1**: create a grid of nine squares in which, whenever the user clicks a square, you display an X right smack in the center of the simple shape

**V1.5**: instead of always displaying X, alternatively display X and O.

_Thoughts on V1.5_

These first versions are actuallly easier than anticipated. All that is required is an event listener attached to each square and a function which includes "x" and "o" alternatively. "x" and "o" are included if no prior text is already in the square and based on the even/odd nature of a counter variable, which is updated with every iteration through the function.

From this structure, some considerations must be weighed as to find out when the game ought to end.

**V2**: the game ends and resets when all squares contain text

**V2.3**: the game ends if one side wins

_Thoughts on V2.3_

Realizing that all the squares in the grid include text is a rather straightforward feature. In the project, this is achieved through the consideration of the `counter` variable updated at every iteration, which therefore reaches an upper limit. That being said, it could also be possible to loop over all the squares to check if even a single one doesn't contain any text-

Realizing that a side has won is a tad more challenging. At first I included a series of if/else if statements to check for a total of eight winning combinations.

The approach, while laborious in the implementation of the last step, worked as the following pseudo-code describes:

```
create an empty string
loop through all the squares in the grid
    if a square has some text
        append said text to the string
    else 
        append a whitespace
        
check if the string (a 9 character long string with "x", "o" and whitespace) matches a winning condition
```

If/else if statements worked, but the repetitiveness of the code was borderline horrifying.

That is when regular expressions occurred to me. Instead of conditional if/else if statements, I therefore created an array in which I stored the regex for all the possible winning combinations. With said treasure-trove, the script needs to create the 9 characters long string, as before, but it needs to just check if there's a match with one of the winning regex-

**V3**: it is possible to select whether to start the game as x or o.

_Thoughts on V3_

**V4**: it is possible to select whether to play against a human or a computer

_Thoughts on V4_

_Thoughts on future updates_















