import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ITemplate } from '../../models/template.model'

export interface TemplateState {
  template: ITemplate | null
}

const initialState: TemplateState = {
  template: null
}

export const templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    setTemplate: (state, action: PayloadAction<ITemplate>) => {
      state.template = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setTemplate} = templateSlice.actions

export default templateSlice.reducer