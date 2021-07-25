class dft {
  
  constructor(canvas1,canvas2,result){
    this.canvas1 = canvas1;
    this.canvas2 = canvas2;
    this.result = result;
    this.freq = 1;
    this.sample = 10;
    this.on = 0;
    this.dftcal_r();
    this.waveform();
    this.dftcal();
    
    var nl = new nylon();
    nl.on( 'max', ( key, params ) => {
      this.sample = params["top"];
      this.waveform();
      this.on = 1;
      this.dftcal();
    });
    nl.on( 'freq', ( key, params ) => {
      this.freq = params["freq"]-0;
      this.waveform();
      this.on = 1;
      this.dftcal();
    });
  }
  
  
  waveform() {
    this.ctx1 = this.canvas1.getContext('2d');
    var r = 100;
    var T = this.canvas1.width;
    var x_pt = [];
    var pt = canvas1.width / this.sample;
    this.ctx1.strokeStyle ='black';
    this.ctx1.lineWidth = 2;
    this.ctx1.beginPath();
    this.ctx1.clearRect(0,0,this.canvas1.width,this.canvas1.height);
    this.ctx1.fill();
    this.ctx1.stroke();
    this.ctx1.beginPath();
    this.ctx1.moveTo(0,0);
    this.ctx1.lineTo(0,this.canvas1.height);
    this.ctx1.moveTo(0,this.canvas1.height/2);
    this.ctx1.lineTo(this.canvas1.width,this.canvas1.height/2);
    this.ctx1.stroke();
    
    this.ctx1.strokeStyle ='blue';
    this.ctx1.beginPath();
    this.ctx1.moveTo(0,250); //始点
    for(let x=0; x<this.canvas1.width; x +=1) {
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
  
  dftcal_r(){
    let row = this.result.insertRow(-1);
    let cell = new Array(4);
    for (let i = 0; i < 4; i++){
      cell[i] = row.insertCell(-1);
    }
    cell[0].innerHTML = '次数';
    cell[1].innerHTML = '実数部';
    cell[2].innerHTML = '虚数部';
    cell[3].innerHTML = '絶対値';
  }
  
  dftcal(){
    //if(this.on == 1){
      //for(let i = 1; i< this.result.rows.lengh ;i++){
        let rows = this.result.deleteRow(0);
      //}
    //}
    let f = new Array(this.sample);
    for(let m = 0; m < this.sample; m++) f[m] = Math.sin((2.0*Math.PI/this.sample)*m*this.freq);
    
    for (let n = 0; n < this.sample; n++) {
      let ar = 0.0;
      let ai = 0.0;
      let k;
      for (let m = 0; m < this.sample; m++) {
        k = ((2.0 * Math.PI) / this.sample) * m * n;
        ar += f[m] * Math.cos(-k);
        ai += f[m] * Math.sin(-k);
      }
      let row_s = this.result.insertRow(-1);
      let cell_n = row_s.insertCell(-1);
      let cell_ar = row_s.insertCell(-1);
      let cell_ai = row_s.insertCell(-1);
      let cell_k = row_s.insertCell(-1);
      
      ar /= this.sample;
      ai /= this.sample;
      k = Math.sqrt(4.0 * ar * ar + 4.0 * ai * ai);
      
      cell_n.innerHTML = n;
      cell_ar.innerHTML = Math.round(ar*100)/100;
      cell_ai.innerHTML = Math.round(ai*100)/100;
      cell_k.innerHTML = Math.round(k*100)/100;
    }
  }
}

 var guisetup = () => {
  var nl = new nylon();
  document.querySelector('#s02').addEventListener( 'click', () => {
    nl.emit('max',{"top":10});
  });
  document.querySelector('#s03').addEventListener( 'click', () => {
    nl.emit('max',{"top":20});
  });
 document.querySelector('#freq-select').addEventListener( 'change', (event) => {
    nl.emit('freq',{"freq":event.target.value});
  });
}


window.addEventListener('load',() => {
  guisetup();
                                                  
  
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

