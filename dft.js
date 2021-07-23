class dft {
  
  constructor(canvas1,canvas2,result){
    this.canvas1 = canvas1;
    this.canvas2 = canvas2;
    this.result = result;
    this.freq = 1;
    this.sample = 10;
    this.waveform();
    var nl = new nylon();
  }
  nl.on( "max", ( key, params ) => {
      this.number = params["top"];
    });
  nl.on( "dimension", ( key, params ) => {
      this.dimension = params["dimension"];
    });
  
  waveform() {
    this.ctx1 = this.canvas1.getContext('2d');
    var r = 100;
    var T = this.canvas1.width;
    var x_pt = [];
    var pt = canvas1.width / this.sample;
    this.ctx1.strokeStyle ='blue';
    this.ctx1.lineWidth = 2;
    this.ctx1.beginPath();
    this.ctx1.moveTo(0,0);
    this.ctx1.lineTo(0,this.canvas1.height);
    this.ctx1.moveTo(0,this.canvas1.height/2);
    this.ctx1.lineTo(this.canvas1.width,this.canvas1.height/2);
    
    this.ctx1.moveTo(0,250); //始点
    for(var x=0; x<this.canvas1.width; x +=1) {
        var y =-r*Math.sin((2*Math.PI/T)*x*this.freq); //振幅 * Math.sin( 角速度(2π/周期)*時間*freq )
        this.ctx1.lineTo(x, y+(this.canvas1.height/2));
        if(x % pt == 0 && x != canvas1.width){
          x_pt.push(x);
        }
    }
    for(let i=0; i<this.sample; i++){
      this.ctx1.moveTo(x_pt[i],0);
      this.ctx1.lineTo(x_pt[i] ,this.canvas1.height);
    }
    this.ctx1.stroke();
  }
}


window.addEventListener('load',() => {
  document.querySelector('#s02').addEventListener( "click", () => {
  });
  document.querySelector('#s03').addEventListener( "click", () => {
  });
                                                  
  
  var fui = new dft(
    document.querySelector('#canvas1'),
    document.querySelector('#canvas2'),
    document.querySelector('#result'),
  );
});




/**window.addEventListener('load',draw,false);

function draw(){
  var r = 100;
  var T = 600;
  var x_pt = new Array(20);
  var y_pt = new Array(20);
  
  var canvas = document.querySelector('#canvas1');
  var ctx = canvas.getContext('2d');
    
  ctx.strokeStyle ='blue';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0,250); //始点
  
 
  for(var x=1; x<=canvas.width; x +=1) {
      var y =-r*Math.sin((2*Math.PI/T)*x*2); //振幅 * Math.sin( 角速度(2π/周期)*時間 )
      ctx.lineTo(x, y+(canvas.height/2));
      
    }
  ctx.moveTo(0,0);
  ctx.lineTo(0,500);
  ctx.moveTo(0,250);
  ctx.lineTo(600,250);
  
  ctx.stroke();
  
}**/

