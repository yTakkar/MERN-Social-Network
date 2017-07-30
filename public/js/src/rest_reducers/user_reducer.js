const user_defaults = {
    user_details: {}
}

const user = (state=user_defaults, action) => {
    switch(action.type){
        case "USER_DETAILS": 
            return { ...state, user_details: action.payload }
            break;
            
    }
    return state
}

export default user