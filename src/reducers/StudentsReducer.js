export default function(state, action){
    switch(action.type){
        case 'setStudents':
            return action.payload
        default:
            return state
    }
}