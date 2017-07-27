
const initialState = [];

export default function trainers(state = initialState, action) {
    if (action.type === "FETCH_TRAINERS_SUCCESS") {
        return action.payload
            .map(item => {
               // console.log(item);
                const id = item.id;
                const name = item.name;
                const avatar = item.avatar;
                return Object.assign({id, name, avatar}, item);
            })
                
        
    }
    return state;
}
