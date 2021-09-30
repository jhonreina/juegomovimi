var canvas;
var ctx;
var FPS = 50;

var anchoF = 50;
var altoF = 50;


var puntuacion = 100;
var protagonista; 

var enemigo= [];
var imagenAntorcha;
var tileMap;

var escenario = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,2,2,2,2,4,2,2,2,2,2,2,2,4,2,2,2,2,4,0],
    [0,2,0,0,0,2,2,0,0,0,0,2,2,0,0,0,0,2,2,0],
    [0,2,0,0,0,2,2,0,0,0,0,2,2,0,0,0,0,2,2,0],
    [0,2,2,4,2,2,2,2,2,2,2,2,2,2,4,2,2,2,2,0],
    [0,2,2,0,0,0,0,2,2,0,0,0,0,2,2,0,0,0,2,0],
    [0,2,2,0,0,0,0,2,2,0,0,0,0,2,2,0,0,0,2,0],
    [0,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,0],
    [0,2,2,2,2,2,4,2,2,2,2,4,2,2,2,2,2,2,2,0], 
    [0,0,0,2,0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0],
    [0,0,0,4,0,0,0,0,0,4,0,0,0,0,4,0,0,0,0,0],
    [0,2,2,2,2,2,2,2,2,3,2,2,2,2,2,2,2,2,2,0],
    [0,2,0,0,0,2,2,0,0,0,0,2,2,0,0,0,0,2,2,0],
    [0,4,0,0,0,2,2,0,0,0,0,2,2,0,0,0,0,4,2,0],
    [0,2,2,2,2,2,4,2,2,2,2,2,4,2,2,2,2,2,2,0],
    [0,2,2,0,0,0,0,2,2,0,0,0,0,2,2,0,0,0,2,0],
    [0,2,2,0,0,0,0,2,2,0,0,0,0,2,2,0,0,0,2,0],
    [0,2,2,2,4,2,2,2,2,2,2,4,2,2,2,2,4,2,2,0],
    [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
    [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

  

];

function dibujaEscenario(){


  for(y=0;y<20;y++){
      for(x=0;x<20;x++){

         
        var tile = escenario[y][x];
        ctx.drawImage(tileMap,tile*32,0,32,32,anchoF*x,altoF*y,anchoF,altoF);

      }
  }

}

var antorcha = function(x,y){
    this.x = x;
    this.y = y;

    this.retraso = 10;
    this.contador = 0;
    this.fotograma = 0; //0-3

    this.cambiaFotograma = function(){
        if(this.fotograma < 3){
            this.fotograma++;
        }
        else{
            this.fotograma = 0;
        }
    }

    this.dibuja = function(){

        if(this.contador < this.retraso){
            this.contador++;
        }
        else{
            this.contador = 0;
            this.cambiaFotograma();
        }
        ctx.drawImage(tileMap,this.fotograma*32,96,32,32,anchoF*x,altoF*y,anchoF,altoF);
    }
    
}
//OBJETO ENEMIGO
var malo = function(x,y){

    this.x = x;
    this.y = y;
    
    this.direccion = Math.floor(Math.random()*4);

    this.retraso = 50;
    this.fotograma = 0;

    this.dibuja = function(){        
        ctx.drawImage(tileMap,0,32,32,32,this.x*altoF,this.y*altoF,anchoF,altoF);
    }

  

    this.mueve = function(){

        protagonista.colisionEnemigo(this.x, this.y);


        if(this.contador < this.retraso){
            this.contador++;
        }
        else{
         this.contador = 0;    
        
                //ARRIBA
                if(this.direccion == 0){
                if(this.compruebaColision(this.x, this.y - 1)==false){
                    this.y--;   
                }           
                
                else{
                    this.direccion = Math.floor(Math.random()*4);
                }    
            }
                //ABAJO
                if(this.direccion == 1){
                    if(this.compruebaColision(this.x, this.y + 1)==false){
                    this.y++;   
                }           
                else{
                    this.direccion = Math.floor(Math.random()*4);
                }
            }
                //IZQUIERDA

                if(this.direccion == 2){
                    if(this.compruebaColision(this.x - 1, this.y)==false){
                    this.x--;   
                    }  
                    
                else{
                    this.direccion = Math.floor(Math.random()*4);
                }
            }
                //DERECHA
            if(this.direccion == 3){
                if(this.compruebaColision(this.x + 1, this.y)==false){
                this.x++;   
                }            
                else{
                this.direccion = Math.floor(Math.random()*4);
                }
            }
    } 
  }
}
   //OBJETO JUGADOR 
   var jugador = function(){
    this.x = 1;
    this.y = 1;
    this.color = '#820c01';
    this.llave = false;


    this.dibuja = function(){
        
        ctx.drawImage(tileMap,32,32,32,32,this.x*altoF,this.y*altoF,anchoF,altoF);
    }

          


    this.colisionEnemigo = function(x,y){
        if(this.x == x && this.y == y){
            this.muerte();
        }
    }

    this.margenes = function(x,y){
        var colision = false;

        if(escenario[y][x]==0){
            colision = true;
        }
        return(colision);
    }

    this.arriba = function(){

        if(this.margenes(this.x, this.y-1)==false){
        this.y--;
        this.logicaObjetos();
        }
    }
    this.abajo = function(){
       if(this.margenes(this.x, this.y+1)==false){      
        this.y++;
        this.logicaObjetos();
       }
    }
    this.izquierda = function(){
        if(this.margenes(this.x-1, this.y)==false){
        this.x--;
        this.logicaObjetos();
        
        }
    }
    this.derecha = function(){
       if(this.margenes(this.x+1, this.y)==false){
        this.x++;
        this.logicaObjetos();
       }
    }

    this.victoria = function(){
        console.log('Has ganado!')
        window.location.replace("./index.html");
        this.x = 1;
        this.y = 1;
        this.llave = false;
        escenario[20][3] = 3;
    }
/* 
    this.muerte= function(){
        console.log('Has perdido!')
        this.x = 1;
        this.y = 1;
        this.llave = false;
        escenario[20][3] = 3;
    } */


    this.logicaObjetos = function(){
        var objeto = escenario [this.y][this.x];
        //OBTIENE LLAVE
        if(objeto == 3){
            this.llave = true;
            escenario [this.y][this.x] = 2
            console.log('Has obtenido la llave!!!');
            document.querySelector("#puntos").innerHTML=`${puntuacion}`;
            puntuacion += 100;
        }
        if(objeto == 4){
            this.llave = true;
            escenario [this.y][this.x] = 2
            console.log('Has obtenido la llave!!!');
            document.querySelector("#puntos").innerHTML=`${puntuacion}`;
            puntuacion += 100;
        }
        if(objeto == 1){
            if(this.llave == true)
             this.victoria();
            else{
                console.log('Te fata la llave, no puedes pasar');
            } 
        }

    }
 }





function inicializa(){
    canvas = document.getElementById('canvas')
    ctx = canvas.getContext('2d');

    tileMap = new Image();
    tileMap.src = 'img/tilemap2.png'


    //CREAMOS AL JUGADOR
    protagonista = new jugador(1,1);

    //CREAMOS LA ANTORCHA
    imagenAntorcha = new antorcha(0,0);
    

    //CREAMOS LOS ENEMIGOS
    enemigo.push(new malo(3,3));
    enemigo.push(new malo(5,7));
    enemigo.push(new malo(7,7));
    enemigo.push(new malo(14,15));
    enemigo.push(new malo(4,11));
    enemigo.push(new malo(4,18));






    //LECTURA DEL TECLADO
     document.addEventListener('keydown',function(tecla){
        if(tecla.keyCode ==38){
            protagonista.arriba();
        }
        if(tecla.keyCode ==40){
            protagonista.abajo();
        }
        if(tecla.keyCode ==37){
            protagonista.izquierda();       
        }
        if(tecla.keyCode ==39){
            protagonista.derecha();
        }
     });

    setInterval(function(){
        principal();
    },1000/FPS);
}



function borraCanvas(){
    canvas.width = 1000;
    canvas.height = 1000;
};


function principal(){
    borraCanvas();
    dibujaEscenario();
    imagenAntorcha.dibuja();
    protagonista.dibuja(1,1);

    /* for(c=0; c<enemigo.length; c++){
        enemigo[c].mueve();
        enemigo[c].dibuja();
    } */


//console.log('funcion')
}