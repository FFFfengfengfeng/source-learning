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

    // 调用设备摄像头
    Weyee.prototype.openCamera = function() {
        console.log('打开摄像头了');
    }

    return new Weyee();
})));