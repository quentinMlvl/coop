<template>
  <div id="app" v-if="apiOk">
    <Header />

    <main>
      <router-view />
    </main>
  </div>
  <div v-else>En attente de l'API</div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  components: {
    Header,
  },
  data() {
    return {
      apiOk: false,
    };
  },
  watch: {

    //Chargement des membres et des conversations à chaque changement de page
    $route() {
      this.chargerMembres();
      this.chargerChannels();
    },
  },
  methods: {

    // Récupération des conversations depuis l'API vers le store
    chargerChannels() {
      api.get("channels").then((reponse) => {
        this.$store.commit("setConversations", reponse.data);
      });
    },
    
    // Récupération des membres depuis l'API vers le store
    chargerMembres() {
      api.get("members").then((reponse) => {
        this.$store.commit("setMembres", reponse.data);
      });
    },
  },
  mounted() {
    console.log("L'app est démarée");
    this.chargerMembres();
    this.chargerChannels();

    this.$store.state.membre;
    this.$bus.$on("charger-conversations", this.chargerChannels);
    this.$bus.$on("charger-membres", this.chargerMembres);

    // Si l'utilisateur n'est pas connecté, il n'accès qu'au page de connexion et de création de compte 
    if (!this.$store.state.membre) {
      if (
        this.$route.path != "/se-connecter" &&
        this.$route.path != "/creer-compte"
      ) {
        this.$router.push("se-connecter");
      }
    }

    api
      .get("ping")
      .then((reponse) => {
        this.apiOk = true;
        console.log("L'api est fonctionnelle");
      })
      .catch((error) => {
        console.log("L'api ne marche pas");
      });
  },
};
</script>


<style lang="scss">
#app {
  display: flex;
  flex-direction: column;

  margin: auto;
  width: 75vw;

  main {
    display: flex;
  }
}

</style>
