<template>
    <div class="conversation">
        <h1>{{ conversation.label }}</h1>
        <p>Sujet : {{ conversation.topic }}</p>

        <section>
            <div v-for="message in messages">
                <Message :message="message" />
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
            }
        },
        components: { Message },
        methods: {
            creerMessage(){
                api.post('channels/'+ this.id +'/posts', {
                    membre_id: this.$store.state.membre.id,
                    message: this.messageForm,
                }).then(
                    this.formMessage = '',
                    this.chargerMessages(),
                )
            },

            getConversation() {
                api.get('channels/' + this.id).then(response => {
                    this.conversation = response.data
                })
            },

            chargerMessages(){
                api.get('channels/'+ this.id +'/posts').then(response => {
                    this.messages = response.data;
                })
            },
        },
        mounted(){
            this.getConversation();
            this.chargerMessages();
        }
    }
</script>

<style lang="scss" scoped>
.conversation {

    form {
    position: absolute;
    bottom: .5rem;
    left: 5rem;

    
    & > header {
        display: flex;
        justify-content: flex-end;
    }

    & form, & fieldset {
        margin-bottom: 0;
    }


    & fieldset > textarea {
        width: 35rem;
    }


    & .formButtons{
        display: flex;
        justify-content: space-between;
    }
    }
}
</style>