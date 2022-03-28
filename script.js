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
    constructor(types,columns){
        this.id;
        this.types = types;//number or color
        this.columns = columns;//cant de espacios del código
    }
}

//Clase creadora del codigo a descifrar
class TheCode extends Codes {
    constructor(types,columns){
        super(types,columns);
        this.code = [];
    }
    generateTheCode(){
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
    constructor(types,columns,code){
        super(types,columns);
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
function newGame(){
 
 var t="Number"; //type = Number por default
 var c=4; // Columnas del código = 4 por default
 const enigma = new TheCode(t,c);
 console.log(enigma);
 
 start(enigma); 
// createCode(enigma);
 
 
 
 //enigma = createNewCode(enigma);
 
 
 
/* var win = 0;
 while (win!=-1){
  guessing(enigma,t,c,win);
  win=-1;
 }
 */
}


//El usuario selecciona los detalles del código antes de iniciar el juego (Si es con números o con colores y si se va a utilizar un código de 3,4,5,6 o 7 espacios)
function start(enigma){
  var select = document.getElementById('selectOptions').innerHTML=`  
  <h3>Para comenzar seleccioná las siguientes opciones</h3>
  <h4>Elementos del código</h4>
  <select name="tipo" id="type">
   <option value="1">Números</option>
   <option value="2">Colores</option>
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
  <button type="submit" id="gen">Generar código</button> `;
  
  
  
}
  document.getElementById("gen").onclick(createCode(enigma,))
  
 function createCode (enigma){
   var t = document.getElementById("type").value;
   t==1?t="Number":t="Color";
   enigma.types = t;
   enigma.columns = document.getElementById("columns").value;
   
   console.log(enigma)
   return enigma;
   
 }



  
  

/*
 


//Función con la cual el usuario realiza los intentos de adivinar el código
function guessing(code,type,column,win){
 
  console.log(column)
  var t = type=="Colors"?"color":"numero";
  document.getElementById('selectOptions').innerHTML= `<h3>Código generado!</h3>
   <h4>Ahora intenta adivinar el código</h4>
   <div id="answer"></div>
   <button type="submit" onclick="test()">Evaluar Respuesta</button>
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


function test(){
 var column = 3;
 var answer =[];
 console.log(document.getElementById('id1').value)
  for (var k=0;k<column;k++){
   var id=`id${k+1}`
   
   answer.push(Number(document.getElementById(id).value)
  )}
  console.log(answer)
  //const guess = new Guessings(type,column,answer);
  
  
 
}


*/
