<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="I need to..." v-model="newTask" />
    <button  type="submit">Add</button>
  </form>
</template>

<script>
import { useTaskStore } from "@/store/TaskStore";
import { ref } from "vue";

export default {
  setup() {
    const taskStore = useTaskStore();
    const newTask = ref('')
    const handleSubmit = () =>{
        if(newTask.value.length>0){
            taskStore.addTask({
                title:newTask.value,
                isFav:false,
                id:Math.floor(Math.random()*10000)
            })

            // reset the value the new task 
            newTask.value = "";
        }
        
    };
    return {handleSubmit,newTask };
  },
};
</script>
