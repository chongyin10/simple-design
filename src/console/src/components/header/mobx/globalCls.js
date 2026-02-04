
import { action, observable, decorate } from "mobx"

class GlobalCls {

    regionList = [];
    region = { key: 'area', label: '选择地域', id: "" };
    projectInfo = null;
    projectList = [];
    userInfo = '';

    setRegionList(regionList) {
        this.regionList = regionList;
    }

    setRegion(region) {
        const dom = document.getElementById(`idp-region-1106`);
        if (dom) dom.innerText = region?.label;
        this.region = region;
    }

    setProjectInfo(projectInfo) {
        this.projectInfo = projectInfo;
    }

    setProjectList(projectList) {
        this.projectList = projectList;
    }

    setUserInfo(userInfo) {
        this.userInfo = userInfo;
    }
}

decorate(GlobalCls, {
    setRegionList: observable,
    setRegion: observable,
    setProjectInfo: observable,
    setProjectList: observable,
    setUserInfo: observable,
    regionList: action,
    region: action,
    projectList: action,
    projectInfo: action,
    userInfo: action
})

const GlobalClsMobx = new GlobalCls();

export default GlobalClsMobx;