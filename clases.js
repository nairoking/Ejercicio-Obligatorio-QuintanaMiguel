class Persona {
    constructor(nombre, edad, altura, peso) {
      this.nombre = nombre;
      this.edad = edad;
      this._altura = altura;
      this._peso = peso;
    }
  
    imprimirResumen() {
      console.log(`Nombre: ${this.nombre}`);
      console.log(`Edad: ${this.edad}`);
      console.log(`Altura: ${this._altura}`);
      console.log(`Peso: ${this._peso}`);
    }
  }
  
  class Empleado extends Persona {
    constructor(nombre, edad, altura, peso, sueldo) {
      super(nombre, edad, altura, peso);
      this._sueldo = sueldo;
    }
  
    imprimirResumen() {
      super.imprimirResumen();
      console.log(`Sueldo: ${this._sueldo}`);
    }
  }
  