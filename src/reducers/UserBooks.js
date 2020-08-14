export default function(state, action){
    switch(action.type){
        case 'setUserBooks':
            return action.payload
        default:
            return state
    }
}