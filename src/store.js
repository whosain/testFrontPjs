import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userListReducer, roleListReducer, userLocationReducer, userCreateReducer, userDetailsReducer, userUpdateReducer } from './reducers/userReducers'


const reducer = combineReducers({
    userList: userListReducer,
    roleList: roleListReducer,
    locationList: userLocationReducer,
    userCreate: userCreateReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateReducer,
})

const middleware = [thunk]

const store = createStore(reducer,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store
