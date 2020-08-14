export default function(state, action){
    switch(action.type){
        case 'setUser':
            return action.payload
        default:
            return state
    }
}