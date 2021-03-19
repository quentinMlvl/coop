<template>
    <div class="column column-33 column-offset-33">
        <h1>Se connecter</h1>

        <h3>Entrez votre email et votre mot de passe</h3>
        <form @submit.prevent="seConnecter" class="row">
            <fieldset>
                <input type="email" v-model="email" placeholder="Mail" required/>
                <input type="password" v-model="password" placeholder="Mot de passe" required/>
                
                <div class="buttons">
                    <button type="submit">Connexion</button>
                    <router-link to="/creer-compte">Pas de compte ?</router-link>
                </div>


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

            // Permet à l'utilisateur de se connecter à l'application
            // Si il réussit, il est redirigé vers la page Home
            // Sinon, il est alerté et il doit réessayer 
            seConnecter() {
                api.post('members/signin', {
                    email : this.email,
                    password : this.password,
                }).then(response => {
                    this.$store.commit('setMembre', response.data.member);
                    this.$store.commit('setToken', response.data.token);
                    this.$router.push('/');
                }).catch(error => {
                    alert("Mauvais identifiant et/ou Mot de passe. Veuillez réessayer");
                    this.password = '';
                })
            }
        },

    }
</script>

<style lang="scss" scoped>
fieldset {
    width: 100%;
}

.buttons{
    display: flex;
    justify-content: space-between;
}
</style>