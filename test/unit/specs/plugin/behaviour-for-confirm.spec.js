/**
 * Created by Emmy on 10/8/2017.
 */

import * as HOOKS from '../../utilities/hooks'
import {getElem} from '../../utilities/helpers'
import { assert, expect } from 'chai'
import Vue from 'vue'
import Promise from 'promise-polyfill'

Vue.config.productionTip = false

describe('Calling "confirm()"', function () {
    // this.timeout(3000);
    beforeEach(HOOKS.sanitizeAndPrepareWindow)

    it('Should return a promise', function () {
        let dg = window.vm.triggerConfirm()
        expect(dg).to.be.instanceOf(Promise)
    })

    it('Should make the dialog visible', function (done) {
        window.vm.triggerConfirm()
        let nodes = getElem('dg-container')

        Vue.nextTick(() => {
            try{
                assert.equal(nodes.length, 1)
                done()
            }catch(err){
                done(new Error(err.toString()))
            }
        })
    })
})