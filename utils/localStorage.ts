"use client"
export const addUserToLS = (user: object) => {
    localStorage.setItem("user", JSON.stringify(user))
}

export const getUser = () => {
    const res = localStorage.getItem("user");
    return res ? JSON.parse(res) : null
}

export const addTokenToLS = (token: any) => {
    localStorage.setItem("token", JSON.stringify(token))
}

export const getToken = () => {
    return localStorage.getItem("token");
}