<template>
    <div style="max-width: 350px; margin:auto">
        <h1>Vuejs Plugin Example</h1>

        <ul>
            <li>Foo <button @click="remove('foo')">delete</button></li>
            <li>Bar <button @click="remove('bar')">delete</button></li>
            <li>Baz <button @click="remove('baz')">delete</button></li>
        </ul>

        <notifications position="bottom left"></notifications>
    </div>
</template>

<script>
    export default {
        mounted(){
            console.log('mounted app')
        },
        methods: {
            remove(item){
                let name = item.toUpperCase()

                this.$dialog.confirm(`If you remove <b style="color: darkorange">${name}</b>, it'll be gone forever.`, {
                    html: true,
                    loader: true
                }).then((dialog) => {
                    // do some stuff

                    setTimeout(() => {
                        this.$notify({ type: 'success', text: 'delete action: '+name })
                        console.log('delete action: ', name)
                        dialog.close()
                    }, 2500)

                }).catch(() => {
                    this.$notify({text: name +' is safe!' })
                    console.log(name +' is safe!')
                })
            }
        }
    }
</script>

<style>
    .vue-notification {
        padding: 10px;
        margin: 25px;

        font-size: 18px;
        font-family: "Noto Sans", sans-serif;

        color: #ffffff;
        background: #44A4FC;
        border-left: 5px solid #187FE7;
    }
</style>