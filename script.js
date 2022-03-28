/*****ENIGMA GAME******/
/*****Creado por Mayra M Rossi*****/

//Colores para el código
const colors = ["blue","green","yellow","black","red","brown","violet","pink","orange","yellow"];
      
//Usuario
class User {
    constructor(nickname){
        this.id;
        this.nickname = nickname;
    }
}

//Clase madre de los códigos 
class Codes {
    constructor(type,columns){
        this.id;
        this.type = type;//number or color
        this.columns = columns;//cant de espacios del código
    }
}

//Clase creadora del codigo a descifrar
class TheCode extends Codes {
    constructor(type,columns){
        super(type,columns);
        this.code = [];
    }
    generateCode(){
      for(var i=0;i<this.columns;i++){
       var number = Math.random();
       number = number*9;
       number = Math.floor(number);
       if (this.type == "Colors"){
        this.code[i] = colors[number]
       } else{
        this.code[i]=number;
        console.log(this.code[i])
       }
      }
      console.log(this.code);
      return this.code;
      
    }
}

//Clase creadora de respuestas de usuarios
class Guessings extends Codes {
    constructor(type,columns,code){
        super(type,columns);
    }
}


//Clase que da respuesta a los intentos del usuario
class Clues {
    constructor(){
        this.id;
        this.wellPositioned; //cantidad de elementos en la posicion correta
        this.badPositioned; //cantidad de elementos mal posicionados
        this.nonExistent; //cantidad de elementos inexistentes
    }
}


//Función que da inicio a cada juego
//El usuario selecciona los detalles del código antes de iniciar (Si es con números o con colores y si se va a utilizar un código de 3,4,5,6 o 7 espacios)
function start(){
  var select = document.getElementById('selectOptions').innerHTML=`  
  <h3>Para comenzar seleccioná las siguientes opciones</h3>
  <h4>Elementos del código</h4>
  <select name="tipo" id="tipo">
   <option value="2">Números</option>
   <option value="1">Colores</option>
  </select>
  <h4>Cantidad de espacios del código</h4>
  <select name="columns" id="columns">
   <option value="3">3</option>
   <option value="4">4</option>
   <option value="5">5</option>
   <option value="6">6</option>
   <option value="7">7</option>
  </select>
  <br>
  <br>
  <button type="submit" onclick="newGame(tipo.value,columns.value)">Generar código</button> `;
}

function newGame(t,c){
 const enigma = createNewCode(t,c);
 var win = 0;
 while (win!=-1){
  guessing(enigma,t,c,win);
  win=-1;
 }
 
}


// Se crea un código aleatorio automático
function createNewCode (t,c){
  if (t==1){
   t = "Colors"
  }else{t="Numbers"}
  const theCode1 = new TheCode(t,c);
  return theCode1.generateCode();
}

//Función con la cual el usuario realiza los intentos de adivinar el código
function guessing(code,type,column,win){
 
  console.log(column)
  var t = type=="Colors"?"color":"numero";
  document.getElementById('selectOptions').innerHTML= `<h3>Código generado!</h3>
   <h4>Ahora intenta adivinar el código</h4>
   <div id="answer"></div>
   <button type="submit" onclick="evaluate()">Evaluar Respuesta</button>
   <div id="guessing"></div>
  `;
  inputs(column,t);
  

}

// Función accesoria de guessing() que permite crear tantos ingresos como elementos tenga el código
function inputs(column,t){
  var inputs =[];
  for (var j = 0; j < column; j++) {
   id= `id${j+1}`;
   
    inputs.push(`<h4>Indique el ${t} ${j+1}</h4><input type="text" id="${id}">`)
    console.log(inputs);
  }

 
  
  document.getElementById('answer').innerHTML=inputs;
  
}

function evaluate(){
 var column = 3;
 var answer;
  for (var k=0;k<column;k++){
   
   answer.push(document.getElementById(`id${k+1}`).value())
  
  }
  console.log(answer)
  const guess = new Guessings(type,column,answer);
  
  
 
}


