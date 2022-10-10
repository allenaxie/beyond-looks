import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeSection: '',
    productName: '',
}

export const formSlice = createSlice({
    name:'form',
    initialState,
    reducers: {
        // Actions
        setActiveSection: (state,action) => {
            state.activeSection = action.payload;
        },
        setProductName: (state, action) => {
            state.productName = action.payload;
        }
    }
})

// export actions
export const {setActiveSection, setProductName} = formSlice.actions;

// export selectors
export const selectActiveSection = (state) => state.form.activeSection;
export const selectProductName = (state) => state.form.productName;

export default formSlice.reducer;