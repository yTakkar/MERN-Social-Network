import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import promise from 'redux-promise-middleware'

// reducers
import notes from '../rest_reducers/note_reducer'
import user from '../rest_reducers/user_reducer'
import follow from '../rest_reducers/follow_reducer'
import note_int from '../rest_reducers/note_int_reducer'

const reducers = combineReducers({
    notes,
    user,
    follow,
    note_int
})

const middleware = applyMiddleware(promise(), thunk, logger)

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    middleware
)

export default store
