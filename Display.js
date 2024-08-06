/*se encarga de controlar la calculadora
va a ser la clase que va a interactuar 
con los botones y lo que va a mostrar
en el display*/


//necesita el valor anterior y el actual
class Display {
    constructor(displayValorAnterior, displayValorActual){
        this.displayValorActual = displayValorActual;
        this.displayValorAnterior = displayValorAnterior;
        this.calculador = new Calculadora();
        this.tipoOperacion = undefined;
        this.valorActual = '';
        this.valorAnterior = ''; 
        this.signos = {
            sumar: '+',
            dividir: '%',
            multiplicar: 'X',
            restar: '-'
        }
    }

    //sirve para borrar de a un numero
    borrar(){
        this.valorActual = this.valorActual.toString().slice(0,-1);
        this.imprimirValores();
    }

    borrarTodo(){
        //seteamos todo en vacio        
        this.valorActual = '';
        this.valorAnterior = '';
        this.tipoOperacion = undefined;
        this.imprimirValores();
    }

    computar(tipo){
        this.tipoOperacion !== 'igual' && this.calcular();
        this.tipoOperacion= tipo;
        this.valorAnterior = this.valorActual || this.ValorAnterior;
        this.valorActual = '';
        this.imprimirValores();
    }

    agregarNumero(numero){
        if(numero === '.' && this.valorActual.includes('.')) return
        this.valorActual = this.valorActual.toString() + numero.toString();
        this.imprimirValores();
    }

    imprimirValores() {
        this.displayValorActual.textContent = this.valorActual;
        this.displayValorAnterior.textContent = `${this.valorAnterior} ${this.signos[this.tipoOperacion] || ''}`;
    }

 //toma los valores del display y se los da a la calculadora para que haga el calculo   
    calcular(){
        const valorAnterior = parseFloat(this.valorAnterior);
        const valorActual = parseFloat(this.valorActual);

        //si ninguno de los valores no es un numero entonces no retornamos nada
        if( isNaN(valorActual) || isNaN(valorAnterior) ) return;
        //en el caso de que si tenga valores
        this.valorActual = this.calculador[this.tipoOperacion](valorAnterior, valorActual); 
    }
}
