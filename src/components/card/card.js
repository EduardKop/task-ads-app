import React, { useEffect, useState } from "react";
import { removeFromCard } from "../../redux/card.slice";
import store, {saveState} from "../../redux/store"
import { useSelector, useDispatch } from 'react-redux';
import './style.css'
import cloneDeep from 'lodash/cloneDeep';


const Card = () =>{
    const cart = useSelector((state) => state.card);
    const dispatch = useDispatch();
    
      const getKeyWord = (cardIdx) => {
        let similarWords = [];
        for(let i = 0; i < cart[cardIdx].title.split(' ').length; i++) {
          if (cart[cardIdx].discription.includes(cart[cardIdx].title.split(' ')[i])) {
            similarWords.push(cart[cardIdx].title.split(' ')[i]);
          }
        }
        return similarWords;
      }
    
      const getSimilar = (cardIdx) => {
        const similarCard = [];
        const keyWords = getKeyWord(cardIdx);
        const _cart = cloneDeep(cart);
        _cart.splice(cardIdx, 1);
        for (let i = 0; i < _cart.length; i++) {
            for (let n = 0; n < keyWords.length; n++) {
                if (_cart[i].title.includes(keyWords[n]) && _cart[i].discription.includes(keyWords[n]) && similarCard.length < 3) {
                    similarCard.push({id: _cart[i].id, title: _cart[i].title, discription: _cart[i].discription, date: _cart[i].date}); 
                }
            }
        }
       return similarCard;
       

      }
    
    
   return (
  
        <div className="wrapper">
       
       
        {cart.map((el, i) => (
        <div className="card" onClick={() => {saveState(store.getState().card);}}>
        <div className='title-wrap'>
        <button className='del-btn' onClick={()=>{dispatch(removeFromCard(el.id));}}>
            <span className='text'>Delete</span><span className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
            </svg></span>
            </button>
            <h3 className='title-element'>{el.title}</h3>
            
        </div>
        <div className='discription-elem'>
            <p>{el.discription}</p>
            <span className='date'>{el.date}</span>
            
        </div>
        <div className="similar-card-wrap">
            {getSimilar(i).map(el => (
                <div className="similar-card">
                    <h2 className="similar-car-title">
                        {el.title}
                    </h2>
                    <span className="similar-car-discription">
                        {el.discription}
                    </span>
                    <h3 className="similar-car-date">
                        {el.date}
                    </h3>
                </div>
            ))}
        </div>
   
      </div>
      ))}
      </div>
   )
}

export default Card


