const prompt = require('prompt-sync')({ sigint: true }); 
require('colors');
const Shrugman = require("./shrugman");

const game = new Shrugman();

console.log(`\n

███████╗██╗  ██╗██████╗ ██╗   ██╗ ██████╗ ███╗   ███╗ █████╗ ███╗   ██╗
██╔════╝██║  ██║██╔══██╗██║   ██║██╔════╝ ████╗ ████║██╔══██╗████╗  ██║
███████╗███████║██████╔╝██║   ██║██║  ███╗██╔████╔██║███████║██╔██╗ ██║
╚════██║██╔══██║██╔══██╗██║   ██║██║   ██║██║╚██╔╝██║██╔══██║██║╚██╗██║
███████║██║  ██║██║  ██║╚██████╔╝╚██████╔╝██║ ╚═╝ ██║██║  ██║██║ ╚████║
╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝                                                                                                                                                                                 
 
`.rainbow);

let category = prompt(`Choose a category (movies / books): `.rainbow);
while(category.toLowerCase() !=="movies" && category.toLowerCase() !== "books"){
    category = prompt(`Choose a valid category, either movies or books: `.rainbow);
    }
    
game.setCategory(category);

let guess = "";

const runGame = function(){
while(game.isGameOn()){
    console.clear();
    console.log("Category >".blue, category.underline.blue, game.showAlreadyTried().italic.grey,"\n");
    console.log("\n\n", game.displayGuessWord().yellow, "\n\n");
    console.log(game.displayShrugman().bold.magenta, "\n\n");
    guess = prompt(` Guess a letter or type entire name to solve it: `.yellow);
    game.validateGuess(guess);
}};

runGame(); 

console.clear();
console.log("Category >".blue, category.underline.blue, game.showAlreadyTried().italic.grey,"\n");
console.log("\n\n", game.displayGuessWord().yellow, "\n\n");
console.log(game.displayShrugman().bold.magenta, "\n\n");

if(game.isWinning()){
    console.log(String.fromCodePoint(0x1F3C6, 0x1F973), "Well done!\n".magenta);
}
else{
    console.log(String.fromCodePoint(0x1F91E, 0x1F62C),`Better luck next time: ${game.guessWord}\n`.magenta);
}

game.addResult();

let anotherRound = prompt(`Another round with ${category} (y)? `.blue);

if(anotherRound === "y"){
    game.reset(); 
    runGame();
    console.clear();
    console.log("Category >".blue, category.underline.blue, game.showAlreadyTried().italic.gray,"\n");
    console.log("\n\n", game.displayGuessWord().yellow, "\n\n");
    console.log(game.displayShrugman().bold.magenta, "\n\n");
    game.addResult();

    if(game.isWinning()){
        console.log(String.fromCodePoint(0x1F3C6, 0x1F973), "Well done!".magenta);
    }
    else
        console.log(String.fromCodePoint(0x1F91E, 0x1F62C),`Better luck next time: ${game.guessWord}`.magenta);
    
}

console.log("\n", game.getResults(), "\n");
console.log("-- End of Game --".rainbow, "\n");
    




