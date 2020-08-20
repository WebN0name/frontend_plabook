export default function(state, action){
    switch(action.type){
        case 'isReq':
            return !state
        default:
            return state
    }
}