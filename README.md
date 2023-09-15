![S30915-18310468](https://github.com/liumubo/bluetooth-car_frontEnd/assets/114791868/13057694-aa69-4954-a6f1-765b9c1905a1)# bluetooth-car_frontEnd
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



![S30915-18310468](https://github.com/liumubo/bluetooth-car_frontEnd/assets/114791868/15736476-4c89-4670-826d-e1c6f29e1276)

![S30915-18311487](https://github.com/liumubo/bluetooth-car_frontEnd/assets/114791868/7560d4a5-d03d-4879-89a0-8c598d67897c)

![S30915-18312017](https://github.com/liumubo/bluetooth-car_frontEnd/assets/114791868/679afa36-272c-4272-bee1-7945d42d7a3d)




https://github.com/liumubo/bluetooth-car_frontEnd/assets/114791868/01efabf1-51d7-46b6-b4c3-5919e0e158ca

