/*JavaScript*/
(function () {

    //Prompt for name to use during the game.
    //var name = prompt("What's your name?");

    //The word array (called "words") to be used for the game
    var words = [
        "javascript",
        "coding",
        "css",
        "bootstrap",
        "computer",
        "framework",
        "git",
        "github",
        "html",
        "jquery",
        "pseudocode",
        "syntax",
        "unicorn",
        "database"
    ];

    var guesses, word, answerArray, remainingLetters;

    var $reset = document.getElementById('reset');


    function startGame() {

        document.querySelector("#result").innerHTML = '';
        document.querySelector("#guesses").innerHTML = '';
        document.querySelector("#word").innerHTML = '';

        // Hide 'play again' button.
        $reset.classList.add('hide');

        guesses = 0;

        // Pick a random word from our array.
        word = words[Math.floor(Math.random() * words.length)];

        // The answerArray is what is used to display the length of our word
        answerArray = [];
        for (var i = 0; i < word.length; i++) {
            answerArray[i] = "_";
        };

        // Display word placeholder
        document.querySelector("#result").innerHTML = answerArray.join(' ');

        // @todo: display instructions "press any key.."

        // Counts the remaining empty letters in our word
        remainingLetters = word.length;

    }

    function updateNumberOfGuesses() {
        //Display number of guesses made and the directions
        document.querySelector("#guesses").innerHTML = "Number of Guesses: " + guesses;
        document.querySelector("#word").innerHTML = "Press any key to guess an empty spot.  Be careful though!  You only get 7 chances before it is game over!";

        if (guesses === 7) {
            //Congratulate player on trying their best
            document.querySelector("#guesses").innerHTML = "Game Over!";
            document.querySelector("#word").innerHTML = "Good try " + name + "!  The word was " + word;

            $reset.classList.remove('hide');

        }
    }


    function checkGuess(guess) {
        //Obtain guess from user
        //Forces all characters to be lower case
        guess = guess.toLowerCase();

        var isValid = false;
        //Update the array with the guess
        for (var j = 0; j < word.length; j++) {
            // If word letter is same as user guess
            if (word[j] === guess && // AND
                // we don't want to count a letter that's already been answered
                answerArray[j] !== guess) {
                answerArray[j] = guess;
                remainingLetters--;
                isValid = true;
            }
        }

        if (isValid === false) {
            guesses++
        }
        updateNumberOfGuesses ()

        return answerArray;

    }


    // attach handler to the keydown event of the document
    document.addEventListener('keydown', function handler(e) {
        var key = String.fromCharCode(e.which);

        console.log(key);
        var result = checkGuess(key);

        document.querySelector("#result").innerHTML = result.join(' ');

        if (remainingLetters === 0) {
            //Congratulate player on guessing correctly
            document.querySelector("#guesses").innerHTML = "Game Over!";
            document.querySelector("#word").innerHTML = "Good Job " + name + "!";

            $reset.classList.remove('hide')

        }


    });


    // Initial start of game
    startGame();


    $reset.addEventListener('click', function handler(e) {
        // Replay game
        startGame();
    });

})();