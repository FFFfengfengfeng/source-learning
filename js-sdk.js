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
}

export default new Weyee();