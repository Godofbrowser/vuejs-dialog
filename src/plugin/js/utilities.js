// utilities

export const noop = () => {}

export const cloneObj = function (obj) {
    return Object.assign({}, obj)
}

export const mergeObjs = function () {
    return Object.assign(...(Object.values(arguments).map(cloneObj)))
}