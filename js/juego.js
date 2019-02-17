// Arreglo que contiene las intrucciones del juego 
var instrucciones = [
  'Mover arriba ↑',
  'Mover izquierda ←',
  'Mover abajo ↓',
  'Mover derecha →'
];
// Arreglo para ir guardando los movimientos que se vayan realizando
var movimientos = [];

// Representación de la grilla. Cada número representa a una pieza.
// El 9 es la posición vacía
var grilla = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

/* Estas dos variables son para guardar la posición de la pieza vacía. 
Esta posición comienza siendo la [2, 2]*/
var filaVacia = 2;
var columnaVacia = 2;

var codigosDireccion = {
    IZQUIERDA: 37,
    ARRIBA: 38,
    DERECHA: 39,
    ABAJO: 40
}


document.getElementById('comenzar').onclick = function() {
    document.getElementById('boton_comienzo').style.display = "none";
    document.getElementById('juego').style.display = "block";
    intercambiarPosicionesDOM();
}

document.onkeyup = function(e){
    ultimoMovimiento(e);
}
  
function ultimoMovimiento(e) {
    if(actualizarUltimoMovimiento(e.keyCode)){
        movimientos.push(actualizarUltimoMovimiento(e.keyCode))
    }
}

function intercambiarPosicionesDOM() {
    var imprimir = "";
    for (let i = 0; i < grilla.length; i++){ 
        for (let j = 0; j < grilla.length; j++){ 
            if(grilla[i][j] != 9) {
                imprimir += `<div class="piezas pieza${grilla[i][j]}" id="pieza${grilla[i][j]}">
                                <img src="images/${grilla[i][j]}0.jpg" alt="pieza${grilla[i][j]}">
                            </div>`;
            }else{
                imprimir += `<div class="piezas pieza9" id="pieza9"><img src="images/ficha9.png" alt="pieza9"></div>`;
            }
        }
    }
    
    document.getElementById('juego').innerHTML = imprimir;
}

function moverPieza(pieza1,pieza2) {
    var pieza1 = document.getElementById(pieza1);
    var pieza2 = document.getElementById(pieza2);
    var padre = pieza1.parentNode;
    var clonElemento1 = pieza1.cloneNode(true);
    var clonElemento2 = pieza2.cloneNode(true);

    padre.replaceChild(clonElemento1, pieza2);
    padre.replaceChild(clonElemento2, pieza1);
}

function mostrarInstrucciones(instrucciones) {
    let response = "";
    for (let i = 0; i < instrucciones.length; i++) {
      mostrarInstruccionEnLista(instrucciones[i], 'lista-instrucciones')
    }
}

function chequearSiGano() {
    let cantidad = 1;
    for (let i = 0; i < grilla.length; i++){ 
        for (let j = 0; j < grilla.length; j++){ 
            if(grilla[i][j] != cantidad){ return false; }
            else { cantidad++; }
        }
    }  
  return true;
}

function mostrarCartelGanador() {
    alert("¡Ganaste!");
    setTimeout(function() {
        location.reload();
        }, 500);
    return;
}

function intercambiarPosicionesGrilla(filaPos1, columnaPos1, filaPos2, columnaPos2) {
    if ( ((filaPos1 && columnaPos1 && filaPos2 && columnaPos2) < grilla.length) && ((filaPos1 && columnaPos1 && filaPos2 && columnaPos2) >= 0) ) {
        var temp = grilla[filaPos1][columnaPos1];
        grilla[filaPos1][columnaPos1] = grilla[filaPos2][columnaPos2];
        grilla[filaPos2][columnaPos2] = temp;
    } else {
        return false;
    }
}

// Actualiza la posición de la pieza vacía
function actualizarPosicionVacia(nuevaFila, nuevaColumna) {
    if (posicionValida) {
        filaVacia = nuevaFila;
        columnaVacia = nuevaColumna;
        if (chequearSiGano()) {
            console.log("Gano el juego");
        }
    } else {
        console.log("Posicion invalida");
    }
}


// Para chequear si la posicón está dentro de la grilla.
function posicionValida(fila, columna) {
    if ( ((fila && columna) < grilla.length) && ((fila && columna) >= 0) ) {
        console.log("valida");
        return true;
    } else {
        console.log("no valida");
        return false;
    }
}

function moverEnDireccion(direccion) {
    var nuevaFilaPiezaVacia;
    var nuevaColumnaPiezaVacia;

    // Mueve pieza hacia la abajo, reemplazandola con la blanca
    if (direccion === codigosDireccion.ABAJO) {
        nuevaFilaPiezaVacia = filaVacia + 1;
        nuevaColumnaPiezaVacia = columnaVacia;
        
    } else if (direccion === codigosDireccion.ARRIBA) {
        nuevaFilaPiezaVacia = filaVacia - 1;
        nuevaColumnaPiezaVacia = columnaVacia;
    }
        
    // Mueve pieza hacia la derecha, reemplazandola con la blanca
    else if (direccion === codigosDireccion.DERECHA) {
        nuevaFilaPiezaVacia = filaVacia;
        nuevaColumnaPiezaVacia = columnaVacia + 1;
        
    }
        
    // Mueve pieza hacia la izquierda, reemplazandola con la blanca
    else if (direccion === codigosDireccion.IZQUIERDA) {
        nuevaFilaPiezaVacia = filaVacia;
        nuevaColumnaPiezaVacia = columnaVacia - 1;

    }

    if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)) {
        intercambiarPosiciones(filaVacia, columnaVacia, nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
        actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);

        //COMPLETAR: Agregar la dirección del movimiento al arreglo de movimientos
        movimientos.push(direccion);
    }
    
  return [nuevaFilaPiezaVacia,nuevaColumnaPiezaVacia];
}

function intercambiarPosiciones(fila1, columna1, fila2, columna2) {
    console.log(fila1, columna1, fila2, columna2,grilla.length);
    if ( ((fila1 && columna1 && fila2 && columna2) < grilla.length) && ((fila1 && columna1 && fila2 && columna2) >= 0) ) {
        var pieza1 = grilla[fila1][columna1];
        var pieza2 = grilla[fila2][columna2];

        intercambiarPosicionesGrilla(fila1, columna1, fila2, columna2);
        moverPieza('pieza' + pieza1, 'pieza' + pieza2);
    } else {
        return false;
    }
}

function actualizarUltimoMovimiento(direccion) {
  ultimoMov = document.getElementById('flecha');
  switch (direccion) {
    case codigosDireccion.ARRIBA:
      return ultimoMov.textContent = '↑';
      break;
    case codigosDireccion.ABAJO:
      return ultimoMov.textContent = '↓';
      break;
    case codigosDireccion.DERECHA:
      return ultimoMov.textContent = '→';
      break;
    case codigosDireccion.IZQUIERDA:
      return ultimoMov.textContent = '←';
      break;
    default:
      return false;
  }
}

function mostrarInstruccionEnLista(instruccion, idLista) {
  var ul = document.getElementById(idLista);
  var li = document.createElement("li");
  li.textContent = instruccion;
  ul.appendChild(li);
}


function mezclarPiezas() {

    var arrayx = [];
    for (let i = 0; i < grilla.length; i++){ 
        for (let j = 0; j < grilla.length; j++){ 
            if(grilla[i][j] != 9) {
                arrayx.push(grilla[i][j]);
            }
        }
    }

    arrayx = desordenar(arrayx)
    arrayx.push(9);
    
    var cant = 3;
    var k = 0;
    for (var i=0,j=arrayx.length; i<j; i+=cant) {
        grilla[k] = arrayx.slice(i,i+cant);
        k++;
    }

}


function desordenar(param){
    var t = param.sort(function(a,b) {return (Math.random()-0.5)});
    return [...t];
  }

function capturarTeclas() {
    document.body.onkeydown = (function(evento) {
        if(document.getElementById('boton_comienzo').style.display == "none"){
            if (evento.which === codigosDireccion.ABAJO ||
                evento.which === codigosDireccion.ARRIBA ||
                evento.which === codigosDireccion.DERECHA ||
                evento.which === codigosDireccion.IZQUIERDA) {
    
            moverEnDireccion(evento.which);
            var gano = chequearSiGano();
            if (gano) {
                setTimeout(function() {
                    mostrarCartelGanador();
                    }, 500);
                }
                evento.preventDefault();
            }
        }
    })
  
}

function iniciar() {
    mostrarInstrucciones(instrucciones);
    mezclarPiezas();
    capturarTeclas();
}

// Ejecutamos la función iniciar
iniciar();