import { useStore } from "./store";
import { useMemo } from "react";
import {shallow} from 'zustand/shallow'

export default function Temp({state}){
    // const tasks = useStore(store=>
    //     store.tasks//.filter(task=>task.state===state)
    // );

    // const filtered =useMemo(
    //     ()=>tasks.filter(task=>task.state===state),
    //     [tasks,state]
    // )
    // 1 way to imporve performance

    // or

    // const tasks = useStore(store=>
    //     store.tasks.filter(task=>task.state===state),
    //     shallow // zustand provide shallow for perfomance optimization
    // );

    // or use the own logic
    // const tasks = useStore(store=>
    //     store.tasks.filter(task=>task.state===state),
    //     (prev,next)=>{
    //         const longest = prev.length > next.length ? prev.length ? next.length;
    //         for(let i=0;i<longest;i++){
    //             if(!prev[i] || !next[i]) return false;
    //             if(prev[i] !== next[i]) return false;
    //         }
    //         return true;
    //     }
    // );
}