class rotator{
    
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
        this.setup()
        this.rotations = 0;
    }

    /*
    The default rotor will contain a 1-1 Cipher where if given
    extra time I will turn it into a linear Cipher that is depected
    by the user. example the default value of a would be equal to a
    however the values will be rotated when required.
    */
    setup(){
        for(i = 0; i< 26; i++){
            this.setvalue(i, i)
        }
    }
    
    /*
    this will return the value of the corresponding input.
    */
    getvalue(valueinput){
        return this.map.get(valueinput)
    }
    /*
    this will rotate all the values by adding 1 to the 
    current integer value and making it mod 26 to stay in 
    the scope of 26 characters. however this function also
    returns true if the rotor has reached 1 full
    cycle of 26. else it will return false.
    */
    rotate(){
        for(i = 0; i < 26; i++){
            k = i;
            v = (this.map.get(i) +1) % 26;
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
        this.map.set(k, v)
    }

    
}