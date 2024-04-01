"use client"
import { getToken, getUser } from '@/utils/localStorage'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UsersState {
    user: {
        username: String,
        email: String
    }
    token: any
}

const initialState: UsersState = {
    user: {
        username: "",
        email: ""
    },
    token: null
}

export const UserSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        addUser: (state, { payload }) => {
            state.user = payload
        },
        addToken: (state, { payload }) => {
            state.token = payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { addUser, addToken } = UserSlice.actions

export default UserSlice.reducer