export default function(state, action){
    switch(action.type){
        case 'isLoading':
            return !state
        default:
            return state
    }
}