class dft {
  
  constructor(canvas1,canvas2,result){
    this.canvas1 = canvas1;
    this.canvas2 = canvas2;
    this.result = result;
    this.freq = 1;
    this.sample = 10;
    
    var vc1 = this.canvas1.getContext('2d');
    var r = 100;
    var T = canvas1.height;
    vc1.strokeStyle ='blue';
    vc1.lineWidth = 2;
    vc1.beginPath();
    vc1.moveTo(0,0);
    vc1.lineTo(0,500);
    vc1.moveTo(0,250);
    vc1.lineTo(600,250);
    
    vc1.moveTo(0,250); //始点
    for(var x=1; x<=canvas1.width; x +=1) {
        var y =-r*Math.sin((2*Math.PI/T)*x*2); //振幅 * Math.sin( 角速度(2π/周期)*時間 )
        vc1.lineTo(x, y+(canvas1.height/2));
    }
    vc1.stroke();
  }
}


window.addEventListener('load',() => {
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

