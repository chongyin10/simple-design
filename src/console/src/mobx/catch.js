
import { action, observable, decorate, toJS } from "mobx"

class ReqeustCatch {
    constructor() {
        this.urlCatchMap = [];
        this.msgTitle = '';
    };

    pushUrlCatchMap(urlCatchMap) {
        this.urlCatchMap = (toJS(this.urlCatchMap)).concat([urlCatchMap]);
    }

    removeUrlCatchMap(urlCatchMap) {
        const index = (toJS(this.urlCatchMap)).map(it => it).indexOf(urlCatchMap);
        const urlCatch = (toJS(this.urlCatchMap)).slice(0, index);
        this.urlCatchMap = urlCatch;
    }

    setMsgTitle(msgTitle) {
        this.msgTitle = msgTitle;
    }

    getMsgTitle() {
        return this.msgTitle;
    }

    getUrlCatchMap() {
        return this.urlCatchMap;
    }
}


decorate(ReqeustCatch, {
    urlCatchMap: observable,
    pushUrlCatchMap: action,
    removeUrlCatchMap: action,
    getUrlCatchMap: action,
    setMsgTitle: action,
    getMsgTitle: action,
    msgTitle: observable
})

export default new ReqeustCatch();