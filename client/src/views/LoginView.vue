<script setup lang="ts">
    import { login } from '../stores/session';
    import { ref } from 'vue';
    import google_login from "../components/LoginBadge.vue"
    import { RouterLink } from 'vue-router';

    const password = ref('');
    const name = ref('');

</script>

<template>
    <div>
        <form class="box" @submit.prevent="login(name, password)">
            <div class="field">
                <label class="label">Name</label>
                <div class="control">
                    <input class="input" type="text" placeholder="First & Last Name" v-model="name">
                </div>
            </div>

            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                    <input class="input" type="password" placeholder="Password" v-model="password">
                </div>
            </div>

            <button class="button is-primary">
                Sign in
            </button>
        </form>
        <b>To log in with google accounts, click <u>Log in</u> button at top right conner.
        </b>
    </div>
</template>

<style scoped>

</style>