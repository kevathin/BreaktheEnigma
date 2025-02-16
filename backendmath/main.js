
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
    constructor(){
        this.map = new Map();
        this.setup();
    }

    /*
    this fills the hashmap and adds the resulting mirror values of each
    character.
    */
    setup(){
        this.setvalue(0, 7);
        this.setvalue(1, 13);
        this.setvalue(2, 24);
        this.setvalue(3, 18);
        this.setvalue(4, 21);
        this.setvalue(5, 9);
        this.setvalue(6, 23);
        this.setvalue(7, 0);
        this.setvalue(8, 17);
        this.setvalue(9, 5);
        this.setvalue(10, 25);
        this.setvalue(11, 15);
        this.setvalue(12, 19);
        this.setvalue(13, 1); 
        this.setvalue(14, 22);
        this.setvalue(15, 11);
        this.setvalue(16, 20);
        this.setvalue(17, 8);
        this.setvalue(18, 3);
        this.setvalue(19, 12);
        this.setvalue(20, 16);
        this.setvalue(21, 4);
        this.setvalue(22,14);
        this.setvalue(23, 6);
        this.setvalue(24, 2);
        this.setvalue(25, 10);

        
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
    getvalueaftermirror(valueinput){

        for(let [key,value] of this.map.entries()){
            if(value == valueinput){
                //console.log(key);
                return key;
            }
        }
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
            this.setvalue(k,v);
        }

        this.rotations ++;

        if(this.rotations == 26){
            this.rotations = 0;
            return true;
        }
        else{
            return false;
        }
    }
    getrotations(){
        return this.rotations;
    }
    /*
    sets the key to the value
    */
    setvalue(k, v){
        this.map.set(k, v);
    }

    
}

class plugboard{
    constructor(){
        this.map = new Map();
        this.setup();
    }

    setup(){
        for(let i = 0; i< 26; i++){
            this.setvalue(i, i);
        }
    }
    setpairvalue(pair1,pair2){
        this.setvalue(pair1,pair2);
        this.setvalue(pair2,pair1);
    }
    removepairvalue(pair1,pair2){
        this.setvalue(pair1,pair1);
        this.setvalue(pair2,pair2);
    }
    getvalue(k){
        return this.map.get(k);
    }
    setvalue(k,v){
        this.map.set(k,v);
    }
}

var converter = new LetterToOrFromNumber();
var rotatorA = new Rotator();
var rotatorB = new Rotator();
var rotatorC = new Rotator();
var mirror = new LinearCipher();
var plugboardused = new plugboard();
let plugs = 0;
let plug1 = -1;
let plug2 = -1;
function encryptletter(letter){
    
    
    let passingletter = converter.getNumber(letter);
    //console.log(passingletter);
    passingletter = plugboardused.getvalue(passingletter);
    //console.log("////"+passingletter);
    passingletter = rotatorA.getvalue(passingletter);
    //console.log(passingletter);
    passingletter = rotatorB.getvalue(passingletter);
    //console.log(passingletter);
    passingletter = rotatorC.getvalue(passingletter);
    //console.log(passingletter);
    passingletter = mirror.getvalue(passingletter);
    //console.log(passingletter);
    passingletter = rotatorC.getvalueaftermirror(passingletter);
    //console.log(passingletter);
    passingletter = rotatorB.getvalueaftermirror(passingletter);
    //console.log(passingletter);
    passingletter = rotatorA.getvalueaftermirror(passingletter);
    //console.log(passingletter);
    passingletter = plugboardused.getvalue(passingletter);
    //console.log(passingletter);
    passingletter = converter.getLetter(passingletter);
    console.log(passingletter);
    visibleupdate("outputletter", passingletter)
    if(rotatorA.rotate() == true){
        visibleupdate("rotorA", rotatorA.getrotations());
        
        if(rotatorB.rotate() == true){
            visibleupdate("rotorB", rotatorB.getrotations());
            rotatorC.rotate();
            visibleupdate("rotorC", rotatorC.getrotations());
            
        }
        else{
            visibleupdate("rotorB", rotatorB.getrotations());
        }
    }
    else{
        visibleupdate("rotorA", rotatorA.getrotations());
    }
}
function rotate(rotor){
    if(rotor == "rotorA"){
        rotatorA.rotate();
        visibleupdate("rotorA", rotatorA.getrotations());
    }
    else if(rotor == "rotorB") {
        rotatorB.rotate();
        visibleupdate("rotorB", rotatorB.getrotations());
    } else {
        rotatorC.rotate();
        visibleupdate("rotorC", rotatorC.getrotations());
    }
}

function visibleupdate(updateid,value){
    document.getElementById(updateid).innerHTML = value;
}

function plugvisibleupdate(updateid,value){
    document.getElementById(updateid).style.backgroundColor = value;
}

function plugboardadd(letter){
    letter = converter.getNumber(letter);
    if(plugs == 1){
        if(letter == plug1){
            plug1 = -1;
            plugs = 0;
            
            plugvisibleupdate("plug"+converter.getLetter(letter), "buttonface");
        }
        else{
            plug2 = letter;
            plugboardused.setpairvalue(plug1,plug2);
            plugs = 2;
            plugvisibleupdate("plug"+converter.getLetter(letter), "red");
        }
    }
    else if(plugs == 2){
        plugvisibleupdate("plug"+converter.getLetter(plug1), "buttonface");
        plugvisibleupdate("plug"+converter.getLetter(plug2), "buttonface");
        plugboardused.removepairvalue(plug1,plug2);
        plugs = 1;
        plug1 = letter;
        plugvisibleupdate("plug"+converter.getLetter(letter), "red");
        plug2 = -1;
    }else{
        plug1 = letter;
        plugs = 1;
        plugvisibleupdate("plug"+converter.getLetter(letter), "red");
    }

}
