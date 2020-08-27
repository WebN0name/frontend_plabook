export default function(state, action){
    switch(action.type){
        case 'setAdmin':
            return action.payload
        default:
            return state
    }
}