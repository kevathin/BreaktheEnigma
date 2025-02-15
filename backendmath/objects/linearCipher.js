class linearCipher{
    /*
    this class is used for the reflector used inside of the enigma where 
    instead of rotators it acts like the plug box. An example of this
    is that input t would turn into z and z would turn into t.

    The constructor creates the hashmap and send to setup to fill the map.
    */
    constructor(cipherValues){
        this.map = new Map();
        setup(cipherValues)
    }

    /*
    this fills the hashmap and adds the resulting mirror values of each
    character.
    */
    setup(cipherValues){
        for(i = 0; i< 26; i++){
            this.map.set(i,cipherValues[i])
        }
    }

    /*
    this returns the corresponding value related to the inputvalue
    */
    getvalue(inputvalue){
        return this.map.get(inputvalue);
    }
}