<script setup lang="ts">
  import { isLoading } from "../stores/session";
  import { ref } from "vue";
  import { useRoute } from "vue-router";

  import { getFriend, type Friend } from "../stores/friends";

  const route = useRoute();
  
  const friend = ref(null as Friend | null);

  getFriend(+route.params.id).then(x => {
    friend.value = x
    console.log('The fetch returned');
  });

  console.log('The fetch was called');

</script>

<template>
  <div v-if="friend" class="section">
    <div class="friend-image">
      <img :src="friend.smallphoto" :alt="friend.name" />
    </div>
    <div class="friend-info">
      <h3 class="title">{{ friend.name }}</h3>
      <p>@{{ friend.username }}</p>
      <p>{{ friend.bio }}</p>
    </div>
  </div>
  <div v-else-if="isLoading">
    <img src="@/assets/placeholder-loading-demo-1.gif" style="width: 100%" />
  </div>
  <div v-else class="section">
    <h2 class="title">Friend not found</h2>
  </div>
</template>

<style scoped>
  .section {
    display: flex;
    background-color: aliceblue;
  }
  .friend-info {
    padding: 1em;;
  }
</style>