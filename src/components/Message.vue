<template>
<div class="message" :class="{you : membreConnecte && !isInMembre, isInMembre : isInMembre}">
        <main v-if="isEditing === message.id">
            <form class="editionForm" @submit.prevent="modifierMessage">
                <fieldset>
                    <textarea v-model="messageForm" required></textarea>
                    <div class="formButtons">
                        <button type="submit">Envoyer</button>
                        <button @click="supprMessage">Supprimer</button>
                        <button @click="isEditing=false">Annuler</button>
                    </div>
                </fieldset>
            </form>
        </main>
        <main v-else>
            <p>{{ message.message }}</p>
            <div class="editionButton" v-if="membre.id == $store.state.membre.id" @click="isEditing=message.id">📝</div>
        </main>
        <hr/>
        <footer>
            <router-link class="linkToConversation" v-if="isInMembre" :to="{ name: 'Conversation', params: { id: message.conversation.id }}">
                Depuis {{message.conversation.label}}
            </router-link>
            <template v-if="!membreConnecte && !isInMembre">
                <router-link :to="{ name: 'Membre', params: { id: membre.id }}" class="membreInfo">
                    <img :src="iconUrl" />
                    {{ membre.fullname }}
                </router-link>
            </template>
            <div v-if="isInMembre || !membreConnecte" class="verticalDivider" :class="{whiteVerticalDivider : isInMembre}"></div>
            <div>
                {{ $store.getters.dateFormatter(this.message.created_at) }}
            </div>
        </footer>
    </div>
</template>

<script>

    export default {
        props: ["message"],

        data(){
            return {
                membreConnecte: false,
                membre: '',
                route: this.$route.name,
                isInMembre: false,
                messageForm: '',
                isEditing: false,
                convId: (this.isInMembre) ? this.message.conversation.id : this.$route.params.id, 
                iconUrl: "",

            }
        },
        mounted(){
            this.messageForm = this.message.message
            this.membre = this.$store.getters.getMembre(this.message.member_id);
            this.iconUrl = "https://avatars.dicebear.com/api/identicon/"+this.membre.id+".svg";

            if(this.route == "Membre"){
                this.isInMembre = true;
            }   
            if(this.membre.id == this.$store.state.membre.id){
                this.membreConnecte = true
            }

        },
        methods: {
            modifierMessage(){

                api.put("channels/"+this.convId+"/posts/"+this.message.id, {
                    message: this.messageForm,
                }).then(
                    this.$bus.$emit('charger-messages'),
                    this.isEditing = false,
                )
            },

            supprMessage(){
                if(confirm("Êtes-vous sûr de vouloir supprimer le message ?")){
                    api.delete("channels/"+this.convId+"/posts/"+this.message.id).then(
                        this.$bus.$emit('charger-messages'),
                        this.isEditing = false,
                    );
                };
            }

        }
    }
</script>

<style lang="scss" scoped>
.message{
    
    padding: 1rem;
    border: 0.2rem solid #9b4dca;
    border-radius: .4rem;

    width: fit-content;
    max-width: 60%;
    margin-bottom: 1rem;

    main{
        text-align: justify;
        padding-left: 1rem;

        p {
           word-break:break-all;
            margin: 0;
        }

        .editionButton {
            margin-left: 1rem;
            align-self: center;

            &:hover,
            &:focus,
            &:active {
                background-color: #6b2d92;
            }
        }

        .editionForm{
            &, & > fieldset {
                margin-bottom: 0;
            }

            & fieldset textarea,
            & .formButtons button
            {
                color: black;
                background-color: white;
            }

            & .formButtons {
                display: flex;
                justify-content: space-between;

                & button {
                    max-width: 45%;
                    color: #9b4dca;

                    &:hover, &:focus, &:active{
                        color: rgb(61, 61, 61);
                    }
                }
            }
        }


    }

    footer{
        display: flex;
        justify-content: space-between;
    }

    hr{
        margin: .5rem auto;
        border-color: #9b4dca;
    }

    .membreInfo {
        display: flex;
        align-items: baseline;
        img{
            margin-right: 1rem;
            max-width: 100%;
            height: auto;
            max-height: 1.2rem;
        }
    }


}

.linkToConversation {
    color: white;
}

.you {
    main, footer {
        justify-content: flex-end;
    }
    background-color: #9b4dca;
    color: white;
    margin-left: auto;
    hr {
        border-color: white;
    }
}

.verticalDivider{
    background-color: #555;
    width: .15rem;
    height: 1.2rem;
    margin: auto .5rem;
}

.whiteVerticalDivider{
    background-color: white;
}

a:hover,
a:focus {
    text-decoration : underline;
}

.isInMembre {
    max-width: auto;
}

</style>