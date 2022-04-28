import React from 'react'
import { Grid, Typography } from '@material-ui/core';
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/system';


const RecommendationsBlock = () => {
    const navigate = useNavigate()

    const handleRecoClick = (event) => {
        let path = `/recommendations`; 
        navigate(path);
    }
    
    return (
        <div onClick={handleRecoClick}>Получи рекомендации!</div>
    )
}

export {RecommendationsBlock}