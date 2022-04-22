import React, { useEffect, useState } from "react";
import { removeFromCard, editCard } from "../../redux/card.slice";
import store, {saveState} from "../../redux/store"
import { useSelector, useDispatch } from 'react-redux';
import './style.css'
import cloneDeep from 'lodash/cloneDeep';
import { Button,Modal } from 'react-bootstrap';
import AdvModal from "../modal";


const Card = ({title, discription, id, date, index}) =>{
    const [cardList, setcardList] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showSimilarModal, setShowSimilarModal] = useState(false);
   
    const cart = useSelector((state) => state.card);
    const dispatch = useDispatch();

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


    return (
        <>
        <div className="card">
        <div className='title-wrap'>
            <h3 className='title-element'>
            
            {title}
            </h3>
            
        </div>
       
        <div className='discription-elem'>
            <p>{discription}</p>
        </div>
        <div className="date-elem">   
<div className="similar-card-wrap">
<Button className="similar-cards btn" variant="primary" onClick={() => setShowSimilarModal(true)}>
    Показати подібні картки
</Button>
<Modal show={showSimilarModal} onHide={() => setShowSimilarModal(false)}>
<Modal.Header closeButton>
</Modal.Header>
<Modal.Body className="modal-body similar-modal">

{
   getSimilar(index).map(el => (
        <div className="similar-card">
        <div className='title-wrap'>
            <h3 className='title-element similar-car-title'>
                {el.title}
            </h3>
        </div>
        <div className='discription-elem'>
    <p>
    <span className="similar-car-discription">
                {el.discription}
    </span>
    </p>
   
    
        </div> 
        <div className="date-elem"> 
    <div className="date-wrap">
    <span className='date similar-car-date'>
    {el.date}
    </span>
    </div>
    <div className="del-wrap">
    <button className='del-btn' onClick={()=>{dispatch(removeFromCard(el.id));}}>
    <span className='text'>Delete</span><span className="icon">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
    </svg></span>
    </button>
    </div>
    
        </div>
        </div>
    ))
    
    } 


</Modal.Body>
<Modal.Footer>
<Button variant="secondary" onClick={() => setShowSimilarModal(false)}>
  Close
</Button>

</Modal.Footer>
</Modal>
    
    </div>
    <div className="del-wrap">
    <button className='del-btn' onClick={()=>{dispatch(removeFromCard(id));}}>
    <span className='text'>Delete</span><span className="icon">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
    </svg></span>
    </button>

    <button className='edit-btn' onClick={() => setShowEditModal(true)}>
        Edit
    </button>
    <AdvModal
        show={showEditModal}
        defaultTitle={title}
        defaultDiscription={discription}
        onCloseClick={() => setShowEditModal(false)}
        onSaveClick={(title, discription) => {
            dispatch(editCard({title, discription, id: id}));
            saveState(store.getState().card);
            setShowEditModal(false);
        }}
    />
    </div>
</div>

        <div className="date-wrap">
            <span className='date'>
            {date}
            </span>
            </div> 
      </div>
      
      </>
   )
}

export default Card