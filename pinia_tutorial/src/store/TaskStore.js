import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    task: [
      { id: 1, title: "buy some milk", isFav: false },
      { id: 2, title: "play Gloomhaven", isFav: true },
    ],
  }),
  getters: {
    favs() {
      return this.task.filter((t) => t.isFav);
    },
    favCount() {
      return this.task.reduce((count, task) => {
        if (task.isFav) {
          return count + 1; // Increment the count when a favorite task is found
        }
        return count;
      }, 0);
    },
    totalCount: (state) => {
      return state.task.length;
    },
  },
  actions: {
    addTask(task) {
      // this.task.push(task);
      this.task = [...this.task, task]; // Create a new array with the added task
    },
  },
});
