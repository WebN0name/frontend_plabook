export default function(state, action){
    switch(action.type){
        case 'setBooks':
            return action.payload
        default:
            return state
    }
}