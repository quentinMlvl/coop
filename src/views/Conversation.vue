<template>
    <div class="conversation">
        <div v-if="isEditingConv">
            <form class="editionForm" @submit.prevent="modifierConversation">
            <fieldset>
                <div class="form-groups">
                    <div class="form-group">
                        <label for="formLabel">Label : </label>
                        <input type="text" v-model="formLabel" id="formLabel" required />
                    </div>
                    <div class="form-group">
                        <label for="formTopic">Topic : </label>
                        <input type="text" v-model="formTopic" id="formTopic" required />
                    </div>
                </div>
                <div class="formButtons">
                    <button type="submit">Envoyer</button>
                    <button @click="supprConversation">Supprimer</button>
                    <button @click="isEditingConv=false">Annuler</button>
                </div>
            </fieldset>
        </form>
        </div>
        <div v-else class="conversation-header">
            <div class="conversation-title">
                <h1>{{ conversation.label }}</h1>
                <p>Sujet : {{ conversation.topic }}</p>
            </div>
            <div @click="isEditingConv=true">📝</div>
        </div>

        <section class="messages" id="listMessages">
            <div class="messagesContainer">
                <div v-for="message in messages">
                    <Message :message="message" />
                </div>
            </div>
        </section>

        <form v-if="$store.state.membre" @submit.prevent="creerMessage">

            <h3>Envoyer un message</h3>

            <fieldset>
                <textarea v-model="messageForm" placeholder="Votre Message ..." required></textarea>
                
                <div class="formButtons">
                    <button type="submit">Envoyer</button> 
                </div>
            </fieldset>
        </form>
    </div>
</template>

<script>
    import Message from '@/components/Message.vue'

    export default {
        data(){
            return {
                id: this.$route.params.id,
                conversation: [],
                messageForm: '',
                messages: [],
                isEditingConv: false,
                formLabel: '',
                formTopic: '',
            }
        },
        components: { Message },
        methods: {

            // Ajoute un message à la conversation 
            creerMessage(){
                api.post('channels/'+ this.id +'/posts', {
                    membre_id: this.$store.state.membre.id,
                    message: this.messageForm,
                }).then(
                    this.formMessage = '',
                    this.chargerMessages(),
                    this.scrollToBottom(),
                )
            },

            // Récupère les données de la conversation
            getConversation() {
                api.get('channels/' + this.id).then(response => {
                    this.conversation = response.data
                    this.formTopic = this.conversation.topic;
                    this.formLabel = this.conversation.label;
                });
            },

            // Récupère les messages de la conversation
            chargerMessages(){
                api.get('channels/'+ this.id +'/posts').then(response => {
                    this.messages = this.$store.getters.sortByDate(response.data);
                })
            },

            // Modifier le topic et le label de la conversation
            modifierConversation(){
                api.put("channels/"+this.id, {
                    label: this.formLabel,
                    topic: this.formTopic,
                }).then(
                    this.$bus.$emit('charger-conversations'),
                    this.getConversation(),
                    this.isEditingConv = false,
                )
            },

            // Supprime une conversation et redirige vers la page Home
            supprConversation(){
                if(confirm("Êtes-vous sûr de vouloir supprimer la conversation ?")){
                    api.delete("channels/"+this.id).then(
                        this.$router.push("/"),
                        this.isEditing = false,
                    );
                };   
            },

            // Permet d'aller en bas des messages ( == aller aux derniers messages) avec un effet de scroll
            scrollToBottom(){
                let element = document.querySelector('#listMessages')
                element.scrollTop = element.scrollHeight;
                setTimeout(function(){ element.scrollTo({
                    top:element.scrollHeight,
                    behavior: 'smooth'
                }) }, 250);
            }
        },
        mounted(){
            this.getConversation();
            this.chargerMessages();

            this.$bus.$on('charger-messages', this.chargerMessages);
            this.$bus.$on('scroll-bottom', this.scrollToBottom);

            this.scrollToBottom();



        },
    }

</script>


<style lang="scss" scoped>
.conversation {

    .messages{
        overflow-y: scroll;
        border: 0.2rem solid #16b4db;

        .messagesContainer{
            display: flex;
            width: auto;
            max-height: calc((100vh - 23rem) * 0.7);
            flex-direction: column;
            justify-content: space-around;
            padding: .4rem;
            padding-top: 33rem;
            border-radius: .4rem;
            margin-bottom: 2rem;
            
        }
    }

    & > form {
        min-height: calc((100vh - 23rem) * 0.3);
        align-self: flex-end;
        bottom: 0rem;
        padding: 1rem 1rem 0 1rem;
        margin-bottom:  0;
        background-color: white;
        border-radius: .4rem;
        -webkit-box-shadow: 0 0 .8rem -.1rem rgba(0,0,0,0.75);
        -moz-box-shadow: 0 0 .8rem -.1rem rgba(0,0,0,0.75);
        box-shadow: 0 0 .8rem -.1rem rgba(0,0,0,0.75);

        & form, & fieldset {
            margin-bottom: 0;
        }

        & > fieldset {
            display: flex;
            align-items: flex-end;
            justify-content: flex-end;

            & > textarea {
                width: 35rem;
            }
        }

    }

    .formButtons{
        display: flex;
        justify-content: space-between;
        padding-left: 1rem;
        margin-bottom: 1.5rem;
    }

    .conversation-header{
        display: flex;
        align-items: baseline;

        & > .conversation-title{
            margin-right: 1rem;
        }
    }
}
</style>