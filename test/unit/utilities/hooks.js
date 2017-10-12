/**
 * Created by Emmy on 10/11/2017.
 */

import Vue from 'vue'
import {setupVmWithLocalVue} from './initializers'
import Promise from 'promise-polyfill'

export function sanitizeAndPrepareWindow(done) {
    this.timeout(500)

    Promise.resolve()
        .then((function (){
            return new Promise(function (resolve) {
                // Clean up plugin
                if (window.vm && window.vm.$dialog) {
                    window.vm.$dialog.destroy()
                }
                resolve()
            })
        }))
        .then((function (){
            return new Promise(function (resolve) {
                // clean up app
                if (window.vm) {
                    let elem = window.vm.$el
                    window.vm.$destroy()
                    window.vm.$off()
                    elem.remove()
                    delete window.vm
                }
                Vue.nextTick(resolve)
            })
        })).then(() => {
            // set them up again
            window.vm = setupVmWithLocalVue()
            done()
        }).catch((err) => {
            done(new Error('prepareWindow: '+ err.toString()))
        })

}
