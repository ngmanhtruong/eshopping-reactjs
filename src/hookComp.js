import React, { Component, useState,useEffect } from 'react';

function HookComp(initial){
    const [count,setCount] = useState(0);
    useEffect(()=>{
        //ComponentDidMount + ComponentDidUpdate
        document.title = `Clicked ${count} times`;
        return function willUnmount(){
            //ComponentWillUnmount
        }
    })
    return (
        <div>
            <button onClick = {setCount(count + 1)}>
                Click {count} times
            </button>
        </div>
    )
}

export default HookComp;