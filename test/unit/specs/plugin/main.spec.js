/**
 * Created by Emmy on 10/8/2017.
 */

import Plugin from '../../../../src/plugin/js/index'
import should from 'should'
import {assert} from 'chai'
import Vue from 'vue'

Vue.config.productionTip = false

describe('Plugin installer', function () {
    it('"Plugin.install" Should be a function', function () {
        should(Plugin.install).be.a.Function()
    })
})

Vue.use(Plugin)

describe('Plugin Installed', function () {
    it('Plugin Should be installed', function () {
        assert.property(Vue, 'dialog')
    })
})

describe('Plugin Available', function () {
    it('"$dialog" Should be a available on the created, mounted hooks', function () {
        new Vue({
            created(){
                assert.property(this, '$dialog')
            },
            mounted(){
                assert.property(this, '$dialog')
            },
            render(){
                return ''
            }
        }).$mount()
    })
})

describe('Plugin Available', function () {
    it('"$dialog" Should be a available in component methods', function () {
        let vm = new Vue({
            methods: {
                check(){
                    assert.property(this, '$dialog')
                }
            },
            render(){
                return ''
            }
        }).$mount()

        vm.check()
    })
})
