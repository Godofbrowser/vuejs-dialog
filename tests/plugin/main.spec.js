/**
 * Created by Emmy on 10/8/2017.
 */

import Plugin from '../../src/plugin/js/index'
import should from 'should'
import {assert} from 'chai'

describe('Plugin', function () {
    describe('#installer', function () {
        it('"Plugin.install" Should be a function', function () {
            should(Plugin.install).be.a.Function()
        })
    })

    describe('#Installed', function () {
        it('Plugin Should be installed', function () {
            const Vue = require('vue').default
            Vue.use(Plugin)

            assert.property(Vue, 'dialog')
        })
    })

    describe('#Available', function () {
        it('"$dialog" Should be a available on the created, mounted hooks', function () {
            const Vue = require('vue').default
            Vue.use(Plugin)

            new Vue({
                created(){
                    assert.property(this, '$dialog')
                },
                mounted(){
                    assert.property(this, '$dialog')
                },
                render(h){
                    return h('p', {id: 'test'}, 'test')
                }
            }).$mount()
        })

        it('"$dialog" Should be a available in component methods', function () {
            const Vue = require('vue').default
            Vue.use(Plugin)

            let vm = new Vue({
                methods: {
                    check(){
                        assert.property(this, '$dialog')
                    }
                },
                render(h){
                    return h('p', {id: 'test'}, 'test')
                }
            }).$mount()

            vm.check()
        })
    })

})