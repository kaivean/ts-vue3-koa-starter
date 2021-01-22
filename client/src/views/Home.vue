<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <h2>User: {{ username }}</h2>
        <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import {useState} from '@/store';

@Options({
    components: {
        HelloWorld,
    },
})
class Home extends Vue {
    get username() {
        const state = useState();
        return state.username;
    }
}

export default Home;
</script>
