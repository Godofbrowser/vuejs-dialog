/**
 * Created by Emmy on 10/8/2017.
 */

import Plugin from '../../src/plugin/js/index'
import {assert} from 'chai'

describe.skip('Plugin Behaviour', function () {
    describe('Calling #Confirm', function () {
        it('"$dialog.confirm()" Should return a promise', function () {
            const Vue = require('vue').default
            Vue.use(Plugin)

            let vm = new Vue({
                methods: {
                    check(){
                        assert.typeOf(this.$dialog.confirm(), 'promise')
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