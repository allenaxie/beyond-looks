import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    templatesList: [],
    activeTemplate: {},
    activeSection: "",
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
    }
})

// export actions
export const {
    setActiveTemplate, 
    setTemplatesList,
    setActiveSection, 
} = templateSlice.actions;

// export selectors
export const selectActiveTemplate = (state) => state.template.activeTemplate;
export const selectTemplatesList = (state) => state.template.templatesList;
export const selectActiveSection = (state) => state.template.activeSection;

export default templateSlice.reducer;