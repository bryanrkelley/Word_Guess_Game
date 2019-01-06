/*JavaScript*/
(function () {

    //Prompt for name to use during the game.
    var name = prompt("What's your name?");

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

    var guesses, word, answerArray, remainingLetters, lettersGuessed;

    var $reset = document.getElementById('reset');


    function startGame() {

        document.querySelector("#result").innerHTML = '';
        document.querySelector("#guesses").innerHTML = '';
        document.querySelector("#guessedLetters").innerHTML = '';
        document.querySelector("#word").innerHTML = '';

        // Hide 'play again' button.
        $reset.classList.add('hide');

        guesses = 0;
        lettersGuessed = [];

        // Pick a random word from our array.
        word = words[Math.floor(Math.random() * words.length)].toLowerCase();

        // The answerArray is what is used to display the length of our word
        answerArray = [];
        // Populate word placeholders array.
        for (var i = 0; i < word.length; i++) {
            answerArray[i] = "_";
        };

        // Display word placeholder
        document.querySelector("#result").innerHTML = answerArray.join(' ');

        // Counts the remaining empty letters in our word
        remainingLetters = word.length;

        document.querySelector("#word").textContent = "<Directive: Press any key to guess an empty spot.  Be careful though!  You only get 7 chances before it is game over!>";

    }

    function updateNumberOfGuesses() {
        //Display number of guesses made and the directions
        document.querySelector("#guesses").innerHTML = "Number of Guesses: " + guesses;


        if (guesses === 7) {
            //Congratulate player on trying their best
            document.querySelector("#guesses").textContent = "<Error: Max Limit Obtained.  Game Over!>";
            document.querySelector("#word").innerHTML = "Good try " + name + "!  The word was " + word + ".";

            $reset.classList.remove('hide');

        }
    }


    function checkGuess(guess) {
        //Obtain guess from user
        //Forces all characters to be lower case
        guess = guess.toLowerCase();

        var isValid = false;

        // Check if dup guess
        if (lettersGuessed.includes(guess)) {
            triggerAlertDupGuess(guess);
            return;
        }
        
        //Update the array with the guess
        for (var j = 0; j < word.length; j++) {
            // If word letter is same as user guess
            if (word[j] === guess) {

                remainingLetters--;
                isValid = true;
                // && // AND
                // we don't want to count a letter that's already been answered
                // answerArray[j] !== guess) {
                answerArray[j] = guess;
            }
        }


        if (isValid === false) {
            guesses++;
            lettersGuessed.push(guess);
        }
        updateNumberOfGuesses()


        document.querySelector("#guessedLetters").innerHTML = "You have tried: " + lettersGuessed;

        $reset.classList.remove('hide');

        return answerArray;

    }

    function isValidGuess(guess) {
        return /^[A-Za-z]$/.test(guess);
    }

    // User duplicate guess alert.
    function triggerAlertDupGuess(guess) {
        alert('Already guessed "' + guess + '" try again!');
    }


    function handleValidGuess(e) {

        var key = String.fromCharCode(e.which);

        var result = checkGuess(key);

        document.querySelector("#result").innerHTML = result.join(' ');

        if (remainingLetters === 0) {
            //Congratulate player on guessing correctly
            document.querySelector("#guesses").textContent = "<Directive: Winner!>";
            document.querySelector("#word").innerHTML = "Good Job " + name + "!  Let's play again!";

            $reset.classList.remove('hide')

        }

    }

    // attach handler to the keydown event of the document
    document.addEventListener('keydown', function handler(e) {
        if (isValidGuess(e.key)) {
            handleValidGuess(e);
        } else if (event.keyCode === 13) {
            startGame();
        }
    });


    // Initial start of game
    startGame();


    $reset.addEventListener('click', function handler(e) {
        // Replay game
        startGame();
    });

})();