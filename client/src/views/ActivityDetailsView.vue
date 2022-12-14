<script setup lang="ts">
    import { isLoading } from '@/stores/session';
    import { ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { getActivity, type Activity } from '@/stores/activities';
    const route = useRoute();
    const activity = ref(null as Activity | null)
    getActivity(route.params.id as string).then(x=>{
        activity.value = x
        console.log('The fetch returned');
    })
    console.log('the fetch was called')
</script>

<template>
    <div v-if="activity" class="section">
        <div class="activity-user">
            <img :src="activity.profilephoto" :alt="activity.name" />
            <p><b>{{ activity.name }}</b>   @{{ activity.username }} {{ activity.date }}</p>
          
        </div>
        <div class="activity-info">
            <p>{{ activity.intro }}</p>
            <img :src="activity.activityphoto" :alt="activity.activityname">
        </div>
    </div>
    <div v-else-if="isLoading">
        <img src="@/assets/placeholder-loading-demo-1.gif" style="width:100%" />
    </div>
    <div v-else class="section">
        <h2 class="title">Activity Not Found.</h2>
    </div>
</template>

<style scoped>
.section{
    display: flex;
    background-color: aliceblue;
}
.activity-info{
    padding: 2em;
}
</style>