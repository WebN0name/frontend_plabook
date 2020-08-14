export default function(state, action){
    switch(action.type){
        case 'setBookFroReading':
            return action.payload
        default:
            return state
    }
}