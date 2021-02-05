<template>
    <div>
        <h1>Liste des membres</h1>

        <div>

        <ul>
            <li v-for="membre in this.$store.state.membres">
                <router-link :to="{ name: 'Membre', params: { id: membre.id }}">
                <Membre :membre="membre" />
                </router-link>
            </li>

        </ul>
        </div>
    </div>
</template>

<script>
import Membre from '@/components/Membre.vue'

    export default {
        components: {
            Membre
        },
    }
</script>

<style lang="scss" scoped>
ul{
    list-style: none;
    li{
        background-color: #e5e5e5;
    }
}
</style>