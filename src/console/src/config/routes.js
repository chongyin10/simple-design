// 根据menus生成routes数组
import menus from "./menus"

function flatten(array) {
    const arr = []
    for(let item of array){
        if (item.children) {
            arr.push(item, ...flatten(item.children))
        } else {
            arr.push(item)
        }
    }
    return arr
}

const routes = flatten(menus()).map((item, index) => ({
    path: item.key,
    component: item.component,
    roles: item.roles,
    permission: item.permission,
    children: item.children || []
}))

export default routes
