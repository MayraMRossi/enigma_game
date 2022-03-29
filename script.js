/*****ENIGMA GAME******/
/*****Creado por Mayra M Rossi*****/

//Colores 
const colors = [
  "blue",
  "green",
  "yellow",
  "black",
  "red",
  "brown",
  "violet",
  "pink",
  "orange",
  "yellow",
];

//Usuario (aun no utilizado)
/*
class User {
    constructor(nickname){
        this.id;
        this.nickname = nickname;
    }
}
*/

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

  document.getElementById("contador").innerHTML = ` `;
  var t = "Number"; //type = Number por default
  var c = 4; // Columnas del código = 4 por default
  const enigma = new TheCode(t, c);
  document.getElementById("selectOptions").innerHTML = `  
  <h2>Opciones del juego</h2>
  <h3>Elementos del código</h3>
  <select name="tipo" id="type">
   <option value="1">Números</option>
   <option value="2">Colores</option>
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
    createCode(enigma);
  });
  document.getElementById("gen").addEventListener("click", () => {
    answering(enigma);
  });
}

//Función que obsorve los valores seleccionados por el usuario, los introduce en el objeto del código creado 
//y llama al método de generar código.
function createCode(enigma) {
   
  document.getElementById("type").value == 1 ? (enigma.types = "Number") : (enigma.types = "Color");
  enigma.columns = Number(document.getElementById("columns").value);

  enigma.generateTheCode();
}

//Función con la cual el usuario realiza los intentos de adivinar el código y en cada uno devuelve las pistas.
function answering(enigma) {
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
   <div id="guessing"></div>
  `;

  inputs(enigma.columns);

  //se crea el objeto pistas
  const result = new Clues();

  
  document.getElementById("forced").addEventListener("click", () => {
    forced(enigma);
  });
  document.getElementById("test").addEventListener("click", () => {
    return test(enigma, answer, result);
  });

}

// Función accesoria de answering() que permite crear tantos ingresos de datos como elementos tenga el código
function inputs(c) {
  console.log(c);
  var inputs = [];
  for (var j = 0; j < c; j++) {
    id = `id${j + 1}`;
    inputs.push(`<input type="text" id="${id}" required>`);
  }
  inputs = inputs.join("");
  document.getElementById("answer").innerHTML = inputs;
}

//Función llamada en answering() que devuelve los resultados de cada intento.
function test(enigma, answer, result) {
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
      result.nonExistent=enigma.columns-result.wellPositioned-result.badPositioned;
    
  }
  //Devuelve el resultado al usuario
  if (result.wellPositioned == enigma.columns) {
    document.getElementById("selectOptions").innerHTML = `
    <h3>Adivinaste el código!! era ${enigma.code} </h3>
    <button type="submit" id="test" onclick="newGame()">Comenzar nuevo juego</button>`;

    enigma.counter = 1;

  } else {
    document.getElementById("selectOptions").innerHTML = `
    <h3>Ese no era el código, intentalo nuevamente.
    <br> 
    <br> 
    Pistas:  
    <br>
    ${result.wellPositioned} ${t} en la posicion correcta 
    <br> 
    ${result.badPositioned} ${t} en la posición equivocada 
    <br>
     ${result.nonExistent} ${t} inexistente/s </h3> 
     <button type="submit" id="answerAgain" >Intentar de nuevo</button>`;

    document.getElementById("answerAgain").addEventListener("click", () => {
      answering(enigma);
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


//Funciones aun no utilizadas
/*

function colorPickerGenerator(){
  document.getElementById("colorPicker").innerHTML=`
  <div id="c0"><i class="fa-solid fa-square-0"></i></div>
  <div id="c1"><i class="fa-solid fa-square-0"></i></div>
  <div id="c2"><i class="fa-solid fa-square-0"></i></div>
  <div id="c3"><i class="fa-solid fa-square-0"></i></div>
  <div id="c4"><i class="fa-solid fa-square-0"></i></div>
  <div id="c5"><i class="fa-solid fa-square-0"></i></div>
  <div id="c6"><i class="fa-solid fa-square-0"></i></div>
  <div id="c7"><i class="fa-solid fa-square-0"></i></div>
  <div id="c8"><i class="fa-solid fa-square-0"></i></div>
  <div id="c9"><i class="fa-solid fa-square-0"></i></div>`;

}
*/

