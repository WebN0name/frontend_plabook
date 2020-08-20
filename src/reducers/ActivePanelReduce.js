export default function(state, action){
    switch(action.type){
        case 'setPanel':
            return action.payload
        default:
            return state
    }
}