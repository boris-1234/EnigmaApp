import {createStore} from 'redux';
import data from '../data.json';
console.log(data)
const initialState = {
    cryptos : data.data, // array from json file
    categories : ["XRP","BCH","LTC"] // array of categories
}

const reducer = (state = initialState, action) =>{
    switch (action.type){
        case 'STAR_ON' :    // action.name - the value that react sent for the action. 
            // findIndex creates a loop:
            // send each element from the array to findIndexByName(as crypto) until findIndexByName returns true
            const indexToStar = state.cryptos.findIndex(function (crypto){
                if(crypto.name === action.name ){
                    return true;
                }else{
                    return false;
                }
            }); //
            state.cryptos[indexToStar].starOn = true;
            return {...state, cryptos:[...state.cryptos]};
        case "STAR_OFF":
            const indexToUnStar = state.cryptos.findIndex(function (crypto){
                if(crypto.name === action.name ){
                    return true;
                }else{
                    return false;
                }
            })
            state.cryptos[indexToUnStar].starOn = false;
            return {...state, cryptos:[...state.cryptos]};
        default:
            return{...state};
    }
}



export const addStar = (cryptoName) => {
    store.dispatch({type:'STAR_ON', name:cryptoName });
}
export const removeStar = (cryptoName) => {
    store.dispatch({type:'STAR_OFF', name:cryptoName });
}

const store = createStore(reducer);

export default store;