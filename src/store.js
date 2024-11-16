import { create } from "zustand";
import {produce} from 'immer'

// how persist
import {persist, subscribeWithSelector} from 'zustand/middleware'

const store = (set) => ({
  tasks: [],
  draggedTask: null,
  tasksInOngoing:0,

  addTask: (title, state) => {
    set(
      // (store) => ({ tasks: [...store.tasks, { title, state }] })
      produce(store=>{
        store.tasks.push({title,state})
      })
    , false,'addTask')
  },

  deleteTask: (title) => {
    set((store) => ({
      tasks: store.tasks.filter((task) => task.title !== title),
    }));
  },

  setDraggedTask: (title) => set({ draggedTask: title }),

  moveTask: (title, state) => {
    set((store) => ({
      tasks: store.tasks.map((task) =>
        task.title === title ? { title, state } : task
      ),
    }));
  },
});

const log = (config) => (set, get, api) => {
  return config(
    (...args) => {
      console.log(args);
      set(...args);
    },
    get,
    api
  );
};

export const useStore = create(
  subscribeWithSelector(log(persist(store, { name: 'store' })))
);

useStore.subscribe(
  (store) => store.tasks,
  (newTasks, prevTasks) => {
    useStore.setState({
      tasksInOngoing: newTasks.filter(task => task.state === 'ONGOING').length,
    });
  }
);



