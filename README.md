# weaver solver
a solver for any challenge of the weaver game. the game can be played at [wordwormdormdork.com](http://wordwormdormdork.com/) or [weaverwordle.com](http://weaverwordle.com/).
the game is a "word ladder" game.
### rules
you have to weave your way from the strating word to the ending word. each word inbetween can only change 1 letter from the word above.

## FAQ
### I can't connect 2 words?
if this happens with an actual game, please open an issue with the words that don't work. I don't know if I am using the same dictionary as the original games, so that might cause problems. If this happens with words you have chosen, the problem could be one of these two:
1. one of the words does not exist and no connection is possible
2. one of the words is a "loner" that has no connecting words, meaning that it can't be reached
### What is the longest distance between 2 words?
I have not tested this conclusively, but I think "unau" to "quey" (19 total words) is a good contender. try yourself, if you can find longer weaves!
### How does this work?
in the code, there is a list of all possible words. While searching, we do a bidirectional BFS, meaning a breadth-first search from both ends of the weave until we meet in the middle and find a valid path from one to the other. due to the paths having no weights, and the branching nature of the graph, this is a really fast and efficient approach. 
### why are you ruining the game by giving out the solution?
I want to give all the people that don't have english as their native language a chance to get to the optimal score too.
