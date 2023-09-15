<script setup>
	import {onLaunch,onShow, onHide} from '@dcloudio/uni-app'
	onLaunch(()=>{
		
		console.log('App Launch')
		let getWindowInfo = uni.getWindowInfo();
		console.log(getWindowInfo.screenWidth);
	})
	
	onShow(()=>{
		console.log('App Show')
	})
		
		
	onHide(()=>{
		console.log('App Hide')
	})
	
</script>

<style>
	/*每个页面公共css */
</style>
