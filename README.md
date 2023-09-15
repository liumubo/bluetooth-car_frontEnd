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


![S30915-18302561](https://github.com/liumubo/bluetooth-car_frontEnd/assets/114791868/e19bb4df-5b73-46fd-9cda-5d9a773c8706)
![Uploading S30915-18310468.png…]()
![Uploading S30915-18311487.png…]()
![Uploading S30915-18312017.png…]()


Uploading S30915-18290308.mp4…

