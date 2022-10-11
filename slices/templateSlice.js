import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeTemplate: {},
    activeSection: "",
    productName: '',
    productDescription: '',
}

export const formSlice = createSlice({
    name:'form',
    initialState,
    reducers: {
        // Actions
        setActiveTemplate: (state,action) => {
            state.activeTemplate = action.payload;
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
export const {setActiveTemplate, setProductName, setProductDescription} = formSlice.actions;

// export selectors
export const selectActiveTemplate = (state) => state.form.activeTemplate;
export const selectProductName = (state) => state.form.productName;
export const selectProductDescription = (state) => state.form.productDescription;
export const selectActiveSection = (state) => state.form.activeSection;

export default formSlice.reducer;