<template>
    <div id="creationConversation">
        <section v-if="afficher">
            <header>
                <button @click="masquerFormulaire">x</button>
            </header>
            <h3>Créer une conversation</h3>
            <form @submit.prevent="creerConversation">
                <fieldset>
                    <input type="text" v-model="label" placeholder="Titre" required/>
                    <input type="text" v-model="topic" placeholder="Sujet" required/>
                    
                    <div class="formButtons">
                        <button @click="masquerFormulaire">Annuler</button>
                        <button type="submit">Créer</button> 
                    </div>
                </fieldset>
            </form>
        </section>
        <template v-else>
            <button @click="afficherFormulaire" class="buttonAfficher">Nouvelle conversation</button>
        </template>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                afficher: false,
                label:'',
                topic:'',

            }
        },
        mounted(){
            this.$bus.$on('afficher-creer-conversation', this.afficherFormulaire)
        },
        methods: {
            afficherFormulaire(){
                this.afficher = true;
                this.label='';
                this.topic='';
            },
            masquerFormulaire(){
                this.afficher =false
            },
            creerConversation(){
                api.post('channels', {
                    label: this.label,
                    topic: this.topic
                }).then(response => {
                    this.masquerFormulaire();
                    this.$bus.$emit('charger-conversations');
                    this.$router.push({ name: 'Conversation', params: { id: response.data.id }});
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
#creationConversation{
    position: absolute;
    bottom: .5rem;
    right: 5rem;

    & > section{
        padding: .4rem;
        border: 0.2rem solid #9b4dca;
        border-radius: .4rem;

        
        & > header {
            display: flex;
            justify-content: flex-end;
        }

        & form, & fieldset {
            margin-bottom: 0;
        }

        & .formButtons{
            display: flex;
            justify-content: space-between;
        }
    }
}

.buttonAfficher{
    width: 13rem;
    height: 8rem;
    white-space: normal;
    line-height: normal;
    text-align: center;
    padding: 0;
}

</style>