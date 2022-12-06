<script setup lang="ts">
  import { getFriends, type Friend } from '../stores/friends';
  import { computed, reactive, ref, watch } from "vue";
  import { RouterLink } from "vue-router";
  import { isLoading } from "../stores/session";

  const friends = reactive([] as Friend[]);
  getFriends().then( x=> friends.push(...x.friends));

  const search = ref("");
</script>

<template>
  <main>
    <div>
      <div class="control ">
        <input class="input" type="text" placeholder="Search by NAME" v-model="search"  />
      </div>

      <div class="friends">
        <RouterLink v-for="friend in friends" :key="friend._id" 
                          class="friend" :class="{ 'is-disabled': isLoading }"
                          :to="`/friend/${friend._id}`"
                          v-show="friend.name.toLowerCase().includes(search.toLowerCase())">
          <div class="friend-image">
            <img :src="friend.smallphoto" :alt="friend.name" />
          </div>
          <div class="friend-info">
            <b>{{ friend.name }}</b>
            <p>@{{ friend.username }}</p>
          </div>
        </RouterLink>
      </div>
    </div>
    
  </main>
</template>

<style scoped>
  .friends {
    display: flex;
    display: flex;
    flex-wrap: wrap;
    background-color: aliceblue;
  }

  .is-disabled {
    pointer-events: none;
    opacity: .7;
  }
  .friend-info {
    font-size: small;
  }

  .friend {
    flex-basis: 10em;
    margin: 1em;
    padding: 1em;
    border: 1px solid #000;
    border-radius: 5px;
    background-color: #fff;
  }
</style>