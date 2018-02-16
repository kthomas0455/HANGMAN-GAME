
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z","-"];

var characters = ["wolverine", "deadpool", "iron-man", "hulk", "venom", "black-panther", "thor", "thanos", "loki", "hawkeye", "antman","captain-america","spider-man","war-machine","vision","groot","star-lord","cyclops","iron-fist","gambit"];

var gameStarted = false;
var currentWord;
var wordAsDashes;
var guessesLeft;
var lettersGuessed;
var numWins = 0;
var numLosses = 0;
var getNewWord;
var wordPlace; 
var correctGuesses;
var wordAsArr = [];
var dashesArray = [];



	function initialize() {
		gameStarted = true;
		lettersGuessed = [];
		correctGuesses = 0;
		wordPlace = Math.floor(Math.random() * characters.length);
		currentWord = characters[wordPlace];			
		guessesLeft = 15;		
		wordAsDashes = makeIntoDashes(currentWord);	
		wordAsArr = currentWord.split('');			
		dashesArray = wordAsDashes.split('');
		document.getElementById("currentWord").innerHTML = wordAsDashes;
		document.getElementById("lettersGuessed").innerHTML = "--";
		document.getElementById("guessesLeft").innerHTML = guessesLeft;
	}
	function makeIntoDashes(word) {
		var dashes = "";
		for (i = 0; i < word.length - 1; i++) {
			dashes += "_ ";
		}
		dashes += "_";
		return dashes;
	}
	function playGame(letter) {
		var letter = letter.toLowerCase();
		if (alphabet.indexOf(letter) > -1) {
			if (wordAsArr.indexOf(letter) > -1) {
				correctGuesses++;
				displayLetter(letter);
			}
			else {
				if (lettersGuessed.indexOf(letter) > -1) {
					return;
				}
				else {
					guessesLeft--;
					document.getElementById("guessesLeft").innerHTML = guessesLeft;
					lettersGuessed.push(letter);
					document.getElementById("lettersGuessed").innerHTML = lettersGuessed.join(' ');
					if (guessesLeft == 0) {
						alert("Sorry! The correct answer is " + currentWord);
						initialize();
						numLosses++;
						document.getElementById("losses").innerHTML = numLosses;
					}
				}
			}
		}
	}
	function displayLetter(letter) {
		for (i = 0; i < currentWord.length; i++) {
			if (letter == wordAsArr[i]) {
				dashesArray[i * 2] = letter;
				console.log(dashesArray);
			}
		}
		document.getElementById("currentWord").innerHTML = dashesArray.join("");
		checkForWin();
	}
	function checkForWin() {
		if (dashesArray.indexOf("_") === -1) {
			alert("You got it! The correct answer is " + currentWord);
			numWins++;
			document.getElementById("wins").innerHTML = numWins;
			initialize();
		}
	}
	document.onkeyup = function (event) {
		if (!gameStarted) {
			document.getElementById("letsPlay").innerHTML = "";
			initialize();
			document.getElementById("currentWord").innerHTML = wordAsDashes.split(",");
			console.log(currentWord);
			gameStarted = true;
		}
		else {
			playGame(event.key);
		}
	}