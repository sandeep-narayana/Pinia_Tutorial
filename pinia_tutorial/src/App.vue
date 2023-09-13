<template>
  <main>
    <!-- Heading -->
    <header>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Pinialogo.svg/1200px-Pinialogo.svg.png"
        alt="pinia logo"
      />
      <h1>Pinia Task</h1>
    </header>

    <!-- new task form -->
    <div class="new-task-form">
      <TaskForm />
    </div>

    <!-- filter -->
    <nav class="filter">
      <button @click="filter = 'all'">All Task</button>
      <button @click="filter = 'favs'">Fav Task</button>
    </nav>

    <!-- loading -->

    <div class="loading" v-if="isLoading">loading Tasks....</div>

    <!-- Task List -->
    <div class="task-list" v-if="filter === 'all'">
      <p>You Have {{ totalCount }} tasks to do</p>
      <div v-for="task in task" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>

    <div class="task-list" v-if="filter === 'favs'">
      <p>You Have {{ favCount }} fav tasks to do</p>
      <div v-for="task in favs" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>
  </main>

  <!-- reset the state -->
  <button @click="TaskStore.$reset">Reset</button>
</template>

<script>
import { useTaskStore } from "./store/TaskStore";
import TaskDetails from "./components/TaskDetails.vue";
import { ref } from "vue";
import TaskForm from "./components/TaskForm.vue";
import { storeToRefs } from "pinia";
export default {
  name: "App",
  setup() {
    const TaskStore = useTaskStore();

    //storeToRefs
    const { task, isLoading, favs, totalCount, favCount } =
      storeToRefs(TaskStore);
    // add these to return and instead of using TaskStore.task i can direclty use task

    // fetch task
    TaskStore.getTasks();

    const filter = ref("all");
    return { TaskStore, filter ,task, isLoading, favs, totalCount, favCount };
  },
  components: {
    TaskDetails,
    TaskForm,
  },
};
</script>
