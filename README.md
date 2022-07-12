# weaver solver
a solver for any challenge of the weaver game. the game can be played at [wordwormdormdork.com](http://wordwormdormdork.com/) or [weaverwordle.com](http://weaverwordle.com/).
the game is a "word ladder" game.
### rules
you have to weave your way from the strating word to the ending word. each word inbetween can only change 1 letter from the word above.

## how does it work
finding the shortest path works through a smiple pathfinding algorithm. the first step is to find all possible next words from the current words. 
for this purpose, the `script.js` file includes a list of words. I have no idea if these are the same set of words used in the game,
but so far I have not had any wrong matches. after finding all possible next steps, all next options are ranked based on search depth and similarity to
the target word. the best option is then picked to continue the search. this approach should always yield the shortest path.

## known issues
since this was just a one-day project, I don't intend to maintain this to a mentionable degree.
### not able to find a connection
to reproduce: try to connect knee and zinc

the solver does not always find a connection between two words. this is especially difficult in cases where the word you are trying to reach has very few
connections to other words. to mitigate this, the solver looks both from **A** to **B** and from **B** to **A** when finding a solution. this can help if
**A** _or_ **B** is difficult to reach, but not when **A** _and_ **B** are difficult to reach (like in the knee -> zinc example).
### unresponsive typing
to reproduce: type in "knee zinc". the last c will only be displayed after a second.

the reason this occurs is that the computation starts as soon as you type the letter, and some computation can take longer. I can only advise to be patient
and not spam keys when it appears stuck. it would be possible to reduce the lag by lowering the iteration threshhold for when the search should give up, but
it is always a balancing act.