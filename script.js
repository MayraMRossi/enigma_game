class User {
    constructor(nickname){
        this.id;
        this.nickname = nickname;
    }
}

class Codes {
    constructor(type,columns){
        this.id;
        this.type = type;//number or color
        this.columns = columns;//cant de espacios del código
    }
}

class TheCode extends Codes {
    constructor(type,columns){
        super(type,columns);
        this.code = [];

    }
    generateCode(){
      
      var colors = ["blue","green","yellow","black","red","brown","violet","pink","orange","yellow"];
      
      console.log(this.type);
      console.log(this.columns);
      console.log(typeof(this.columns));
      
      for(var i=0;i<this.columns;i++){
        console.log("ingresa al for")
        
        var number = Math.random();
      number = number*9;
      number = Math.floor(number);
      
      console.log(number);
      
      if (this.type == "Colors"){
        this.code[i] = colors[number]
        console.log(this.code);
      } else{
        this.code[i]=number;
        console.log(this.code[i])
        }
    }
    console.log(this.code)
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






function createNewCode (t,c){
  console.log(t)
  
  if (t==1){
   t = "Colors"
  }else{t="Numbers"}
  console.log(t + "  " + c);
  
  const theCode1 = new TheCode(t,c);
  console.log(theCode1.type);
  console.log(theCode1.columns)
  theCode1.generateCode();
}


