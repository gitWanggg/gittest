<template>
	<view>
		<canvas style="width: 400px; height: 400px;" canvas-id="firstCanvas" id="firstCanvas"></canvas>
	</view>
</template>

<script>
	import {createconvas,resolvehd,convastrigger} from "@/common/mycircle.js"
	export default {
			data() {
				return {
					DayColor: [{
						'type': 'UV',
						'value': 60,
						'color': '#AC33C1'
					}, {
						'type': 'Violet',
						'value': 60,
						'color': '#851699'
					}, {
						'type': 'Royal Blue',
						'value': 60,
						'color': '#1F1BF5'
					}, {
						'type': 'Blue',
						'value': 60,
						'color': '#3273C2'
					}, {
						'type': 'Green',
						'value': 60,
						'colors': '#43CF7C'
					}, {
						'type': 'Deep Red',
						'value': 60,
						'color': '#C12E2E'
					}, {
						'type': 'Warm White',
						'value': 60,
						'color': '#DBD7A4'
					}, {
						'type': 'Cool White',
						'value': 60,
						'color': '#BAD7E3'
					}],
					NightColor: [{
							'type': 'Moonlight',
							'value': 20,
							'color': '#DBD7A4'
						},
						{
							'type': 'Moonlight Blue',
							'value': 10,
							'color': '#3273C2'
						}
					],
					moon:'../../static/moon.svg',
					sun:'../../static/sun.svg',
					sindex: 0,
					am:"00:00",
					pm:"00:00"
				}
			},
			onLoad() {
				
			},
			onReady(){
				
				 const ctx = uni.createCanvasContext('firstCanvas')
				createconvas(ctx,resolvehd,this);
				//         let ox = 200;
				//         let oy = 200;
				//         let or = 180; //大圆半径
				//         let br = 10; //小圆半径
				//         let moveFlag = false;
				//         let n0 = 0; //左圆
				//         let n1 = 0; //右圆
				//         let moon = new Image();
				//         let sun = new Image();
				//         let am = new Image();
				// 		let convaswidth=400;
				// 		let convasheight=400;
				
				//         let onprochange = null;
				
				//         function offset(r, d) {//根据弧度与距离计算偏移坐标
				//             return { x: -Math.sin(r) * d, y: Math.cos(r) * d };
				//         };
				
				       
				
				//         function draw() {
				//             ctx.clearRect(0, 0, convaswidth, convasheight);
				//             ctx.strokeStyle = "#99a";
				//             ctx.lineWidth = 20;
				//             ctx.beginPath();
				//             // ctx.arc(ox, oy, or, 0, Math.PI, true);//半圆
				//             ctx.arc(ox, oy, or, 0, 2 * Math.PI, true);//整圆
				//             ctx.stroke();
				//             ctx.strokeStyle = "#69f"; //背景圆环
				//             ctx.lineWidth = 20;
				//             ctx.beginPath();
				//             ctx.arc(ox, oy, or, 0.5*Math.PI, (n1 * 2 + 0.5) * Math.PI, true);
				
				//             ctx.stroke();
				
				//             ctx.beginPath();
				
				//             ctx.arc(ox, oy, or, 0.5 * Math.PI, (n0 * 2 + 0.5) * Math.PI, false);
				//             // ctx.arc(ox,oy,or,0.5*Math.PI,(n*2+0.5)*Math.PI,false);
				//             ctx.stroke();
				
				
				//             ctx.fillStyle = "#3aa9f2"; //弧度轨迹
				//             ctx.font = "80px Arial";
				//             ctx.textAlign = "center";
				//             ctx.textBaseline = "middle";
				//             ctx.fillText(Math.round( n1 && ( 100 - n1 * 100)||n1) + "%", ox, oy);
				//             ctx.fillStyle = "#fff";//滑动手柄圆
				//             ctx.beginPath();
				//             let d = offset(n1 * 2 * Math.PI, or);
				
				
				//            // ctx.drawImage(sun, 0, 0, 16, 16, ox + d.x-br, oy + d.y-br, 16, 16);
				//             //ctx.arc(ox + d.x, oy + d.y, br, 0, 2 * Math.PI, true);
				
				//             let d2 = offset(n0 * 2 * Math.PI, or);
				//            // ctx.arc(ox + d2.x, oy + d2.y, br, 0, 2 * Math.PI, true);
				
				//             //ctx.drawImage(moon, 0, 0, 16, 16, ox + d2.x - br, oy + d2.y - br, 16, 16);
				
				
				//           //  ctx.drawImage(am, 0, 0, 320, 320,30+6,30+6,320,320);
				
				// 			console.log	("ok");
				//             ctx.fill();
				// 			//ctx.draw()
				//         }
				
				//         let on = 
				// 		//("ontouchstart" in document) ? 
				// 		{
				//             start: "touchstart", move: "touchmove", end: "touchend"
				//         } ;
				// 		// :
				// 		// {
				//   //           start: "mousedown", move: "mousemove", end: "mouseup"
				//   //       };
				
				//         function getXY(e, obj) {
				//             let et = e.touches ? e.touches[0] : e;
				//             let x = et.clientX;
				//             let y = et.clientY;
				//             return {
				//                 x: x - obj.offsetLeft + (document.body.scrollLeft || document.documentElement.scrollLeft),
				//                 y: y - obj.offsetTop + (document.body.scrollTop || document.documentElement.scrollTop)
				//             }
				//         }
				
				       
				//         let isloadok = 0;
				//         function mydraw() {
				//             // if(isloadok==3)
				//             //     draw(0);
				//         }
				        
				
				// function resolvehd(hd0, hd1) {
				//            if (hd0 > 0.492)
				//                            hd0 = 0.5;
				//                        if (hd0 < 0.011)
				//                            hd0 = 0;
				//                        let M0 = parseInt(hd0 * 2 * 720);
				//                        let h0 = parseInt(M0 / 60);
				//                        let m0 = M0 % 60;
				//                        let t0 = (h0 < 10 ? "0" + h0 : h0) + ":" + (m0 < 10 ? "0" + m0 : m0);
				           
				           
				//                        if (hd1 < 0.502)
				//                            hd1 = 0.5;
				//                        if (hd1 > 0.993)
				//                            hd1 = 1.0;
				//                        let M1 = parseInt((1.0 - hd1) * 2 * 720);
				//                        let h1 = parseInt(M1 / 60);
				//                        let m1 = M1 % 60;
				//                        let t1 = (h1 < 10 ? "0" + h1 : h1) + ":" + (m1 < 10 ? "0" + m1 : m1);
				           
				//                         let mtotal = M0 + M1;
				           
				//                         let totalh = parseInt(mtotal / 60);
				//                         let totalm = mtotal % 60;
				           
				//                         let tH = totalh < 10 ? "0" + totalh : totalh.toString();
				//                         let tM = totalm < 10 ? "0" + totalm : totalm.toString();
				           
				//                         let nr = { t0, t1, tH, tM };
				//                         console.log(nr);
				//                         return nr;
				//         }
				        
				
				// moon.src = "/static/ico/moonx16.png";
				//   moon.onload = function () {
				// 	  isloadok += 1;
				// 	  mydraw();
				//   }
				  
				//   sun.src = "/static/ico/sunx16.png";
				  
				  
				//   am.src = "/static/ico/am.png";
				//   am.onload = function () {
				// 	  isloadok += 1;
				// 	  mydraw();
				//   }
				  
				//   sun.onload = function () {
				// 	  isloadok += 1;
				// 	  mydraw();
				//   }
				
				
				
				
				
				
				
				//  ctx.setFillStyle('#545a7a'); //canvas背景颜色
				//  ctx.fillRect(0, 0, 400, 400); //canvas画布大小   
				
				//     // 将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中
				// // function offset(r, d) {//根据弧度与距离计算偏移坐标
				// //     return { x: -Math.sin(r) * d, y: Math.cos(r) * d };
				// // };
				
				
				// // let ox = 200;
				// // let oy = 200;
				// // let or = 180; //大圆半径
				// // let br = 10; //小圆半径
				// // let moveFlag = false;
				// // let n0 = 0; //左圆
				// // let n1 = 0; //右圆
				
				
				// ctx.clearRect(0, 0, 400, 400);
				//   ctx.strokeStyle = "#99a";
				//   ctx.lineWidth = 20;
				//   ctx.beginPath();
				// / // ctx.arc(ox, oy, or, 0, Math.PI, true);//半圆
				//   ctx.arc(ox, oy, or, 0, 2 * Math.PI, true);//整圆
				//   ctx.stroke();
				//  ctx.strokeStyle = "#69f"; //背景圆环
				//  ctx.lineWidth = 20;
				//  ctx.beginPath();
				//  ctx.arc(ox, oy, or, 0.5*Math.PI, (n1 * 2 + 0.5) * Math.PI, true);
				
				//  ctx.stroke();
				
				//  ctx.beginPath();
				
				//  ctx.arc(ox, oy, or, 0.5 * Math.PI, (n0 * 2 + 0.5) * Math.PI, false);
				//  // ctx.arc(ox,oy,or,0.5*Math.PI,(n*2+0.5)*Math.PI,false);
				//  ctx.stroke();
				
				
				//   ctx.fillStyle = "#3aa9f2"; //弧度轨迹
				//   ctx.font = "80px Arial";
				//   ctx.textAlign = "center";
				//   ctx.textBaseline = "middle";
				//   ctx.fillText(Math.round( n1 && ( 100 - n1 * 100)||n1) + "%", ox, oy);
				//   ctx.fillStyle = "#fff";//滑动手柄圆
				//   ctx.beginPath();
				//   let d = offset(n1 * 2 * Math.PI, or);
				
				
				 
				//   ctx.arc(ox + d.x, oy + d.y, br, 0, 2 * Math.PI, true);
				
				//  let d2 = offset(n0 * 2 * Math.PI, or);
				//   ctx.arc(ox + d2.x, oy + d2.y, br, 0, 2 * Math.PI, true);
				
				// ctx.drawImage("/static/ico/sunx16.png",0,0,16,16);
				// // 			console.log	("ok");
				//   ctx.fill();
				
				
				//     ctx.draw()
			},
			methods: {
				sliderChange(e) {
					console.log(e)
	
	
	
					// this.color[0].value = e.detail.value;
				},
				 
				drawCanvas(){
		 	              
					
					
				},
				touchstart(e){
					convastrigger(0,e);
				},
				touchmove(e){
					convastrigger(1,e);
				},touchend(e){
					convastrigger(2,e);
				}
			}
		}
</script>

<style>
</style>