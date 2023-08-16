import { defineStore } from "pinia";

// add your global state
export const useStore = defineStore("main", {
  state: () => ({
    myState: {},
  }),
  actions: {
    updateOriginMat(newState: any) {
      this.myState = newState;
    }
  }
});
