<script setup lang="ts">
    import { ref } from 'vue';
    import { RouterLink } from 'vue-router';
    import LoginBadge from './LoginBadge.vue';
    import MessageList from './MessageList.vue';

    const isActive = ref(false);
    const isOpen = ref(false);

</script>

<template>
    <div>
    <nav class="navbar is-primary" role="navigation" aria-label="main navigation">

        <div class="container">
        <div class="navbar-brand">
            <a :class="{ 'is-active': isActive }" @click="isActive = !isActive" role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
      
        <div id="navbarBasicExample" class="navbar-menu"  :class="{ 'is-active': isActive }">
          <div class="navbar-start">
            <router-link to="/" class="navbar-item">
              Home
            </router-link>

            <router-link to="/activity" class="navbar-item">
              Activity
            </router-link>
      
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">
                More
              </a>
      
              <div class="navbar-dropdown">
                <router-link class="navbar-item" to="/report">
                  Report an issue
                </router-link>
              </div>
            </div>
          </div>
      
          <div class="navbar-end">
            <MessageList />
            
            <div class="navbar-item">

              <login-badge></login-badge>
            </div>
          </div>
        </div>
        </div>
      </nav>
    </div>
</template>

<style>
    .router-link-active {
        
        border-bottom: #00AA00 5px solid;
    }
</style>