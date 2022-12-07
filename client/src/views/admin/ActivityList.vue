<script setup lang="ts">
    import { computed, reactive, ref, watch } from "vue";
    import { RouterLink } from "vue-router";
    import { deleteActivity, getActivities, type Activity } from "@/stores/activities";
    import session, { setError } from "@/stores/session";

    const activities = ref([] as Activity[]);
    getActivities().then( x=> activities.value = x.activities);

    async function deleteActivity2(activity: Activity, index: number){
        if(confirm(`Are you sure that you want to delete '${activity.name}'?`)){
            const result = await deleteActivity(activity._id)
            if(result.deletedCount){
                activities.value.splice(index, 1);
                session.messages.push({ type: "success", text: `Successfully deleted  '${activity.name}'`})
            }else{
                setError(`Couldn't delete '${activity.name}'`);
            }
        }
    }

</script>

<template>
    <section>
        <RouterLink class="button is-success"  :to="`./activity/new`" style="float: right">
            <span class="icon is-small">
                <i class="fas fa-plus"></i>
            </span>
            <b>Add an Activity</b>    
        </RouterLink>
        <h1 class="title">Admin Activity List</h1>


        <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
            <thead>
                <tr>
                    <th>Title</th>    
                    <th>Type / Intro</th>    
                    <th>Actions</th>    
                </tr>
                
            </thead>
            <tbody>
                <tr v-for="p, i in activities" :key="p._id">
                    <td>
                        <img :src="p.activityphoto" class="activity-activityphoto" />
                        <b>{{ p.name }}</b> <br />
                        <RouterLink :to="{ name:'admin_activity_images', params:{ id: p._id}}">
                            ({{ p.activityphoto?.length }}) more images
                        </RouterLink>
                        
                    </td>
                    <td>
                        <small class="light">
                            {{ p.activityname }}
                        </small>
                        {{ p.intro }}
                    </td>
                    <td>
                        <div class="buttons has-addons is-small">
                            <RouterLink class="button"  :to="`../activity/${p._id}`" target="_blank" title="View as a user would see it" >
                                <span class="icon is-small">
                                    <i class="fas fa-eye"></i>
                                </span>
                            </RouterLink>
                            <RouterLink class="button"  :to="`./activity/${p._id}`">
                                <span class="icon is-small">
                                    <i class="fas fa-edit"></i>
                                </span>
                            </RouterLink>
                            <a class="button" @click.prevent="deleteActivity2(p, i)">
                                <span class="icon is-small">
                                    <i class="fas fa-trash-alt"></i>
                                </span>
                            </a>
                        </div>

                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>


<style scoped>
    section {
        margin-top: 10px;;
    }
    .activity-activityphoto {
        max-width: 75px;
        max-height: 75px;
        float: left;
        padding: 5px;
        border: 1px solid cornflowerblue;
        border-radius: 5px;
        margin: 5px 10px;
    }
    small.light {
        display: block;
        opacity: .8;
    }
    .buttons {
        flex-wrap: nowrap;
    }
</style>