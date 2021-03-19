<template>
    <div>
        <div class="membreTitle">
            <img :src="iconUrl" />
            <h1>{{membre.fullname}}&nbsp;</h1>
            <p>(<i>{{membre.email}}</i>)</p>
            
        </div>
        <h2>Messages</h2>
        <section class="messages">
        
            <div v-if="messages.length == 0">
                Cet utilisateur n'a pas encore écrit de message.
            </div>

            <template v-for="message in messages">

                    <Message :message="message" />

            </template>
        </section>

    </div>
</template>

<script>
    import Message from '@/components/Message.vue'


    export default {
        components: { Message },
        data(){
            return {
                id: this.$route.params.id,
                membre: null,
                messages: [],
                isEditing: false,
                iconUrl: "",
            }
        },
        created(){
            if(this.id) {
                this.membre = this.$store.getters.getMembre(this.id);
                this.iconUrl = "https://avatars.dicebear.com/api/identicon/"+this.membre.id+".svg";

                let compteurMessage=0;
                this.$store.state.conversations.forEach(conversation => {
                    api.get('channels/' + conversation.id + '/posts').then(response => {
                        response.data.forEach(message =>{
                            if(compteurMessage < 10 && message.member_id == this.membre.id){
                                message.conversation = conversation;
                                this.messages.push(message);
                                compteurMessage++;
                            }
                        })
                    })
                });
            }
        },
        methods: {
            editButtonClicked(message){
                if(this.membre.id == this.$store.state.membre.id){
                    this.isEditing = message.id
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.membreTitle{
    display: flex;
    align-items: baseline;
    img{
        margin-right: 1rem;
        height: auto;
        max-height: 3.5rem;
    }

    &>h1{
        padding-right: 1rem;
    }
}

.messages > *{

    color: white;
    background-color: #9b4dca;
    
    padding: 1rem;
    border: 0.2rem solid #9b4dca;
    border-radius: .4rem;

    margin-bottom: 1rem;
    a {
        color: white;
    }

    main{
        text-align: justify
    }

    footer{
        display: flex;
        justify-content: space-between;
    }

    hr{
        margin: .5rem auto;
        border-color: white;
    }
}

.verticalDivider{
    background-color: white;
    width: .15rem;
    height: 1.2rem;
    margin: auto .5rem;
}
</style>