<script setup lang="ts">
    import { ref } from "vue";
    import { useRoute } from "vue-router";
    import { getActivity, type Activity } from "@/stores/activities";
    const route = useRoute();
    
    const activity = ref({} as Activity);
    getActivity(route.params.id as string).then(x => {
        if(x){
            activity.value = x            
        }
    });
</script>

<template>
    <h3 class="title is-3">Images for {{ activity.name }}</h3>
    <div v-for="image in activity.activityphoto" :key="image" class="image">
        <img :src="image" />
    </div>

</template>

<style scoped>
</style>