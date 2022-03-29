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
         this.code = [];
    }
}

//Clase creadora del codigo a descifrar
class TheCode extends Codes {
    constructor(types,columns){
        super(types,columns);
       
    }
    generateTheCode(){
      for(var i=0;i<this.columns;i++){
       var number = Math.random();
       number = number*9;
       number = Math.floor(number);
       if (this.types == "Color"){
        this.code[i] = colors[number]
       } else{
        this.code[i]=number;
        console.log(this.code[i])
       }
      }
      console.log(this.code);
      return 0;
      
      
    }
}

//Clase creadora de respuestas de usuarios
class Guessings extends Codes {
    constructor(types,columns){
        super(types,columns);
    }
}


//Clase que da respuesta a los intentos del usuario
class Clues {
    constructor(){
        this.id;
        this.wellPositioned = 0; //cantidad de elementos en la posicion correta
        this.badPositioned = 0; //cantidad de elementos mal posicionados
        this.nonExistent = 0; //cantidad de elementos inexistentes
    }
}







//Función que da inicio a cada juego

//El usuario selecciona los detalles del código antes de iniciar el juego (Si es con números o con colores y si se va a utilizar un código de 3,4,5,6 o 7 espacios)
function newGame(){
  var t="Number"; //type = Number por default
  var c=4; // Columnas del código = 4 por default
  const enigma = new TheCode(t,c);
  console.log(enigma);
  document.getElementById('selectOptions').innerHTML=`  
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
  
  document.getElementById("gen").addEventListener("click", ()=>{
   createCode(enigma);
  })
  document.getElementById("gen").addEventListener("click", ()=>{
    answering(enigma);
   })


  
}
  
 function createCode (enigma){
   var t = document.getElementById("type").value;
   t==1?t="Number":t="Color";
   enigma.types = t;
   enigma.columns = Number(document.getElementById("columns").value);
   console.log(enigma)
   
  enigma.generateTheCode();
   
 }  


 


//Función con la cual el usuario realiza los intentos de adivinar el código
function answering(enigma){
  var win = 0;
  while (win>=0){
    const answer = new Guessings(enigma.types,enigma.columns);
    console.log(answer);
    var t = enigma.types=="Color"?"color":"numero";
   document.getElementById('selectOptions').innerHTML= `<h3>Código generado!</h3>
   <h4>Ahora intenta adivinar el código</h4>
   <div id="answer"></div>
   <button type="submit" id="test">Evaluar Respuesta</button>
   <div id="guessing"></div>
  `;
  inputs(enigma.columns,t);
  const result = new Clues();
  win = document.getElementById("test").addEventListener("click",()=>{return test(enigma,answer,result)});
  
}


}


// Función accesoria de guessing() que permite crear tantos ingresos como elementos tenga el código
function inputs(c,t){
  console.log(c)
  var inputs =[];
  for (var j = 0; j < c; j++) {
     id= `id${j+1}`;
     inputs.push(`<h4>Indique el ${t} ${j+1}</h4><input type="text" id="${id}">`)
     
 }
  
  document.getElementById('answer').innerHTML=inputs;
  
}


function test(enigma,answer,result){

 
  
 
 
  for (var k=0;k<enigma.columns;k++){
   var id=`id${k+1}`;
   
   answer.code.push(Number(document.getElementById(id).value));
   if(answer.code[k]==enigma.code[k]){
     result.wellPositioned +=1;
   }else{
     if(enigma.code.includes(answer.code[k])){
      result.badPositioned +=1;}
     else{result.nonExistent +=1}
  }
}
  console.log(enigma.columns+1)

  if(result.wellPositioned==enigma.columns){
    document.getElementById('selectOptions').innerHTML=`Adivinaste el código!! era ${enigma.code} <button type="submit" id="test" onclick="newGame()">Comenzar nuevo juego</button>`;
  }else{
    document.getElementById('selectOptions').innerHTML=`Ese no era el código,tenés que intentarlo nuevamente, las pistas son: elegiste ${result.wellPositioned} ${enigma.types} en la posicion correcta, ${result.badPositioned} ${enigma.types} en la posición equivocada y ${result.nonExistent} ${enigma.types} inexistentes <button type="submit" id="answerAgain" >Intentar de nuevo</button>`
    document.getElementById("answerAgain").addEventListener("click",()=>{answering(enigma)});
  }
  

  

}
