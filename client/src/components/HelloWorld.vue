<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <Sub msg="sub"/>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import Sub from '@/components/Sub.vue';


@Options({
    props: {
        msg: String,
    },
    components: {
        Sub,
    },
    // inject: ['http'],
})
class HelloWorld extends Vue {
    msg: string = '';
    http: any;
    mounted() {
        console.log('Hello World mounted');
    }
}

export default HelloWorld;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
