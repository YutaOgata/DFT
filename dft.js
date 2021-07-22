class dft {
  
  constructor( elm1, elm2, elm3 ) {
    this.elm1 = elm1;
    this.elm2 = elm2;
    this.elm3 = elm3;
    var r = 100;
    var T = 600;
    
    vc1 = elm1;
    ctx1 = vc1.getContext('2d');
    
    ctx1.strokeStyle ='red';
    ctx1.lineWidth = 2;
    ctx1.beginPath();
    ctx1.moveTo(0,250); //始点
 
    for(var x=1; x<=canvas.width; x +=1) {
       var y =-r*Math.sin((2*Math.PI/T)*x*2); //振幅 * Math.sin( 角速度(2π/周期)*時間 )
       ctx1.lineTo(x, y+(canvas.height/2));
     }
  
    ctx1.stroke();
  }
}

window.addEventListener("load", function(e) {

  var X = new dft(
    document.querySlector('#canvas1'),
    document.querySlector('#canvas2'),
    document.querySlector('#result'),
   );

});
/**
window.addEventListener('load',draw,false);

function draw(){
  var r = 100;
  var T = 600;
  
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
    
  ctx.strokeStyle ='red';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0,250); //始点
 
  for(var x=1; x<=canvas.width; x +=1) {
      var y =-r*Math.sin((2*Math.PI/T)*x*2); //振幅 * Math.sin( 角速度(2π/周期)*時間 )
      ctx.lineTo(x, y+(canvas.height/2));
    }
  
  ctx.stroke();
}
