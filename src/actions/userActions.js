import axios from 'axios'
import {
    USER_CREATE_REQUEST,
    USER_CREATE_SUCCESS,
    USER_CREATE_FAIL,
    USER_CREATE_RESET,
    USER_ROLE_REQUEST,
    USER_ROLE_SUCCESS,
    USER_ROLE_FAIL,
    USER_LOCATION_REQUEST,
    USER_LOCATION_SUCCESS,
    USER_LOCATION_FAIL,
    USER_LOCATION_RESET,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
    USER_LIST_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL
} from '../constants/userConstants'
const URL = 'https://test-api.seucom.com'


export const listUsers = () => async (dispatch) => {
    try {
        dispatch({ type: USER_LIST_REQUEST })

        const { data } = await axios.get(`${URL}/api/users`)

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const listRoles = () => async (dispatch) => {
    try {
        dispatch({ type: USER_ROLE_REQUEST })

        const { data } = await axios.get(`${URL}/api/users/role`)

        dispatch({
            type: USER_ROLE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_ROLE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const listLocations = () => async (dispatch) => {
    try {
        dispatch({ type: USER_LOCATION_REQUEST })

        const { data } = await axios.get(`${URL}/api/locations`)

        dispatch({
            type: USER_LOCATION_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_LOCATION_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const createUser = (user) => async (dispatch) => {
    try {
        dispatch({ type: USER_CREATE_REQUEST })

        const config = {
            headers: {
                'Content-type': 'application/json',
            }
        }

        const { data } = await axios.post(
            `${URL}/api/users`,
            user,
            config
        )


        dispatch({
            type: USER_CREATE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST })


        const config = {
            headers: {
                'Content-type': 'application/json',
            }
        }

        const { data } = await axios.get(
            `${URL}/api/users/${id}`,
            config
        )


        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const updateUser = (user, id) => async (dispatch) => {
    try {
        dispatch({ type: USER_UPDATE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const { data } = await axios.put(`${URL}/api/users/${id}`,
            user,
            config
        )

        dispatch({
            type: USER_UPDATE_SUCCESS
        })

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}