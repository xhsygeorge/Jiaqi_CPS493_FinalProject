<script setup lang="ts">
    import session, { api, isLoading, setError } from "@/stores/session";
    import { ref, watch } from "vue";
    import { useRoute, useRouter } from "vue-router";

    import { addActivity, getActivity, updateActivity, type Activity } from "@/stores/activities";
    import { createDescription } from "@/features/gpt/gpt";

    const route = useRoute();
    const router = useRouter();
    
    const activity = ref({} as Activity);
    const isNew = ref(route.params.id == 'new')

    if(!isNew.value){
        getActivity(route.params.id as string).then(x => {
            if(x){
                activity.value = x            
            }else{
                isNew.value = true;
            }

        });        
    }

    const type = ref(['Walk', 'Run', 'Skate','Jog','Hike','Climb','Ski']);
    api<string[]>('activities/type').then(x=> type.value = x);

    async function getGptIntro() {
        const intro = await createDescription(activity.value.activityname);
        activity.value.intro = intro;
        return intro;
    }

    async function save(){
        try {
            if(isNew.value){
                const data = await addActivity(activity.value);
                session.messages.push({ type: "success", text: `Successfully inserted ${data.name}`})
            }else{
                const data = await updateActivity(activity.value._id, activity.value);
                session.messages.push({ type: "success", text: `Successfully updated ${data.name}`})
            }
            await router.push({ name: 'admin_activities' });
        } catch (error) {
            //setError(error as string); being set in the api function
        }
    }

    async function cancel() {
        await router.push({ name: 'admin_activities' });    
    } 


    const isTenorSearchOpen = ref(false);
    const tenorSearch = ref('');
    const tenorResults = ref([] as any[]);


    watch(tenorSearch, async () => {
        if(tenorSearch.value.length > 2){
            const data = await fetch(`https://tenor.googleapis.com/v2/search?q=${tenorSearch.value}&key=${import.meta.env.VITE_TENOR_API_KEY}&limit=8`)
                        .then(x=> x.json())
            console.log({ data });
        tenorResults.value = data.results;
       }
    });

</script>

<template>
    <div class="columns">
        <div class="column is-three-quarters">
            <form class="modal-card" @submit.prevent="save">
                <header class="modal-card-head">
                    <p class="modal-card-title">
                        {{ isNew ? 'New' : 'Edit' }} Activity 
                    </p>
                    
                </header>
                <section class="modal-card-body">
                
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Name</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <p class="control is-expanded has-icons-left">
                                    <input class="input" type="text" placeholder="Activity name" v-model="activity.name">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-user"></i>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                
                    

                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label"> Activity Type</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <div class="select is-fullwidth">
                                        <select  v-model="activity.activityname">
                                            <option :value="undefined">-- Please Select a Type --</option>
                                            <option v-for="b in type" :key="b">{{b}}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    

                    
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">URL</label>
                        </div>
                        <div class="field-body">
                            <div class="field  has-addons">
                                <div class="control is-expanded">
                                    <input class="input" type="text" placeholder="Complete URL" v-model="activity.activityphoto">
                                </div>
                                <p class="control">
                                        <a class="button is-warning" @click.prevent="(isTenorSearchOpen = !isTenorSearchOpen)">
                                            Find a Gif
                                        </a>
                                    </p>

                            </div>
                        </div>
                    </div>

                    <div class="box" v-show="isTenorSearchOpen">
                        <h3>Tenor Search</h3>
                        <input class="input" type="text" placeholder="Complete URL" v-model="tenorSearch" />
                        <div class="tenor-results">
                            <div    class="image tenor-gif" v-for="tenorGif in tenorResults" :key="tenorGif.id" 
                                    @click.prevent="activity.activityphoto = tenorGif.media_formats.mediumgif.url; isTenorSearchOpen = false" >
                                <img :src="tenorGif.media_formats.tinygif.url" />
                            </div>                            
                        </div>

                    </div>
                    
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Intro</label>
                            <button class="button is-warning is-small" @click.prevent="getGptIntro" >Generate</button>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <textarea class="textarea" placeholder="Details of your activity" v-model="activity.intro"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <footer class="modal-card-foot">
                        <button class="button is-success">Save changes</button>
                        <button class="button" @click.prevent="cancel">Cancel</button>
                </footer>
            </form>
        </div>
    </div>
    
</template>

<style scoped>
    .modal-card {
        width: 100%;
    }
    
    .tenor-results {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .tenor-gif {
        display: flex;
        align-items: center;
        border: 1px solid blueviolet;
        margin: 10px;
        padding: 5px;
        border-radius: 10px;
        max-width: 220px;
        cursor: pointer;
    }
    .tenor-gif:hover {
        border: 3px solid green;
    }
</style>