<template>
    <div class="column column-33 column-offset-33">
        <h1>Se connecter</h1>

        <div>todo formulaire</div>
        <form @submit.prevent="seConnecter" class="row">
            <fieldset>
                <input type="email" v-model="email" placeholder="Mail" required/>
                <input type="password" v-model="password" placeholder="motdepasse" required/>
                <button type="submit">Connection</button> 
            </fieldset>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                email : 'test@test.fr',
                password : 'test',
            }
        },
        methods: {
            seConnecter() {
                api.post('members/signin', {
                    email : this.email,
                    password : this.password,
                }).then(response => {
                    this.$store.commit('setMembre', response.data.member);
                    this.$store.commit('setToken', response.data.token);
                    this.$router.push('/');
                })
            }
        },

    }
</script>

<style lang="scss" scoped>
fieldset {
    width: 100%;
}
</style>