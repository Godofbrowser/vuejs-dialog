// utilities

export const noop = () => {}

export const cloneObj = function (obj) {
    return Object.assign({}, obj)
}

export const mergeObjs = function () {
    const values = []
    for (let i = 0; i < arguments.length; i++) {
        // eslint-disable-next-line prefer-rest-params
        values.push(arguments[i])
    }
    return Object.assign(...(values.map(cloneObj)))
}

export const clickNode = function (node) {
    if (document.createEvent) {
        const evt = document.createEvent('MouseEvents');
        evt.initEvent('click', true, false);
        node.dispatchEvent(evt);
    } else {
        // noinspection TypeScriptUnresolvedVariable
        if (document.createEventObject) {
            node.fireEvent('onclick');
        } else if (typeof node.onclick === 'function') {
            node.onclick();
        }
    }
}

export const firstIndex = function (arr, search, prop) {
    let i
    const limit = arr.length

    for (i = 0; i < limit; i++) {
        if (arr[i][prop] === search) {
            return i
        }
    }

    return -1
}

export function getElem(selector, all = false) {
    return all ? document.querySelectorAll(selector) : document.querySelector(selector)
}
