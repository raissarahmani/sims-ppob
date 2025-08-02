import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    balance: 0,
    order: [],
    transaction: []
}

const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        showBalance: (state, action) => {
          state.balance = action.payload
        },
        selectService: (state, action) => {
          state.order = action.payload;
        },
        storeOrder: (state, action) => {
          const { name, price, image, balance, date, time } = action.payload
          state.balance = balance
          state.transaction.unshift({ name, price, image, date, time })
          state.order = action.payload
        },
        storeTopup: (state, action) => {
          const { amount, balance, date, time } = action.payload;
          state.balance = balance
          state.transaction.unshift({ name: "Top-up", price: amount, date, time })
          state.order = action.payload
        }
    }
})

export const {showBalance, selectService, storeOrder, storeTopup} = transactionSlice.actions
export default transactionSlice.reducer