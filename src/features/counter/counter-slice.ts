
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface counterState {
    value : number;
    name : string;
}

const initialState : counterState = {
    value : 10 ,
    name: 'hello'
}

const counterSlice = createSlice({
    name : 'counter',
    initialState,
    reducers : {
        // increament 
        increamented(state){
            // its okay to do this because immer makes it immutable
            // under the hood
            state.value++
        }
    }
});

export const { increamented } = counterSlice.actions;
export default counterSlice.reducer;