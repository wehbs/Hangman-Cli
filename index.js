var figlet = require("figlet");
var inquirer = require("inquirer");


// GLOBAL VARIABLES
var wordOptions = ["dog", "cat", "lion", "cheetah", "zebra", "pig", "giraffe", "tiger", "hippo", "sloth", "butterfly", "platypus", "eagle", "monkey", "shark"];
var selectedWord = "";
var lettersinWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongLetters = [];
var randomWord;

// Game Counters
var winCount = 0;
var guessesLeft;




// WORD CONSTRUCTOR
function Word(word) {
    this.word = word;
    this.roundComplete = function () {

        console.log('\n');
        console.log("Remaining Guesses  " + guessesLeft);
        console.log("Animal To Guess  " + blanksAndSuccesses.join(" "));
        console.log("Guessed Wrong:  " + wrongLetters.join(" "));
        console.log('\n');


        // Check if user won then add 1 to win count and cnosole.log(you won).
        if (lettersinWord.toString() == blanksAndSuccesses.toString()) {
            winCount++;
            console.log('\n');
            // console.log("You Won!");
            figlet("You Won!", function (err, data) {
                console.log(data)
            });
            // Update the win counter in the console to match the winCount variable.
            console.log("wins  " + winCount);
            // Run the startGame function.
            // startGame();
            setTimeout(startGame, 200);

        }

        // Check if the user lost.
        else if (guessesLeft == 0) {
            // console.log("You Lost!");
            figlet("You Lost!", function (err, data) {
                console.log(data)
            });
            // Run the startGame function.            
            // startGame();
            setTimeout(startGame, 200);

        }

    }

};



// LETTER CONSTRUCTOR
function Letter(letter) {
    this.letter = letter;
    // Checks whether the letter selected macthes any letters of the chosen word.
    this.checkLetters = function (letter) {
        var isLetterInWord = false;
        for (var i = 0; i < numBlanks; i++) {
            if (selectedWord[i] == letter) {
                isLetterInWord = true;
            }
        }
        // If the letter is in the word replace the "_" location with the correct letter.
        if (isLetterInWord) {
            for (var i = 0; i < numBlanks; i++) {
                if (selectedWord[i] == letter) {
                    blanksAndSuccesses[i] = letter;
                }
            }

        }
        // If the letter is not in the word push it to the array of wrong letters and decrease the guessesleft variable by one.
        else {
            wrongLetters.push(letter);
            guessesLeft--
            console.log(guessesLeft);

        }
        setTimeout(startInquirer, 250);
    };
};




function startGame() {
    randomWord = new Word(wordOptions[Math.floor(Math.random() * wordOptions.length)]);

    selectedWord = randomWord.word;
    lettersinWord = selectedWord.split("");
    numBlanks = lettersinWord.length;


    guessesLeft = 9;
    wrongLetters = [];
    blanksAndSuccesses = [];

    for (var i = 0; i < numBlanks; i++) {
        blanksAndSuccesses.push("_");
    }


    console.log('\n');
    console.log(selectedWord);
    // console.log("Remaining Guesses  " + guessesLeft);    
    console.log("Animal To Guess  " + blanksAndSuccesses.join(" "));
    // console.log("Guessed Wrong:  " + wrongLetters.join(" "));    
    console.log("Wins  " + winCount);
    console.log('\n');


    // FIGLET FUNCTION
    figlet("Animal  Hangman", function (err, data) {
        console.log(data)
    });


};



function startInquirer() {

    // INQUIRER FUNCTION
    inquirer.prompt([{
        name: "letter",
        message: "Guess a letter"
    }]).then(function (answers) {



        var letterGuessed = new Letter(answers.letter);

        // Run the picked letter through the check letter function
        letterGuessed.checkLetters(letterGuessed.letter);
        randomWord.roundComplete();
        // console.log(letterGuessed.letter);        
        //startInquirer();
    });
};


startGame();
setTimeout(startInquirer, 250);