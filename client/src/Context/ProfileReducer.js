export default (state, action) => {
    switch(action.type) {
        case "GET_PROFILE":
            return {
                ...state,
                profile: action.payload
            }
            case "DELETE_PROFILE":
                return {
                    
                }
    }
}