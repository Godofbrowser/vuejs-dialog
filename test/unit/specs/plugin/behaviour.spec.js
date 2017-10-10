/**
 * Created by Emmy on 10/8/2017.
 */

import Plugin from '../../../../src/plugin/js/index'
import {assert, expect} from 'chai'
import Vue from 'vue'
import Promise from 'promise-polyfill'

Vue.config.productionTip = false
let vm = setupVue()

describe('Calling "$dialog.alert()"', function () {
    it('Should return a promise', function () {
        vm.checkAlert()
    })
})

describe('Calling "$dialog.confirm()"', function () {
    it('Should return a promise', function () {
        vm.checkConfirm()
    })
})

console.log(document.body.innerHTML)
function setupVue() {
    Vue.use(Plugin)

    let div = document.createElement('div')
    div.id = 'app'
    document.body.appendChild(div)

    return new Vue({
        $el: '#app',
        methods: {
            checkAlert(){
                let dg = this.$dialog.alert('Simple Alert')
                expect(dg).to.be.instanceOf(Promise)
            },
            checkConfirm(){
                let dg = this.$dialog.confirm('Please confirm')
                expect(dg).to.be.instanceOf(Promise)
            }
        }
    })
}