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
    <!-- Task List -->
    <div class="task-list">
      <div v-for="task in TaskStore.task" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>
  </main>
</template>

<script>
import { useTaskStore } from "./store/TaskStore";
import TaskDetails from "./components/TaskDetails.vue";
export default {
  name: "App",
  setup() {
    const TaskStore = useTaskStore();
    return { TaskStore };
  },
  components: { TaskDetails }
};
</script>
