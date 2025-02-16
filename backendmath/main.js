
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
        var g = 0;
        for(var i = 97; i<= 122; i++){
            this.letterMap.set(String.fromCharCode(i),g);
            g++;
        }
    }
    /*
    has the kay of the integer representation of the letters with its corresponding letter value
    */
    setupNumberToLetter(){
        var g = 0;
        for(var i = 97; i<= 122; i++){
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
    This class is used to represent the rotors used in the Enigma.

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
        for(var i = 0; i< 26; i++){
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

        for(var [key,value] of this.map.entries()){
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
        for(var i = 0; i < 26; i++){
            var k = i;
            var v = (this.map.get(i) +1) % 26;
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
    setrotations(value){
        this.rotations = value;
    }
    resetrotations(){
        this.rotations = 0;
    }
    
}

class plugboard{
    constructor(){
        this.map = new Map();
        this.setup();
    }

    setup(){
        for(var i = 0; i< 26; i++){
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
var activePlugs = 0;
var plugLocationA = -1;
var plugLocationB = -1;
var outputMessage = "";
var settingDataSave = false;
var initialASetting = 0;
var initialBSetting = 0;
var initialCSetting = 0;
var initialPlugLocationA = -1;
var initialPlugLocationB = -1;
var initialActivePlugs = 0;

function encryptletter(letter){
    if(settingDataSave == false){
        initialASetting = rotatorA.getrotations();
        initialBSetting = rotatorB.getrotations();
        initialCSetting = rotatorC.getrotations();
        initialActivePlugs = activePlugs;
        initialPlugLocationA = plugLocationA;
        initialPlugLocationB = plugLocationB;
        settingDataSave = true;
    }
    
    var passingletter = converter.getNumber(letter);
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
    encryptoutput(passingletter);

    if(rotatorA.rotate() == true){
        if(rotatorB.rotate() == true){
            rotatorC.rotate();
            visibleupdate("rotorC", rotatorC.getrotations());
            
        }
        visibleupdate("rotorB", rotatorB.getrotations());
    }
    visibleupdate("rotorA", rotatorA.getrotations());
    
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

function encryptoutput(value){
    outputMessage += value;
    document.getElementById("outputletter").innerHTML = outputMessage;
}

function plugvisibleupdate(updateid,value){
    document.getElementById(updateid).style.backgroundColor = value;
}

function plugboardadd(letter){
    letter = converter.getNumber(letter);
    if(activePlugs == 1){
        if(letter == plugLocationA){
            plugLocationA = -1;
            activePlugs = 0;
            
            plugvisibleupdate("plug"+converter.getLetter(letter), "buttonface");
        }
        else{
            plugLocationB = letter;
            plugboardused.setpairvalue(plugLocationA,plugLocationB);
            activePlugs = 2;
            plugvisibleupdate("plug"+converter.getLetter(letter), "red");
        }
    }
    else if(activePlugs == 2){
        plugvisibleupdate("plug"+converter.getLetter(plugLocationA), "buttonface");
        plugvisibleupdate("plug"+converter.getLetter(plugLocationB), "buttonface");
        plugboardused.removepairvalue(plugLocationA,plugLocationB);
        activePlugs = 1;
        plugLocationA = letter;
        plugvisibleupdate("plug"+converter.getLetter(letter), "red");
        plugLocationB = -1;
    }else{
        plugLocationA = letter;
        activePlugs = 1;
        plugvisibleupdate("plug"+converter.getLetter(letter), "red");
    }

}

function cleareverything(){
    if(activePlugs == 1){
        plugvisibleupdate(converter.getLetter(plugLocationA), "buttonface");
        activePlugs = 0;
        plugLocationA = -1;
    }else if(activePlugs == 2){
        plugboardused.removepairvalue(plugLocationA,plugLocationB);
        plugvisibleupdate("plug"+converter.getLetter(plugLocationA), "buttonface");
        plugvisibleupdate("plug"+converter.getLetter(plugLocationB), "buttonface");
        activePlugs = 0;
        plugLocationA = -1;
        plugLocationB = -1;
    }
    outputMessage = "";
    rotatorA.resetrotations();
    rotatorB.resetrotations();
    rotatorC.resetrotations();
    rotatorA.setup();
    rotatorB.setup();
    rotatorC.setup();
    visibleupdate("rotorA", rotatorA.getrotations());
    visibleupdate("rotorB", rotatorB.getrotations());
    visibleupdate("rotorC", rotatorC.getrotations());
    settingDataSave = false;
    visibleupdate("outputletter", "output value");
}

function recoverinitialsetting(){
    if(activePlugs == 1){
        plugvisibleupdate(converter.getLetter(plugLocationA), "buttonface");
        activePlugs = 0;
        plugLocationA = -1;
    }else if(activePlugs == 2){
        plugboardused.removepairvalue(plugLocationA,plugLocationB);
        plugvisibleupdate("plug"+converter.getLetter(plugLocationA), "buttonface");
        plugvisibleupdate("plug"+converter.getLetter(plugLocationB), "buttonface");
        activePlugs = 0;
        plugLocationA = -1;
        plugLocationB = -1;
    }
    plugLocationA = initialPlugLocationA;
    plugLocationB = initialPlugLocationB;
    activePlugs = initialActivePlugs;
    if(activePlugs == 2){
        plugvisibleupdate("plug"+converter.getLetter(plugLocationA), "red");
        plugvisibleupdate("plug"+converter.getLetter(plugLocationB), "red");
        plugboardused.setpairvalue(plugLocationA,plugLocationB)
    } 
    outputMessage = "";
    rotatorA.setup();
    rotatorB.setup();
    rotatorC.setup();
    rotatorA.resetrotations();
    rotatorB.resetrotations();
    rotatorC.resetrotations();
    for(var i = 0; i <initialASetting; i++){
        rotatorA.rotate();
    }
    for(var i = 0; i <initialBSetting; i++){
        rotatorB.rotate();
    }
    for(var i = 0; i <initialCSetting; i++){
        rotatorB.rotate();
    }
    console.log(rotatorA.getrotations());
    visibleupdate("rotorA", rotatorA.getrotations());
    visibleupdate("rotorB", rotatorB.getrotations());
    visibleupdate("rotorC", rotatorC.getrotations());

    visibleupdate("outputletter", "output value");
}

var rotorBody = document.querySelector("#rotors");
rotorBody.addEventListener("mouseenter", function(){
    let speach = "Each rotor contails all 26 characters and are organized from a-z. Each rotor starts at position 0 where 0 = a, 1 = b and so on. Each character is translated into its number representation starting from 0 all the way to 25. ex: the first rotor is in position 1 and the user typed a. the letter a with the value of 0 will be given the result of 1 or b. The reflecter gives a direct encryption between 2 letters. ex: c results in f and so f results in c.";
    document.querySelector("#machine_explenation_image").setAttribute("src", "images/rotor.png");
    document.querySelector("#machine_explenation_text").innerHTML = speach;

});

var outputBody = document.querySelector("#outputletter");
outputBody.addEventListener("mouseenter",function(){
    let speach ="The original machine had a glowing panel (top half of the photo for reference) which would glow the output character after pressing a key. Historicly they needed 2 people to man the Enigma Machine because they needed 1 person to encript the message and 1 person to write the resulting value";
    document.querySelector("#machine_explenation_image").setAttribute("src", "images/lightandkeyboard.jpg");
    document.querySelector("#machine_explenation_text").innerHTML = speach;

});

var keyBoardBody = document.querySelector(".mainkeyboard");
keyBoardBody.addEventListener("mouseenter",function(){
    let speach ="If taking a closer look to the keyboard you might realize that is not like how modern keyboards have their layout. This is because in WW2 where their keyboard layout had the most sagnificant differnece of having the Y and Z keys switched. but for functionality this is the keyboard input for the encrypted message.";
    document.querySelector("#machine_explenation_image").setAttribute("src", "images/lightandkeyboard.jpg");
    document.querySelector("#machine_explenation_text").innerHTML = speach;
    //exampleDecryption(text, partialsolve);
});

var mainPlugBody = document.querySelector(".mainplugboard");
mainPlugBody.addEventListener("mouseenter",function(){
    let speach = "The plug board contains all 26 characters and you are able to connect 2 characters with a plug. Once connecting the plug board the character will switch out when one or the other is pressed before moving on to the main rotors. ex: if you switched a and d then proceeded to type a. The result of which would be d";
    document.querySelector("#machine_explenation_image").setAttribute("src", "images/plugboard.jpg");
    document.querySelector("#machine_explenation_text").innerHTML = speach;

});

/*the example decryption will have rotors positioned 0 2 4 respectivly
and the plug board will have a A and E plug the common key word is happy hair
*/

// the decryption will be mndtrjyhsilamqnpg
// the result should be iamaveryhappyhair
/*
var text = "qxtgcoixf";
var partialsolve = "happyhair";
function exampleDecryption(text, partialsolve){
    found = false;
    text = text.split("");
    partialsolve = partialsolve.split("");
    for(let i = 0; i < 9; i++){
        console.log(partialsolve[i] + " " + text[i]);
        
    }
    for(let testPlugA = 0; testPlugA < 25; testPlugA++){
        for(let testPlugB = testPlugA +1; testPlugB <26; testPlugB++){
            let breakplugboardused = new plugboard();
            breakplugboardused.setpairvalue(testPlugA,testPlugB);
            let breakmirror = new LinearCipher();
            for(let rotorcpen = 0; rotorcpen <=25;rotorcpen++){
                for(let rotorbpen = 0; rotorbpen <=25;rotorbpen++){
                    for(let rotorapen = 0; rotorapen <=25 ;rotorapen++){
                        let breakrotatorA = new Rotator();
                        let breakrotatorB = new Rotator();
                        let breakrotatorC = new Rotator();
                        
                        
                        for(let i = rotorcpen; i > 0; i--){
                            breakrotatorC.rotate();
                        }
                        for(let i = rotorbpen; i > 0; i--){
                            breakrotatorB.rotate();
                        }
                        for(let i = rotorapen; i > 0; i--){
                            breakrotatorA.rotate();
                        }
                        found = true;
                        let passingletter;
                        for(let i = 0; i < 9; i++){
                            passingletter = converter.getNumber(partialsolve[i]);
                            //console.log(passingletter);
                            passingletter = breakplugboardused.getvalue(passingletter);
                            //console.log("////"+passingletter);
                            passingletter = breakrotatorA.getvalue(passingletter);
                            //console.log(passingletter);
                            passingletter = breakrotatorB.getvalue(passingletter);
                            //console.log(passingletter);
                            passingletter = breakrotatorC.getvalue(passingletter);
                            //console.log(passingletter);
                            passingletter = breakmirror.getvalue(passingletter);
                            //console.log(passingletter);
                            passingletter = breakrotatorC.getvalueaftermirror(passingletter);
                            //console.log(passingletter);
                            passingletter = breakrotatorB.getvalueaftermirror(passingletter);
                            //console.log(passingletter);
                            passingletter = breakrotatorA.getvalueaftermirror(passingletter);
                            //console.log(passingletter);
                            passingletter = breakplugboardused.getvalue(passingletter);
                            //console.log(passingletter);
                            passingletter = converter.getLetter(passingletter);
                            if(passingletter != text[i]){

                                found = false;
                                break;
                            }
                        }
                        if(found == true){
                            console.log("hi");
                        }
                    }
                }
            }
        }   
    }*/

    /*
    for(let rotorcpen = 0; rotorcpen <=25;rotorcpen++){
        for(let rotorbpen = 0; rotorbpen <=25;rotorbpen++){
            for(let rotorapen = 0; rotorapen <=25 ;rotorapen++){
                let testPlugA = -1;
                let testPlugB = 0;
                while(testPlugA != 24 && testPlugB != 25  && found !=true){
                    testPlugA ++;
                    testPlugB = testPlugA +1;
                    while(testPlugB != 26 && found !=true){
                        let breakrotatorA = new Rotator();
                        let breakrotatorB = new Rotator();
                        let breakrotatorC = new Rotator();
                        let breakmirror = new LinearCipher();
                        let breakplugboardused = new plugboard();
                        breakplugboardused.setpairvalue(testPlugA,testPlugB);
                        for(let i = rotorcpen; i > 0; i--){
                            breakrotatorC.rotate();
                        }
                        for(let i = rotorbpen; i > 0; i--){
                            breakrotatorB.rotate();
                        }
                        for(let i = rotorapen; i > 0; i--){
                            breakrotatorA.rotate();
                        }
                        found = true;
                        let passingletter;
                        for(let i = 0; i < 9; i++){
                            passingletter = converter.getNumber(partialsolve[i]);
                            //console.log(passingletter);
                            passingletter = breakplugboardused.getvalue(passingletter);
                            //console.log("////"+passingletter);
                            passingletter = breakrotatorA.getvalue(passingletter);
                            //console.log(passingletter);
                            passingletter = breakrotatorB.getvalue(passingletter);
                            //console.log(passingletter);
                            passingletter = breakrotatorC.getvalue(passingletter);
                            //console.log(passingletter);
                            passingletter = breakmirror.getvalue(passingletter);
                            //console.log(passingletter);
                            passingletter = breakrotatorC.getvalueaftermirror(passingletter);
                            //console.log(passingletter);
                            passingletter = breakrotatorB.getvalueaftermirror(passingletter);
                            //console.log(passingletter);
                            passingletter = breakrotatorA.getvalueaftermirror(passingletter);
                            //console.log(passingletter);
                            passingletter = breakplugboardused.getvalue(passingletter);
                            //console.log(passingletter);
                            passingletter = converter.getLetter(passingletter);
                            if(passingletter != text[i]){

                                found = false;
                                break;
                            } 
                        }
                        if(testPlugA == 0 && testPlugB==4){
                            console.log(found);
                        }
                        //console.log(found);
                        breakplugboardused.removepairvalue(testPlugA,testPlugB);
                        testPlugB ++;
                        
                    }
                    testPlugB = testPlugA+1;
                }
                console.log(rotorcpen);
                if(found == true){
                    break;
                }
            }
            if(found == true){
                break;
            }
        }
        if(found == true){
            break;
        }
    
}*/


let firstalr = 0;
let secondalr = 0;
let thirdalr = 0;

function firstquestion(){
    let questionOneAnswer = document.getElementById("question1").value;
    questionOneAnswer = questionOneAnswer.toLowerCase();
    questionOneAnswer = questionOneAnswer.replace("[^a-z]", "");
    if(questionOneAnswer == "happyhair"){
        document.getElementById("answer1").innerHTML = "How come I didn't see that? happyhair is used in every one of these telegraphs. Great work anyway! lets move on.";
        firstalr = 1;
        if(firstalr == 1 && secondalr == 1 && thirdalr == 1){
            congratulations()
        }
    }
}
function secondquestion(){
    let questionTwoAnswerA = document.getElementById("part2A").value;
    let questionTwoAnswerB = document.getElementById("part2B").value;
    if(questionTwoAnswerA == 25 && questionTwoAnswerB == 26){
        document.getElementById("answer2").innerHTML = "It's so obvious now that I look at it now! Thank you and your team for the help in this section!";
        secondalr = 1;
        if(firstalr == 1 && secondalr == 1 && thirdalr == 1){
            congratulations()
        }
    }
}
function thirdquestion(){
    let questionThreeAnswer = document.getElementById("part3").value;
    //console.log(questionThreeAnswer);
    if(questionThreeAnswer == 17576){
        document.getElementById("answer3").innerHTML = "yeesh that is still a big number to compute. By my calculations that's about over 5 million combinations. Well no time to waste.";
        thirdalr = 1;
        if(firstalr == 1 && secondalr == 1 && thirdalr == 1){
            congratulations()
        }
    }
}

function congratulations(){
    document.getElementById("congradulations").innerHTML = "You Fixed The Algorithm!";
    document.getElementById("history").innerHTML = "While you and your team was greatly able to assist in the war effort, sometimes it doesn't have a happy ending. Alan Turing, famous for his work on the Enigma Machine died at the age of 41 from cyanide poisoning. Which is still debatable if it was suicide or murder, a briliant mind died young.";
}
