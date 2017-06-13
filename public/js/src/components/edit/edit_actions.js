import axios from 'axios'

const get_details = (get) => {
    return dispatch => {
        axios.post('/api/get_details', { get })
            .then(get => dispatch({type: "GET_DETAILS", payload: get.data }) )
            .catch(err => dispatch({ type: "GET_DETAILS_ERR", payload: err }) )
    }
}

module.exports = {
    get_details
}