import { defineStore } from 'pinia'

interface mapStoreType {
  AMap: any
  map: any
  sourceInfoWindow: any
  centerLng: Array<number>
  currentData: any
  currentPonit: HTMLElement | null
  pointData: any
}

export const useMapStore = defineStore({
  id: 'useMapStore',
  state: (): mapStoreType => ({
    AMap: {}, // AMap 构造函数
    map: {}, // 地图实例化对象
    sourceInfoWindow: {}, // 信息窗体实例对象
    centerLng: [116.397, 39.918], // 地图显示的中心点坐标,
    currentData: [], // 数据
    currentPonit: null, // 当前选中 DOM 节点
    pointData: {}, // 当前选中点的信息
  }),
  actions: {
    // 存储各类数据使用
    setActions<T>(value: T) {
      this.AMap = value
    },
    // 初始化地图
    initMapHandler() {
      this.map = new this.AMap.Map('container', {
        //设置地图容器id
        // viewMode: '3D', //是否为3D地图模式
        zoom: 4.8, //初始化地图级别
        center: this.centerLng, //初始化地图中心点位置
      })
      this.map.clearMap() // 清除地图覆盖物
      // 地图是否可拖拽和缩放
      this.map.setStatus({
        dragEnable: true, // 是否可拖拽
        zoomEnable: true, // 是否可缩放
      })
    },
    // 设置点位信息 和 点位的右键菜单
    setMarker(marker: any) {
      const currentMap = this.map
      //创建右键菜单
      const contextMenu = new this.AMap.ContextMenu()
      //右键放大
      contextMenu.addItem(
        '放大一级',
        function () {
          currentMap.zoomIn()
        },
        0,
      )
      //右键缩小
      contextMenu.addItem(
        '缩小一级',
        function () {
          currentMap.zoomOut()
        },
        1,
      )
      contextMenu.addItem('设置起点', function () {
        changeStyle(markerd.dom, marker)
        contextMenu.close() // 关闭右键菜单
      })
      contextMenu.addItem('与起点连线', function () {
        if (!currentPonit) {
          alert('请选择起点')
          contextMenu.close()
          return
        } else {
          // 这里其实可以根据数据判定线类型了，因为第二个选中点的信息+和第一个选中点的信息都有了,但是过滤方法会比较复杂
          const path = [this.pointData.position, marker.position]
          const polyline1 = setLines(path, '#3366bb', 5)
          currentMap.add([polyline1])
          clearPoint()
        }
        contextMenu.close() // 关闭右键菜单
      })
      const content = '<div class="marker-route"></div>'
      const markerd = new AMap.value.Marker({
        map: currentMap,
        // icon: marker?.icon,
        content,
        offset: new AMap.value.Pixel(-8, -8),
        visible: true, // 点标记是否可见
        position: [marker.position[0], marker.position[1]],
      })

      const inputO = window.localStorage.getItem(marker.name + 'inputOut')
      const inputP = window.localStorage.getItem(marker.name + 'inputPro')
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
        contextMenu.open(currentMap, e.lnglat)
      })
      return markerd
    },
    // 初始化信息窗体（左键点击）
    initWindowHandler() {
      // 信息窗体
      const infoWindow = new this.AMap.InfoWindow({
        offset: new this.AMap.Pixel(0, -10),
        retainWhenClose: true,
      })
      this.sourceInfoWindow = infoWindow
      infoWindow.on('open', () => {
        const inputOut = document.getElementById('inputOut')
        const inputPro = document.getElementById('inputPro')
        if (!inputOut || !inputPro) return
        inputOut.addEventListener('change', (e) => {
          this.setInput(e, 'inputOut')
          window.location.reload()
        })
        inputPro.addEventListener('change', (e) => {
          this.setInput(e, 'inputPro')
          window.location.reload()
        })
      })
    },
    // 修改DOM 类名
    changeStyle(res: { children: Array<HTMLElement> }, data: any) {
      if (this.currentPonit !== null) {
        this.currentPonit.classList.remove('active')
      }
      this.currentPonit = res.children[0]
      this.pointData = data
      this.currentPonit.classList.add('active')
    },
    // 存储修改的坐标信息
    setInput(e: any, name: string) {
      const text =
        e.target.parentElement.parentElement.children[0].innerText.split(
          '供给点',
        )[0]
      // let current = this.currentData.filter((item:any) => {
      //   return item.name === text
      // })
      window.localStorage.setItem(text + name, e.target.value)
    },
  },
})
