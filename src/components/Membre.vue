<template>
    <div class="membre">
        <div>
            <h3>{{membre.fullname}}</h3> 
            <p>{{membre.email}}</p>
        </div>
        <div class="buttonsMembre">
            <button>👤</button>
            <button v-if="membreConnecte" @click="supprimerMembre">🗑️</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Membre',
        props: ["membre"],
        data(){
            return{
                membreConnecte: true
            }
        },
        mounted(){
            if(this.membre.id == this.$store.state.membre.id){
                this.membreConnecte = false
            }
        },
        methods:{
            supprimerMembre(){
                if(confirm("Voulez-vous supprimer le membre " + this.membre.fullname)){
                    api.delete('members/'+this.membre.id).then(
                        this.$bus.$emit('charger-membres')
                    )
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.membre {
    color: #353535;
    display: flex;
    padding: 1rem;
    justify-content: space-between;

    .buttonsMembre {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

}


</style>