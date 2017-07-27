
const initialState = [];

export default function events(state = initialState, action) {
    if (action.type === 'FETCH_EVENTS_SUCCESS') {
        return action.payload
            .sort( (a,b) => new Date(a.start) - new Date(b.start))
            .map( (event, i) => {
                const formattedDate = new Date(event.start).toLocaleString("ru");
                const formattedDateTime = formattedDate.slice(0,10) + " / " + formattedDate.slice(12);
                return Object.assign({formattedDateTime}, event);
            })
    }
    return state;
}
