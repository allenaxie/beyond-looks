import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    templatesList: [],
    activeTemplate: {},
    activeSection: "",
    productName: '',
    productDescription: '',
}

export const templateSlice = createSlice({
    name:'template',
    initialState,
    reducers: {
        // Actions
        setTemplatesList: (state, action) => {
            state.templatesList = action.payload;
        },
        setActiveTemplate: (state, action) => {
            state.activeTemplate = action.payload;
        },
        setActiveSection: (state, action) => {
            state.activeSection = action.payload;
        },
        setProductName: (state, action) => {
            state.productName = action.payload;
        },
        setProductDescription: (state, action) => {
            state.productDescription = action.payload;
        }
    }
})

// export actions
export const {
    setActiveTemplate, 
    setTemplatesList,
    setActiveSection, 
    setProductName, 
    setProductDescription,
} = templateSlice.actions;

// export selectors
export const selectActiveTemplate = (state) => state.template.activeTemplate;
export const selectTemplatesList = (state) => state.template.templatesList;
export const selectProductName = (state) => state.template.productName;
export const selectProductDescription = (state) => state.template.productDescription;
export const selectActiveSection = (state) => state.template.activeSection;

export default templateSlice.reducer;