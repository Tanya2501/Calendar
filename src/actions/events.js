const sendResp = () => 
fetch('http://128.199.53.150/events')
.then( (resp) => resp.json() )


export const getEvents = () => dispatch => {
    return sendResp()
    .then( (resp) =>  {
        dispatch({type: 'FETCH_EVENTS_SUCCESS', payload: [...resp]})
        //console.log(resp);
    })    
}

