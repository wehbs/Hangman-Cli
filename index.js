var figlet = require("figlet");
var inquirer = require("inquirer");


// GLOBAL VARIABLES
var wordOptions = ["dog", "cat", "lion", "cheetah", "zebra", "pig", "giraffe", "tiger", "hippo", "sloth", "butterfly", "platypus", "eagle", "monkey", "shark"];
var selectedWord = "";
var lettersinWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongLetters = [];

// Game Counters
var winCount = 0;
var guessesLeft = 9;




// WORD CONSTRUCTOR
function Word(word) {
    this.word = word;
    this.roundComplete = function () {

        console.log("Remaining Guesses  " + guessesLeft);
        console.log("Animal To Guess  " + blanksAndSuccesses.join(" "));
        console.log("Guessed Wrong:  " + wrongLetters.join(" "));
        console.log('\n');
        

        // Check if user won then add 1 to win count and show an alert saying you won.
        if (lettersinWord.toString() == blanksAndSuccesses.toString()) {
            winCount++;
            console.log('\n');        
            console.log("You Won!");

            // Update the win counter in the console to match the winCount variable.
            console.log("wins  " + winCount);

            startGame();

        }

        // Check if the user lost.
        else if (guessesLeft == 0) {
            console.log("You Lost!");

            startGame();

        }

    }

};



// LETTER CONSTRUCTOR
function Letter(letter) {
    this.letter = letter;
    this.checkLetters = function (letter) {
        var isLetterInWord = false;
        for (var i = 0; i < numBlanks; i++) {
            if (selectedWord[i] == letter) {
                isLetterInWord = true;
            }
        }
        if (isLetterInWord) {
            for (var i = 0; i < numBlanks; i++) {
                if (selectedWord[i] == letter) {
                    blanksAndSuccesses[i] = letter;
                }
            }

        } else {
            wrongLetters.push(letter);
            guessesLeft--
            console.log(guessesLeft);
        }
        startInquirer();
    };
};


var randomWord;




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


    // var randomWord = new Word(selectedWord);
    console.log('\n');
    console.log(selectedWord);
    console.log("Animal To Guess  " + blanksAndSuccesses.join(" "));
    console.log("Remaining Guesses  " + guessesLeft);
    console.log("Wins  " + winCount);

    // FIGLET FUNCTION
    figlet("Animal  Hangman", function (err, data) {
        console.log('\n');
        console.log(data)
        // startInquirer();

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
startInquirer();
