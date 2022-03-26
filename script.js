class User {
    constructor(nickname){
        this.id;
        this.nickname = nickname;
    }
}

class Codes {
    constructor(type,columns){
        this.id;
        this.type;//number or color
        this.columns;//cant de espacios del código
    }
}

class TheCode extends Codes {
    constructor(type,columns){
        super(type,columns);

    }

}
class Guessings extends Codes {
    constructor(type,columns){
        super(type,columns);
        
    }

}

class Clues {
    constructor(){
        this.id;
        this.wellPositioned; //cantidad de elementos en la posicion correta
        this.badPositioned; //cantidad de elementos mal posicionados
        this.nonExistent; //cantidad de elementos inexistentes
    }
}

class Elements {
    constructor(){
        this.id;
    }
}

class Colors extends Elements{
    constructor(){
        super();
        this.color;//blue,yellow,green,white,violet,red,brown,orange,pink,lightblue
    }
}

class Numbers extends Elements{
    constructor (){
        super();
        this.number;//0,1,2,3,4,5,6,7,8,9
    }
}


