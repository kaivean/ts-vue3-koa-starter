<template>
    <div class="hello">
        <el-input
            v-model="input"
            placeholder="请输入内容"
            @change="onChange()"
        />
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';

@Options({
    props: {
        msg: String,
    }
})
class Sub extends Vue {
    msg: string = '';
    input = '深入浅出Vuejs'

    mounted() {
        console.log('Sub mounted');
    }

    onChange() {
        console.log(this.input);
    }
}

export default Sub;
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
