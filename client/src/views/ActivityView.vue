<script setup lang="ts">
  import { computed, reactive, ref, watch } from "vue";
  import { getActivities, type Activity } from '../stores/activities';
  import { isLoading } from "../stores/session";
  import { RouterLink } from "vue-router";

  const activities = reactive([] as Activity[]);
  getActivities().then( x=> activities.push(...x.activity));

</script>

<template>
  <div>
    <h3 class="title">Activity</h3>
    <div class="activities">
      <RouterLink v-for="activity in activities"  
                  class="activity" :class="{ 'is-disabled': isLoading }"
                  :to="`/activity/${activity._id}`">
        <div class="activity-user">
          <img :src="activity.profilephoto" :alt="activity.name" />
          <p><b>{{ activity.name }}</b>   @{{ activity.username }}   On:{{ activity.date }}</p>
          <button class="delete"></button>
        </div>
        <div class="activity-info">
          <p>{{ activity.intro }}</p>
          <img :src="activity.activityphoto" :alt="activity.activityname">
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
      flex-basis: 10em;
      margin: 1em;
      padding: 1em;
      border: 1px solid #000;
      border-radius: 5px;
      background-color: #fff;
  }

  .activity-info {
      font-size: small;
  }

  .price {
      display: flex;
      align-items: flex-start;
  }

  .amount {
      font-size: x-large;
  }
</style>