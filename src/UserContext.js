import { createContext, useState } from "react";

export const UserContext = createContext({})

export function UserContextProvider({children}) {
    return (
        <UserContext.Provider value={{}}>
            {children}
        </UserContext.Provider>
    )
}