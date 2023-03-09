<!--
 * @Description: 地图
 * @Autor: codeBo
 * @Date: 2023-03-06 16:10:10
 * @LastEditors: gjzxlihaibo@163.com
 * @LastEditTime: 2023-03-07 14:59:08
-->
<template>
  <div id="root">
    <div>
      <h3>添加选点请输入坐标</h3>
      <label>
        经度：
        <input />
      </label>
      <label>
        纬度：
        <input />
      </label>
      <button class="btn">输入完成</button>
      <button class="btn">清空输入</button>
    </div>
    <div id="container"></div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, getCurrentInstance } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import { shallowRef } from 'vue'
import { coordData } from './data'
const map = shallowRef(null)
const { ctx } = getCurrentInstance()
const _this = ctx

const menuInstance = ref() // menu 实例
let AMap = ref() // map 实例
let currentPonit = ref<HTMLElement | null>(null) // 存储当前选中点 DOM
let currentData = reactive({}) // 当前选重点信息
let sourceInfoWindow = ref()
const headColors = ['#3366bb', '#6622FF']
// 工具方法
// 修改DOM 类名
function changeStyle(res, data) {
  if (currentPonit.value !== null) {
    currentPonit.value.classList.remove('active')
  }
  currentPonit.value = res.children[0]
  currentData = data
  currentPonit.value.classList.add('active')
}
// 清除点信息
function clearPoint() {
  if (currentPonit.value) {
    currentPonit.value.classList.remove('active')
  }
  currentPonit.value = null
  currentData = {}
}
// 设置线信息
function setLines(lnglat, color, weight) {
  return new AMap.value.Polyline({
    path: lnglat,
    // showDir:true ,// 设置线方向
    strokeColor: color, // 线颜色
    strokeWeight: weight, // 线宽
    strokeOpacity: 0.6, // 透明度
  })
}
function markerClick(e) {
  console.log('sourceInfoWindow.value', sourceInfoWindow.value, e.target)

  sourceInfoWindow.value.setContent(e.target.contents)
  sourceInfoWindow.value.open(map.value, e.target.getPosition())
}

function setInput(e, name) {
  let text =
    e.target.parentElement.parentElement.children[0].innerText.split(
      '供给点',
    )[0]
  // let current = coordData.filter((item) => {
  //   return item.name === text
  // })
  window.localStorage.setItem(text + name, e.target.value)
}

const initWindow = () => {
  // 信息窗体
  let infoWindow = new AMap.value.InfoWindow({
    offset: new AMap.value.Pixel(0, -10),
    retainWhenClose: true,
  })
  sourceInfoWindow.value = infoWindow
  infoWindow.on('open', function () {
    let inputOut = document.getElementById('inputOut')
    let inputPro = document.getElementById('inputPro')
    inputOut.addEventListener('change', (e) => {
      setInput(e, 'inputOut')
      window.location.reload()
    })
    inputPro.addEventListener('change', (e) => {
      setInput(e, 'inputPro')
      window.location.reload()
    })
  })
}

// 抽离点位信息设置
function setMarker(marker) {
  //创建右键菜单
  let contextMenu = new AMap.value.ContextMenu()
  //右键放大
  contextMenu.addItem(
    '放大一级',
    function () {
      map.value.zoomIn()
    },
    0,
  )
  //右键缩小
  contextMenu.addItem(
    '缩小一级',
    function () {
      map.value.zoomOut()
    },
    1,
  )
  contextMenu.addItem('设置起点', function () {
    console.log('设置起点', marker, markerd.dom)
    changeStyle(markerd.dom, marker)
    contextMenu.close() // 关闭右键菜单
  })
  contextMenu.addItem('与起点连线', function () {
    if (!currentPonit.value) {
      alert('请选择起点')
      contextMenu.close()
      return
    } else {
      // 这里其实可以根据数据判定线类型了，因为第二个选中点的信息+和第一个选中点的信息都有了,但是过滤方法会比较复杂
      let path = [currentData.position, marker.position]
      const polyline1 = setLines(path, '#3366bb', 5)
      map.value.add([polyline1])
      clearPoint()
    }
    contextMenu.close() // 关闭右键菜单
  })
  let content = '<div class="marker-route"></div>'
  let markerd = new AMap.value.Marker({
    map: map.value,
    // icon: marker?.icon,
    content,
    offset: new AMap.value.Pixel(-8, -8),
    visible: true, // 点标记是否可见
    position: [marker.position[0], marker.position[1]],
  })

  let inputO = window.localStorage.getItem(marker.name + 'inputOut')
  let inputP = window.localStorage.getItem(marker.name + 'inputPro')
  // 左键点击的信息窗体， 宽度会在碰触到容器边缘的时候自适应的缩小
  markerd.contents = `
    <div>${marker.name}供给点</div>
    <div>出口压力：<input id="inputOut" class="input_inner" value="${
      inputO ?? marker?.pointData?.out
    }"/>kPa</div>
    <div>供给量：<input id="inputPro" class="input_inner" value="${
      inputP ?? marker?.pointData?.provide
    }" />m³</div>
    <div>位置：经度${marker.position[0]},纬度${marker.position[1]}</div>`
  markerd.data = marker
  markerd.on('click', markerClick)
  if (marker.name === '新疆') {
    // 触发上面的点击事件
    markerd.emit('click', { target: markerd })
  }
  //绑定鼠标右击事件——弹出右键菜单
  markerd.on('rightclick', function (e) {
    contextMenu.open(map.value, e.lnglat)
  })
  return markerd
}

//自定义菜单类
class ContextMenu {
  constructor(map) {
    let me = _this
    //地图中添加鼠标工具MouseTool插件
    _this.mouseTool = new AMap.value.MouseTool(map)
    _this.contextMenuPositon = null
    const fragment = document.createElement('div') // 使用 DOM 方式, 方便添加事件
    fragment.className = 'info context_menu'
    const p = document.createElement('p')
    p.addEventListener('click', this.delMarkerMenu)
    p.textContent = '移除上次选中信息'
    fragment.appendChild(p)
    //通过content自定义右键菜单内容
    _this.contextMenu = new AMap.value.ContextMenu({
      isCustom: true,
      content: fragment,
    })
    //地图绑定鼠标右击事件——弹出右键菜单
    map.on('rightclick', function (e) {
      me.contextMenu.open(map, e.lnglat)
      me.contextMenuPositon = e.lnglat //右键菜单位置
    })
  }
  delMarkerMenu() {
    // 右键菜单上次选中点的信息
    clearPoint()
    _this.mouseTool.close()
    _this.contextMenu.close()
  }
}

// 过滤线方法
function setLine(arr) {
  return arr.reduce((prev, item) => {
    if (item?.line) {
      prev.push(...item.line)
    }
    return prev
  }, [])
}

const initMap = () => {
  AMapLoader.load({
    key: 'b59c490f61a694b9d7576dd864f74d6e', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ['AMap.Scale', 'AMap.ToolBar', 'AMap.MouseTool'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    Loca: {
      version: '2.0.0',
    },
  })
    .then((res) => {
      AMap.value = res
      // 上来就显示的中心点  北京 116.397, 39.918
      let lnglat = new res.LngLat(105, 38)
      map.value = new res.Map('container', {
        //设置地图容器id
        viewMode: '3D', //是否为3D地图模式
        zoom: 4.8, //初始化地图级别
        center: lnglat, //初始化地图中心点位置
      })

      initWindow()
      // 添加一些分布不均的点到地图上,地图上添加三个点标记，作为参照
      coordData.forEach(function (marker) {
        setMarker(marker)
      })

      let renderLine = setLine(coordData)
      // 设置线
      let polyline = renderLine.reduce((prev, item) => {
        let weight = item.type === 1 ? 5 : 3
        let color = item.type === 1 ? headColors[0] : headColors[1]
        prev.push(setLines(item.current, color, weight))
        return prev
      }, [])
      map.value.add([...polyline]) // 绘制线
      //创建右键菜单
      menuInstance.value = new ContextMenu(map.value)
      // Loca 在上面加载的时候 直接被挂在到了 window 上
      let loca = new window.Loca.Container({
        map: map.value,
      })

      // 图例, 图例可以实例化多个，使用定位来设置位置
      new window.Loca.Legend({
        loca: loca,
        title: {
          label: '管道类型',
          fontColor: 'rgba(255,255,255,1)',
          fontSize: '16px',
        },
        style: {
          backgroundColor: 'rgba(255,255,255,0.2)',
          left: '20px',
          bottom: '40px',
          fontSize: '12px',
        },
        dataMap: [
          { label: '省级管道', color: headColors[1] },
          { label: '县级管道', color: headColors[0] },
        ],
      })

      //修改图例排列方式
      document
        .getElementsByClassName('amap-loca loca-controls')[0]
        .setAttribute('id', 'testid')
      let lis = document.querySelectorAll('#testid li')
      for (let i = 0; i < lis.length; i++) {
        console.log(lis[i])
        lis[i].setAttribute('class', 'test')
      }
    })
    .catch((e) => {
      console.log('error', e)
    })
}

onMounted(() => {
  initMap()
})
</script>
<style lang="scss">
#container {
  width: 1350px;
  height: 900px;
}

#root {
  display: flex;
  width: 100%;
}

#root > div:first-child {
  display: flex;
  flex-direction: column;
  width: 200px;
  padding: 5px;
  margin-right: 10px;
  box-shadow: 2px 2px 2px 2px #333;
}

.context_menu {
  position: relative;
  min-width: 12rem;
  padding: 0;
  background-color: white;
}

.context_menu p {
  padding: 0.25rem 1.25rem;
  cursor: pointer;
}

.context_menu p:hover {
  background: #ccc;
}

.btn {
  width: 80px;
  margin-top: 10px;
}

.marker-route {
  width: 15px;
  height: 15px;
  background-color: #22ddb8;
  border-radius: 10px;
}

.active {
  background-color: #f76809;
}

.content {
  display: flex;
  align-items: center;
  padding: 1px;
  color: white;
  background-color: rgb(0 0 0 / 30%);
}

.content span {
  display: block;
  width: 20px;
  height: 20px;
  margin: 0 10px;
  background-color: #36b;
}

.content p {
  margin-right: 10px;
}

.test {
  box-sizing: content-box;
  display: inline;
  float: left;
  height: 30px;
  padding: 2px 10px;
  line-height: 30px;
}

.test a {
  color: #333 !important;
}

.test span {
  width: 80px !important;
  margin-left: 10px;
  border-radius: 10px;
}

.amap-info-content {
  background-color: rgb(255 255 255 / 60%);
}

.test_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 180px;
  padding: 10px 18px 10px 10px;
  overflow: auto;
  line-height: 1.4;
  background-color: rgb(255 255 255 / 60%);
  border: 1px solid rgb(0 0 0 / 20%);
}

.input_inner {
  width: 30px;
  margin-right: 5px;
  border: 1px solid #333;
  border-radius: 2px;
}
</style>
