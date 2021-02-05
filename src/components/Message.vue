<template>
    <div class="message" :class="{you : membreConnecte}">
        <main>
            {{ message.message }}
        </main>
        <footer>
            <div v-if="!membreConnecte">
                {{ membre.fullname }}
            </div>
            <div>
                {{ message.created_at }}
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
            }
        },
        mounted(){
            

            this.membre = this.$store.getters.getMembre(this.message.member_id);

            if(this.membre.id == this.$store.state.membre.id){
                this.membreConnecte = true
            }
        },
    }
</script>

<style lang="scss" scoped>
.message{
    
    padding: .4rem;
    border: 0.2rem solid #9b4dca;
    border-radius: .4rem;

    footer{
        display: flex;
        justify-content: space-between;
    }
}

.you {
    background-color: #aaa;
    color: black;
}
</style>