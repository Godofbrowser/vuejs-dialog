// utilities

export const noop = () => {}

export const cloneObj = function (obj) {
    return Object.assign({}, obj)
}

export const mergeObjs = function () {
    return Object.assign(...(Object.values(arguments).map(cloneObj)))
}

export const clickNode = function (node) {
    if (document.createEvent) {
        let evt = document.createEvent('MouseEvents');
        evt.initEvent('click', true, false);
        node.dispatchEvent(evt);
    } else if (document.createEventObject) {
        node.fireEvent('onclick');
    } else if (typeof node.onclick === 'function') {
        node.onclick();
    }
}