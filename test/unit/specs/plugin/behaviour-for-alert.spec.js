/**
 * Created by Emmy on 10/8/2017.
 */

import * as HOOKS from '../../utilities/hooks'
import {getElem} from '../../utilities/helpers'
import { assert, expect } from 'chai'
import Vue from 'vue'
import Promise from 'promise-polyfill'

Vue.config.productionTip = false

describe('Calling "alert()"', function () {
    // this.timeout(3000);
    beforeEach(HOOKS.sanitizeAndPrepareWindow)

    it('Should return a promise', function () {
        let dg = window.vm.triggerAlert()
        expect(dg).to.be.instanceOf(Promise)
    })

    it('Should make the dialog visible', function (done) {
        let elem = getElem('dg-container')
        window.vm.triggerAlert().then(() => {}).catch(() => {})

        Vue.nextTick(() => {
            try{
                assert.equal(getElem('dg-container').length, 1)
                done()
            }catch(err){
                done(new Error(err.toString()))
            }
        })
    })
})

describe('with #alert(), Clicking "ok"', function () {
    // this.timeout(3000);
    beforeEach(HOOKS.sanitizeAndPrepareWindow)

    it('Should resolve the promise', function (done) {
        window.vm.triggerAlert()
            .then(() => {done()}) // expected
            .catch(err => { done(err.toString())})

        Vue.nextTick(() => {
            window.vm.clickDialogBtn('ok')
        })
    })
})

describe('with #alert(), user ', function () {
    // this.timeout(3000);
    before(HOOKS.sanitizeAndPrepareWindow)
    before(function(){
        window.vm.triggerAlert()
    })

    it('Should see ok button', function () {
        Vue.nextTick(() => {
            assert.equal(getElem('dg-btn--ok').length, 1)
        })
    })

    it('Should not see cancel button', function () {
        Vue.nextTick(() => {
            assert.equal(getElem('dg-btn--cancel').length, 0)
        })
    })
})