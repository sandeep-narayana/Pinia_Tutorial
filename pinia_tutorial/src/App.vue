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

    <div class="loading" v-if="TaskStore.isLoading">loading Tasks....</div>

    <!-- Task List -->
    <div class="task-list" v-if="filter === 'all'">
      <p>You Have {{ TaskStore.totalCount }} tasks to do</p>
      <div v-for="task in TaskStore.task" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>

    <div class="task-list" v-if="filter === 'favs'">
      <p>You Have {{ TaskStore.favCount }} fav tasks to do</p>
      <div v-for="task in TaskStore.favs" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>
  </main>
</template>

<script>
import { useTaskStore } from "./store/TaskStore";
import TaskDetails from "./components/TaskDetails.vue";
import { ref } from "vue";
import TaskForm from "./components/TaskForm.vue";
export default {
  name: "App",
  setup() {
    const TaskStore = useTaskStore();
    // fetch task
    TaskStore.getTasks();

    const filter = ref("all");
    return { TaskStore, filter };
  },
  components: { TaskDetails, TaskForm },
};
</script>
