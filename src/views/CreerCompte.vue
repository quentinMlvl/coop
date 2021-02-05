<template>
    <div class="column column-50 column-offset-25">
        <h1>Creer Compte</h1>

        <div>todo formulaire</div>

        <form @submit.prevent="creerCompte">
            <fieldset>
            
                <input type="text" v-model="fullname" placeholder="Nom" required/>
                <input type="email" v-model="email" placeholder="Email" required/>
                <input type="password" v-model="password" placeholder="motdepasse" required/>
                <button type="submit">Créer un compte</button> 

            </fieldset>
        </form>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                fullname : 'test',
                email : 'test@test.fr',
                password : 'test',
            }
        },
        methods: {
            creerCompte() {
                api.post('members', {
                    fullname: this.fullname,
                    email: this.email,
                    password: this.password
                }).then(response => {
                    alert('Votre compte a été créée, vous pouvez vous connecter à Coop');
                    this.$router.push('/se-connecter');
                }).catch(error => {
                    alert(error.response.data.message);
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>