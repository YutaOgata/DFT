
window.addEventListener('load',draw,false);

function draw(){
  var r = 100;
  var T = 600;
  
  var canvas = document.querySlector('#canvas1');
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

