export default function(state, action){
    switch(action.type){
        case 'setStudent':
            return action.payload
        default:
            return state
    }
}