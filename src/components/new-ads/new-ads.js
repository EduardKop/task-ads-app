import './style.css'
import React, { useEffect, useState } from "react";
import { Button,Modal } from 'react-bootstrap';
import { nanoid } from 'nanoid'
import { addToCard } from "../../redux/card.slice";
import { useDispatch } from "react-redux"
import store, {saveState} from "../../redux/store"
import { useSelector } from 'react-redux';


function AddNewCard (){
    const [show, setShow] = useState(false);
    const [date,setDate] = useState(''); 
    const [title,setTitle] = useState('');
    const [discription,setDiscription] = useState('');
    
    const dispatch = useDispatch();
    const handleClose = () => {setShow(false);}
    const handleShow = () => setShow(true);
  
 

        
return (
    <>
    <Button className="creating-btn" variant="primary" onClick={handleShow}>
      Створити нове обявлення
    </Button>
    {/* <Button className="creating-btn" variant="primary"  >
      Фільтрувати по подібних
    </Button> */}
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Введіть назву та опис обявлення</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <div className='title-container'>
        <span>введіть назву обявлення</span>
        <input 
            className="title"
            name='Title'
            type='text'
            values={title}
            onChange={(e)=>{setTitle(e.target.value)}}
        />
        </div>
       
        <div className='discription-container'>
        <span>введіть опис обявлення</span>
        <input 
            className="discription"
            name='Discription'
            type='text'
            value={discription}
            onChange={(e)=>{setDiscription(e.target.value)}}
            
        />
        </div>
       
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={()=>{
           
            dispatch(addToCard({id: nanoid(), title: title, discription: discription, date:(new Date()).toLocaleString()}));
            saveState(store.getState().card);
            setShow(false);
            
        }}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  </>
           
           
)
}

export default AddNewCard