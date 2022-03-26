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
        this.code = [];

    }
    generateCode(){
      
      var colors = [blue,green,yellow,black,red,brown,violet,pink,orange,yellow];
      console.log(this.type);
      
      for(let i=0;i<Number(this.colums);i++){
        
        var number = Math.random();
      number = number*9;
      number = Math.floor(number);
      number = 8;//prueba de numero
      console.log(number);
      
      if (this.type == "Colors"){
        this.code[i] = colors[number]
        console.log(this.code);
      } else{
        this.code[i]=number;
        console.log(this.code)
        }
    }
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




const theCode0 = new TheCode("Numbers",2);
console.log(theCode0.columns);

function createNewCode (type,columns){
  const theCode1 = new TheCode(type,columns);
  console.log(theCode1);
  theCode1.generateCode();
}
