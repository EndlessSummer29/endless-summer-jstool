<template>
    <div class="mapbox" :style="{height:height,width:width,}">
        <div id="map"></div>
        <div class="route-planning">
            <div class="positionbox">
                <div class="route-vehicle">
                    <el-tooltip :enterable="false" class="route-vehicle-item" effect="dark" content="驾车" placement="bottom">
                        <el-button class="" @click="changevehicle(1)" size="medium" :type="vehicle===1?'success':'primary'" icon="el-icon-qiche1 iconfont" circle></el-button>
                    </el-tooltip>
                    <el-tooltip :enterable="false" class="route-vehicle-item" effect="dark" content="公交" placement="bottom">
                        <el-button @click="changevehicle(2)" size="medium" :type="vehicle===2?'success':'primary'" icon="el-icon-qichezhan iconfont" circle></el-button>
                    </el-tooltip>
                    <el-tooltip :enterable="false" class="route-vehicle-item" effect="dark" content="步行" placement="bottom">
                        <el-button @click="changevehicle(3)" size="medium" :type="vehicle===3?'success':'primary'" icon="el-icon-zoulu iconfont" circle></el-button>
                    </el-tooltip>
                </div>
                <div class="formbox">
                    <div class="middle-positioninput">
                        <el-form ref="form" :rules="rules" :model="positionfrom" label-width="80px" size="mini">
                            <el-form-item label="起点" prop="startname">
                                <el-input id="startinput" :clearable="true" v-model="positionfrom.startname"></el-input>
                                <el-tooltip :enterable="false" class="route-vehicle-item holdclickicon" effect="dark" content="地图选点" placement="bottom">
                                    <i class="el-icon-map-location clickicon" @click="switchCursor('crosshair','start')"></i>
                                </el-tooltip>
                            </el-form-item>
                            <el-form-item label="终点" prop="endname">
                                <el-input id="endinput" :clearable="true" v-model="positionfrom.endname"></el-input>
                                <el-tooltip :enterable="false" class="route-vehicle-item holdclickicon" effect="dark" content="地图选点" placement="bottom">
                                    <i class="el-icon-map-location clickicon" @click="switchCursor('crosshair','end')"></i>
                                </el-tooltip>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <div class="route-seek">
                    <div class="clearroute" @click="clearNavigation">
                        清除路线
                    </div>
                    <div class="seekroutebtn">
                        <el-button type="primary" @click="startNavigation">
                            {{vehicle===1?'开车去':vehicle===2?'坐公交':'走路去'}}
                        </el-button>
                    </div>
                </div>
            </div>
            <div id="panel"></div>
        </div>
    </div>
</template>
<script>
var map, driving, transfer, walking, geocoder, startmarker, endmarker, endIcon, startIcon
export default {
    name: 'MapSearch',
    data () {
        return {
            vehicle: 1,
            positionfrom: {
                start: [],
                startname: '',
                end: [],
                endname: ''
            },
            pickupposition: 'firstinit',
            rules: {
                endname: [
                    { required: true, message: '请输入终点', trigger: 'blur' },
                ],
                startname: [
                    { required: true, message: '请输入起点', trigger: 'blur' },
                ]
            }
        }
    },
    mounted () {
        this.positionfrom.end = this.center
        this.getPositionByLonLats(this.center[0], this.center[1])
        this.MapInit()
    },
    props: {
        center: {
            type: Array,
            default () {
                return [114.445528, 30.437097]
            }
        },
        height:{
            type:String,
            default:'100%'
        },
        width:{
            type:String,
            default:'100%'
        },
    },
    methods: {
        // 地图注入
        MapInit () {
            var $that = this
            map = new AMap.Map('map', {
                // mapStyle:'amap://styles/darkblue',
                // mapStyle:'amap://styles/whitesmoke',
                // mapStyle: "amap://styles/6429a5b4db34ecc964f6d0d2a0e666cd",
                resizeEnable: true,
                center: this.center,
                zoom: 15,
                // pitch: 42, // 地图俯仰角度，有效范围 0 度- 83 度
                viewMode: '3D' // 地图模式
            })
            // 驾车
            driving = new AMap.Driving({
                map: map,
                panel: "panel"
            })
            // 公交
            transfer = new AMap.Transfer({
                map: map,
                city: '武汉市',
                panel: 'panel',
                policy: AMap.TransferPolicy.LEAST_TRANSFER
            });
            // 步行
            walking = new AMap.Walking({
                map: map,
                panel: "panel"
            })
            // 开始图标
            startIcon = new AMap.Icon({
                size: new AMap.Size(25, 34),
                image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
                imageSize: new AMap.Size(135, 40),
                imageOffset: new AMap.Pixel(-9, -3)
            });
            // 结束图标
            endIcon = new AMap.Icon({
                size: new AMap.Size(25, 34),
                image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
                imageSize: new AMap.Size(135, 40),
                imageOffset: new AMap.Pixel(-95, -3)
            });
            // 绑定输入框搜索
            const startinput = new AMap.Autocomplete({
                input: "startinput"
            });
            // 绑定输入框搜索
            const endinput = new AMap.Autocomplete({
                input: "endinput"
            });
            // 绑定输入框搜索
            AMap.event.addListener(startinput, 'select', (event)=>this.select(event,'startinput'));
            // 绑定输入框搜索
            AMap.event.addListener(endinput, 'select', (event)=>this.select(event,'endinput'));
            // 地图取点
            map.on('click', function (e) {
                if ($that.pickupposition !== '') {
                    $that.getPositionByLonLats(e.lnglat.getLng(), e.lnglat.getLat())
                }
            })
        },
        // 实例化点标记
        addMarker(lng, lat, input) {
            var $that = this
            if (input === 'startinput'){
                if (startmarker) map.remove(startmarker)
                startmarker = new AMap.Marker({
                    icon: startIcon,
                    position: [Number(lng), Number(lat)],
                    offset: new AMap.Pixel(-13, -30)
                });
                map.add(startmarker);
                $that.positionfrom.start = [Number(lng), Number(lat)]
            } else if (input === 'endinput') {
                if (endmarker) map.remove(endmarker)
                endmarker = new AMap.Marker({
                    icon: endIcon,
                    position: [Number(lng), Number(lat)],
                    offset: new AMap.Pixel(-13, -30)
                });
                map.add(endmarker);
                $that.positionfrom.end = [Number(lng), Number(lat)]
            } else {
                console.log('问题')
            }
            map.setFitView()
        },
        // 监听搜索选择
        select(e,input) {
            this.addMarker(e.poi.location.lng, e.poi.location.lat, input)
        },
        getPositionByLonLats(lng, lat) {
            var $that = this
            var lnglatXY = [lng, lat]
            AMap.service('AMap.Geocoder', function () {
                geocoder = new AMap.Geocoder({})
                geocoder.getAddress(lnglatXY, function (status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                        if ($that.pickupposition === 'start') {
                            $that.positionfrom.startname = result.regeocode.formattedAddress
                            $that.positionfrom.start = lnglatXY
                            $that.addMarker(lng, lat, 'startinput')
                        } else if ($that.pickupposition === 'end') {
                            $that.positionfrom.endname = result.regeocode.formattedAddress
                            $that.positionfrom.end = lnglatXY
                            $that.addMarker(lng, lat, 'endinput')
                        } else if ($that.pickupposition === 'firstinit') {
                            $that.positionfrom.endname = result.regeocode.formattedAddress
                            $that.positionfrom.end = lnglatXY
                            $that.addMarker(lng, lat, 'endinput')
                        } else {
                            console.log('计算之外')
                        }
                        $that.switchCursor('pointer', '')
                    } else {
                    }
                })
            })
        },
        // 切换交通工具
        changevehicle(vehicle) {
            this.vehicle = vehicle
        },
        // 改变鼠标样式
        switchCursor(target, pickuptype) {
            this.pickupposition = pickuptype
            map.setDefaultCursor(target)
        },
        // 清除导航
        clearNavigation() {
            this.positionfrom = {
                start: [],
                startname: '',
                end: [],
                endname: ''
            }
            this.pickupposition = ''
            driving.clear()
            this.$refs['form'].resetFields()
        },
        // 开始导航
        startNavigation() {
            this.$refs['form'].validate((valid) => {
            if (valid) {
                driving.clear()
                transfer.clear()
                walking.clear()
                var $that = this
                let start = $that.positionfrom.start
                let end = $that.positionfrom.end
                if ($that.vehicle===1){
                    driving.search(new AMap.LngLat(start[0], start[1]), new AMap.LngLat(end[0], end[1]), function(status, result) {
                        if (status === 'complete') {
                            console.log('驾车')
                        } else {
                        }
                    })
                } else if ($that.vehicle===2) {
                    transfer.search(new AMap.LngLat(start[0], start[1]), new AMap.LngLat(end[0], end[1]), function(status, result) {
                        if (status === 'complete') {
                            console.log('公交')
                        } else {
                        }
                    })
                } else if ($that.vehicle===3) {
                    walking.search(new AMap.LngLat(start[0], start[1]), new AMap.LngLat(end[0], end[1]), function(status, result) {
                        if (status === 'complete') {
                            console.log('步行1')
                        } else {
                        }
                    })
                } else {
                    console.log('转换失败')
                }
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.mapbox{
    height: 100vh;
    // height: 95%;
    // height: 95%;
    width: 100%;
    position: relative;
  #map {
    height: 100%;
    width: 100%;
  }
  .route-planning{
    box-sizing: border-box;
    position: absolute;
    left: 15px;
    top: 15px;
    width: 360px;
    padding: 14px;
    background: #3d93fd;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    // 路线引导
    #panel {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        height: 220px;
        overflow-y: scroll;
        // 多余
        >>> .amap-call{
            display: none !important;
        }
    }
    #panel ::v-deep .amap-call{
        display: none !important;
    }
    .positionbox{
        width: 100%;
        position: relative;
    }
    .route-vehicle{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 15px;
        .route-vehicle-item{
            margin: 0 25px;
        }
    }
    .formbox{
        display: flex;
        align-items: center;
        justify-content: space-between;
        overflow: hidden;
        position: relative;
        .middle-positioninput{
            color: #fff;
            >>> .el-form-item__label{
                color: #fff !important;
            }
            >>> .el-input__clear:hover{
                color: #fff !important;
            }
            >>> input{
                background-color: #3587eb !important;
                border: unset !important;
                color: #fff !important;
            }
            >>> input:hover{
                border-color: unset !important;;
            }
            >>> .el-form-item__content{
                display: flex;
                align-items: center;
            }
            
            .holdclickicon{
                margin-left: 10px;
            }
            .clickicon{
                cursor: pointer;
            }
        }
        .middle-positioninput ::v-deep .el-form-item__content{
            display: flex;
            align-items: center;
        }
        
        .middle-positioninput ::v-deep .el-form-item__label{
                color: #fff !important;
            }
        .middle-positioninput ::v-deep .el-input__clear:hover{
                color: #fff !important;
            }
        .middle-positioninput ::v-deep input{
                background-color: #3587eb !important;
                border: unset !important;
                color: #fff !important;
            }
        .middle-positioninput ::v-deep input:hover{
                border-color: unset !important;;
            }
    }
    .route-seek{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .clearroute{
            color: #fff;
            font-size: 13px;
            text-decoration: none;
            opacity: 1;
            line-height: 32px;
            cursor: pointer;
        }
        .seekroutebtn ::v-deep .el-button{
            // >>> .el-button{
                background-color: #559ffb;
                box-shadow: 0 1px 1px 0 rgba(0,0,0,.21);
                -webkit-box-shadow: 0 1px 1px 0 rgba(0,0,0,.21);
                -moz-box-shadow: 0 1px 1px 0 rgba(0,0,0,.21);
            // }
        }
        .seekroutebtn{
            >>> .el-button{
                background-color: #559ffb;
                box-shadow: 0 1px 1px 0 rgba(0,0,0,.21);
                -webkit-box-shadow: 0 1px 1px 0 rgba(0,0,0,.21);
                -moz-box-shadow: 0 1px 1px 0 rgba(0,0,0,.21);
            }
        }
    }
  }
}
// 高德输入框多2pX  BUG
::v-deep .amap-sug-result{
    border: 0 !important;
}
// #panel ::-webkit-scrollbar-thumb {
//     background-color: rgba(64,158,255,0.5);
//     border-radius: 8px;
// }
// #panel ::-webkit-scrollbar-track-piece {
//     background: none;
// }

</style>
<style lang="scss">
#panel::-webkit-scrollbar-track-piece {
  background: none;
}
#panel::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}
#panel::-webkit-scrollbar-thumb {
  background-color: rgba(64, 158, 255, .5);
  border-radius: 8px;
}

#panel::-webkit-scrollbar-thumb:vertical {
  border-radius: 8px;
}

#panel::-webkit-scrollbar-thumb:hover {
  background-color: rgba(64, 158, 255, .8)
}
</style>
