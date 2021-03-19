<template>
  <div class="home">
    <h1>Liste des conversations</h1>
    <CreerConversation />
    <div>
      <template v-for="conversation in $store.state.conversations">
        <router-link
          :to="{ name: 'Conversation', params: { id: conversation.id } }"
        >
          <Conversation :conversation="conversation" />
        </router-link>
      </template>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CreerConversation from "@/components/CreerConversation.vue";
import Conversation from "@/components/Conversation.vue";

export default {
  name: "Home",
  components: {
    CreerConversation,
    Conversation,
  }
};
</script>