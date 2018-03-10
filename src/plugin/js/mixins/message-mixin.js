/**
 * Created by Emmy on 3/5/2018.
 */

export default {
    computed: {
        messageHasTitle(){
            let m = this.options.message
            return (typeof m === 'object' && m !== null) && m.title
        },
        messageTitle(){
            return this.messageHasTitle ? this.options.message.title : null
        },
        messageBody(){
            let m = this.options.message
            return (typeof m === 'string') ? m : (m.body || '')
        }
    }
}