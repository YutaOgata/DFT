class dft {
  
  constructor(canvas1,canvas2,result){
    this.canvas1 = canvas1;
    this.canvas2 = canvas2;
    this.result = result;
    this.freq = 1;
    this.sample = 10;
    this.on = 0;
    this.memory = this.sample;
    this.dftcal_r();
    this.waveform();
    this.dftcal();
    
    var nl = new nylon();
    nl.on( 'max', ( key, params ) => {
      this.memory = this.sample;
      this.sample = params["top"];
      this.waveform();
      this.on = 1;
      this.dftcal();
    });
    nl.on( 'freq', ( key, params ) => {
      this.memory = this.sample;
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
    var pt = this.canvas1.width / this.sample;
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
    this.ctx1.moveTo(0,this.canvas1.height/2); 
    for(let x=0; x<this.canvas1.width; x +=1) {
        var y =-r*Math.sin((2*Math.PI/T)*x*this.freq); 
        this.ctx1.lineTo(x, y+(this.canvas1.height/2));
        if(x % pt == 0 && x != this.canvas1.width){
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
    /**this.ctx2 = this.canvas2.getContext('2d');
    this.ctx2.strokeStyle ='black';
    this.ctx2.lineWidth = 2;
    this.ctx2.beginPath();
    this.ctx2.clearRect(0,0,this.canvas2.width,this.canvas2.height);
    this.ctx2.fill();
    this.ctx2.stroke();
    this.ctx2.strokeStyle ='black';
    this.ctx2.beginPath();
    this.ctx2.moveTo(0,0);
    this.ctx2.lineTo(0,this.canvas2.height);
    this.ctx2.moveTo(0,this.canvas2.height);
    this.ctx2.lineTo(this.canvas2.width,this.canvas2.height);
    this.ctx2.stroke();
    
    this.ctx2.strokeStyle ='blue';**/
    
    if(this.on == 1){
      for(let i = 1; i<= this.memory ;i++){
        let rows = this.result.deleteRow(-1);
      }
    }
    let f = new Array(this.sample);
    var g = new Array(this.sample);
    for(let n = 0; n < this.sample; n++) f[n] = Math.sin((2.0*Math.PI/this.sample)*n*this.freq);
    
    for (let m = 0; m < this.sample; n++) {
      let ar = 0.0;
      let ai = 0.0;
      let x;
      //this.ctx2.beginPath();
      for (let n = 0; n < this.sample; n++) {
        x = ((2.0 * Math.PI) / this.sample) * m * n;
        ar += f[n] * Math.cos(-x);
        ai += f[n] * Math.sin(-x);
      }
      let row_s = this.result.insertRow(-1);
      let cell_n = row_s.insertCell(-1);
      let cell_ar = row_s.insertCell(-1);
      let cell_ai = row_s.insertCell(-1);
      let cell_x = row_s.insertCell(-1);
      
      ar /= this.sample;
      ai /= this.sample;
      x = Math.sqrt(4.0 * ar * ar + 4.0 * ai * ai);
      //this.ctx2.moveTo((this.canvas2.width / this.sample) * n,this.canvas2.height * (Math.round(x*100)/100));
      //this.ctx2.lineTo(((this.canvas2.width / this.sample) * n)+1,(this.canvas2.height * x)+1);
      //this.ctx2.stroke();
      
      cell_n.innerHTML = n;
      cell_ar.innerHTML = Math.round(ar*100)/100;
      cell_ai.innerHTML = Math.round(ai*100)/100;
      cell_x.innerHTML = Math.round(x*100)/100;
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
