 let canvas = null;
        let ctx = null;
        let ox = 200;
        let oy = 150;
        let or = 140; //大圆半径
        let br = 10; //小圆半径
        let moveFlag = false;
        let n0 = 0; //左圆
        let n1 = 0; //右圆
        let moon = new Image();
        let sun = new Image();
        let am = new Image();
		let convaswidth=400;
		let convasheight=300;

        let onprochange = null;
		
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
            ctx.lineWidth = 20;
            ctx.beginPath();
            // ctx.arc(ox, oy, or, 0, Math.PI, true);//半圆
            ctx.arc(ox, oy, or, 0, 2 * Math.PI, true);//整圆
            ctx.stroke();
            ctx.strokeStyle = "#69f"; //背景圆环
            ctx.lineWidth = 20;
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


            ctx.drawImage(sunsrc, 0, 0, 16, 16, ox + d.x-br, oy + d.y-br, 16, 16);
            //ctx.arc(ox + d.x, oy + d.y, br, 0, 2 * Math.PI, true);

            let d2 = offset(n0 * 2 * Math.PI, or);
           // ctx.arc(ox + d2.x, oy + d2.y, br, 0, 2 * Math.PI, true);

            ctx.drawImage(moonsrc, 0, 0, 16, 16, ox + d2.x - br, oy + d2.y - br, 16, 16);


            ctx.drawImage(amsrc, 0, 0, 320, 320,73,25,250,250);

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
            let et = e.touches &&e.touches.length ? e.touches[0] : e;
            let x = et.clientX;
            let y = et.clientY;
            return {
                x: x - objuni.left,//obj.offsetLeft + (document.body.scrollLeft || document.documentElement.scrollLeft),
                y: y - objuni.top//obj.offsetTop + (document.body.scrollTop || document.documentElement.scrollTop)
            }
        }

       
        let isloadok = 0;
        function mydraw() {
            if(isloadok==3)
                draw(0);
        }
        
export function createconvas(ctxarg,regchange,mepage) {
		onprochange = regchange;
	    ctx	 =	ctxarg;
		objuni=mepage;
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
export function convastrigger(func,e){
	if(func==0){
		 moveFlag = true;
	}
	else if(func==1){
		 if (moveFlag) {
					
					  let k = getXY(e, canvas);
					  let r = Math.atan2(k.x - ox, oy - k.y);
					  let hd = (Math.PI + r) / (2 * Math.PI);
					  // console.log("k,r,hd", k, r, hd);
					  // 半圆的滑动范围判断
					  if (hd <= 1 && hd >= 0.5) {
						  n1 = hd;
					  }
					  else
						  n0 = hd;
					  draw();
					  onprochange && onprochange(n0, n1);
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
        