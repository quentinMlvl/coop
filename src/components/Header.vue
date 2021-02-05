<template>
  <div class="header">
    <h2>Coop</h2>
    <nav>
      <ul>
        
        <template v-if="this.$store.state.membre">
          <li><router-link to="/">Liste des conversations</router-link></li>
          <li><router-link to="/membres">Liste des membres</router-link></li>
          <li><button @click="seDeconnecter">Déconnexion</button></li> 
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
  methods: {
    seDeconnecter(){
      this.$store.commit('seDeconnecter');
      this.$router.push('/se-connecter');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header{
  display: flex;
  justify-content: space-between;

  h2 {
    margin-right: 5rem;
  }

}

ul{
  display: flex;
  justify-content: space-around;
  list-style: none;

  li{
    margin: 0 2rem;
  }

}
</style>
