import { DepotResponse,  UserResponse } from "../../types"

export type UserState = {
    userData: UserResponse
    depotData: DepotResponse
    isAuthenticated: boolean
    isEmailExist: boolean
    isTermsChecked: boolean
    token: string
}

export type ComputedUserState = {
    isValidCustomer: boolean
}

export type UserAction = {
    setUserData: (data: UserState["userData"]) => void
    setIsAuthenticated: (status: UserState["isAuthenticated"]) => void
    setIsEmailExist: (status: UserState["isEmailExist"]) => void
    setIsTermsChecked: (status: UserState["isTermsChecked"]) => void
    setDepotData: (data: UserState["depotData"]) => void
    setToken: (token: UserState["token"]) => void
}

