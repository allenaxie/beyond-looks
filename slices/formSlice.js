import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeSection: '',
    productName: '',
    productDescription: '',
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
        },
        setProductDescription: (state,action) => {
            state.productDescription = action.payload;
        }
    }
})

// export actions
export const {setActiveSection, setProductName, setProductDescription} = formSlice.actions;

// export selectors
export const selectActiveSection = (state) => state.form.activeSection;
export const selectProductName = (state) => state.form.productName;
export const selectProductDescription = (state) => state.form.productDescription;

export default formSlice.reducer;