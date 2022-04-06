/*****ENIGMA GAME******/
/*****Creado por Mayra M Rossi*****/

//Colores 
const colors = [
  "azul",
  "verde",
  "amarillo",
  "negro",
  "rojo",
  "marron",
  "violeta",
  "rosa",
  "naranja",
  "amarillo"
];



//Usuario (aun no utilizado)
/*
class User {
    constructor(nickname){
        this.id;
        this.nickname = nickname;
        this.playedGames;
    }
}
*/

class Games {
 constructor(enigma){
  this.id;
  this.enigma=enigma;
  this.answers=[];
 }
 showAnswersAndClues(){
  var all=[];
  for(var n=0;n<this.answers.length-1;n++){
   all.push(`<br>Código: ${this.answers[n].code} <br>Pistas: ${this.answers[n].clues}<br>`);
  }
  return all.join("<br>");
 }
}

//Clase madre de los códigos
class Codes {
  constructor(types, columns) {
    this.id;
    this.types = types; //number or color
    this.columns = columns; //cant de espacios del código
    this.code = [];
  }
}

//Clase creadora del codigo a descifrar
class TheCode extends Codes {
  constructor(types, columns) {
    super(types, columns);
    this.counter = 1;
  }

  generateTheCode() {
    for (var i = 0; i < this.columns; i++) {
      var number = Math.random();
      number = number * 9;
      number = Math.floor(number);
      if (this.types == "Color") {
        this.code[i] = colors[number];
      } else {
        this.code[i] = number;
        console.log(this.code[i]);
      }
    }
    console.log(this.code);
    return 0;
  }
}

//Clase creadora de respuestas de usuarios
class Guessings extends Codes {
  constructor(types, columns) {
    super(types, columns);
    this.clues;
  }
}

//Clase que da respuesta a los intentos del usuario
class Clues {
  constructor() {
    this.id;
    this.wellPositioned = 0; //cantidad de elementos en la posicion correta
    this.badPositioned = 0; //cantidad de elementos mal posicionados
    this.nonExistent = 0; //cantidad de elementos inexistentes
  }
}



//Función que da inicio a cada juego

//El usuario selecciona los detalles del código antes de iniciar el juego 
//(Si es con números o con colores y si se va a utilizar un código de 3,4,5,6 o 7 espacios)

function newGame() {
const game = new Games();
  document.getElementById("contador").innerHTML = ` `;
  var t = "Number"; //type = Number por default
  var c = 4; // Columnas del código = 4 por default
  const enigma = new TheCode(t, c);
  game.enigma = enigma;
  document.getElementById("selectOptions").innerHTML = `  
  <h2>Opciones del juego</h2>
  <h3>Elementos del código</h3>
  <select name="tipo" id="type">
   <option value="1">Números</option>
   <option value="2">Colores(Aun no se puede jugar con colores)</option>
  </select>
  <h3>Cantidad de espacios del código</h3>
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

  document.getElementById("gen").addEventListener("click", () => {
    createCode(enigma,game);
  });
  document.getElementById("gen").addEventListener("click", () => {
    answering(enigma,game);
  });
}

//Función que obsorve los valores seleccionados por el usuario, los introduce en el objeto del código creado 
//y llama al método de generar código.
function createCode(enigma,game) {
   
  document.getElementById("type").value == 1 ? (enigma.types = "Number") : (enigma.types = "Color");
  enigma.columns = Number(document.getElementById("columns").value);

  enigma.generateTheCode();
}

//Función con la cual el usuario realiza los intentos de adivinar el código y en cada uno devuelve las pistas.
function answering(enigma,game) {
  //Comienza a contar los intentos
  document.getElementById(
    "contador"
  ).innerHTML = `<h3>Intento n°: ${enigma.counter}</h3>`;
  //Crea el objeto respuesta
  const answer = new Guessings(enigma.types, enigma.columns);
  
  
    //provee al usuario el ingreso de código
  document.getElementById(
    "selectOptions"
  ).innerHTML = `<h3>Código generado!</h3>
   <h2>Ahora intenta adivinar el código</h2>
   <div id="answer"></div>
   <button type="submit" id="test">Evaluar Respuesta</button>
   <button type="submit" id="forced" >Mostrar el código</button>
   <button type="submit" id="show" >Mostrar respuestas anteriores</button>
   <div id="guessing"></div>
  `;

  inputs(enigma);

  //se crea el objeto pistas
  const result = new Clues();
  game.answers.push(answer);
  
  document.getElementById("forced").addEventListener("click", () => {
    forced(enigma);
  });
  document.getElementById("test").addEventListener("click", () => {
    return test(enigma, answer, result,game);
  });
  document.getElementById("show").addEventListener("click", () => {
    return showAnswers(game);
  });
  
  

}

// Función accesoria de answering() que permite crear tantos ingresos de datos como elementos tenga el código
function inputs(enigma) {
  var c = enigma.columns;
  var t = enigma.types;
  console.log(c);
  var inputs = [];
  for (var j = 0; j < c; j++) {
    id = `id${j + 1}`;
    if (t=="Color"){
      inputs.push(`<select name="numbers" id="${id}">
      <option value="0" id ="${colors[0]}">azul</option>
      <option value="1" id ="${colors[1]}">verde</option>
      <option value="2" id ="${colors[2]}">amarillo</option>
      <option value="3" id ="${colors[3]}">negro</option>
      <option value="4" id ="${colors[4]}">rojo</option>
      <option value="5" id ="${colors[5]}">marron</option>
      <option value="6" id ="${colors[6]}">violeta</option>
      <option value="7" id ="${colors[7]}">rosa</option>
      <option value="8" id ="${colors[8]}">naranja</option>
      <option value="9" id ="${colors[9]}">amarillo</option>
      </select>`);
    }else{
      inputs.push(`<select name="numbers" id="${id}">
      <option value="0">0</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
    </select>`);
    }

   
  }
  inputs = inputs.join("");
  document.getElementById("answer").innerHTML = inputs;
}

//Función llamada en answering() que devuelve los resultados de cada intento.
function test(enigma, answer, result,game) {
  var t = enigma.types == "Color" ? "color/es" : "numero/s";
  var check =[];


  for (var k = 0; k < enigma.columns; k++) {
    var id = `id${k + 1}`;
    answer.code.push(Number(document.getElementById(id).value));
    if (answer.code[k] == enigma.code[k]) {
      result.wellPositioned += 1;
      check.push(answer.code[k]);
    }
  }
  for (var l = 0; l < enigma.columns; l++) {
      
      if (enigma.code.includes(answer.code[l])) {
        if(check.includes(answer.code[l])){
          result.nonExistent += 1;
        }else{
          result.badPositioned += 1;
        }
      } 
      check.push(answer.code[l]);
  }
  result.nonExistent=enigma.columns-result.wellPositioned-result.badPositioned;
  //Devuelve el resultado al usuario
  if (result.wellPositioned == enigma.columns) {
    document.getElementById("selectOptions").innerHTML = `
    <h3>Adivinaste el código!! era ${enigma.code} </h3>
    <button type="submit" id="test" onclick="newGame()">Comenzar nuevo juego</button>`;

    enigma.counter = 1;

  } else {
    answer.clues = `    ${result.wellPositioned} ${t} en la posición correcta 
    <br> 
    ${result.badPositioned} ${t} en la posición equivocada 
    <br>
     ${result.nonExistent} ${t} inexistente/s `;
     
    document.getElementById("selectOptions").innerHTML = `
    <h3>Ese no era el código, intentalo nuevamente.
    <br> 
    <br> 
    Pistas:  
    <br>
    ${answer.clues} </h3> 
     <button type="submit" id="answerAgain" >Intentar de nuevo</button>`;

    document.getElementById("answerAgain").addEventListener("click", () => {
      answering(enigma,game);
    });
    enigma.counter += 1;
  }
  
}

//Función que permite visualizar el código enigma y salir forzadamente para iniciar un nuevo juego 
function forced(enigma) {
  document.getElementById("selectOptions").innerHTML = `
  <h3>El código era ${enigma.code} </h3>
  <button type="submit" id="test" onclick="newGame()">Comenzar nuevo juego</button>`;

  enigma.counter = 1;
}


//funcion que devuelve todos los intentos de código y sus pistas
function showAnswers(game){
 console.log(game)
 var allAnswers;
  allAnswers= `<h2>Intentos y pistas:</h2><h3> ${game.showAnswersAndClues()} </h3>`;
 document.getElementById('showAnswers').innerHTML= allAnswers;

}
function impr(){

 window.print();

}




//ICONO PARA COLORES <i class="fa-solid fa-square-0"></i>

