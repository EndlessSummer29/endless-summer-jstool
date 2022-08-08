import axios from 'axios';
import './lib/live2d.min';
import {L2DTargetPoint,L2DViewMatrix,L2DMatrix44,L2DModelMatrix} from './framework/Live2DFramework';
import {MatrixStack} from './utils/MatrixStack';
import {LAppDefine} from  './LAppDefine';
import LAppLive2DManager from  './LAppLive2DManager';
var isModelShown = false;
var isDrawStart = false;
var startX,startY;
export default class DestinyChildInit{
    _Canvas = document.createElement("canvas");

    _live2DMgr = new LAppLive2DManager();
    _Childlist = [];
    _dragMgr = null;
    _viewMatrix = null;
    _projMatrix = null;
    _deviceToScreen = null;
    _L2DModelMatrix = null;
    _gl = null;
    constructor(dom){
        if(!dom){
            throw new ReferenceError('请传入承载canvas的dom')
        }else{
            this._DOM = dom;
            this.init()
        }
        this.windowmousemove = this.windowmousemove.bind(this)
        this.windowmouseup = this.windowmouseup.bind(this)
    }
    init(){
        this._Canvas.id = "glcanvas";//最后处理修改位置
        this._DOM.style.position = 'relative'
        this._DOM.appendChild(this._Canvas);
        // this._Canvas.style.width = '100%';
        // this._Canvas.style.height = '100%';
        console.log('window.innerWidth',window.innerWidth)
        this._Canvas.width = window.innerWidth;
        this._Canvas.height = window.innerHeight;
    }
    getChildlist(url='/live2d/destinychild/names.json',defaultModel){
        if(!url)throw new ReferenceError('请设置文件路径')
        var _This = this;
        const service = axios.create({
            baseURL: '', // 请求本地json文件，那么baseURL取空字符串，域名就会是项目域名
            timeout: 30000,
        });
        service.get(url).then(res => {     
            console.log('res',res.data)
            _This._Childlist = eval(res.data);
            _This.Childinit(defaultModel);
            _This.Event()
        }).catch(err=>{
            console.log('err',err)
        })
    }
    Event(){
        let _This = this
        window.addEventListener("resize", function () {
            var width = _This._DOM.offsetWidth;
            var height = _This._DOM.offsetHeight;
            _This._Canvas.width = width;
            _This._Canvas.height = height;
            console.log(width, height)
            var ratio = height / width;
            var left = LAppDefine.VIEW_LOGICAL_LEFT;
            var right = LAppDefine.VIEW_LOGICAL_RIGHT;
            var bottom = -ratio;
            var top = ratio;
            _This._viewMatrix.setScreenRect(left, right, bottom, top);
            // _This._viewMatrix.multTranslate(0, - 0);
            // _This._deviceToScreen.multScale(2 / width, -2 / width);




            // // var scaleX = 2.0 / _This._Canvas.width;
            // // console.log(scaleX)
            // // var scaleY = -scaleX;
            // // var offsetX = 1.4;
            // // _This._L2DModelMatrix.scale(scaleX * offsetX, scaleY);
            // // _This._L2DModelMatrix.setCenterPosition(0.0,0.0)
            // // console.log(_This._L2DModelMatrix.getArray())
            // // _This._projMatrix.setMatrix(_This._L2DModelMatrix.getArray())



            // // _This._viewMatrix.setScreenRect(
            // //     LAppDefine.VIEW_LOGICAL_LEFT, 
            // //     LAppDefine.VIEW_LOGICAL_RIGHT, 
            // //     -(window.innerHeight/window.innerWidth), 
            // //     window.innerHeight/window.innerWidth);
            // // let resolution = new THREE.Vector2(document.body.clientWidth, window.innerHeight);
            // // _This._Camera.resize(resolution);
            // // _This._Renderer.setSize(_This._DOM.offsetWidth, _This._DOM.offsetHeight);
            // // _This._projMatrix.multScale((_This._DOM.offsetHeight / _This._DOM.offsetWidth), 1); // adjust to height
        });
        _This._Canvas.addEventListener('click', function (e) {
            e.preventDefault();
            var rect = e.target.getBoundingClientRect();
            var vx = _This.transformViewX(e.clientX - rect.left);
            var vy = _This.transformViewY(e.clientY - rect.top);
            _This._live2DMgr.tapEvent(vx, vy, e);
        })
        _This._Canvas.addEventListener('mousedown', function (e) {
            e.preventDefault();
            startX = e.clientX, startY = e.clientY;
            _This._Canvas.addEventListener('mousemove',_This.windowmousemove,false)
            _This._Canvas.addEventListener('mouseup', _This.windowmouseup,false)
        })
        _This._Canvas.addEventListener('mousewheel', function (e) {
            e.preventDefault();
            if (e.clientX < 0 || _This._Canvas.clientWidth < e.clientX || e.clientY < 0 || _This._Canvas.clientHeight < e.clientY)return;
            if (e.wheelDelta > 0) _This.modelScaling(1.1);
            else _This.modelScaling(0.9);
        })
    }
    Childinit(defaultModel){
        var width = window.innerWidth;
        console.log('width----------------------------------------->>>>',width)
        var height = window.innerHeight;
        console.log('height----------------------------------------->>>>',height)
        this._dragMgr = new L2DTargetPoint();
        var ratio = height / width;
        var left = LAppDefine.VIEW_LOGICAL_LEFT;
        var right = LAppDefine.VIEW_LOGICAL_RIGHT;
        var bottom = -ratio;
        var top = ratio;
        // this._L2DModelMatrix = new L2DModelMatrix(width,height)
        this._viewMatrix = new L2DViewMatrix();
        this._viewMatrix.setScreenRect(left, right, bottom, top);
        this._viewMatrix.setMaxScreenRect(LAppDefine.VIEW_LOGICAL_MAX_LEFT,LAppDefine.VIEW_LOGICAL_MAX_RIGHT,LAppDefine.VIEW_LOGICAL_MAX_BOTTOM,LAppDefine.VIEW_LOGICAL_MAX_TOP);
        this._viewMatrix.setMaxScale(LAppDefine.VIEW_MAX_SCALE);
        this._viewMatrix.setMinScale(LAppDefine.VIEW_MIN_SCALE);
        // this._L2DModelMatrix.setCenterPosition(0.0,0.0)
        this._projMatrix = new L2DMatrix44();
        this._projMatrix.multScale((height / width), 1); // adjust to height
        this._projMatrix.multScale(.5, .5);
        this._deviceToScreen = new L2DMatrix44();
        this._deviceToScreen.multTranslate(-width / 2.0, -height / 2.0);
        this._deviceToScreen.multScale(2 / width, -2 / width);
        this._gl = this.getWebGLContext();
        Live2D.setGL(this._gl);
        this._gl.clearColor(0.5, 0.5, 0.5, 1.0);
        this.changeModel(defaultModel);
        this.startDraw();
    }
    startDraw() {
        var _This = this
        if (!isDrawStart) {
            isDrawStart = true;
            (function tick() {
                _This.draw();
                var requestAnimationFrame =
                    window.requestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.msRequestAnimationFrame;
                requestAnimationFrame(tick, _This._Canvas);
            })();
        }
        else{
            console.log("startDrawERR")
        }
    }
    draw() {
        var _This = this
        MatrixStack.reset();
        MatrixStack.loadIdentity();
        _This._dragMgr.update();
        _This._live2DMgr.setDrag(_This._dragMgr.getX(), _This._dragMgr.getY());
        _This._gl.clear(_This._gl.COLOR_BUFFER_BIT);

        MatrixStack.multMatrix(_This._projMatrix.getArray());
        MatrixStack.multMatrix(_This._viewMatrix.getArray());
        MatrixStack.push();

        for (var i = 0; i < _This._live2DMgr.numModels(); i++) {
            var model = _This._live2DMgr.getModel(i);
            if (model == null) return;
            if (model.initialized && !model.updating) {
                model.update();
                model.draw(_This._gl);
                if (!isModelShown && i == _This._live2DMgr.numModels() - 1) {
                    isModelShown = !isModelShown;
                }
            }
        }

        MatrixStack.pop();
    }
    changeModel(name) {
        isModelShown = false;
        this._live2DMgr.reloadFlg = true;
        this._live2DMgr.count++;
        this._live2DMgr.changeModel(this._gl,'live2d/destinychild/' + name + '/model.json');
    }
    getWebGLContext() {
        var _This = this;
        var NAMES = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl'];
        for (var i = 0; i < NAMES.length; i++) {
            try {
                var ctx = _This._Canvas.getContext(NAMES[i], { premultipliedAlpha: true });
                if (ctx) return ctx;
            }
            catch (e) {
                console.log('getWebGLContextERR:',e)
            }
        }
        return null;
    }
    windowmousemove(e) {
        var offsetX = e.clientX - startX, offsetY = e.clientY - startY;
        startX = e.clientX, startY = e.clientY;
        this._viewMatrix.multTranslate(offsetX / 225, - offsetY / 225);
    }
    windowmouseup() {
        this._Canvas.removeEventListener("mousemove",this.windowmousemove,false)
        this._Canvas.removeEventListener("mouseup",this.windowmouseup,false)
    }
    transformViewX(deviceX) {
        var screenX = this._deviceToScreen.transformX(deviceX);
        return this._viewMatrix.invertTransformX(screenX);
    }
    transformViewY(deviceY) {
        var screenY = this._deviceToScreen.transformY(deviceY);
        return this._viewMatrix.invertTransformY(screenY);
    }
    modelScaling(scale) {
        var isMaxScale = this._viewMatrix.isMaxScale();
        var isMinScale = this._viewMatrix.isMinScale();
        this._viewMatrix.adjustScale(0, 0, scale);
        if (!isMaxScale) {
            if (this._viewMatrix.isMaxScale()) {
                this._live2DMgr.maxScaleEvent();
            }
        }
        if (!isMinScale) {
            if (this._viewMatrix.isMinScale()) {
                this._live2DMgr.minScaleEvent();
            }
        }
    }
}