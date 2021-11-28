import {useState} from 'react';
import { useSelector } from "react-redux";
import {addStar, removeStar} from '../store/reducer'
import starYellow from '../assets/star_yellow.png';
import starGrey from '../assets/star_grey.png';


const ListOfCoins = () => {
    const coins = useSelector( (state) => state.cryptos);
    const categories = useSelector( (state) => state.categories);
    const [categoryFilter, setCategoryFilter] = useState("");
    const [nameFilter, setNameFilter] = useState("");

    const coinFilter = (coins) =>{
        console.log(categoryFilter.length);
        if(categoryFilter.length === 3){
            return coins.filter( c => c.name.startsWith(categoryFilter));
        }else if(nameFilter.length > 0){
            return coins.filter( c => c.name.includes(nameFilter));
        }else{
            return coins;
        }
    }

    const catFilterHandler = (category) => {
        if(categoryFilter.length === 0){
            setCategoryFilter(category);
        }else{
            setCategoryFilter("");
        }
        setNameFilter("");
    }
    const nameFilterHandler = (name) => {
        setNameFilter(name);
        setCategoryFilter("");
    }

    const formatVolume = (volume) =>{
        if(volume >= 1000000){
            return (volume/1000000) + 'M';
        } else if(volume > 1000){
            return (volume/1000) + 'K';
        }else{
            return volume;
        }
    }

    const styleChange = (change) => {
        if(change < 0){
            return {color: 'red'};
        }else if(change > 0){
            return {color: 'green'};
        }else{
            return {color: 'white'};
        }
    }

    const toggleStar = (coin) => {
        if(coin.starOn){
            removeStar(coin.name);
        }else{
            addStar(coin.name);
        }
    }
    return(
        <div>
            <div>
                {categories.map( cat => <button onClick={() => catFilterHandler(cat)}>{cat}</button>)}
            </div>
            <div>
                <input type="text" value={nameFilter} onChange={ event => nameFilterHandler(event.target.value)} placeholder="Search all markets"/>
                <button onClick={() => setNameFilter("")}>X</button>
            </div>
            <table width="100%">
                {coinFilter(coins).map( coin => <tr key={coin.name}>
                    <td>{coin.name}</td>
                    <td>{coin.price}</td>
                    <td style={styleChange(coin.change)}>{coin.change}</td>
                    <td>{formatVolume(coin.volume)}</td>
                    <td onClick={() => toggleStar(coin)}><img src={coin.starOn ? starYellow : starGrey} alt={coin.starOn ? 'starred' : 'not starred'} style={{width:'10%', margin: '2px', padding: '2px'}}/></td>
                    </tr>)}
            </table>
           
        </div>
    )
}

export default ListOfCoins;