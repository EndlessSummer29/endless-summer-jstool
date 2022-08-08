<template>
  <div>
    <canvas id="glcanvas"></canvas>
  </div>
</template>

<script>
import axios from 'axios'

// live2d
import '../../../../packages/utils/live2d/lib/live2d.min'
import {L2DTargetPoint,L2DViewMatrix,L2DMatrix44} from '../../../../packages/utils/live2d/framework/Live2DFramework'
import {MatrixStack} from '../../../../packages/utils/live2d/utils/MatrixStack'
import '../../../../packages/utils/live2d/utils/ModelSettingJson'
import {LAppDefine} from  '../../../../packages/utils/live2d/LAppDefine'
import '../../../../packages/utils/live2d/LAppModel'
import LAppLive2DManager from  '../../../../packages/utils/live2d/LAppLive2DManager'
// import '../../../../packages/utils/live2d/SampleApp1'
const service = axios.create({
    baseURL: '', // 请求本地json文件，那么baseURL取空字符串，域名就会是项目域名
    timeout: 30000,
});
var $msg;
// c000_01
// c003_17//
// c285_11
var defaultModel = 'c003_17';
var live2DMgr,isDrawStart,gl,canvas;
var dragMgr,viewMatrix,projMatrix,deviceToScreen,isMoving;
var drag;
var nameList;
var oldLen = 0;
var lastMouseX = 0;
var lastMouseY = 0;

var isModelShown = false;
export default {
    data(){
        return{

        }
    },
    methods:{
        modelinit(){
            var _That = this
            live2DMgr = new LAppLive2DManager();
            this.initL2dCanvas('glcanvas');
            service.get('/live2d/destinychild/names.json').then(res => {     
                console.log('res',res.data)
                nameList = eval(res.data);
                _That.init(defaultModel);
            }).catch(err=>{
                console.log('err',err)
            })
        },
        initL2dCanvas(canvasId) {

            canvas = document.getElementById(canvasId);
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // if (canvas.addEventListener) {
            //     canvas.addEventListener('mousewheel', mouseEvent, false);
            //     canvas.addEventListener('click', mouseEvent, false);

            //     canvas.addEventListener('mousedown', mouseEvent, false);
            //     canvas.addEventListener('mousemove', mouseEvent, false);

            //     canvas.addEventListener('mouseup', mouseEvent, false);
            //     canvas.addEventListener('mouseout', mouseEvent, false);
            //     canvas.addEventListener('contextmenu', mouseEvent, false);


            //     canvas.addEventListener('touchstart', touchEvent, false);
            //     canvas.addEventListener('touchend', touchEvent, false);
            //     canvas.addEventListener('touchmove', touchEvent, false);

            // }

        },
        showMessage(text, delay) {
            console.log('showMessage',text, delay)
            if ($msg === undefined) {
                console.log("$msg = $('<div></div>').attr('class', 'message');")
                // $msg = $('<div></div>').attr('class', 'message');
                // $('body').append($msg);
            }
            // if ($msg.css('display') != 'none') {
            //     $msg.finish();
            // }
            // $msg.html(text);
            // $msg.fadeIn(500).delay(delay).fadeOut(500);
        },
        getUrlParam() {
            var url = window.location.href;
            param = url.split('?')[1];
            if (url === undefined) {
                return;
            }
            for (var i in nameList) {
                if (param == nameList[i]) {
                    return param;
                }
            }
        },
        init(defaultModel) {
            // defaultModel = getUrlParam() || defaultModel;
            // showMessage('滚动滚轮以缩放<br>点击左下角图标开始拖动', 4000);

            // // set translate method
            // isMoving = false;
            // $move = $('#move');
            // // $move.on('click', function () {
            // //     if (isMoving == true) {
            // //         isMoving = false;
            // //         $move.removeClass('moving');
            // //         $(document).off('mousedown');
            // //     }
            // //     else {
            // //         isMoving = true;
            // //         $move.addClass('moving');
            // //         $(document).on('mousedown', function (e) {
            // //             if (e.button != 0)
            // //                 return;
            // //             var startX = e.clientX, startY = e.clientY;
            // //             $(document).on('mousemove', function (e) {
            // //                 offsetX = e.clientX - startX, offsetY = e.clientY - startY;
            // //                 startX = e.clientX, startY = e.clientY;
            // //                 thisRef.viewMatrix.multTranslate(offsetX / 225, - offsetY / 225);
            // //             })
            // //             $(document).on('mouseup', function () {
            // //                 $(document).off('mousemove');
            // //                 $(document).off('mouseup');
            // //             })
            // //         })
            // //     }
            // // })

            // // set model list
            // $box = $('#box');
            // $currentModel = null;
            // for (var i = 0; i < nameList.length; i++) {
            //     (function (name) {
            //         var $button = $('<button></button>');
            //         $button.text(name);
            //         if (name[0] == 'c') {
            //             $button.attr('title', name);
            //             $button.attr('data-original', './assets/live2d/' + name + '/icon.png');
            //             $button.lazyload({
            //                 container: $box,
            //                 load: function () {
            //                     $button.text('');
            //                     $button.css('background-color', '#0000');
            //                     $button.css('background-position', '50% 50%');
            //                 }
            //             });
            //         }
            //         $button.attr('id', name);
            //         $button.on('click', function () {
            //             $currentModel.removeClass('current');
            //             $(this).addClass('current');
            //             $currentModel = $(this);
            //             changeModel(this.id);
            //             scrollToCurrent();
            //         })
            //         $box.append($button);
            //         if (name == defaultModel) {
            //             $button.addClass('current')
            //             $currentModel = $button;
            //         }
            //     })(nameList[i]);
            // }

            // //set scroll method
            // $box.hover(null, function () {
            //     setTimeout(function () {
            //         scrollToCurrent();
            //     }, 500);
            // })

            // // set share method
            // $('#share').on('click', function () {
            //     var url = setUrlParam();
            //     var input = $('<input>').attr('value', url).attr('readonly', 'readonly');
            //     $('body').append(input);
            //     input.select();
            //     document.execCommand('copy');
            //     input.remove();
            //     showMessage('链接已复制至剪贴板', 1000);
            // })
            // $('#share').on('mouseenter', function () {
            //     showMessage('点击左上分享按钮，即可将当前角色及动作分享给他人', 4000);
            // })

            // // set scale method
            // document.onwheel = function (e) {
            //     if (e.target != canvas)
            //         return;
            //     if (e.wheelDelta > 0)
            //         modelScaling(1.1);
            //     else modelScaling(0.9);
            // }

            var width = canvas.width;
            var height = canvas.height;

            dragMgr = new L2DTargetPoint();


            var ratio = height / width;
            var left = LAppDefine.VIEW_LOGICAL_LEFT;
            var right = LAppDefine.VIEW_LOGICAL_RIGHT;
            var bottom = -ratio;
            var top = ratio;

            viewMatrix = new L2DViewMatrix();


            viewMatrix.setScreenRect(left, right, bottom, top);


            viewMatrix.setMaxScreenRect(LAppDefine.VIEW_LOGICAL_MAX_LEFT,
                LAppDefine.VIEW_LOGICAL_MAX_RIGHT,
                LAppDefine.VIEW_LOGICAL_MAX_BOTTOM,
                LAppDefine.VIEW_LOGICAL_MAX_TOP);

            viewMatrix.setMaxScale(LAppDefine.VIEW_MAX_SCALE);
            viewMatrix.setMinScale(LAppDefine.VIEW_MIN_SCALE);

            projMatrix = new L2DMatrix44();
            // projMatrix.multScale(1, (width / height)); // adjust to width
            projMatrix.multScale((height / width), 1); // adjust to height
            projMatrix.multScale(.6, .6);


            deviceToScreen = new L2DMatrix44();
            deviceToScreen.multTranslate(-width / 2.0, -height / 2.0);
            deviceToScreen.multScale(2 / width, -2 / width);



            gl = this.getWebGLContext();
            console.log('gl',gl)
            // if (gl) {
            //     console.log("l2dError('Failed to create WebGL context.')")
            //     // l2dError('Failed to create WebGL context.');
            //     return;
            // }
            console.log('Live2D',Live2D)
            Live2D.setGL(gl);


            gl.clearColor(0.5, 0.5, 0.5, 1.0);

            console.log('glclearColor',gl)
            this.changeModel(defaultModel);
            // scrollToCurrent(0);

            this.startDraw();
        },
        startDraw() {
            var _THat = this
            console.log('startDraw')
            if (!isDrawStart) {
                isDrawStart = true;
                (function tick() {
                    _THat.draw();

                    var requestAnimationFrame =
                        window.requestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.msRequestAnimationFrame;


                    requestAnimationFrame(tick, canvas);
                })();
            }
            else{
                console.log(111)
            }
        },
        draw() {
            // l2dLog('--> draw()');

            MatrixStack.reset();
            MatrixStack.loadIdentity();

            dragMgr.update();
            live2DMgr.setDrag(dragMgr.getX(), dragMgr.getY());


            gl.clear(gl.COLOR_BUFFER_BIT);

            MatrixStack.multMatrix(projMatrix.getArray());
            MatrixStack.multMatrix(viewMatrix.getArray());
            MatrixStack.push();

            for (var i = 0; i < live2DMgr.numModels(); i++) {
                var model = live2DMgr.getModel(i);

                if (model == null) return;

                if (model.initialized && !model.updating) {
                    model.update();
                    model.draw(gl);

                    if (!isModelShown && i == live2DMgr.numModels() - 1) {
                        isModelShown = !isModelShown;
                    }
                }
            }

            MatrixStack.pop();
        },
        changeModel(name) {
            isModelShown = false;

            live2DMgr.reloadFlg = true;
            live2DMgr.count++;

            live2DMgr.changeModel(gl, name);
        },
        getWebGLContext() {
            console.log('sssssssssssssssssssss')
            var NAMES = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl'];

            for (var i = 0; i < NAMES.length; i++) {
                try {

                    var ctx = canvas.getContext(NAMES[i], { premultipliedAlpha: true });
                    console.log('ctxctx',ctx)
                    if (ctx) return ctx;
                }
                catch (e) {
                    console.log('getWebGLContextERR:',e)
                }
            }
            return null;
        },
    },
    mounted(){
        this.modelinit()
    }
    
}
</script>

<style>

</style>