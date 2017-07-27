const sendResp = () => 
    fetch('http://128.199.53.150/trainers')
    .then( (resp) => resp.json() );

export const getTrainers = () => dispatch => {

    return sendResp().then( (resp) =>  {
        let result = resp.map( function(item) { 
            let id = item.id;
            return item; 
        });
        dispatch({type: 'FETCH_TRAINERS_SUCCESS', payload: result})
    });   
}
