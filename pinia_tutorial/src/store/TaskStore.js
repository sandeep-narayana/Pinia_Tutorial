import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    task: [
      { id: 3, title: "plmhaven", isFav: false },
    ],
    isLoading:false
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
    async getTasks(){
      this.isLoading = true;
      const res = await fetch("http://localhost:3000/task")
      const data = await res.json()
      this.task = data;
      this.isLoading = false;  
    },
    addTask(task) {
      // this.task.push(task);
      this.task = [...this.task, task]; // Create a new array with the added task
    },
    deleteTask(id) {
      this.task = this.task.filter((t) => {
        return t.id != id;
      });
    },
    toggleFav(id) {
      console.log("Hello");
      // toggle between true and false
      const tsk = this.task.find((t) => t.id === id);
      tsk.isFav = !tsk.isFav;
    },
  },
});
