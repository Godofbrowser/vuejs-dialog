/**
 * Created by Emmy on 10/11/2017.
 */

export function getElem(selector, all = false) {
    return all ? document.querySelectorAll(selector) : document.querySelector(selector)
}
export function nodeLength(selector) {
    return getElem(selector, true).length
}
