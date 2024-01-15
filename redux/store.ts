import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice';
import countryReducer from './services/countrySelectSlice'
import { apiSlice } from './services/apiSlice';
import notesReducer, { fetchNotes } from './services/notesSlice';  // fetchNotes fonksiyonunu içe aktarın

export const store =  configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        notes: notesReducer,
        country: countryReducer,

    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store['getState']>;
export type AppDispatch = typeof store['dispatch'];

export { fetchNotes };  

