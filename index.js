var word = require("./Word");
var inquirer = require("inquirer");
var colors = require("colors");
var game = {
    WordList: ["jon snow", "direwolf", "winterfell", "targaryen", "stark",
        "daenerys", "viserion", "stormborn", "rhaegal", "casterly rock", "lannister",
        "cersei", "tyrion", "joffrey", "kraken", "greyjoy", "pyke", "iron islands",
        "theon", "dothraki", "drogo", "khlasar", "khaleesi", "arakhs", "mormont",
        "jorah", "bear island", "lyanna", "longclaw"],
    curState: "",
    nguessLeft: 9,
    ngameWon: 0,
    ngameLost: 0,
    selInd: "",
    selWrd: "",
    rndWrd: "",
    guessed: [],
    randomPick: function () {
        this.selInd = Math.floor(Math.random() * this.WordList.length);
        this.selWrd = this.WordList[this.selInd];
    },
    resetGame: function () {
        this.nguessLeft = 9;
        this.curState = "";
        this.guessed = [];
    },
    gameWin: function () {
        this.ngameWon++;
        console.log(("Congrats you win! You have won " + this.ngameWon + " games and lost " + this.ngameLost + " games!!!" ).yellow.bold.bgBlue);
        this.resetGame();
    },
    gameLoose: function () {
        this.ngameLost++;
        console.log(("\nCorrect word was " + this.selWrd + "\n").bold.black.bgRed)
        console.log(("Sorry you lost!! You have won " + this.ngameWon + " games and lost " + this.ngameLost + " games!!!").yellow.bold.bgBlue);
        this.resetGame();
    }
};
function initGame() {
    var gcnt = game.ngameLost + game.ngameWon;
    if (gcnt === 0) {
        console.log("\n __________________________________\n",
            "|--------------------------------|\n".inverse,
            "|-------- Welcome to the --------|\n".inverse,
            "|-------- GAME OF THRONES -------|\n".inverse,
            "|---------- Hangman Game --------|\n".inverse,
            "__________________________________\n".inverse)
        msg = "Ready To play the game?";
    } else {
        console.log(' ______________________________________\n',
            ('--------- END OF ROUND ' + gcnt + ' -------------\n').inverse,
            '--------------------------------------\n'.inverse
        )
        msg = "Ready To play another game?";
    }
    inquirer.prompt({
        type: "confirm",
        message: msg,
        name: "c0"
    }).then(function (r0) {
        if (r0.c0) {
            game.randomPick();
            //console.log(game.selWrd);    
            game.rndWrd = new word(game.selWrd)
            game.rndWrd.addSet();
            game.curState = game.rndWrd.guess("");
            console.log(game.curState.yellow);
            play_game();
        } else {
            console.log("\n ____________________________________\n",
                "| OK! Run me when you want to play!|\n".inverse,
                "====================================\n".inverse)
        }
    })
}

initGame()

function play_game() {
    if (game.nguessLeft === 0) {
        game.gameLoose();
        initGame();
    } else if (game.curState.split("").indexOf("_") < 0) {
        game.gameWin();
        initGame();
    } else {
        letterInqr();
    }
};

function letterInqr() {
    inquirer.prompt({
        type: "input",
        name: "ltr",
        message: "Type the letter of choice!".red,
        validate: function (rrr) {
            if (game.guessed.indexOf(rrr) > -1) {
                console.log(("\nYou have already Guessed " + rrr +" \n" ).black.bgCyan)
                return false
            } else if (!rrr.toLowerCase().match(/[a-z]/i)){ 
                console.log("\n Not a letter!!\n".black.bgCyan)
                return false
            } else {
                return true
            }
        }
    }).then(function (resp) {
        curString = game.rndWrd.guess(resp.ltr.toLowerCase());
        if (curString === game.curState) {
            console.log("INCORRECT!".red.bold.underline.red);
            game.nguessLeft--;
            console.log(("Guesses Left: " + game.nguessLeft ).bold.red)
        } else {
            console.log("CORRECT!".green.bold.underline.green);
            game.curState = curString;
        }
        game.guessed.push(resp.ltr.toLowerCase())
        console.log(("Guessed Letters so far: " + game.guessed.join(",") ).black.bgYellow)
        console.log(game.curState.yellow)
        play_game();
    })
}
