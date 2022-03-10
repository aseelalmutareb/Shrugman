class Shrugman{
    constructor(){
        this.guessedLettersList = [];
        this.shrugman = "¯\\_(:/)_/¯";
        this.attempts = this.shrugman.length;
        this.usedWords = {
            movies: [],
            books: []
        };
        this.results = [];
        this.options = {
            movies: [
                'The Godfather',
                'Forrest Gump',
                'Titanic',
                'Braveheart',
                'Lord of the Rings',
                'Tenet',
                'Gladiator',
                'Parasite',
                'Inception',
                'Shutter Island',
                'Interstellar',
                'The Greatest Showman',
                'The Wolf of Wall Street',
                'Deadpool',
                'Guardians of the Galaxy',
                'The Imitation Game',
                'A Beautiful Mind',
                'The Fault in Our Stars',
                'The Theory of Everything',
                'Me Before You',
                'The Men Who Stare at Goats'

            ],
            books: [
                'Pride and Prejudice',
                'Crime and Punishment',
                'Good Omens',
                'One Thousand and One Nights',
                'In Search of Lost Time',
                'To Kill a Mockingbird',
                'A Brief History of Time',
                'The Diary of a Young Girl',
                'Lord of the Flies',
                'The Kite Runner',
                'A Tale of Two Cities',
                'Romeo and Juliet',
                'Alice in Wonderland'
            ]

        };
        this.category = Object.keys(this.options)[0];
        this.guessWord = "";
    }

    setCategory(category){
        
        this.category = category;
        this.guessWord = this.getGuessWord(this.category);
        return this.category;
   }

    getGuessWord(category){
        let randomIndex = Math.floor(Math.random() * this.options[category].length);
        let guessWord = this.options[category][randomIndex];
        while(this.usedWords[category].includes(guessWord)){
            randomIndex = Math.floor(Math.random() * this.options[category].length);
            guessWord = this.options[category][randomIndex];
        }
            
        this.usedWords[category].push(guessWord); 
        return guessWord;   
    }

    displayGuessWord(){
        let currentWord = this.guessWord.split('').map(char =>{
            if(char === " " || this.guessedLettersList.includes(char.toLowerCase()))
                return char;
            else
                return "_";
        }).join("");

        return currentWord;
    }

    displayShrugman(){
        return this.shrugman.slice(0, this.shrugman.length - this.attempts);
    }

    validateGuess(guess){
        guess = guess.toLowerCase();
        
        if(guess.length > 1){
             if(guess === this.guessWord.toLowerCase()){
                
                guess.split("").forEach(char =>{
                    if(!this.guessedLettersList.includes(char) && char !== " ")
                    this.guessedLettersList.push(char);
                });
                this.isWinning();
            }
               
            else
                this.attempts--;
                
        }else{
            if(!this.guessedLettersList.includes(guess)) // add guess to guessedLetterList if not there yet
            {
                
                if(!this.guessWord.toLowerCase().includes(guess)) // decrement allowed attempts if wrong guess
                    this.attempts--;
                this.guessedLettersList.push(guess);
        }       
        return this.guessedLettersList;}   
    }

    showAlreadyTried(){
        return this.attempts !== 10 ?`(Already tried: ${this.guessedLettersList.filter(guess => !this.guessWord.toLowerCase().includes(guess)).join(", ")}) - ${this.attempts} attempts left` : ``;
    }
    
    addResult(){
     this.results.push({
         word: this.guessWord,
         result: this.isWinning() ? "win" : "loss"
     });   
    }

    getResults(){
         return this.results.map((item, index) => `${index + 1}. ${item.word} - ${item.result} `).join("\n ");
    }

    isWinning(){
        return this.guessWord === this.displayGuessWord();
    }

    isGameOn(){
        return this.attempts !== 0 && !this.isWinning()
    }

    reset(){
        this.guessedLettersList = [];
        this.attempts = this.shrugman.length;
        this.guessWord = this.getGuessWord(this.category);
    }
    
}

module.exports = Shrugman;