import { apiCallBegan, apiCallSubmission } from '@/customActions/api';
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch, AppGetState } from 'store';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    error: '',
    loading: false,
    submissionLoading:false,
    response:''
  },
  reducers: {
    productSubmissionRequested: (state,action)=> {
      state.submissionLoading = true
    },
    productSubmissionRecieved: (state,action)=> {
    
      const {success} = action.payload;
      if(success){
        state.response=JSON.stringify(action.payload) ;
      }
      state.submissionLoading=false
     
    },
    productsRequested: (state, action) => {
      state.loading = true;
    },
    productsReceived: (state, action) => {
      const {success, data} = action.payload;
      if(success) state.list = data;
      state.loading = false;
    },
    productsRequestedFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// ACTIONS
export const { productsRequested, productsReceived, productsRequestedFailed,productSubmissionRecieved,productSubmissionRequested } =
  productsSlice.actions;

// REDUCERS
export default productsSlice.reducer;

// ACTION CREATORS
export const fetchFormFields =
  () =>
  async (dispatch: AppDispatch, getState: AppGetState) => {
    dispatch(
      apiCallBegan({
        url: `${process.env.NEXT_PUBLIC_BACKEND_ROUTE}`,
        onStart: productsRequested.type,
        onSuccess: productsReceived.type,
        onError: productsRequestedFailed.type,
      })
    );
  };

  export const submitForm =
  (data: any) =>
    async  (dispatch: AppDispatch) => {
   dispatch(
    apiCallBegan({
        url: `${process.env.NEXT_PUBLIC_BACKEND_ROUTE}`,
        method:'POST',
        onStart: productSubmissionRequested.type,
        onSuccess: productSubmissionRecieved.type,
    
        data:data,
    
      })
   );
  
}
