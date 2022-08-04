<template>
	<view class="content" >
		<view class="base-flex-justify">
			<view class="opt-btn">Cancel</view>
			<view class="opt-btn">Done</view>
		</view>
		<view class="base-felx-center">
			<view>
				Sunrise
				<view class="time">{{am}} AM</view>
			</view>
			<view>
				Sunset
				<view class="time">{{pm}} PM</view>
			</view>

		</view>

		<view class="canvas-box" @touchmove.stop.prevent="">
			<view >
				
			 <canvas ref="canvasId" @touchstart.stop.prevent="touchstart"
			  @touchmove.stop.prevent="touchmove" @touchend.stop.prevent="touchend"  
			
			  canvas-id="canvasId" id="canvasId" 
			  style="width: 500rpx; height: 500rpx;display: block;margin: 0 auto;">
			</canvas>
				
				
			</view>
			<view class="total-time"> {{dfH}} hr {{dfM}} min</view>
			<view class="lable">Light duration</view>
		</view>
		<view class="box btn-panel  base-flex-justify">
			<view class="box-title">Ramp Time</view>
			<view class="box-label">1 hr</view>
		</view>
		<view class="box">
			<view class="box-title sub">Lighting</view>
			<view class="sub-title">Daytime Colors</view>

			<view class="slider-box base-flex-justify" v-for="(item,index) in DayColor" :key="index">
				<view class="slider-panel">
					<slider :value="item.value" @changing="sliderChange" style="height: 9px;" :activeColor="item.color"
						backgroundColor="#E6E6E6" block-color="#fff" block-size="20" />
				</view>
				<view class="num">

					<text class="type">{{item.type}}</text>
					<view class="percent">

						{{item.value}}%
					</view>
				</view>

			</view>

			<view class="sub-title">Moonlight Colors</view>
			<view class="slider-box base-flex-justify" v-for="(item,index) in NightColor" :key="'key'+index">
				<view class="slider-panel">
					<slider :value="item.value" @changing="sliderChange" style="height: 9px;" :activeColor="item.color"
						backgroundColor="#E6E6E6" block-color="#fff" block-size="20" />
				</view>
				<view class="num">

					<text class="type">{{item.type}}</text>
					<view class="percent">

						{{item.value}}%
					</view>
				</view>

			</view>


		</view>
		
		<view class="box base-flex-justify">
			<view class="box-title">Night Mode</view>
			<view class="box-label">Disable</view>
		</view>
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
				pm:"00:00",
				dfH:"00",
				dfM:"00"
			}
		},
		onLoad() {
			
		},
		onReady(){
			const ctx = uni.createCanvasContext('canvasId')
			const query = uni.createSelectorQuery().in(this);
			query.select('#canvasId').boundingClientRect(data => {
			  // console.log("得到布局位置信息" + JSON.stringify(data));
			 createconvas(ctx,this.myresolve,data);
			  // console.log("节点离页面顶部的距离为" + data.top);
			}).exec();

			
		},
		methods: {
			sliderChange(e) {
				console.log(e)



				// this.color[0].value = e.detail.value;
			},
			myresolve(n0,n1) {
				let r=resolvehd(n0,n1);
		
				this.am=r.t1;
				this.pm=r.t0;
				this.dfH=r.tH;
				this.dfM=r.tM;
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

<style lang="scss" scoped>
	$base-color:#18ABE2;
	$white-color:#ffffff;
	$gray-color:#acacac;
 
	.apm12{position: absolute;top:0px;padding:10px 0; left:50%;z-index: 99; transform: translateX(-50%);text-align: center;display:flex;justify-content:space-between;flex-direction: column;height:-webkit-fill-available; }
	.apm6{position: absolute;top:50%;padding:0 10px; left:0;transform: translateY(-50%); display:flex;justify-content:space-between;width:-webkit-fill-available;} 
	.canvas-box {
		height: 580rpx;
		width: 100%;
		
	}

	.opt-btn {
		color: $base-color;
		font-weight: 600
	}

	.slider-panel {
		flex: 1;
	}

	.type {
		font-size: 24rpx;
		color: $gray-color;
		white-space: nowrap;
	}

	.percent {
		color: #000;
		font-weight: 600;
	}

	.num {
		width: 25%
	}

	.box {
		background: $white-color;
		padding: 15px;
		margin:15px 0;
		border-radius: 10px;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
	}

	.num {
		text-align: center;
	}

	.btn-panel {
		padding-right: 35px;
		position: relative;
	}

	.btn-panel::after {
		right: 20px;
		top: 22px;
		position: absolute;
		content: '';
		width: 10px;
		height: 10px;
		border-top: 3rpx solid $gray-color;
		border-right: 3rpx solid $gray-color;
		transform: rotate(45deg);
	}

	.box-title {
		font-weight: 600;
		font-size: 36rpx;
	}

	.sub {
		font-size: 32rpx;
	}

	.sub-title {
		font-size: 30rpx;
		color: $gray-color;
		margin: 20px 0;
	}

	.box-label {
		font-weight: normal;
		font-size: 32rpx;
		color: $gray-color;
		margin: auto 0;
	}

	.total-time {
		font-weight: bold;
		text-align: center
	}

	.lable {
		font-weight: normal;
		color: $gray-color;
		font-size: 26rpx;
		text-align: center;
	}

	.time {
		font-size: 32rpx;
		font-weight: 600;
		color: $base-color;
	}

	.base-flex-justify {
		display: flex;
		justify-content: space-between;
		margin: 0 0 15px 0;
	}

	.base-felx-center {
		text-align: center;
		display: flex;
		justify-content: space-around;
	}

	.circle {
		width: 320rpx;
		height: 320rpx;
		border: 15px solid #E6E6E6;
		border-radius: 50%;
		margin: 15px auto;
		background: $white-color;
		position: relative;
	}
		.inside-circle{
	position: absolute;
		width: 320rpx;
		height: 320rpx;
		border: 15px solid #3AA9F2;
		border-radius: 50%;
		 
		left:-15px;top:-15px;
		bottom:0;
		right:0;
		z-index: 98;
		 
}
	.content {
		background: #f5f5f5;
		padding: 14px;
	}

	::v-deep .uni-slider-handle-wrapper {
		height: 9px;
	}
</style>
