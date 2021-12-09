import {
    USER_CREATE_REQUEST,
    USER_CREATE_SUCCESS,
    USER_CREATE_FAIL,
    USER_CREATE_RESET,
    USER_ROLE_REQUEST,
    USER_ROLE_SUCCESS,
    USER_ROLE_FAIL,
    USER_ROLE_RESET,
    USER_LOCATION_REQUEST,
    USER_LOCATION_SUCCESS,
    USER_LOCATION_FAIL,
    USER_LOCATION_RESET,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET
} from '../constants/userConstants'


export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return { loading: true }
        case USER_LIST_SUCCESS:
            return { loading: false, users: action.payload.data }
        case USER_LIST_FAIL:
            return { loading: false, error: action.payload }
        case USER_LIST_RESET:
            return { users: [] }
        default:
            return state
    }
}

export const roleListReducer = (state = { roles: [] }, action) => {
    switch (action.type) {
        case USER_ROLE_REQUEST:
            return { loading: true }
        case USER_ROLE_SUCCESS:
            let objRoles = action.payload.data
            let data = []

            for (const key in objRoles) {
                if (Object.hasOwnProperty.call(objRoles, key)) {
                    const element = objRoles[key];
                    data.push({id:key,role:element})
                }
            }

            return { loading: false, roles: data }
        case USER_ROLE_FAIL:
            return { loading: false, error: action.payload }
        case USER_ROLE_RESET:
            return { roles: [] }
        default:
            return state
    }
}

export const userLocationReducer = (state = { locations: [] }, action) => {
    switch (action.type) {
        case USER_LOCATION_REQUEST:
            return { loading: true }
        case USER_LOCATION_SUCCESS:
            return { loading: false, locations: action.payload.data }
        case USER_LOCATION_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOCATION_RESET:
            return { locations: [] }
        default:
            return state
    }
}


export const userCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_CREATE_REQUEST:
            return { loading: true }
        case USER_CREATE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case USER_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case USER_CREATE_RESET:
            return {}
        default:
            return state
    }
}


export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true }
        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload.data }
        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        case USER_DETAILS_RESET:
            return { user: {} }
        default:
            return state
    }
}

export const userUpdateReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return { loading: true }
        case USER_UPDATE_SUCCESS:
            return { loading: false, success: true }
        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload.data }
        case USER_UPDATE_RESET:
            return { user: {} }
        default:
            return state
    }
}