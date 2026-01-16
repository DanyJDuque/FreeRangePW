//const persona = new Persona('Alice', 30);
//persona.mostrarDetalles();

// Una simple función
function sumar(a: number, b: number): number {
    return a + b;
}

const resultadoSuma = sumar(5, 3);
console.log(`Resultado de la suma: ${resultadoSuma}`);

// Función Flecha Básica
const suma = (a: number, b: number): number =>{
    return a + b;
}

const resulatdoSumaFlecha = suma(5, 3);
console.log(`Resultado de la suma con función flecha: ${resulatdoSumaFlecha}`);

// Función Flecha sin parentesis alrededor de un sólo parámetro
const esPar = num => num % 2 === 0;
console.log("¿El número 6 es par?", esPar(6));

// Fucnión Flecha con Cuerpo Implícito
const saludar = nombre => `¡Hola, ${nombre}!`;
console.log(saludar('Alice'));

// Fucnión Flecha en Mapeo de Arreglo
const numeros = [1,2,3,4,5];
const alCuadrado = numeros.map(num => num * num);
console.log("Arreglo original:", numeros);
console.log("Arreglo al cuadrado:", alCuadrado);

