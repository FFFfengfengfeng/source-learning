class Weyee {
    constructor() {
        this.UA = typeof window !== 'undefined' && window.navigator.userAgent.toLowerCase();
        this.isIOS = this.UA && /iphone|ipad|ipod|ios/.test(this.UA);
        this.isAndroid = this.UA && this.UA.indexOf('android') > 0;
    }

    // 设置标题
    setTitle(title) {
        if (this.isIOS) {
            window.webkit.messageHandlers.setTittle.postMessage({title: options.title});
        } else {
            window.android.setTittle(options.title);
        }
    }

    // 关闭loading
    hideLoading() {
        if (this.isIOS) {
            window.webkit.messageHandlers.hideLoading.postMessage({});
        } else {
            window.android.hideLoading();
        }
    }

    // 打开loading
    showLoading() {
        if (this.isIOS) {
            window.webkit.messageHandlers.showLoading.postMessage({});
        } else {
            window.android.showLoading();
        }
    }

    // 打开日期插件
    openDate() {
        if (this.isIOS) {
            window.webkit.messageHandlers.showSelectDate.postMessage('openDate');
        } else {
            window.android.showSelectDate('fuckdate');
        }
    }
    
    // 上传图片
    upload() {
        if (this.isIOS) {
            window.webkit.messageHandlers.upload.postMessage({title: 'upload'});
        } else {
            window.android.upload()
        }
    }

    // 查看大图
    showBig(options) {
        if (this.isIOS) {
            window.webkit.messageHandlers.showBig.postMessage({index: options.index, imgUrls: options.imgs})
        } else {
            window.android.showBig(options.index, options.imgs)
        }
    }

    // 关闭webView
    closeWebview() {
        if (this.isIOS) {
            window.webkit.messageHandlers.closeWebview.postMessage({})
        } else {
            window.android.closeWebview()
        }
    }

    // 获取经营日报的次数
    setDailyTimes(options) {
        if (this.isIOS) {
            window.webkit.messageHandlers.setDailyTimes.postMessage({times: options.daily_times});
        } else {
            window.android.closeWebview(options.daily_times)
        }
    }
}

export default new Weyee();