export default function(state, action){
    switch(action.type){
        case 'setStopWords':
            return action.payload
        default:
            return state
    }
}