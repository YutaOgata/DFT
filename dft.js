/**class dft {
  
  constructor( elm0, elm1, elm2, elm3 ) {
    this.elm0;
    this.elm1;
    this.elm2;
    this.elm3;
  }
}

window.addEventListener("load", function(e) {
  guisetup();

  var x = new dft(
    document.querySlector('graph1'),
    document.querySlector('graph1b'),
    document.querySlector('graph2'),
    document.querySlector('graph2b'),
    document.querySlector('theory'),
    document.querySlector('answer')
   );

});
**/
window.addEventListener('load',draw,false);

function draw(){
  var r = 100;
  var T = 600;
  
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
    
  ctx.strokeStyle ='green';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0,250); //始点
 
  for(var x=1; x<=canvas.width; x +=1) {
      var y =-r*Math.sin((2*Math.PI/T)*x*2); //振幅 * Math.sin( 角速度(2π/周期)*時間 )
      ctx.lineTo(x, y+(canvas.height/2));
    }
  
  ctx.stroke();
}
