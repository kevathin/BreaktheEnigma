
class LetterToOrFromNumber{
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
        this.setupLetterToNumber();
        this.setupNumberToLetter();
    }


    /*
    has the key of the lowercase letters with its corresponding integer value
    */
    setupLetterToNumber(){
        let g = 0;
        for(let i = 97; i<= 122; i++){
            this.letterMap.set(String.fromCharCode(i),g);
            g++;
        }
    }
    /*
    has the kay of the integer representation of the letters with its corresponding letter value
    */
    setupNumberToLetter(){
        let g = 0;
        for(let i = 97; i<= 122; i++){
            this.numberMap.set(g,String.fromCharCode(i));
            g++;
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
        return this.letterMap.get(letter);
    }


}

class LinearCipher{
    /*
    this class is used for the reflector used inside of the enigma where 
    instead of rotators it acts like the plug box. An example of this
    is that input t would turn into z and z would turn into t.

    The constructor creates the hashmap and send to setup to fill the map.
    */
    constructor(cipherValues){
        this.map = new Map();
        this.setup
    }

    /*
    this fills the hashmap and adds the resulting mirror values of each
    character.
    */
    setup(cipherValues){
        for(let i = 0; i< 26; i++){
            this.map.set(i,cipherValues[i]);
        }
    }

    /*
    this returns the corresponding value related to the inputvalue
    */
    getvalue(inputvalue){
        return this.map.get(inputvalue);
    }

    /*
    sets the key to the value
    */
    setvalue(k, v){
        this.map.set(k, v);
    }
}

class Rotator{
    
    /*
    This class is used to represent the rotors used in the enigma.

    the rotors will differ from the mirror because the rotors will
    rotate all the values contained which is the main selling point
    of the enigma.

    the constructor will create a hash map and activate a function to 
    fill the map.
    */
    constructor(){
        this.map = new Map();
        this.setup();
        this.rotations = 0;
    }

    /*
    The default rotor will contain a 1-1 Cipher where if given
    extra time I will turn it into a linear Cipher that is depected
    by the user. example the default value of a would be equal to a
    however the values will be rotated when required.
    */
    setup(){
        for(let i = 0; i< 26; i++){
            this.setvalue(i, i);
        }
    }
    
    /*
    this will return the value of the corresponding input.
    */
    getvalue(valueinput){
        return this.map.get(valueinput);
    }
    /*
    this will rotate all the values by adding 1 to the 
    current integer value and making it mod 26 to stay in 
    the scope of 26 characters. however this function also
    returns true if the rotor has reached 1 full
    cycle of 26. else it will return false.
    */
    rotate(){
        for(let i = 0; i < 26; i++){
            let k = i;
            let v = (this.map.get(i) +1) % 26;
            setvalue(k,v);
        }

        this.rotations ++;

        if(rotations == 26){
            roations = 0;
            return true;
        }
        else{
            return false;
        }
    }

    /*
    sets the key to the value
    */
    setvalue(k, v){
        this.map.set(k, v);
    }

    
}


var converter = new LetterToOrFromNumber();
var rotatorA = new Rotator();
var rotatorB = new Rotator();
var rotatorC = new Rotator();
var mirror = new LinearCipher();

function encryptletter(letter){
    
}

