export default function(state, action){
    switch(action.type){
        case 'setAttempt':
            return action.payload
        default:
            return state
    }
}