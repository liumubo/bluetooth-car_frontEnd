if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const ON_SHOW = "onShow";
  const ON_HIDE = "onHide";
  const ON_LAUNCH = "onLaunch";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onShow = /* @__PURE__ */ createHook(ON_SHOW);
  const onHide = /* @__PURE__ */ createHook(ON_HIDE);
  const onLaunch = /* @__PURE__ */ createHook(ON_LAUNCH);
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$1 = {
    __name: "index",
    setup(__props) {
      let {
        ctx: that,
        proxy
      } = vue.getCurrentInstance();
      let currentVal = vue.ref(50);
      let input_text_title = vue.ref("遥控模式");
      let input_text = vue.ref("输入指令：当前未有输入！");
      let distStr = "50";
      const sliderChange = (e) => {
        distStr = String(e.detail.value);
        if (Direct == "left") {
          handleDirection("left", distStr);
        } else if (Direct == "right") {
          handleDirection("right", distStr);
        } else if (Direct == "auto") {
          handleDirection("auto", distStr);
        }
      };
      const isActive_ObstacleLeft = vue.ref(false);
      const isActive_ObstacleAuto = vue.ref(false);
      const isActive_ObstacleRight = vue.ref(false);
      let avoidDirection = vue.ref(`@Obstacle ${distStr}\r
`);
      let Direct = "auto";
      const handleDirection = (direct, str) => {
        Direct = direct;
        if (direct == "left") {
          currentVal.value = parseInt(str);
          isActive_ObstacleLeft.value = true;
          isActive_ObstacleAuto.value = false;
          isActive_ObstacleRight.value = false;
          avoidDirection = vue.ref(`@Left ${str}\r
`);
          formatAppLog("log", "at pages/index/index.vue:229", avoidDirection.value);
          input_text.value = `避障精度：${str}cm`;
          that.$forceUpdate();
          sendData.value = avoidDirection.value;
          send();
        }
        if (direct == "auto") {
          currentVal.value = parseInt(str);
          isActive_ObstacleAuto.value = true;
          isActive_ObstacleLeft.value = false;
          isActive_ObstacleRight.value = false;
          avoidDirection = vue.ref(`@Obstacle ${str}\r
`);
          formatAppLog("log", "at pages/index/index.vue:242", avoidDirection.value);
          input_text.value = `避障精度：${str}cm`;
          that.$forceUpdate();
          sendData.value = avoidDirection.value;
          send();
        }
        if (direct == "right") {
          currentVal.value = parseInt(str);
          isActive_ObstacleRight.value = true;
          isActive_ObstacleLeft.value = false;
          isActive_ObstacleAuto.value = false;
          avoidDirection = vue.ref(`@Right ${str}\r
`);
          formatAppLog("log", "at pages/index/index.vue:256", avoidDirection.value);
          input_text.value = `避障精度：${str}cm`;
          that.$forceUpdate();
          sendData.value = avoidDirection.value;
          send();
        }
        setTimeout(() => {
          sendData.value = avoidDirection.value;
          send();
        }, 2e3);
      };
      let avoidObstcleSvg = "/static/avoidObstacle.svg";
      let inactiveObstacle = "/static/inactiveObstacle.svg";
      let obstacleSvg = avoidObstcleSvg;
      const avoidObstacleCmdSend = vue.ref(false);
      const isOpenAvoidObstacleMode = vue.ref(false);
      const avoidObstacleStr = vue.ref("开启障碍模式");
      const isOpenAvoidObstacle = vue.ref(false);
      const handleAvoidObstacle = () => {
        if (!isActive_Option.value) {
          if (!isOpenAvoidObstacle.value) {
            input_text_title.value = "避障模式";
            input_text.value = `避障精度：${distStr}cm`;
            obstacleSvg = inactiveObstacle;
            avoidObstacleCmdSend.value = true;
            isOpenAvoidObstacle.value = true;
            avoidObstacleStr.value = "关闭障碍模式";
            that.$forceUpdate();
          } else {
            input_text_title.value = "遥控模式";
            input_text.value = `输入指令：当前未有输入！`;
            obstacleSvg = avoidObstcleSvg;
            avoidObstacleCmdSend.value = false;
            isOpenAvoidObstacle.value = false;
            avoidObstacleStr.value = "开启障碍模式";
            that.$forceUpdate();
          }
          isOpenAvoidObstacleMode.value = true;
          const avoidObstacle = vue.ref(`@Obstacle ${distStr}\r
`);
          currentVal.value = 50;
          sendData.value = avoidObstacle.value;
          send();
          notify();
          formatAppLog("log", "at pages/index/index.vue:308", "bi");
        }
      };
      const isActive_Option = vue.ref(false);
      const handleOption = () => {
        if (isOpenAvoidObstacleMode.value) {
          isActive_Option.value = true;
          formatAppLog("log", "at pages/index/index.vue:316", "1" + isActive_Option.value);
        }
      };
      const handleBlur = () => {
        formatAppLog("log", "at pages/index/index.vue:321", "blur");
        isActive_Option.value = false;
        formatAppLog("log", "at pages/index/index.vue:323", "2" + isActive_Option.value);
      };
      const bluetoothStr = vue.ref("连接蓝牙");
      let bluetoothSvg = "/static/bluetooth.svg";
      let closeBluetoothSvg = "/static/closeBluetooth.svg";
      let svg = "";
      const isActive_adapLeft = vue.ref(false);
      const isActive_adapRight = vue.ref(false);
      const isActive_adapForward = vue.ref(false);
      const isActive_adapBack = vue.ref(false);
      const isActive_adapStop = vue.ref(false);
      const isActive_adapSpeed = vue.ref(false);
      const deviceId = vue.ref("60:E8:5B:6C:64:9F");
      vue.onMounted(() => {
        let platform = uni.getSystemInfoSync().platform;
        if (platform == "ios") {
          formatAppLog("log", "at pages/index/index.vue:343", "ios");
          isActive_adapLeft.value = false;
          isActive_adapRight.value = false;
          isActive_adapForward.value = false;
          isActive_adapBack.value = false;
          isActive_adapStop.value = false;
          isActive_adapSpeed.value = false;
        } else if (platform == "android") {
          formatAppLog("log", "at pages/index/index.vue:351", "android");
          isActive_adapLeft.value = true;
          isActive_adapRight.value = true;
          isActive_adapForward.value = true;
          isActive_adapBack.value = true;
          isActive_adapStop.value = true;
          isActive_adapSpeed.value = true;
        }
        initBlue();
        connect(deviceId, "auto");
        sendData.value = "@50\r\n";
        send();
        handleDirection("auto");
      });
      const banTouch = () => {
        return false;
      };
      let stopCmd = vue.ref("@stop\r\n");
      const isActive_stop = vue.ref(false);
      const stopAct = (data) => {
        if (!isActive_Option.value && !isOpenAvoidObstacle.value) {
          input_text.value = "输入指令：当前未有输入！";
          sendData.value = stopCmd.value;
          formatAppLog("log", "at pages/index/index.vue:386", 1 + sendData.value);
          if (data == "stop") {
            setTimeout(() => {
              send();
            }, 250);
          } else if (data == " ") {
            isActive_stop.value = true;
            forwardKey.value = false;
            backKey.value = false;
            send();
            let timer1 = setTimeout(() => {
              clearTimeout(timer1);
              isActive_stop.value = false;
            }, 150);
          }
        }
      };
      const rightIndex = vue.ref(`right${0}`);
      let index = vue.ref(0);
      const isButtonDisabled = vue.ref(false);
      let Speed1 = vue.ref("@forward speed1\r\n");
      let Speed2 = vue.ref("@back speed1\r\n");
      const forwardKey = vue.ref(false);
      const backKey = vue.ref(false);
      const isActive_Up = vue.ref(false);
      const isActive_Down = vue.ref(false);
      function scroll(data) {
        if (!isActive_Option.value) {
          if (isButtonDisabled.value) {
            return;
          }
          isButtonDisabled.value = true;
          if (data == "+") {
            isActive_Up.value = true;
            if (index.value < 4) {
              index.value += 1;
            }
          } else if (data == "-") {
            isActive_Down.value = true;
            if (index.value > 1) {
              index.value -= 1;
            }
          }
          switch (index.value) {
            case 1:
              Speed1.value = "@forward speed1\r\n";
              Speed2.value = "@back speed1\r\n";
              break;
            case 2:
              Speed1.value = "@forward speed2\r\n";
              Speed2.value = "@back speed2\r\n";
              break;
            case 3:
              Speed1.value = "@forward speed3\r\n";
              Speed2.value = "@back speed3\r\n";
              break;
            case 4:
              Speed1.value = "@forward speed4\r\n";
              Speed2.value = "@back speed4\r\n";
              break;
          }
          formatAppLog("log", "at pages/index/index.vue:454", "1", forwardKey.value);
          formatAppLog("log", "at pages/index/index.vue:455", "2", backKey.value);
          if (forwardKey.value == true) {
            sendData.value = Speed1.value;
          } else if (backKey.value == true) {
            formatAppLog("log", "at pages/index/index.vue:460", backKey.value);
            sendData.value = Speed2.value;
          }
          formatAppLog("log", "at pages/index/index.vue:464", index.value);
          if (index.value >= 1 && index.value <= 4) {
            rightIndex.value = `right${index.value}`;
          }
          setTimeout(() => {
            isButtonDisabled.value = false;
          }, 500);
          let timer1 = setTimeout(() => {
            clearTimeout(timer1);
            isActive_Up.value = false;
            isActive_Down.value = false;
          }, 250);
        }
      }
      const isActive_left = vue.ref(false);
      const isActive_right = vue.ref(false);
      const isActive_forward = vue.ref(false);
      const isActive_back = vue.ref(false);
      function handleAnimation(num) {
        if (!isActive_Option.value) {
          if (num == 1) {
            isActive_left.value = true;
            let timer1 = setTimeout(() => {
              clearTimeout(timer1);
              isActive_left.value = false;
            }, 250);
          } else if (num == 2) {
            isActive_right.value = true;
            let timer1 = setTimeout(() => {
              clearTimeout(timer1);
              isActive_right.value = false;
            }, 250);
          } else if (num == 3) {
            isActive_forward.value = true;
            let timer1 = setTimeout(() => {
              clearTimeout(timer1);
              isActive_forward.value = false;
            }, 250);
          } else if (num == 4) {
            isActive_back.value = true;
            let timer1 = setTimeout(() => {
              clearTimeout(timer1);
              isActive_back.value = false;
            }, 250);
          }
        }
      }
      let sendData = vue.ref("");
      let direction_left = vue.ref("@left\r\n");
      let direction_right = vue.ref("@right\r\n");
      function commandCTL(SelectStr) {
        if (!isActive_Option.value && !isOpenAvoidObstacle.value) {
          isOpenAvoidObstacleMode.value = false;
          let Index = 0;
          if (SelectStr == "left") {
            input_text.value = "输入指令：当前输入为left～";
            Index = 1;
          } else if (SelectStr == "right") {
            input_text.value = "输入指令：当前输入为right～";
            Index = 2;
          } else if (SelectStr == "forward") {
            input_text.value = "输入指令：当前输入为forward～";
            Index = 3;
          } else if (SelectStr == "back") {
            input_text.value = "输入指令：当前输入为back～";
            Index = 4;
          }
          formatAppLog("log", "at pages/index/index.vue:547", Index);
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
          }
          formatAppLog("log", "at pages/index/index.vue:569", sendData.value);
          send();
        }
      }
      function initBlue() {
        formatAppLog("log", "at pages/index/index.vue:576", "initblue");
        uni.openBluetoothAdapter({
          success(res) {
            formatAppLog("log", "at pages/index/index.vue:579", "初始化蓝牙成功");
            formatAppLog("log", "at pages/index/index.vue:580", res);
          },
          fail(err) {
            formatAppLog("log", "at pages/index/index.vue:583", "初始化蓝牙失败");
            setTimeout(() => {
              uni.showToast({
                title: "初始化蓝牙失败",
                icon: "error"
              });
            }, 500);
            setTimeout(() => {
              uni.showToast({
                title: "检查蓝牙打开没",
                icon: " error"
              });
            }, 1e3);
            formatAppLog("error", "at pages/index/index.vue:597", err);
          }
        });
      }
      const isConnected = vue.ref(false);
      function connect(data, way) {
        if (!isActive_Option.value) {
          if (way == "auto") {
            deviceId.value = data.value;
          } else if (way == "noauto") {
            deviceId.value = data;
          }
          uni.createBLEConnection({
            deviceId: deviceId.value,
            timeout: 1e3,
            success(res) {
              isConnected.value = true;
              isDisconnected.value = false;
              formatAppLog("log", "at pages/index/index.vue:619", "连接成功");
              isActive_Option.value = false;
              input_text.value = "输入指令：当前未有输入！";
              setTimeout(() => {
                sendData.value = "@reset\r\n";
                send();
                formatAppLog("log", "at pages/index/index.vue:627", sendData.value);
              }, 1e3);
              formatAppLog("log", "at pages/index/index.vue:635", res);
              bluetoothStr.value = "断开蓝牙";
              svg = bluetoothSvg;
              uni.showToast({
                title: "连接成功"
              });
            },
            fail(err) {
              if (err.errMsg == "createBLEConnection:fail operate time out") {
                formatAppLog("log", "at pages/index/index.vue:658", "连接超时");
                input_text.value = "输入指令：当前未有输入！";
                svg = closeBluetoothSvg;
                uni.showToast({
                  title: "连接超时",
                  icon: "error"
                });
                isDisconnected.value = true;
                svg = closeBluetoothSvg;
                setTimeout(() => {
                  uni.showToast({
                    title: "请检查设备蓝牙",
                    icon: "error"
                  });
                }, 1e3);
              } else {
                formatAppLog("log", "at pages/index/index.vue:675", "连接失败");
                formatAppLog("error", "at pages/index/index.vue:676", err);
                uni.showToast({
                  title: "连接失败",
                  icon: "error"
                });
              }
            }
          });
        }
      }
      const isDisconnected = vue.ref(false);
      const disconnect = (data) => {
        if (!isActive_Option.value) {
          sendData.value = "@reset\r\n";
          send();
          deviceId.value = data;
          uni.closeBLEConnection({
            deviceId: deviceId.value,
            success(res) {
              if (!isDisconnected.value) {
                formatAppLog("log", "at pages/index/index.vue:703", "断开连接成功");
                formatAppLog("log", "at pages/index/index.vue:704", res);
                bluetoothStr.value = "连接蓝牙";
                obstacleSvg = avoidObstcleSvg;
                avoidObstacleCmdSend.value = false;
                isOpenAvoidObstacle.value = false;
                avoidObstacleStr.value = "开启障碍模式";
                that.$forceUpdate();
                uni.showToast({
                  title: "断开连接成功",
                  icon: "success"
                });
                setTimeout(() => {
                  isConnected.value = false;
                }, 100);
                svg = closeBluetoothSvg;
                isDisconnected.value = true;
              }
            },
            fail(err) {
              formatAppLog("log", "at pages/index/index.vue:727", "断开连接失败");
              formatAppLog("log", "at pages/index/index.vue:728", err);
              uni.showToast({
                title: "断开连接失败",
                icon: "fail"
              });
            }
          });
        }
      };
      uni.onBLEConnectionStateChange(function(res) {
        formatAppLog("log", "at pages/index/index.vue:743", `device ${res.deviceId} state has changed, connected: ${res.connected}`);
        if (!res.connected) {
          isConnected.value = false;
          isDisconnected.value = true;
          isActive_Option.value = false;
          isOpenAvoidObstacleMode.value = false;
          svg = closeBluetoothSvg;
          bluetoothStr.value = "连接蓝牙";
          setTimeout(() => {
            obstacleSvg = avoidObstcleSvg;
            avoidObstacleCmdSend.value = false;
            isOpenAvoidObstacle.value = false;
            avoidObstacleStr.value = "开启障碍模式";
            that.$forceUpdate();
          }, 100);
          setTimeout(() => {
            uni.showToast({
              title: "蓝牙连接已断开",
              icon: "error"
            });
          }, 500);
        }
      });
      const serviceId = vue.ref("0000FFE0-0000-1000-8000-00805F9B34FB");
      const characteristicId = vue.ref("0000FFE1-0000-1000-8000-00805F9B34FB");
      const notify = () => {
        uni.notifyBLECharacteristicValueChange({
          deviceId: deviceId.value,
          // 设备id
          serviceId: serviceId.value,
          // 监听指定的服务
          characteristicId: characteristicId.value,
          // 监听对应的特征值
          success(res) {
            formatAppLog("log", "at pages/index/index.vue:805", "notify" + res);
            listenValueChange();
          },
          fail(err) {
            formatAppLog("error", "at pages/index/index.vue:812", err);
            uni.showToast({
              title: "监听失败",
              icon: "error"
            });
          }
        });
      };
      function ab2hex(buffer) {
        const hexArr = Array.prototype.map.call(
          new Uint8Array(buffer),
          function(bit) {
            return ("00" + bit.toString(16)).slice(-2);
          }
        );
        return hexArr.join("");
      }
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
      const message = vue.ref("");
      const messageHex = vue.ref("");
      const listenValueChange = () => {
        uni.onBLECharacteristicValueChange((res) => {
          let resHex = ab2hex(res.value);
          messageHex.value = resHex;
          let result = hexCharCodeToStr(resHex);
          message.value = String(result);
          currentVal.value = parseInt(message.value);
        });
      };
      function send() {
        let msg = sendData.value;
        formatAppLog("log", "at pages/index/index.vue:875", msg);
        const buffer = new ArrayBuffer(msg.length);
        const dataView = new DataView(buffer);
        for (var i = 0; i < msg.length; i++) {
          dataView.setUint8(i, msg.charAt(i).charCodeAt());
        }
        uni.writeBLECharacteristicValue({
          deviceId: deviceId.value,
          serviceId: serviceId.value,
          characteristicId: characteristicId.value,
          value: buffer,
          success(res) {
            formatAppLog("log", "at pages/index/index.vue:891", "writeBLECharacteristicValue success", res.errMsg);
          },
          fail(err) {
            formatAppLog("error", "at pages/index/index.vue:904", err);
          }
        });
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "body" }, [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["container", { maskLayer: isActive_Option.value }]),
              onClick: handleBlur
            },
            [
              vue.createElementVNode("view", { class: "state-box" }, [
                vue.createElementVNode("view", { class: "bluetooth-state" }, [
                  vue.createElementVNode("view", { class: "text-state" }, "连接状态:"),
                  vue.createElementVNode(
                    "view",
                    {
                      class: vue.normalizeClass(["light-state", { connected: isConnected.value }])
                    },
                    null,
                    2
                    /* CLASS */
                  )
                ]),
                vue.createElementVNode(
                  "text",
                  { class: "text_input" },
                  "                           " + vue.toDisplayString(vue.unref(input_text_title) + "\n") + " " + vue.toDisplayString(vue.unref(input_text)),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("view", { class: "state-box_bg" })
              ]),
              vue.createElementVNode("view", { class: "bluetooth-set" }, [
                vue.createElementVNode("view", {
                  class: "connect",
                  onClick: _cache[0] || (_cache[0] = ($event) => (!isConnected.value & connect(deviceId.value, "noauto"), isConnected.value & disconnect(deviceId.value)))
                }, [
                  vue.createElementVNode(
                    "view",
                    {
                      class: vue.normalizeClass(["bluetooth", { closeBg: isDisconnected.value, connectedBg: isConnected.value }])
                    },
                    [
                      vue.createElementVNode("image", {
                        src: vue.unref(svg),
                        mode: ""
                      }, null, 8, ["src"])
                    ],
                    2
                    /* CLASS */
                  ),
                  vue.createElementVNode(
                    "view",
                    { class: "connect_text" },
                    vue.toDisplayString(bluetoothStr.value),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "connect_bg" }),
                vue.createElementVNode("view", { class: "bluetooth-set_bg" })
              ]),
              vue.createCommentVNode(' <button @click="notify">5 开启消息监听</button>\r\n			\r\n			<button @click="send">6 发送数据</button>\r\n			\r\n			<button @click="read">7 读取数据</button> '),
              vue.createCommentVNode(' <view class="msg_x">\r\n				<view class="msg_txt">\r\n					监听到的内容：{{ message }}\r\n				</view>\r\n				<view class="msg_hex">\r\n					监听到的内容（十六进制）：{{ messageHex }}\r\n				</view>\r\n			</view> '),
              vue.createElementVNode("view", { class: "key-box" }, [
                vue.createCommentVNode(' <image src="../../static/Key.svg" mode="" @click="commandCTL(1)" class="leftKey"></image>\r\n				<image src="../../static/rightKey.svg" mode="" @click="commandCTL(2)" class="rightKey"></image>\r\n				<image src="../../static/forwardKey.svg" mode="" @click="commandCTL(3)" class="forwardKey"></image>\r\n				<image src="../../static/backKey.svg" mode="" @click="commandCTL(4)" class="backKey"></image> '),
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["LeftKey", { shrink1: isActive_left.value & !isActive_adapLeft.value, adapShrink1: isActive_left.value & isActive_adapLeft.value, adapLeftKey: isActive_adapLeft.value }]),
                    onTouchend: _cache[1] || (_cache[1] = ($event) => stopAct("stop")),
                    onTouchstart: _cache[2] || (_cache[2] = ($event) => (commandCTL("left"), handleAnimation(1)))
                  },
                  [
                    vue.createElementVNode("view", { class: "key left" }),
                    vue.createElementVNode("view", { class: "triangle" })
                  ],
                  34
                  /* CLASS, HYDRATE_EVENTS */
                ),
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["RightKey", { shrink2: isActive_right.value, adapShrink2: isActive_right.value & isActive_adapRight.value, adapRightKey: isActive_adapRight.value }]),
                    onTouchend: _cache[3] || (_cache[3] = ($event) => stopAct("stop")),
                    onTouchstart: _cache[4] || (_cache[4] = ($event) => (commandCTL("right"), handleAnimation(2)))
                  },
                  [
                    vue.createElementVNode("view", { class: "key right" }),
                    vue.createElementVNode("view", { class: "triangle" })
                  ],
                  34
                  /* CLASS, HYDRATE_EVENTS */
                ),
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["ForwardKey", { shrink3: isActive_forward.value, adapShrink3: isActive_forward.value & isActive_adapForward.value, adapForwardKey: isActive_adapForward.value }]),
                    onTouchend: _cache[5] || (_cache[5] = ($event) => stopAct("stop")),
                    onTouchstart: _cache[6] || (_cache[6] = ($event) => (commandCTL("forward"), handleAnimation(3)))
                  },
                  [
                    vue.createElementVNode("view", { class: "key forward" }),
                    vue.createElementVNode("view", { class: "triangle" })
                  ],
                  34
                  /* CLASS, HYDRATE_EVENTS */
                ),
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["BackKey", { shrink4: isActive_back.value, adapShrink4: isActive_back.value & isActive_adapBack.value, adapBackKey: isActive_adapBack.value }]),
                    onTouchend: _cache[7] || (_cache[7] = ($event) => stopAct("stop")),
                    onTouchstart: _cache[8] || (_cache[8] = ($event) => (commandCTL("back"), handleAnimation(4)))
                  },
                  [
                    vue.createElementVNode("view", { class: "key back" }),
                    vue.createElementVNode("view", { class: "triangle" })
                  ],
                  34
                  /* CLASS, HYDRATE_EVENTS */
                ),
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["Speed-Container", { adapSpeedContainer: isActive_adapSpeed.value }])
                  },
                  [
                    vue.createElementVNode("view", { style: { "height": "80px", "display": "flex", "align-items": "center" } }, [
                      vue.createElementVNode("scroll-view", {
                        "scroll-y": "true",
                        class: "Speed-Box",
                        "scroll-into-view": rightIndex.value,
                        "scroll-with-animation": "true"
                      }, [
                        vue.createElementVNode("view", {
                          onTouchmove: vue.withModifiers(banTouch, ["stop", "prevent"]),
                          class: "Speed-item",
                          id: "right1"
                        }, "低速", 40, ["onTouchmove"]),
                        vue.createElementVNode("view", {
                          onTouchmove: vue.withModifiers(banTouch, ["stop", "prevent"]),
                          class: "Speed-item",
                          id: "right2"
                        }, "中速", 40, ["onTouchmove"]),
                        vue.createElementVNode("view", {
                          onTouchmove: vue.withModifiers(banTouch, ["stop", "prevent"]),
                          class: "Speed-item",
                          id: "right3"
                        }, "高速", 40, ["onTouchmove"]),
                        vue.createElementVNode("view", {
                          onTouchmove: vue.withModifiers(banTouch, ["stop", "prevent"]),
                          class: "Speed-item",
                          id: "right4"
                        }, "极速", 40, ["onTouchmove"])
                      ], 8, ["scroll-into-view"])
                    ]),
                    vue.createElementVNode("view", { class: "select-speed-box" }, [
                      vue.createElementVNode("image", {
                        src: "/static/uparrow.svg",
                        mode: "",
                        class: vue.normalizeClass(["arrow-up", { upShrink: isActive_Up.value }]),
                        onClick: _cache[9] || (_cache[9] = ($event) => scroll("+")),
                        disabled: isButtonDisabled.value
                      }, null, 10, ["disabled"]),
                      vue.createElementVNode(
                        "image",
                        {
                          src: "/static/uparrow.svg",
                          mode: "",
                          class: vue.normalizeClass(["arrow-down", { downShrink: isActive_Down.value }]),
                          onClick: _cache[10] || (_cache[10] = ($event) => scroll("-"))
                        },
                        null,
                        2
                        /* CLASS */
                      )
                    ])
                  ],
                  2
                  /* CLASS */
                ),
                vue.withDirectives(vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["stopButton", { stopShrink: isActive_stop.value, adapStopShrink: isActive_stop.value & isActive_adapStop.value, adapStopKey: isActive_adapStop.value }]),
                    onClick: _cache[11] || (_cache[11] = ($event) => stopAct(" "))
                  },
                  " 急停 ",
                  2
                  /* CLASS */
                ), [
                  [vue.vShow, false]
                ]),
                vue.createElementVNode("view", { class: "backGround3" })
              ])
            ],
            2
            /* CLASS */
          ),
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["avoidObstacle", { avoidObstacleOption: isActive_Option.value }]),
              onClick: handleAvoidObstacle,
              onLongpress: handleOption
            },
            [
              vue.withDirectives(vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(["avoidObstacle_imgbox", { obstalcleCmdSend: avoidObstacleCmdSend.value }])
                },
                [
                  vue.createElementVNode("image", {
                    src: vue.unref(obstacleSvg),
                    mode: ""
                  }, null, 8, ["src"])
                ],
                2
                /* CLASS */
              ), [
                [vue.vShow, !isActive_Option.value]
              ]),
              vue.withDirectives(vue.createElementVNode(
                "view",
                { class: "obstacle_text" },
                vue.toDisplayString(avoidObstacleStr.value),
                513
                /* TEXT, NEED_PATCH */
              ), [
                [vue.vShow, !isActive_Option.value]
              ]),
              vue.withDirectives(vue.createElementVNode(
                "view",
                { class: "avoidObstacleDirection" },
                [
                  vue.createElementVNode("view", {
                    class: "obstacle_left",
                    onClick: _cache[12] || (_cache[12] = ($event) => handleDirection("left", "50"))
                  }, "左转"),
                  vue.createElementVNode("view", {
                    class: "obstacle_auto",
                    onClick: _cache[13] || (_cache[13] = ($event) => handleDirection("auto", "50"))
                  }, "自动"),
                  vue.createElementVNode("view", {
                    class: "obstacle_right",
                    onClick: _cache[14] || (_cache[14] = ($event) => handleDirection("right", "50"))
                  }, "右转"),
                  vue.createElementVNode(
                    "view",
                    {
                      class: vue.normalizeClass(["backdrop", { selected_left: isActive_ObstacleLeft.value, selected_auto: isActive_ObstacleAuto.value, selected_right: isActive_ObstacleRight.value }])
                    },
                    null,
                    2
                    /* CLASS */
                  )
                ],
                512
                /* NEED_PATCH */
              ), [
                [vue.vShow, isActive_Option.value]
              ]),
              vue.withDirectives(vue.createElementVNode(
                "view",
                { class: "progress-box" },
                [
                  vue.createElementVNode("text", { class: "progress_title" }, "避障精度：cm"),
                  vue.createElementVNode("slider", {
                    step: "2",
                    onChange: sliderChange,
                    value: vue.unref(currentVal),
                    "show-value": "true",
                    min: "0",
                    max: "50",
                    "block-size": "8",
                    class: "slider"
                  }, null, 40, ["value"])
                ],
                512
                /* NEED_PATCH */
              ), [
                [vue.vShow, isActive_Option.value]
              ])
            ],
            34
            /* CLASS, HYDRATE_EVENTS */
          ),
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["avoidObstacle_bg", { avoidObstacleOption_bg: isActive_Option.value }])
            },
            null,
            2
            /* CLASS */
          )
        ]);
      };
    }
  };
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "/Users/mac/bluetooth-car_frontEnd/pages/index/index.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  const _sfc_main = {
    __name: "App",
    setup(__props) {
      onLaunch(() => {
        formatAppLog("log", "at App.vue:5", "App Launch");
        let getWindowInfo = uni.getWindowInfo();
        formatAppLog("log", "at App.vue:7", getWindowInfo.screenWidth);
      });
      onShow(() => {
        formatAppLog("log", "at App.vue:11", "App Show");
      });
      onHide(() => {
        formatAppLog("log", "at App.vue:16", "App Hide");
      });
      return () => {
      };
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/Users/mac/bluetooth-car_frontEnd/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
