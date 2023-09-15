<template>
	<view class="body">
		<view class="container" :class="{maskLayer: isActive_Option}" @click="handleBlur">
			<view class="state-box">
				<view class="bluetooth-state">
					<view class="text-state">连接状态:</view>
					<view class="light-state" :class="{ connected: isConnected }"></view>
				</view>

				<text class="text_input">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp{{input_text_title+'\n'}} {{input_text}}</text>

				<view class="state-box_bg">
				</view>

			</view>
			<view class="bluetooth-set">
				<view class="connect"
					@click="!isConnected&connect(deviceId,'noauto'), isConnected&disconnect(deviceId)">
					<view class="bluetooth" :class="{closeBg: isDisconnected, connectedBg: isConnected}">
						<image :src="svg" mode=""></image>
					</view>
					<view class="connect_text">
						{{bluetoothStr}}
					</view>
				</view>



				<view class="connect_bg">

				</view>


				<view class="bluetooth-set_bg">

				</view>
			</view>
			<!-- <button @click="notify">5 开启消息监听</button>
			
			<button @click="send">6 发送数据</button>
			
			<button @click="read">7 读取数据</button> -->

			<!-- <view class="msg_x">
				<view class="msg_txt">
					监听到的内容：{{ message }}
				</view>
				<view class="msg_hex">
					监听到的内容（十六进制）：{{ messageHex }}
				</view>
			</view> -->

			<view class="key-box">
				<!-- <image src="../../static/Key.svg" mode="" @click="commandCTL(1)" class="leftKey"></image>
				<image src="../../static/rightKey.svg" mode="" @click="commandCTL(2)" class="rightKey"></image>
				<image src="../../static/forwardKey.svg" mode="" @click="commandCTL(3)" class="forwardKey"></image>
				<image src="../../static/backKey.svg" mode="" @click="commandCTL(4)" class="backKey"></image> -->
				<view class="LeftKey" @touchend="stopAct('stop')"
					:class="{ shrink1: isActive_left&!isActive_adapLeft, adapShrink1: isActive_left&isActive_adapLeft, adapLeftKey: isActive_adapLeft }"
					@touchstart="commandCTL('left'),handleAnimation(1)">
					<view class="key left"></view>
					<view class="triangle"></view>
				</view>

				<view class="RightKey" @touchend="stopAct('stop')"
					:class="{ shrink2: isActive_right,  adapShrink2: isActive_right&isActive_adapRight, adapRightKey: isActive_adapRight }"
					@touchstart="commandCTL('right'),handleAnimation(2)">
					<view class="key right"></view>
					<view class="triangle"></view>
				</view>

				<view class="ForwardKey" @touchend="stopAct('stop')"
					:class="{ shrink3: isActive_forward,  adapShrink3: isActive_forward&isActive_adapForward, adapForwardKey: isActive_adapForward }"
					@touchstart="commandCTL('forward'),handleAnimation(3)">
					<view class="key forward"></view>
					<view class="triangle"></view>
				</view>

				<view class="BackKey" @touchend="stopAct('stop')"
					:class="{ shrink4: isActive_back,  adapShrink4: isActive_back&isActive_adapBack, adapBackKey: isActive_adapBack }"
					@touchstart="commandCTL('back'),handleAnimation(4)">
					<view class="key back"></view>
					<view class="triangle"></view>
				</view>


				<view class="Speed-Container" :class="{adapSpeedContainer: isActive_adapSpeed}">
					<view style="height: 80px;display: flex;align-items: center;">
						<scroll-view scroll-y="true" class="Speed-Box" :scroll-into-view="rightIndex"
							scroll-with-animation="true">
							<view @touchmove.stop.prevent="banTouch" class="Speed-item" id="right1">低速</view>
							<view @touchmove.stop.prevent="banTouch" class="Speed-item" id="right2">中速</view>
							<view @touchmove.stop.prevent="banTouch" class="Speed-item" id="right3">高速</view>
							<view @touchmove.stop.prevent="banTouch" class="Speed-item" id="right4">极速</view>
						</scroll-view>
					</view>
					<view class="select-speed-box">
						<image src="../../static/uparrow.svg" mode="" class="arrow-up" :class="{upShrink: isActive_Up}"
							@tap="scroll('+')" :disabled="isButtonDisabled"></image>
						<image src="../../static/uparrow.svg" mode="" class="arrow-down"
							:class="{downShrink: isActive_Down}" @tap="scroll('-')"></image>
					</view>
				</view>

				<view v-show="false" class="stopButton" @click="stopAct(' ')"
					:class="{ stopShrink: isActive_stop,  adapStopShrink: isActive_stop&isActive_adapStop,  adapStopKey: isActive_adapStop }">
					急停
				</view>

				<view class="backGround3">

				</view>
			</view>

		</view>
		<view class="avoidObstacle" :class="{avoidObstacleOption: isActive_Option }" @click="handleAvoidObstacle"
			@longpress="handleOption">
			<view v-show="!isActive_Option" class="avoidObstacle_imgbox"
				:class="{obstalcleCmdSend: avoidObstacleCmdSend}">
				<image :src="obstacleSvg" mode=""></image>
			</view>


			<view v-show="!isActive_Option" class="obstacle_text">
				{{avoidObstacleStr}}
			</view>




			<view class="avoidObstacleDirection" v-show="isActive_Option">
				<view class="obstacle_left" @click="handleDirection('left','50')">左转</view>
				<view class="obstacle_auto" @click="handleDirection('auto','50')">自动</view>
				<view class="obstacle_right" @click="handleDirection('right','50')">右转</view>
				<view class="backdrop"
					:class="{selected_left: isActive_ObstacleLeft, selected_auto: isActive_ObstacleAuto, selected_right: isActive_ObstacleRight}">
				</view>
			</view>


			<view class="progress-box" v-show="isActive_Option">
				<text class="progress_title">避障精度：cm</text>
				<slider step="2" @change="sliderChange" :value="currentVal" show-value="true" min="0" max="50"
					block-size="8" class="slider" />
			</view>

		</view>

		<view class="avoidObstacle_bg" :class="{avoidObstacleOption_bg: isActive_Option}">

		</view>




	</view>
</template>

<script setup>
	import {
		ref,
		onMounted,
		getCurrentInstance,
		onBeforeUpdate
	} from 'vue'

	let {
		ctx: that,
		proxy
	} = getCurrentInstance();
	let currentVal = ref(50);

	let input_text_title = ref('遥控模式');
	let input_text = ref('输入指令：当前未有输入！');


	let distStr = '50';
	
	const sliderChange = (e) => {
		distStr = String(e.detail.value);

		if (Direct == 'left') {
			handleDirection('left', distStr);
			// sendData.value = `@Left ${distStr}\r\n`;
			// send();

			// setTimeout(() => {
			// 	sendData.value = `@Left ${distStr}\r\n`;
			// 	send();
			// }, 750)
		} else if (Direct == 'right') {
			handleDirection('right', distStr);
			// sendData.value = `@Right ${distStr}\r\n`;
			// send();

			// setTimeout(() => {
			// 	sendData.value = `@Right ${distStr}\r\n`;
			// 	send();
			// }, 750)
		} else if (Direct == 'auto') {
			handleDirection('auto', distStr);
			// sendData.value = `@Obstacle ${distStr}\r\n`;
			// send();

			// setTimeout(() => {
			// 	sendData.value = `@Obstacle ${distStr}\r\n`;
			// 	send();
			// }, 750)
		}
		
	}

	const isActive_ObstacleLeft = ref(false);
	const isActive_ObstacleAuto = ref(false);
	const isActive_ObstacleRight = ref(false);

	let avoidDirection = ref(`@Obstacle ${distStr}\r\n`);
	let Direct = 'auto';

	const handleDirection = (direct, str) => {
		Direct = direct;
		// console.log(Direct);
		if (direct == 'left') {
			currentVal.value = parseInt(str);
			isActive_ObstacleLeft.value = true;
			isActive_ObstacleAuto.value = false;
			isActive_ObstacleRight.value = false;
			avoidDirection = ref(`@Left ${str}\r\n`);
			console.log(avoidDirection.value);
			input_text.value = `避障精度：${str}cm`;
			that.$forceUpdate();
			sendData.value = avoidDirection.value;
			send();
			
		}
		if (direct == 'auto') {
			currentVal.value = parseInt(str);
			isActive_ObstacleAuto.value = true;
			isActive_ObstacleLeft.value = false;
			isActive_ObstacleRight.value = false;
			avoidDirection = ref(`@Obstacle ${str}\r\n`);
			console.log(avoidDirection.value);
			input_text.value = `避障精度：${str}cm`;
			that.$forceUpdate();
			sendData.value = avoidDirection.value;
			send();
			
		}
		if (direct == 'right') {
			
			currentVal.value = parseInt(str);
			isActive_ObstacleRight.value = true;
			isActive_ObstacleLeft.value = false;
			isActive_ObstacleAuto.value = false;
			avoidDirection = ref(`@Right ${str}\r\n`);
			console.log(avoidDirection.value);
			input_text.value = `避障精度：${str}cm`;
			that.$forceUpdate();
			sendData.value = avoidDirection.value;
			send();
			
		}
		// input_text.value = `避障精度：${distStr}cm`;
		// that.$forceUpdate();
		setTimeout(() => {
			sendData.value = avoidDirection.value;
			send();
		}, 2000)
	}


	let avoidObstcleSvg = '/static/avoidObstacle.svg';
	let inactiveObstacle = '/static/inactiveObstacle.svg';
	let obstacleSvg = avoidObstcleSvg;
	const avoidObstacleCmdSend = ref(false);
	const isOpenAvoidObstacleMode = ref(false);
	const avoidObstacleStr = ref('开启障碍模式');
	const isOpenAvoidObstacle = ref(false);

	const handleAvoidObstacle = () => {
		if (!isActive_Option.value) {
			if (!isOpenAvoidObstacle.value) {
				input_text_title.value = '避障模式';
				input_text.value = `避障精度：${distStr}cm`;
				obstacleSvg = inactiveObstacle;
				avoidObstacleCmdSend.value = true;
				isOpenAvoidObstacle.value = true;
				avoidObstacleStr.value = '关闭障碍模式';
				that.$forceUpdate();
			} else {
				input_text_title.value = '遥控模式';
				input_text.value = `输入指令：当前未有输入！`;
				obstacleSvg = avoidObstcleSvg;
				avoidObstacleCmdSend.value = false;
				isOpenAvoidObstacle.value = false;
				avoidObstacleStr.value = '开启障碍模式';
				that.$forceUpdate();

			}


			isOpenAvoidObstacleMode.value = true;
			const avoidObstacle = ref(`@Obstacle ${distStr}\r\n`);
			currentVal.value = 50;
			sendData.value = avoidObstacle.value;
			send();
			notify();
			console.log('bi')
		}
	}

	const isActive_Option = ref(false);
	const handleOption = () => {
		if (isOpenAvoidObstacleMode.value) {
			isActive_Option.value = true;
			console.log('1' + isActive_Option.value)
		}
	}

	const handleBlur = () => {
		console.log('blur');
		isActive_Option.value = false;
		console.log('2' + isActive_Option.value);
	}

	const bluetoothStr = ref('连接蓝牙');
	let bluetoothSvg = '/static/bluetooth.svg';
	let closeBluetoothSvg = '/static/closeBluetooth.svg';
	let svg = '';


	const isActive_adapLeft = ref(false);
	const isActive_adapRight = ref(false);
	const isActive_adapForward = ref(false);
	const isActive_adapBack = ref(false);
	const isActive_adapStop = ref(false);
	const isActive_adapSpeed = ref(false);

	const deviceId = ref('60:E8:5B:6C:64:9F') //低功耗蓝牙设备的ID
	onMounted(() => {
		let platform = uni.getSystemInfoSync().platform;
		if (platform == 'ios') {
			console.log('ios')
			isActive_adapLeft.value = false;
			isActive_adapRight.value = false;
			isActive_adapForward.value = false;
			isActive_adapBack.value = false;
			isActive_adapStop.value = false;
			isActive_adapSpeed.value = false;
		} else if (platform == 'android') {
			console.log('android')
			isActive_adapLeft.value = true;
			isActive_adapRight.value = true;
			isActive_adapForward.value = true;
			isActive_adapBack.value = true;
			isActive_adapStop.value = true;
			isActive_adapSpeed.value = true;
		}

		
		

		initBlue()
		connect(deviceId, 'auto')
		sendData.value = '@50\r\n';
		send();

		handleDirection('auto');

	})

	const banTouch = () => {
		return false;
	}


	let stopCmd = ref('@stop\r\n');
	const isActive_stop = ref(false)

	const stopAct = (data) => {


		if (!isActive_Option.value && !isOpenAvoidObstacle.value) {
			input_text.value = '输入指令：当前未有输入！';
			sendData.value = stopCmd.value;
			console.log(1 + sendData.value);
			if (data == 'stop') {
				setTimeout(() => {
					send();
				}, 250)
			} else if (data == ' ') {
				isActive_stop.value = true;

				forwardKey.value = false;
				backKey.value = false;
				send();
				let timer1 = setTimeout(() => {
					clearTimeout(timer1);
					isActive_stop.value = false;
				}, 150)
			}
		}

	}

	const rightIndex = ref(`right${0}`);
	let index = ref(0);
	const isButtonDisabled = ref(false);
	let Speed1 = ref('@forward speed1\r\n');
	let Speed2 = ref('@back speed1\r\n');
	const forwardKey = ref(false);
	const backKey = ref(false);

	const isActive_Up = ref(false);
	const isActive_Down = ref(false);

	function scroll(data) {
		if (!isActive_Option.value) {
			if (isButtonDisabled.value) {
				return;
			}
			isButtonDisabled.value = true;
			if (data == '+') {
				isActive_Up.value = true;
				if (index.value < 4) {
					index.value += 1;
				}
			} else if (data == '-') {
				isActive_Down.value = true;
				if (index.value > 1) {
					index.value -= 1;
				}
			}
			switch (index.value) {
				case 1:
					Speed1.value = '@forward speed1\r\n';
					Speed2.value = '@back speed1\r\n'
					break;
				case 2:
					Speed1.value = '@forward speed2\r\n';
					Speed2.value = '@back speed2\r\n'
					break;
				case 3:
					Speed1.value = '@forward speed3\r\n';
					Speed2.value = '@back speed3\r\n'
					break;
				case 4:
					Speed1.value = '@forward speed4\r\n';
					Speed2.value = '@back speed4\r\n'
					break;
				default:
					break;
			}
			console.log('1', forwardKey.value);
			console.log('2', backKey.value);
			if (forwardKey.value == true) {
				sendData.value = Speed1.value;

			} else if (backKey.value == true) {
				console.log(backKey.value);
				sendData.value = Speed2.value;
			}

			console.log(index.value)
			if (index.value >= 1 && index.value <= 4) {

				rightIndex.value = `right${index.value}`;
			}

			setTimeout(() => {
				isButtonDisabled.value = false;
			}, 500)

			let timer1 = setTimeout(() => {
				clearTimeout(timer1);
				isActive_Up.value = false;
				isActive_Down.value = false;
			}, 250)
		}

	}

	const isActive_left = ref(false)
	const isActive_right = ref(false)
	const isActive_forward = ref(false)
	const isActive_back = ref(false)

	function handleAnimation(num) {
		if (!isActive_Option.value) {
			if (num == 1) {
				isActive_left.value = true;
				let timer1 = setTimeout(() => {
					clearTimeout(timer1);
					isActive_left.value = false;
				}, 250)
			} else if (num == 2) {
				isActive_right.value = true;
				let timer1 = setTimeout(() => {
					clearTimeout(timer1);
					isActive_right.value = false;
				}, 250)
			} else if (num == 3) {
				isActive_forward.value = true;
				let timer1 = setTimeout(() => {
					clearTimeout(timer1);
					isActive_forward.value = false;
				}, 250)
			} else if (num == 4) {
				isActive_back.value = true;
				let timer1 = setTimeout(() => {
					clearTimeout(timer1);
					isActive_back.value = false;
				}, 250)
			}
		}

	}

	let sendData = ref('');
	let direction_left = ref('@left\r\n');
	let direction_right = ref('@right\r\n');

	function commandCTL(SelectStr) {

		//如果打开避障参数设置，将禁止使用遥控模式
		if (!isActive_Option.value && !isOpenAvoidObstacle.value) {
			//从避障模式切换到遥控模式
			// obstacleSvg = avoidObstcleSvg;
			// avoidObstacleCmdSend.value = false;
			isOpenAvoidObstacleMode.value = false;

			let Index = 0;
			if (SelectStr == 'left') {
				 input_text.value = '输入指令：当前输入为left～';
				Index = 1;
			} else if (SelectStr == 'right') {
				input_text.value = '输入指令：当前输入为right～';
				Index = 2;
			} else if (SelectStr == 'forward') {
				input_text.value = '输入指令：当前输入为forward～';
				Index = 3;
			} else if (SelectStr == 'back') {
				input_text.value = '输入指令：当前输入为back～';
				Index = 4;
			}

			console.log(Index);

			switch (Index) {
				case 1:
					sendData.value = direction_left.value;
					break;
				case 2:
					sendData.value = direction_right.value;
					break;
				case 3:
					sendData.value = Speed1.value;
					forwardKey.value = true;
					backKey.value = false;
					break;
				case 4:
					sendData.value = Speed2.value;
					backKey.value = true;
					forwardKey.value = false;
					break;
				default:
					break;
			}
			console.log(sendData.value);
			send();
		}
	}

	//【1】初始化蓝牙
	function initBlue() {
		console.log('initblue')
		uni.openBluetoothAdapter({
			success(res) {
				console.log('初始化蓝牙成功')
				console.log(res)
			},
			fail(err) {
				console.log('初始化蓝牙失败')
				setTimeout(() => {
					uni.showToast({
						title: '初始化蓝牙失败',
						icon: 'error'
					})

				}, 500)
				setTimeout(() => {
					uni.showToast({
						title: '检查蓝牙打开没',
						icon: ' error'
					})
				}, 1000)
				console.error(err)
			}
		})
	}

	const isConnected = ref(false);

	//4连接设备
	function connect(data, way) {
		if (!isActive_Option.value) {
			if (way == 'auto') {
				deviceId.value = data.value;
			} else if (way == 'noauto') {
				deviceId.value = data;
			}

			uni.createBLEConnection({
				deviceId: deviceId.value,
				timeout: 1000,
				success(res) {
					isConnected.value = true;
					isDisconnected.value = false;
					console.log('连接成功')
					
					isActive_Option.value = false;
					input_text.value = '输入指令：当前未有输入！';

					setTimeout(() => {
						sendData.value = '@reset\r\n';
						send();
						console.log(sendData.value);
					}, 1000)
					// setTimeout(() => {
					// 	sendData.value = '@reset\r\n';
					// 	send();
					// 	console.log(sendData.value);
					// }, 2000)

					console.log(res)
					bluetoothStr.value = '断开蓝牙';
					svg = bluetoothSvg;
					// 停止搜索
					// stopDiscovery()
					uni.showToast({
						title: '连接成功'
					})
				},
				fail(err) {
					// if(err.errMsg == 'createBLEConnection:fail already connect' && !isConnected.value)
					// {
					// 	console.log(isConnected.value);
					// 	console.log('已有蓝牙连接')
					// 	setTimeout(()=>{
					// 		uni.showToast({
					// 			title: '已有蓝牙连接!',
					// 			icon: 'error'
					// 		})
					// 	},500)
					// }

					if (err.errMsg == 'createBLEConnection:fail operate time out') {
						console.log('连接超时')
						input_text.value = '输入指令：当前未有输入！';
						svg = closeBluetoothSvg;
						uni.showToast({
							title: '连接超时',
							icon: 'error'
						})
						isDisconnected.value = true;
						svg = closeBluetoothSvg;
						setTimeout(() => {
							uni.showToast({
								title: '请检查设备蓝牙',
								icon: 'error'
							})
						}, 1000)
					} else {
						
						console.log('连接失败')
						console.error(err)
						uni.showToast({
							title: '连接失败',
							icon: 'error'
						})
					}


				}
			})
		}
	}

	//5断开连接设备
	const isDisconnected = ref(false);

	const disconnect = (data) => {

		if (!isActive_Option.value) {
			sendData.value = '@reset\r\n';
			send();
			deviceId.value = data;

			uni.closeBLEConnection({
				deviceId: deviceId.value,
				success(res) {
					if (!isDisconnected.value) {
						console.log('断开连接成功')
						console.log(res)
						bluetoothStr.value = '连接蓝牙';

						obstacleSvg = avoidObstcleSvg;
						avoidObstacleCmdSend.value = false;
						isOpenAvoidObstacle.value = false;
						avoidObstacleStr.value = '开启障碍模式';
						that.$forceUpdate();



						uni.showToast({
							title: '断开连接成功',
							icon: 'success'
						})
						setTimeout(() => {
							isConnected.value = false;
						}, 100)
						svg = closeBluetoothSvg;
						isDisconnected.value = true;
					}
				},
				fail(err) {
					console.log('断开连接失败')
					console.log(err)
					uni.showToast({
						title: '断开连接失败',
						icon: 'fail'
					})
				}
			})
		}
	}


	// 监听设备连接状态
	uni.onBLEConnectionStateChange(function(res) {
		
		// 该方法回调中可以用于处理连接意外断开等异常情况
		console.log(`device ${res.deviceId} state has changed, connected: ${res.connected}`)
		if (!res.connected) {
			isConnected.value = false;
			isDisconnected.value = true;
			isActive_Option.value = false;
			isOpenAvoidObstacleMode.value = false;
			svg = closeBluetoothSvg;
			bluetoothStr.value = '连接蓝牙';
			setTimeout(() => {
				obstacleSvg = avoidObstcleSvg;
				avoidObstacleCmdSend.value = false;
				isOpenAvoidObstacle.value = false;
				avoidObstacleStr.value = '开启障碍模式';
				that.$forceUpdate();
			}, 100)
			// connect(deviceId);在蓝牙断开后自动尝试重连
			setTimeout(() => {
				uni.showToast({
					title: '蓝牙连接已断开',
					icon: 'error'
				})
			}, 500)

		}
	})


	// 【6】获取服务
	function getServices() {
		// 如果是自动链接的话，uni.getBLEDeviceServices方法建议使用setTimeout延迟1秒后再执行
		uni.getBLEDeviceServices({
			deviceId: deviceId.value,
			success(res) {
				console.log(res) // 可以在res里判断有没有硬件佬给你的服务
				uni.showToast({
					title: '获取服务成功'
				})
			},
			fail(err) {
				console.error(err)
				uni.showToast({
					title: '获取服务失败',
					icon: 'error'
				})
			}
		})
	}

	// 硬件提供的服务id，开发中需要问硬件佬获取该id
	const serviceId = ref('0000FFE0-0000-1000-8000-00805F9B34FB')


	const characteristicId = ref('0000FFE1-0000-1000-8000-00805F9B34FB')

	// 【8】开启消息监听
	const notify = () => {
		uni.notifyBLECharacteristicValueChange({
			deviceId: deviceId.value, // 设备id
			serviceId: serviceId.value, // 监听指定的服务
			characteristicId: characteristicId.value, // 监听对应的特征值

			success(res) {
				console.log('notify' + res)
				listenValueChange()
				// uni.showToast({
				// 	title: '已开启监听'
				// })
			},
			fail(err) {
				console.error(err)
				uni.showToast({
					title: '监听失败',
					icon: 'error'
				})
			}
		})
	}

	// ArrayBuffer转16进度字符串示例
	function ab2hex(buffer) {
		const hexArr = Array.prototype.map.call(
			new Uint8Array(buffer),
			function(bit) {
				return ('00' + bit.toString(16)).slice(-2)
			}
		)
		return hexArr.join('')
	}

	// 将16进制的内容转成我们看得懂的字符串内容
	function hexCharCodeToStr(hexCharCodeStr) {
		var trimedStr = hexCharCodeStr.trim();
		var rawStr = trimedStr.substr(0, 2).toLowerCase() === "0x" ? trimedStr.substr(2) : trimedStr;
		var len = rawStr.length;
		if (len % 2 !== 0) {
			alert("存在非法字符!");
			return "";
		}
		var curCharCode;
		var resultStr = [];
		for (var i = 0; i < len; i = i + 2) {
			curCharCode = parseInt(rawStr.substr(i, 2), 16);
			resultStr.push(String.fromCharCode(curCharCode));
		}
		return resultStr.join("");
	}

	// 监听到的内容
	const message = ref('')
	const messageHex = ref('') // 十六进制

	// 【9】监听消息变化
	const listenValueChange = () => {
		uni.onBLECharacteristicValueChange(res => {
			// console.log(res)
			let resHex = ab2hex(res.value)
			messageHex.value = resHex
			let result = hexCharCodeToStr(resHex)
			message.value = String(result)

			//给slider的value赋值
			currentVal.value = parseInt(message.value);



		})
	}

	// 【10】发送数据
	function send() {
		// 向蓝牙设备发送一个0x00的16进制数据
		let msg = sendData.value
		console.log(msg);

		const buffer = new ArrayBuffer(msg.length)
		const dataView = new DataView(buffer)
		// dataView.setUint8(0, 0)

		for (var i = 0; i < msg.length; i++) {
			dataView.setUint8(i, msg.charAt(i).charCodeAt())
		}

		uni.writeBLECharacteristicValue({
			deviceId: deviceId.value,
			serviceId: serviceId.value,
			characteristicId: characteristicId.value,
			value: buffer,
			success(res) {
				console.log('writeBLECharacteristicValue success', res.errMsg)

				// if (msg == '@Obstacle\r\n') {
				// 	obstacleSvg = inactiveObstacle;
				// 	avoidObstacleCmdSend.value = true;
				// 	that.$forceUpdate();
				// }

				// uni.showToast({
				// 	title: 'write指令发送成功'
				// })
			},
			fail(err) {
				console.error(err)

				// if (msg == '@Obstacle\r\n') {
				// 	obstacleSvg = avoidObstcle;
				// 	avoidObstacleCmdSend.value = false;
				// 	that.$forceUpdate();
				// 	uni.showToast({
				// 		title: '请先连接蓝牙',
				// 		icon: 'fail'
				// 	})
				// }
				// uni.showToast({
				// 	title: 'write指令发送失败',
				// 	icon: 'error'
				// })
			}
		})
	}

	// 【11】读取数据
	function read() {
		uni.readBLECharacteristicValue({
			deviceId: deviceId.value,
			serviceId: serviceId.value,
			characteristicId: characteristicId.value,
			success(res) {
				console.log(res)
				uni.showToast({
					title: 'read指令发送成功'
				})
			},
			fail(err) {
				console.error(err)
				uni.showToast({
					title: 'read指令发送失败',
					icon: 'error'
				})
			}
		})
	}
</script>

<style>
	.body {}

	.container {
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: space-around;
		flex-direction: column;
		/* border: 1px solid firebrick; */
		filter: blur(0px);
		transition: filter 0.3s;
	}

	.maskLayer {
		filter: blur(7px) brightness(90%);
		transition: filter 0.3s;
		/* pointer-events: none; */
	}

	button {
		margin-bottom: 20rpx;
	}

	.key-box {
		width: 85vw;
		height: 25vh;
		margin-bottom: 0vh;
		/* border: 1px solid blue; */
		border-radius: 20px;

	}

	.LeftKey {
		width: 70px;
		height: 30px;
		/* border: 1px solid greenyellow; */
		display: flex;
		align-items: center;
		transform: translate(1.5rem, 6.5rem);
	}

	.adapLeftKey {
		transform: translate(1.5rem, 3rem);
	}

	.RightKey {
		width: 70px;
		height: 30px;
		/* border: 1px solid greenyellow; */
		display: flex;
		align-items: center;
		transform: translate(5rem, 4.7rem) rotate(180deg);
	}

	.adapRightKey {
		transform: translate(5rem, 1.3rem) rotate(180deg);
	}

	.ForwardKey {
		width: 70px;
		height: 30px;
		/* border: 1px solid greenyellow; */
		display: flex;
		align-items: center;
		transform: translate(3.2rem, 1rem) rotate(90deg);
	}

	.adapForwardKey {
		transform: translate(3.2rem, -2rem) rotate(90deg);
	}

	.BackKey {
		width: 70px;
		height: 30px;
		/* border: 1px solid greenyellow; */
		display: flex;
		align-items: center;
		transform: translate(3.2rem, 2.7rem) rotate(270deg);
	}

	.adapBackKey {
		transform: translate(3.2rem, -0.5rem) rotate(270deg);
	}

	.key {
		text-align: center;
		line-height: 25px;
		font-size: 12px;
		width: 40px;
		height: 25px;
		border: 1px solid gray;
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
	}

	.left {
		box-shadow: -5px 5px 10px rgba(0, 0, 0, 0.5);
	}

	.right {
		box-shadow: -5px -5px 10px rgba(0, 0, 0, 0.5);
	}

	.forward {
		box-shadow: -5px -5px 10px rgba(0, 0, 0, 0.5);
	}

	.back {
		box-shadow: -5px 5px 10px rgba(0, 0, 0, 0.5);
	}

	.triangle {

		width: 0px;
		height: 0px;
		border: 13px solid rgba(100, 100, 100, 1);
		border-right-color: transparent;
		border-bottom-color: transparent;
		border-top-color: transparent;
	}

	.shrink1 {
		transition: transform 0.25s ease;
		transform: translate(1.5rem, 6.5rem) scale(0.8);
	}

	.adapShrink1 {
		transition: transform 0.25s ease;
		transform: translate(1.5rem, 3rem) scale(0.8);
	}

	.shrink2 {
		transition: transform 0.25s ease;
		transform: translate(5rem, 4.7rem) rotate(180deg) scale(0.8);
	}

	.adapShrink2 {
		transition: transform 0.25s ease;
		transform: translate(5rem, 1.3rem) rotate(180deg) scale(0.8);
	}

	.shrink3 {
		transition: transform 0.25s ease;
		transform: translate(3.2rem, 1rem) rotate(90deg) scale(0.8);
	}

	.adapShrink3 {
		transition: transform 0.25s ease;
		transform: translate(3.2rem, -2rem) rotate(90deg) scale(0.8);
	}

	.shrink4 {
		transition: transform 0.25s ease;
		transform: translate(3.2rem, 2.7rem) rotate(270deg) scale(0.8);
	}

	.adapShrink4 {
		transition: transform 0.25s ease;
		transform: translate(3.2rem, -0.5rem) rotate(270deg) scale(0.8);
	}



	.msg_x {
		border: 2px solid seagreen;
		width: 98%;
		margin: 10rpx auto;
		box-sizing: border-box;
		padding: 20rpx;
	}

	.msg_x .msg_txt {
		margin-bottom: 20rpx;
	}

	.Speed-Container {
		display: flex;
		justify-content: space-around;

		width: 120px;
		height: 80px;
		float: right;
		transform: translate(0.6rem, -2.7rem);
	}

	.adapSpeedContainer {
		transform: translate(-0.5rem, -5.2rem);
	}

	.Speed-Box {
		touch-action: none;

		height: 35px;
		width: 60px;
		border: 2px solid dimgray;
		border-radius: 5px;
		text-align: center;
		padding: 1px;
		box-shadow: -5px 5px 10px rgba(0, 0, 0, 0.5);
	}

	.Speed-item {
		display: inline-block;
		line-height: 30px;
		height: 30px;
		width: 50px;
		border: 1px solid darkcyan;
		border-radius: 5px;
		box-shadow: -2px 0px 3px rgba(0, 0, 0, 0.5), 2px 0px 3px rgba(0, 0, 0, 0.5);
		color: rgba(0, 0, 0, 0.5);
	}

	.select-speed-box {
		display: inline-block;
		width: 32px;
		height: 80px;

	}

	image {
		width: 32px;
		height: 32px;
	}

	#right1 {
		background-color: aquamarine;
	}

	#right2 {
		background-color: aqua;
	}

	#right3 {
		background-color: yellow;
	}

	#right4 {
		background-color: orangered;
	}

	.arrow-up {
		margin-top: 0px;
	}

	.arrow-down {
		margin-top: 10px;
		transform: rotate(180deg);
	}

	.upShrink {
		transition: transform 0.25s ease;
		transform: scale(0.8);
	}

	.downShrink {
		transition: transform 0.25s ease;
		transform: rotate(180deg) scale(0.8);
	}

	.stopButton {
		width: 40px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		border: 1px solid greenyellow;
		border-radius: 30px;
		background-color: brown;
		color: white;
		transform: translate(10rem, 2rem);
		box-shadow: -5px 5px 10px rgba(0, 0, 0, 0.5);
	}

	.adapStopKey {
		transform: translate(10rem, 1rem);
	}

	.stopShrink {
		transition: transform 0.15s ease;
		transform: translate(10rem, 2rem) scale(0.8);
	}

	.adapStopShrink {
		transition: transform 0.15s ease;
		transform: translate(10rem, 1rem) scale(0.8);
	}

	.state-box {
		width: 85vw;
		height: 25vh;
		margin-top: 4vh;
		border-radius: 20px;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: space-evenly;
		/* border: 2px solid blue; */
	}

	.text_input {
		
		z-index: 1;
		width: 80vw;
		height: 15vh;
		/* border: 1px solid black; */
		border-radius: 15px;
		/* margin-top: 10px; */
		margin-top: 6vh;
		background-color: rgba(250, 250, 250, 1);
		box-sizing: border-box;
		padding: 10px;
		color: rgba(0, 0, 0, 0.5);
		box-shadow: -6px 6px 15px rgba(0, 0, 0, 0.3), 6px -6px 15px rgba(0, 0, 0, 0.3);
		
	}

	.state-box_bg {
		z-index: -1;
		position: absolute;
		top: 0px;
		width: 85vw;
		height: 25vh;
		margin-top: 7vh;
		border-radius: 20px;
		background-color: coral;
		filter: blur(1px);
		border: 5px solid lightskyblue;
	}

	.bluetooth-state {
		position: absolute;
		top: 9vh;
		left: 10vw;
		/* margin-left: 10px; */
		width: 110px;
		height: 30px;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		border-radius: 30px;
		background-color: rgba(255, 255, 255, 0.25);
		/* border: 1px solid royalblue; */
	}

	.text-state {
		font-weight: 1000;
		width: 4.6rem;
		height: 30px;
		line-height: 30px;
		text-align: center;
		padding: 0;
		/* border: 1px solid greenyellow; */
	}

	.light-state {
		width: 10px;
		height: 10px;
		border: 1px solid darkgray;
		background-color: red;
		border-radius: 10px;
	}

	.connected {
		background-color: lawngreen;
	}

	.bluetooth-set {
		width: 80vw;
		height: 20vh;
		margin-top: -2vh;

		border-radius: 20px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.bluetooth-set_bg {
		margin-top: -2vh;
		z-index: -1;
		position: absolute;
		width: 80vw;
		height: 20vh;
		border: 1px solid firebrick;
		border-radius: 20px;
		background-color: lightsalmon;
		filter: blur(1px);

	}

	.connect {
		z-index: 1;
		width: 6.1rem;
		height: 6.1rem;
		margin-left: 2rem;
		line-height: 100px;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: space-evenly;
		/* border: 1px solid greenyellow; */
		border-radius: 15px;
		background-color: rgba(255, 255, 255, 0.25);
		transform: translate(0rem, -1rem);
		box-shadow: -7px 7px 15px rgba(0, 0, 0, 0.5), 7px 0px 15px rgba(0, 0, 0, 0.5);
	}

	.bluetooth {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 50px;
		height: 50px;
		border-radius: 50px;
		background-color: rgba(255, 255, 255, 1);
		border: 1px solid rgba(0, 0, 0, 0.2);
	}

	.closeBg {
		background-color: white;
	}

	.connectedBg {
		background-color: rgba(0, 0, 180, 0.8);
	}

	.connect_text {
		width: 80px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		/* border: 1px solid rgba(100, 100, 100, 1); */
	}

	.connect_bg {
		z-index: 0;
		width: 6.1rem;
		height: 6.1rem;
		border-radius: 15px;
		background-color: bisque;
		position: absolute;
		transform: translate(2.0rem, -1rem);
	}

	.avoidObstacle {
		/* box-sizing: border-box; */
		position: absolute;
		top: 17.6rem;
		left: 13.1rem;
		z-index: 1;
		width: 6.1rem;
		height: 6.1rem;
		line-height: 6.1rem;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		flex-direction: column;
		text-align: center;
		/* border: 1px solid greenyellow; */
		border-radius: 15px;
		background-color: rgba(255, 255, 255, 0.25);
		box-shadow: -7px 7px 15px rgba(0, 0, 0, 0.5), 7px 0px 15px rgba(0, 0, 0, 0.5);
		transform: translate(0rem, 0rem) scale(1, 1);
		transition: transform 0.3s, color 0.3s;
	}

	/* 	.avoidObstacle:active{
		background-color: rgba(180, 180, 180, 0.8);
	} */
	.avoidObstacle_imgbox {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 50px;
		height: 50px;
		border-radius: 50px;
		background-color: rgba(255, 255, 255, 1);
		border: 1px solid rgba(0, 0, 0, 0.2);
	}

	.obstalcleCmdSend {
		background-color: rgba(0, 220, 0, 0.5);
	}

	.obstacle_text {
		opacity: 1;
		width: 100px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		font-size: 0.9rem;
	}

	.avoidObstacleOption {
		background-color: rgba(255, 255, 255, 0.5);
		transform: translate(-4rem, -2rem) scale(1.8, 1.8);
		transition: transform 0.3s, color 0.3s;
	}

	.avoidObstacle_bg {
		/* box-sizing: border-box; */
		position: absolute;
		top: 17.6rem;
		left: 9.0rem;
		z-index: 0;
		width: 6.1rem;
		height: 6.1rem;
		border-radius: 15px;
		background-color: bisque;

		position: absolute;
		transform: translate(4.1rem, 0rem) scale(1, 1);
		transition: transform 0.3s, color 0.3s;
	}

	.avoidObstacleOption_bg {
		background-color: rgba(255, 230, 200, 0.75);
		transform: translate(0.1rem, -2rem) scale(1.8, 1.8);
		transition: transform 0.3s, color 0.3s;
	}

	.backGround3 {
		position: relative;
		z-index: -1;
		width: 85vw;
		height: 25vh;
		margin-bottom: 5vh;
		border: 1px solid skyblue;
		border-radius: 20px;
		background-color: navajowhite;
		filter: blur(1px);
		transform: translate(0px, -150px);
	}

	.progress-box {
		width: 5.8rem;
		height: 3rem;
		border: 0.5px solid gray;
		border-radius: 12px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: column;
		box-shadow: 0px 3px 2px rgba(100, 100, 100, 0.5);
	}

	.progress_title {
		width: 6rem;
		height: 0.8rem;
		line-height: 0.8rem;
		/* border: 1px solid yellow; */
		font-size: 0.4rem;
		text-align: left;
		margin-top: 0.05rem;
		padding-left: 0.45rem;
		padding-top: 0.15rem;
		box-sizing: border-box;
	}

	.slider {
		width: 5.0rem;
		height: 0.7rem;
		line-height: 0.7rem;
		/* 		border: 1px solid red; */
		margin-top: -0.15rem;
	}

	.avoidObstacleDirection {
		width: 5rem;
		height: 1.5rem;
		line-height: 1.5rem;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		flex-direction: row;
		border: 1px solid gray;
		border-radius: 1rem;
		font-size: 0.4rem;
		background-color: rgba(255, 255, 255, 0.5);
	}

	.obstacle_left {
		margin-left: 0.4rem;
		width: 1.8rem;
		height: 1.4rem;
		line-height: 1.4rem;
	}

	.obstacle_auto {
		width: 1.8rem;
		height: 1.4rem;
		line-height: 1.4rem;
	}

	.obstacle_right {
		width: 1.8rem;
		height: 1.4rem;
		line-height: 1.4rem;
		margin-right: 0.4rem;
	}

	.backdrop {
		width: 1.95rem;
		height: 1.3rem;
		position: absolute;
		top: 0.65rem;
		border-radius: 0.7rem;
		background-color: rgba(200, 200, 200, 0.5);
	}

	.selected_left {
		transform: translate(-1.4rem, 0rem);
		transition: transform 0.4s;
	}

	.selected_auto {
		transform: translate(0rem, 0rem);
		transition: transform 0.4s;
	}

	.selected_right {
		transform: translate(1.4rem, 0rem);
		transition: transform 0.4s;
	}
</style>