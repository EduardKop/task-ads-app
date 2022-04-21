import './style.css'
import React, { useState, useEffect } from "react";
import { Button,Modal } from 'react-bootstrap';


function AdvModal ({onSaveClick, onCloseClick, defaultTitle, defaultDiscription, show}){
    const [title,setTitle] = useState(defaultTitle);
    const [discription,setDiscription] = useState(defaultDiscription);

    useEffect(() => {
        setTitle(defaultTitle);
        setDiscription(defaultDiscription);
      }, [show])
        
return (
    <>
    <Modal show={show} onHide={onCloseClick}>
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
            value={title}
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
        <Button variant="secondary" onClick={onCloseClick}>
          Close
        </Button>
        <Button variant="primary" onClick={() => onSaveClick(title, discription)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  </>
           
           
)
}

export default AdvModal