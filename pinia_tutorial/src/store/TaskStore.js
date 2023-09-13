import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    task: [{ id: 3, title: "plmhaven", isFav: false }],
    isLoading: false,
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
    async getTasks() {
      this.isLoading = true;
      const res = await fetch("http://localhost:3000/task");
      const data = await res.json();
      this.task = data;
      this.isLoading = false;
    },

    async addTask(task) {
      const res = await fetch("http://localhost:3000/task", {
        method: "POST",
        body: JSON.stringify(task),
        headers: { "content-Type": "application/json" },
      });
      if (res.error) {
        console.log(res.error);
      }

       // refresh the task
       this.task = [...this.task, task]; 
    },

    async deleteTask(id) {
      const res = await fetch(`http://localhost:3000/task/${id}`, {
        method: "DELETE",
      });
      if (res.error) {
        console.log(res.error);
      }

      // refresh state 
      this.task = this.task.filter((t) => {
        return t.id != id;
      });
    },

    async toggleFav(id) {
      // toggle between true and false
      const tsk = this.task.find((t) => t.id === id);
      tsk.isFav = !tsk.isFav;

      const res = await fetch("http://localhost:3000/task/${id}", {
        method: "PATCH",
        body: JSON.stringify({ isFav: tsk.isFav }),
        headers: { "content-Type": "application/json" },
      });
      if (res.error) {
        console.log(res.error);
      }
    },
  },
});
