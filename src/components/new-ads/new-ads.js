import './style.css'
import React, { useEffect, useState } from "react";
import { Button,Modal } from 'react-bootstrap';
import { nanoid } from 'nanoid'
import { addToCard } from "../../redux/card.slice";
import { useDispatch } from "react-redux"
import store, {saveState} from "../../redux/store"
import AdvModal from '../modal'


function AddNewCard (){
    const [showModal, setShowModal] = useState(false);
    
    const dispatch = useDispatch();
    const handleClose = () => {setShowModal(false);}
    const handleShow = () => setShowModal(true);

        
return (
    <>
    <Button className="creating-btn" variant="primary" onClick={handleShow}>
      Створити нове обявлення
    </Button>
    
    <AdvModal
      show={showModal}
      onSaveClick={(title, discription) => {
        dispatch(addToCard({id: nanoid(), title: title, discription: discription, date:(new Date()).toLocaleString()}));
        saveState(store.getState().card);
        setShowModal(false);
      }}
      onCloseClick={handleClose}
    />
  </>
           
           
)
}

export default AddNewCard