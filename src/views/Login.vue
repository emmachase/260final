<template>
    <div class="fullpage twobreak" style="display:flex;align-items:center" data-reactroot="">
        <div style="flex:1" class="gcenter">
            <div style="background:url(klee.jpg) center/contain no-repeat" class="logo-image"></div>
        </div>
        <div style="flex:1;width:100%">
            <div style="display:flex;justify-content:center">
                <div class="login-container">
                    <form action="/gallery">
                        <h1>emmages</h1>
                        <h3>emma&#x27;s file host lies here</h3>
                        <div class="textfield"><input type="password" autofocus="" placeholder="password" value="" />
                        </div><button @click="$router.push('gallery')" type="submit" class="button hide-load wide margin">Login</button>
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
    components: {
        
    }
})
</script>