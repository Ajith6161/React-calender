import {applyMiddleware,createStore} from 'redux'
import thunk from 'redux-thunk'
import ReduxReducer from '../reducers/ReduxReducer'

const store = createStore(ReduxReducer, {}, applyMiddleware(thunk))


export default store