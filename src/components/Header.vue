<template>
  <div class="header">
    <h2>Coop</h2>
    <nav>
      <ul>
        
        <template v-if="membreConnecte">
          <li><router-link to="/">Liste des conversations</router-link></li>
          <li><router-link to="/membres">Liste des membres</router-link></li>
          <li><button @click="seDeconnecter">Déconnexion</button></li>
          <li>
            <img :src="iconUrl" />
            {{ membreConnecte.fullname }}
          </li>
        </template>
        <template v-else>
          <li><router-link to="/creer-compte">Créer compte</router-link></li>
          <li><router-link to="/se-connecter">Se connecter</router-link></li>
        </template>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data(){
    return{
      membreConnecte : null,
      iconUrl: "",

    }
  },
  methods: {
    seDeconnecter(){
      this.$store.commit('seDeconnecter');
      this.$router.push('/se-connecter');
    },
    setMembreConnecte(){
      if(this.$store.state.membre) {
        this.membreConnecte = this.$store.state.membre
        this.iconUrl = "https://avatars.dicebear.com/api/identicon/"+this.membreConnecte.id+".svg"
      }else this.membreConnecte = null;
    }
  },
  watch: {
    $route(){
      this.setMembreConnecte();
    }
  },
  mounted(){
    this.setMembreConnecte();
  }
}
</script>

<style scoped lang="scss">
.header{
  display: flex;
  height: 6rem;
  justify-content: space-between;


  h2 {
    margin-right: 5rem;
    flex-grow: 1;
  }

  nav{
    flex-grow: 3;
  }

}

ul{
  display: flex;
  justify-content: space-around;
  list-style: none;

  li{
    padding: 0 2rem;
    align-self: baseline;
  }

}
</style>
