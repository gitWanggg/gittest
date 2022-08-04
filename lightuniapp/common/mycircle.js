 let canvas = null;
        let ctx = null;
        let ox = 0;
        let oy = 0;
        let or = 0; //大圆半径
        let br = 10; //小圆半径
        let moveFlag = false;
        let n0 = 0; //左圆
        let n1 = 0; //右圆
        let moon = new Image();
        let sun = new Image();
        let am = new Image();
		let convaswidth=0;
		let convasheight=0;
		let convasleft=0;
		let convastop=0;
		
		let pmx=0;//图片pm
		let pmy=0;//图片pm;
		let pmwidth=0;
		let pmheidth=0;
		
		let ring=20;//圆环宽度
		

        let onprochange = null;
		
		let pointsun={
			x:0,
			y:0
		};
		let pointmoon={
			x:0,
			y:0
		}
		let ceps=30;//触点误差范围

		
		let moonsrc="/static/ico/moonx16.png";
		let sunsrc="/static/ico/sunx16.png";
		let amsrc="/static/ico/am.png";

		let objuni=null;

        function offset(r, d) {//根据弧度与距离计算偏移坐标
            return { x: -Math.sin(r) * d, y: Math.cos(r) * d };
        };

       

        function draw() {
            ctx.clearRect(0, 0, convaswidth, convasheight);
            ctx.strokeStyle = "#99a";
            ctx.lineWidth = ring;
            ctx.beginPath();
            // ctx.arc(ox, oy, or, 0, Math.PI, true);//半圆
            ctx.arc(ox, oy, or, 0, 2 * Math.PI, true);//整圆
            ctx.stroke();
            ctx.strokeStyle = "#69f"; //背景圆环
            ctx.lineWidth = ring;
            ctx.beginPath();
            ctx.arc(ox, oy, or, 0.5*Math.PI, (n1 * 2 + 0.5) * Math.PI, true);

            ctx.stroke();

            ctx.beginPath();

            ctx.arc(ox, oy, or, 0.5 * Math.PI, (n0 * 2 + 0.5) * Math.PI, false);
            // ctx.arc(ox,oy,or,0.5*Math.PI,(n*2+0.5)*Math.PI,false);
            ctx.stroke();


            ctx.fillStyle = "#3aa9f2"; //弧度轨迹
            ctx.font = "80px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(Math.round( n1 && ( 100 - n1 * 100)||n1) + "%", ox, oy);
            ctx.fillStyle = "#fff";//滑动手柄圆
            ctx.beginPath();
            let d = offset(n1 * 2 * Math.PI, or);

			pointsun.x=ox + d.x-br;
			pointsun.y=oy + d.y-br;
            ctx.drawImage(sunsrc, 0, 0, 16, 16, pointsun.x,pointsun.y , 16, 16);
			
            //ctx.arc(ox + d.x, oy + d.y, br, 0, 2 * Math.PI, true);

            let d2 = offset(n0 * 2 * Math.PI, or);
           // ctx.arc(ox + d2.x, oy + d2.y, br, 0, 2 * Math.PI, true);

			pointmoon.x=ox + d2.x - br;
			pointmoon.y=oy + d2.y - br;
            ctx.drawImage(moonsrc, 0, 0, 16, 16,pointmoon.x , pointmoon.y, 16, 16);


            ctx.drawImage(amsrc, 0, 0, 320, 320,pmx,pmy,pmwidth,pmheidth);

            ctx.fill();
			ctx.draw()
        }

        let on = 
		//("ontouchstart" in document) ? 
		{
            start: "touchstart", move: "touchmove", end: "touchend"
        } ;
		// :
		// {
  //           start: "mousedown", move: "mousemove", end: "mouseup"
  //       };

        function getXY(e, obj) {
			//console.log(objuni);
			
            let et = e.touches &&e.touches.length ? e.touches[0] : e;
			//console.log("et",et);
            let x = et.clientX||et.x;
            let y = et.clientY||et.y;
            return {
                x: x - objuni.left,//obj.offsetLeft + (document.body.scrollLeft || document.documentElement.scrollLeft),
                y: y - objuni.top,//obj.offsetTop + (document.body.scrollTop || document.documentElement.scrollTop)
				px:x,
				py:y
            }
        }

       
        let isloadok = 0;
        function mydraw() {
            if(isloadok==3)
                draw(0);
        }
        
function initvalues(){
	convasheight=objuni.height;
	convaswidth=objuni.width;
	convasleft=objuni.left;
	convastop=objuni.top;
	ox=convaswidth/2;
	oy=convasheight/2;
	or=convaswidth/2-ring/2;
	pmx=ring;
	pmy=ring;
	pmheidth=(or-ring)*2+ring;
	pmwidth=(or-ring)*2+ring;
}		
		
export function createconvas(ctxarg,regchange,mepage) {
		onprochange = regchange;
	    ctx	 =	ctxarg;
		objuni=mepage;
		
		initvalues();
		//console.log("objuni:", objuni);
		moon.src = moonsrc;
		  moon.onload = function () {
			  isloadok += 1;
			  mydraw();
		  }
		  
		  sun.src = sunsrc;
		  
		  
		  am.src = amsrc;
		  am.onload = function () {
			  isloadok += 1;
			  mydraw();
		  }
		  
		  sun.onload = function () {
			  isloadok += 1;
			  mydraw();
		  }

}
let tsnow=0;

const partrad=694;
const partrad2=0.006944;
const partrad3=0.006948;
function verifyradian(rad){ //校验弧度
	let diffrad= rad-0.5;
	let npart =parseInt( parseInt(diffrad*100000)/partrad);
	
	let nf = 0.5+npart*partrad2;	
	return nf;
}
function verifyradian2(rad){ //校验弧度
	
	let npart =parseInt( parseInt(rad*100000)/partrad);
	
	let nf = npart*partrad3;
	
	console.log("rad, npart,nf:",rad,npart, nf);
	return nf;
}

export function convastrigger(func,e){
	var timestamp=new Date().getTime();
	let tsdiff=timestamp-tsnow;
	if(tsdiff<20)
	 	return;
	tsnow=timestamp;
	if(func==0){
		 moveFlag = true;
	}
	else if(func==1){
		 if (moveFlag) {
					
					  let k = getXY(e, canvas);
					  
					  let difx0=Math.abs(k.px-pointmoon.x);
					  let dify0=Math.abs(k.py-pointmoon.y);
					  let difx1=Math.abs(k.px-pointsun.x);
					  let dify1=Math.abs(k.py-pointsun.y);
					  //console.log(k,pointmoon,pointsun);
					  let ismove=(difx0<ceps&&dify0<ceps)||(difx1<ceps&&dify1<ceps);
					  ismove=true;
					  if(ismove){ //在误差允许范围
						  
						  
						  let r = Math.atan2(k.x - ox, oy - k.y);
						  let hd = (Math.PI + r) / (2 * Math.PI);
						  // console.log("k,r,hd", k, r, hd);
						  // 半圆的滑动范围判断						 
						  if (hd <= 1 && hd >= 0.5) {
						  						  n1 = verifyradian( hd);
						  }
						  else{
												
						  						  n0 = verifyradian2(hd);
							}
						  draw();
						  onprochange && onprochange(n0, n1);
					  }
					  
					  
				  }
	}
	else {
		 moveFlag = false;
	}
}

export function resolvehd(hd0, hd1) {
           if (hd0 > 0.492)
                           hd0 = 0.5;
                       if (hd0 < 0.011)
                           hd0 = 0;
                       let M0 = parseInt(hd0 * 2 * 720);
                       let h0 = parseInt(M0 / 60);
                       let m0 = M0 % 60;
                       let t0 = (h0 < 10 ? "0" + h0 : h0) + ":" + (m0 < 10 ? "0" + m0 : m0);
           
           
                       if (hd1 < 0.502)
                           hd1 = 0.5;
                       if (hd1 > 0.993)
                           hd1 = 1.0;
                       let M1 = parseInt((1.0 - hd1) * 2 * 720);
                       let h1 = parseInt(M1 / 60);
                       let m1 = M1 % 60;
                       let t1 = (h1 < 10 ? "0" + h1 : h1) + ":" + (m1 < 10 ? "0" + m1 : m1);
           
                        let mtotal = M0 + M1;
           
                        let totalh = parseInt(mtotal / 60);
                        let totalm = mtotal % 60;
           
                        let tH = totalh < 10 ? "0" + totalh : totalh.toString();
                        let tM = totalm < 10 ? "0" + totalm : totalm.toString();
           
                        let nr = { t0, t1, tH, tM };                       
                        return nr;
        }
        