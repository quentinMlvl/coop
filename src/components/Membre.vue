<template>
    <div class="membre">

        <div class="membreInfos">
            <img :src="iconUrl" />
            <div>
                <h3>{{membre.fullname}}</h3> 
                <p>{{membre.email}}</p>
            </div>
        </div>
        <div class="buttonsMembre">
            <router-link :to="{ name: 'Membre', params: { id: membre.id }}" class="membreInfos">
                <button>👤</button>
            </router-link>
            <button v-if="isNotConnected" @click="supprimerMembre">🗑️</button>
        </div>


    </div>
</template>

<script>
    export default {
        name: 'Membre',
        props: ["membre"],
        data(){
            return{
                isNotConnected: true,
                iconUrl: "https://avatars.dicebear.com/api/identicon/"+this.membre.id+".svg",
            }
        },
        mounted(){
            if(this.membre.id == this.$store.state.membre.id){
                this.isNotConnected = false
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

    .membreInfos{
        display: flex;
        align-items: center;
        
        img{
            margin: .5rem 2rem 2rem .5rem;
            max-width: 50%;
            height: auto;
        }

    }

    .buttonsMembre {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

}


</style>