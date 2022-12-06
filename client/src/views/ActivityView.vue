<script setup lang="ts">
  import { computed, reactive, ref, watch } from "vue";
  import { getActivities, type Activity } from '../stores/activities';
  import { getFriends, type Friend } from '../stores/friends';
  import { isLoading } from "../stores/session";

  const activities = reactive([] as Activity[]);
  getActivities().then( x=> activities.push(...x.activities));

  const friends = reactive([] as Friend[]);
  getFriends().then( x=> friends.push(...x.friends));
</script>

<template>
  <main>
    <div>
      <div class="control">
        <h3 class="title">
          Activity
        </h3>
        <button class="button is-info">
          Add Activity
        </button>
      </div>
      <div class="activity">
        <div v-for="activity in activities" :key="activity._id" class="activity" :class="{ 'is-disabled': isLoading }">
          <div class="friend-info">
            
          </div>
          <div class="activity-image">
            <img :src="activity.activityphoto" :alt="activity.activityname" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>