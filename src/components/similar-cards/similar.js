import React, { useEffect, useState } from "react";
import { Button,Modal } from 'react-bootstrap';

import './similar.css'

function SimilarCard({func}) {
   
    
    return (
    <Button className="similar-cards btn" variant="primary" onClick={func}>
        Показати подібні картки
    </Button>
    )
}

export default SimilarCard