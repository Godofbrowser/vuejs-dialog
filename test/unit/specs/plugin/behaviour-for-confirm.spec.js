/**
 * Created by Emmy on 10/8/2017.
 */

import * as HOOKS from '../../utilities/hooks'
import {getElem, nodeLength} from '../../utilities/helpers'
import { assert, expect } from 'chai'
import Vue from 'vue'
import Promise from 'promise-polyfill'

Vue.config.productionTip = false

describe('Calling "confirm()"', function () {
    let dg

    before(HOOKS.sanitizeAndPrepareWindow)
    before(function (done) {
        dg = window.vm.triggerConfirm()
        Vue.nextTick(done) // be sure done has updated before proceeding
    })

    it('Should return a promise', function () {
        expect(dg).to.be.instanceOf(Promise)
    })

    it('Should make the dialog visible', function () {
        assert.strictEqual(nodeLength('.dg-container'), 1)
    })

    it('Should make the ok button visible', function () {
        assert.strictEqual(nodeLength('.dg-btn--ok'), 1)
    })

    it('Should make the cancel button visible', function () {
        assert.strictEqual(nodeLength('.dg-btn--cancel'), 1)
    })
})

describe('Clicking \'ok\' on #confirm()', function () {
    beforeEach(HOOKS.sanitizeAndPrepareWindow)

    it('Should resolve the promise', function (done) {
        window.vm.triggerConfirm().then(() => {done()}) // expected
        Vue.nextTick(() => window.vm.clickDialogBtn('ok'))
    })
})

describe('Clicking \'cancel\' on #confirm()', function () {
    beforeEach(HOOKS.sanitizeAndPrepareWindow)

    it('Should reject the promise', function (done) {
        window.vm.triggerConfirm()
            .then(() => {done(new Error('Cancel button should Reject promise'))})
            .catch(() => {done()}) // expected
        Vue.nextTick(() => window.vm.clickDialogBtn('cancel'))
    })
})