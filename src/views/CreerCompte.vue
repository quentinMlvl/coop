<template>
    <div class="column column-50 column-offset-25">
        <h1>Creer Compte</h1>

        <h3>Veuillez entrer un nom ou pseudo, une adresse mail et un mot de passe</h3>

        <form @submit.prevent="creerCompte">
            <fieldset>
            
                <input type="text" v-model="fullname" placeholder="Nom" required/>
                <input type="email" v-model="email" placeholder="Email" required/>
                <input type="password" v-model="password" placeholder="Mot de passe" required/>
                <input type="password" v-model="confirmPassword" placeholder="Confirmer votre mot de passe" required/>

                <div class="buttons">
                    <button type="submit">Créer un compte</button> 
                    <router-link to="/se-connecter">Déjà un compte ?</router-link>
                </div>


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
                confirmPassword : 'test',
            }
        },
        methods: {

            // Ajoute un nouveau membre 
            // Après avoir vérifier s'il avait confirmer son mot de passe (Sinon il doit re-rentrer un mot de passe et le confirmer)
            // Puis le redirige vers la page de connexion
            creerCompte() {

                if (this.password == this.confirmPassword) {
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
                }else{
                    alert('Veuillez confirmer votre mot de passe');
                    this.password = '';
                    this.confirmPassword = '';
                }

            }
        }
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