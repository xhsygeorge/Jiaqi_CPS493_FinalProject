<script setup lang="ts">
  import { computed, reactive, ref, watch } from "vue";
  import { getActivities, type Activity } from '../stores/activities';
  import { isLoading } from "../stores/session";
  import { RouterLink } from "vue-router";

  const activities = reactive([] as Activity[]);
  getActivities().then( x=> activities.push(...x.activities));

  const search = ref("");
</script>

<template>
  <div>
    <h3 class="title">Activity</h3>
    <!-- Search Bar -->
    <div class="control ">
      <input class="input" type="text" placeholder="Find your activity" v-model="search"  />
      <div class="dropdown-menu" id="dropdown-menu" role="menu">
        <div class="dropdown-content">
          <RouterLink v-for="activity in activities"  class="dropdown-item" :class="{ 'is-disabled': isLoading }" 
                :to="`/activity/${activity._id}`" v-show="activity.activityname.toLowerCase().includes(search.toLowerCase())">
            {{ activity.activityname }}
          </RouterLink>
          
        </div>
        
      </div>
    </div>

    <div class="activities">
      <RouterLink v-for="activity in activities"  
                  class="activity" :class="{ 'is-disabled': isLoading }"
                  :to="`/activity/${activity._id}`">
        <div class="activity-user">
          <img :src="activity.profilephoto" :alt="activity.name" />
          <p><b>{{ activity.name }}</b>   @{{ activity.username }}   On:{{ activity.date }}</p>
        </div>
        <div class="activity-info">
          <p>{{ activity.intro }}</p>
          <img :src="activity.activityphoto" :alt="activity.activityname">
          <button class="delete"></button>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
  .activities {
      display: flex;
      flex-wrap: wrap;
      background-color: aliceblue;
  }
  
  .is-disabled {
      pointer-events: none;
      opacity: .7;
  }

  .activity {
      flex-basis: 100em;
      margin: 1em;
      padding: 1em;
      border: 1px solid #000;
      border-radius: 5px;
      background-color: #fff;
  }

  .activity-info {
      font-size: small;
  }
</style>