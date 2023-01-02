import {createSlice} from "@reduxjs/toolkit"

const CurrencySlice = createSlice({
    name:'auth',
    initialState: {currency:'yhjMzLPhuIDl'},
    reducers: {
        updateCurrency(state,actions){
            state.currency=actions.payload.currency
        }
    }
})
export const Currencyactions = CurrencySlice.actions 

export default CurrencySlice