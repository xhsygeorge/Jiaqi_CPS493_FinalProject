<script setup lang="ts">
    import FlyoutPanel from './FlyoutPanel.vue';
    import { isLoading } from '../stores/session';
    import { getFriends, type Friend } from '../stores/friends';
    import { reactive, ref, watch } from "vue";
    import { RouterLink } from "vue-router";

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
                Friends
            </h3>
        </template>
        <div>
            <div class="fly-out-body">
                <div class="control ">
                    <input class="input" type="text" placeholder="Search" v-model="search"  />
                </div>

                <div class="friends">
                <RouterLink v-for="friend in friends" :key="friend.id" 
                                    class="friend" :class="{ 'is-disabled': isLoading }"
                                    :to="`/friend/${friend.id}`"
                                    v-show="friend.name.toLowerCase().includes(search.toLowerCase())">
                    <div class="friend-image">
                    <img :src="friend.smallphoto" :alt="friend.name" />
                    </div>
                    <div class="friend-info">
                        <b>{{ friend.name }}</b>
                    </div>
                </RouterLink>
                </div> 
            </div>
            
        </div>
    </FlyoutPanel>
</template>


<style scoped>

</style>
