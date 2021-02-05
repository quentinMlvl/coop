<template>
    <div>
        {{id}}
    </div>
</template>

<script>

    export default {
        data(){
            return {
                id: this.$route.params.id,
                membre: null
            }
        },
        mounted(){
            if(this.id) {
                this.membre = this.$store.getters.getMembre(this.id);

                let compteurMessage=0;
                while(compteurMessage != 10){
                    this.$store.state.conversations.forEach(conversation => {
                        api.get('channels/' + conversation.id + '/posts').then(response => {
                            response.data.forEach(message =>{
                                if(message.membre_id == this.membre.id){
                                this.message.push(message);
                                }
                            })
                        })
                    });
                    compteurMessage++;
                }

            }
        } 
    }
</script>

<style lang="scss" scoped>

</style>