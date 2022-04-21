import React, { useEffect, useState } from "react";
import { removeFromCard, editCard } from "../../redux/card.slice";
import store, {saveState} from "../../redux/store"
import { useSelector, useDispatch } from 'react-redux';
import './style.css'
import cloneDeep from 'lodash/cloneDeep';
import Search from "../search/search";
import SimilarCard from "../similar-cards/similar";
import { Button,Modal } from 'react-bootstrap';
import AdvModal from "../modal";
import Card from "../card/card";


const Cards = () =>{
    const [searchTerm, setSearchTerm] = useState("");
    const [cardList, setcardList] = useState([]);
    const [filteredCard, setfilteredCard] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showSimilarModal, setShowSimilarModal] = useState(false);
   
    const cart = useSelector((state) => state.card);
    const dispatch = useDispatch();

    
    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    useEffect(()=>{
        setcardList(cart)
    },[cart])

    const getKeyWord = (cardIdx) => {
        const similarWords = [];
        if (cardList[cardIdx]) {
        for(let i = 0; i < cardList[cardIdx].title.split(' ').length; i++) {
          if (cardList[cardIdx].discription.includes(cardList[cardIdx].title.split(' ')[i])) {
            similarWords.push(cardList[cardIdx].title.split(' ')[i]);
          }
        }
        }
        return similarWords;
    }
    
    const getSimilar = (cardIdx) => {
        const similarCard = [];
        const keyWords = getKeyWord(cardIdx);
        const _cart = cloneDeep(cardList);
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

    
  
    
    useEffect(()=>{
        if ( searchTerm != '') {
            setfilteredCard(cardList.filter(e =>
                e.title.toLowerCase().includes(searchTerm.toLowerCase())
                ));
}else {
    setfilteredCard(cardList)
} 
    },[cardList,searchTerm])


    return (
        <>
        <Search val={searchTerm} change={handleChange}/>
        <div className="similar-card">
        </div>
        <div className="wrapper">
        {filteredCard.map((el, i) => ( 
            <Card
                title={el.title}
                discription={el.discription}
                id={el.id}
                date={el.date}
                index={i}
            />
      ))}
      
      </div>
      </>
   )
}

export default Cards


