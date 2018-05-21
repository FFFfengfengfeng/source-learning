!(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) : (global.Weyee = factory());
}(this, (function() {
    'use strict';

    // 判断设备类型
    var UA = typeof window !== 'undefined' && window.navigator.userAgent.toLowerCase();
    var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
    var isAndroid = UA && UA.indexOf('android') > 0;
    
    function Weyee(options) {
        console.log(1);
    }

    // 调用APP loading
    Weyee.prototype.openLoading = function() {
        if (isIOS) {
            console.log('IOS');
        } else {
            console.log('Android');
        }
    }

    // 关闭APP loading
    Weyee.prototype.hideLoading = function() {
        if (isIOS) {
            window.webkit.messageHandlers.hideLoading.postMessage({});
        } else {
            window.android.hideLoading();
        }
    }

    // 设置标题
    Weyee.prototype.setTitle = function(options) {
        if (isIOS) {
            window.webkit.messageHandlers.setTittle.postMessage({title: options.title});
        } else {
            window.android.setTittle(options.title);
        }
    }

    // 调用设备摄像头
    Weyee.prototype.openCamera = function() {
        console.log('打开摄像头了');
    }

    return new Weyee();
})));