# bluetooth-car_frontEnd
这是一个基于 stm32f103c8t6 和 uniapp 的物联网蓝牙小车项目，本项目主要包含两大功能，一个是蓝牙控制小车运动，一个是避障小车模式。
该项目直接拉取到本地后，用HbuilderX打开即可，然后可以打包成App在手机上使用。

要连接到蓝牙，必须将下列蓝牙相关参数改成自己的
const deviceId = ref('60:E8:5B:6C:64:9F') //低功耗蓝牙设备的ID
60:E8:5B:6C:64:9F这个参数要改成你自己的。

const serviceId = ref('0000FFE0-0000-1000-8000-00805F9B34FB') //蓝牙的服务id
0000FFE0-0000-1000-8000-00805F9B34FB改成你自己的。

const characteristicId = ref('0000FFE1-0000-1000-8000-00805F9B34FB') //特征值
0000FFE1-0000-1000-8000-00805F9B34FB改成你自己的。

![S30915-18302561](https://github.com/liumubo/bluetooth-car_frontEnd/assets/114791868/672572f9-a9f7-4a69-b8bb-2463d22aa951)

![S30915-18310468](https://github.com/liumubo/bluetooth-car_frontEnd/assets/114791868/bbe06ded-f7c7-420a-aedf-29d7bad6565d)

![S30915-18311487](https://github.com/liumubo/bluetooth-car_frontEnd/assets/114791868/b0ce28d6-8e86-43e6-9531-8c5fb4bc6d0a)

![S30915-18312017](https://github.com/liumubo/bluetooth-car_frontEnd/assets/114791868/9cb79f7a-766f-4ad8-9aa4-f7e968a4402e)



https://github.com/liumubo/bluetooth-car_frontEnd/assets/114791868/01efabf1-51d7-46b6-b4c3-5919e0e158ca

