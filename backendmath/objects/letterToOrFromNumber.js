class letterToOrFromNumber{

    /*
    So this is used to easily turn the value of each letter into its 
    integer representation. however the String.fromCharCode(x) returns
    the ASCII numarical value instead of 0-26 so I use this class to 
    fix that situation.
    

    The constructor creates the letter to number map and the number to 
    letter map then activates both functions to fill each map.
    */
    constructor(){
        this.letterMap = new Map();
        this.numberMap = new Map();
        setupLetterToNumber();
        setupNumberToLetter();
    }


    /*
    has the key of the lowercase letters with its corresponding integer value
    */
    setupLetterToNumber(){
        g = 0;
        for(i = 97; i<= 122; i++){
            this.letterMap.set(String.fromCharCode(i),g);
            g++
        }
    }
    /*
    has the kay of the integer representation of the letters with its corresponding letter value
    */
    setupNumberToLetter(){
        g = 0;
        for(i = 97; i<= 122; i++){
            this.numberMap.set(g,String.fromCharCode(i));
            g++
        }
    }

    /*
    returns the letter value of the number
    */
    getLetter(number){
        return this.numberMap.get(number);
    }
    /*
    returns the integer value of the letter
    */
    getNumber(letter){
        return this.letterMap.get(letter)
    }


}

