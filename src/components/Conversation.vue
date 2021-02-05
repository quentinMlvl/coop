<template>
    <div>
        <h3>{{conversation.label}}</h3>
        <p>{{conversation.topic}}</p>
    </div>
</template>

<script>
    export default {
        props: ["conversation"]
    }
</script>

<style lang="scss" scoped>

</style>