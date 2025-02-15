class rotator{
    
    constructor(pos){
        this.map = new Map();
        this.setup()
        this.pos = pos;
    }

    constructor(crossvalue){
        this.map = new Map();
        this.setup(crossvalue);
        this.pos = null;
    }

    setup(){
        g = 0;
        for(i = 97; i<= 122; i++){
            this.map.set(String.fromCharCode(i),g)
            g++
        }
    }

    setup(crossvalue){
        
    }
    getvalue(valueinput){
        return this.map.get(valueinput)
    }

    
}