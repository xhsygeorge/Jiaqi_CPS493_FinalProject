<script setup lang="ts">
    import FlyoutPanel from './FlyoutPanel.vue';
    import { isLoading } from '../stores/session';
    import { getFriends, type Friend } from '../stores/friends';
    import { reactive, ref, watch } from "vue";
    import { RouterLink } from "vue-router";
    import toplist from '@/stores/toplist';

    const friends = reactive([] as Friend[]);
    getFriends().then( x=> friends.push(...x.friends));

    const search = ref("");

    const { isOpen } = defineProps<{
        isOpen: boolean;
    }>();


</script>

<template>
    <FlyoutPanel :is-open="isOpen" >
        <template #header>
            <button class="delete" v-on:click="isOpen=!isOpen"></button>
            <h3 class="title is-3">
                Besties
            </h3>
        </template>
        <div>
            <div class="fly-out-body">
                <div v-if="!toplist">
                    <p>You haven't add any besties yet.</p>
                </div>
                <div v-else>
                    <div v-for="item in toplist" :key="item.friend._id" class="box">

                            <figure class="image is-96x96">
                                <img :src="item.friend.smallphoto" :alt="item.friend.name" />
                            </figure>
                            <div class="">
                                <b>{{ item.friend.name }}</b> 
                            </div>
                    </div>
                </div>
            </div>
            
        </div>
    </FlyoutPanel>
</template>


<style scoped>

</style>
