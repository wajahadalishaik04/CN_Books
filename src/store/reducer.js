import { createReducer } from "@reduxjs/toolkit";

export const userReducer = createReducer({user:null},(builder)=>
{
    builder.addCase("loginUser",(state,action)=>
    {
        state.user = action.payload
    })
})