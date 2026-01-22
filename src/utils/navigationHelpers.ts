import { NavigationItem } from '../components/Navigation/types';

// 全局缓存
const rootCache = new Map<string, string>();
const baseRootCache = new Map<string, string>();
const parentNodeCache = new Map<string, NavigationItem>();
const itemCache = new Map<string, NavigationItem>();
const pathCache = new Map<string, string[]>(); // 存储从根节点到当前节点的路径

// 清空所有缓存的函数
export const clearNavigationCache = () => {
    rootCache.clear();
    baseRootCache.clear();
    parentNodeCache.clear();
    itemCache.clear();
    pathCache.clear();
};

// 构建所有缓存
export const buildNavigationCache = (items: NavigationItem[]) => {
    clearNavigationCache();
    
    const buildCache = (menuItems: NavigationItem[], parentItem?: NavigationItem, currentPath: string[] = []) => {
        for (const item of menuItems) {
            // 构建项目缓存
            itemCache.set(item.key, item);
            
            // 构建父节点缓存
            if (parentItem) {
                parentNodeCache.set(item.key, parentItem);
            }
            
            // 构建路径缓存
            const newPath = [...currentPath, item.key];
            pathCache.set(item.key, newPath);
            
            // 构建根节点缓存（第一个节点就是根节点）
            if (newPath.length === 1) {
                rootCache.set(item.key, item.key);
                baseRootCache.set(item.key, item.key);
            } else {
                rootCache.set(item.key, newPath[0]);
                baseRootCache.set(item.key, newPath[0]);
            }
            
            // 递归处理子节点
            if (item.childrens) {
                buildCache(item.childrens, item, newPath);
            }
        }
    };
    
    buildCache(items);
};

// 构建项目缓存
export const buildItemCache = (items: NavigationItem[]) => {
    const buildCache = (menuItems: NavigationItem[]) => {
        for (const item of menuItems) {
            itemCache.set(item.key, item);
            if (item.childrens) {
                buildCache(item.childrens);
            }
        }
    };
    buildCache(items);
};

// 查找根节点
export const findRoot = (items: NavigationItem[], key: string): string | undefined => {
    // 检查缓存
    if (rootCache.has(key)) {
        return rootCache.get(key);
    }
    
    const search = (menuItems: NavigationItem[], targetKey: string): string | undefined => {
        for (const item of menuItems) {
            if (item.key === targetKey) {
                return item.key;
            }
            if (item.childrens) {
                const found = search(item.childrens, targetKey);
                if (found) {
                    rootCache.set(targetKey, item.key);
                    return item.key;
                }
            }
        }
        return undefined;
    };
    
    const result = search(items, key);
    if (result) {
        rootCache.set(key, result);
    }
    return result;
};

// 查找基础根节点（最顶级菜单key）
export const findBaseRoot = (items: NavigationItem[], key: string): string | undefined => {
    // 检查缓存
    debugger
    if (baseRootCache.has(key)) {
        return baseRootCache.get(key);
    }

    // 优先使用路径缓存
    if (pathCache.has(key)) {
        const path = pathCache.get(key);
        const rootKey = path && path.length > 0 ? path[0] : undefined;
        if (rootKey) {
            baseRootCache.set(key, rootKey);
        }
        return rootKey;
    }

    const findInChildren = (menuItems: NavigationItem[], targetKey: string): boolean => {
        for (const item of menuItems) {
            if (item.key === targetKey) {
                return true;
            }
            if (item.childrens && findInChildren(item.childrens, targetKey)) {
                return true;
            }
        }
        return false;
    };

    // 遍历顶级菜单项
    for (const item of items) {
        if (item.key === key) {
            baseRootCache.set(key, item.key);
            return item.key;
        }
        if (item.childrens && findInChildren(item.childrens, key)) {
            baseRootCache.set(key, item.key);
            return item.key;
        }
    }

    return undefined;
};

// 查找父节点
export const findParentNode = (items: NavigationItem[], key: string): NavigationItem | undefined => {
    // 检查缓存
    if (parentNodeCache.has(key)) {
        return parentNodeCache.get(key);
    }

    const search = (menuItems: NavigationItem[], targetKey: string): NavigationItem | undefined => {
        for (const item of menuItems) {
            // 如果直接子菜单中有目标key，当前item就是父节点
            if (item.childrens && item.childrens.some(child => child.key === targetKey)) {
                parentNodeCache.set(targetKey, item);
                return item;
            }

            // 递归搜索子菜单
            if (item.childrens) {
                const found = search(item.childrens, targetKey);
                if (found) {
                    parentNodeCache.set(targetKey, found);
                    return found;
                }
            }
        }
        return undefined;
    };

    // 检查顶级菜单项
    for (const item of items) {
        // 如果目标key是当前顶级菜单项的直接子菜单
        if (item.childrens && item.childrens.some(child => child.key === key)) {
            parentNodeCache.set(key, item);
            return item;
        }

        // 递归搜索子菜单
        if (item.childrens) {
            const found = search(item.childrens, key);
            if (found) {
                parentNodeCache.set(key, found);
                return found;
            }
        }
    }

    parentNodeCache.set(key, undefined as any);
    return undefined;
};

// 根据key查找项目
export const findItemByKey = (items: NavigationItem[], key: string): NavigationItem | undefined => {
    // 检查缓存
    if (itemCache.has(key)) {
        return itemCache.get(key);
    }

    const search = (menuItems: NavigationItem[]): NavigationItem | undefined => {
        for (const item of menuItems) {
            if (item.key === key) {
                itemCache.set(key, item);
                return item;
            }
            if (item.childrens) {
                const found = search(item.childrens);
                if (found) {
                    itemCache.set(key, found);
                    return found;
                }
            }
        }
        return undefined;
    };

    const result = search(items);
    if (result) {
        itemCache.set(key, result);
    }
    return result;
};

// 检查子菜单中是否有选中的项，用于自动展开父菜单
export const checkSelectedChildren = (items: NavigationItem[], selectedKey: string): string[] => {
    // 使用路径缓存，避免递归查找
    if (pathCache.has(selectedKey)) {
        const path = pathCache.get(selectedKey);
        if (path) {
            // 返回路径中除了最后一个节点（自身）之外的所有节点
            return path.slice(0, -1);
        }
    }
    
    //  fallback到递归查找
    const openKeys: string[] = [];
    const findSelected = (menuItems: NavigationItem[], parentKeys: string[]): boolean => {
        for (const item of menuItems) {
            if (item.key === selectedKey) {
                openKeys.push(...parentKeys);
                return true;
            }
            if (item.childrens) {
                const found = findSelected(item.childrens, [...parentKeys, item.key]);
                if (found) {
                    return true;
                }
            }
        }
        return false;
    };
    findSelected(items, []);
    return openKeys;
};