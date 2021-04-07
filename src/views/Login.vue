<template>
    <div class="fullpage twobreak" style="display:flex;align-items:center" data-reactroot="">
        <div style="flex:1" class="gcenter">
            <div style="background:url(klee.jpg) center/contain no-repeat" class="logo-image"></div>
        </div>
        <div style="flex:1;width:100%">
            <div style="display:flex;justify-content:center">
                <div class="login-container">
                    <form @submit.prevent="login">
                        <h1>emmages</h1>
                        <h3>emma&#x27;s file host lies here</h3>
                        <div class="textfield" :class="{ error }"><input type="text" autofocus="" placeholder="username" v-model="name" value="" /></div>
                        <div class="textfield" :class="{ error }"><input type="password" autofocus="" placeholder="password" v-model="password" value="" />
                        </div><button type="submit" class="button hide-load wide margin">Login</button>
                        <aside class="thick">for dmca etc, contact `adm at its-em dot ma`</aside>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "Login",
    data() {
        return {
            name: "",
            password: "",
            error: false
        }
    },
    components: {
        
    },
    methods: {
        async login() {
            // console.log(this.name, this.password);
            const result = await this.$axios.post("login", {
                name: this.name, password: this.password
            });

            if (result.status == 200) {
                this.$router.push('gallery');
            } else {
                this.error = true;
            }
        }
    }
})
</script>