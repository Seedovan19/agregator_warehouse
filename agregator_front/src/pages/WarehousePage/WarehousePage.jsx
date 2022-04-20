import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../components/Header/Header'
import { Grid } from '@material-ui/core';
import useStyles from './styles'


const WarehousePage = () => {
    const { id } = useParams();
    const [ post, setPost ] = useState(null);
    const classes = useStyles();


    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/warehouses/${id}`)
        .then(res => res.json())
        .then(data => setPost(data))
    }, [id]);

    return (
    <div>
        <Header/>
        <Grid container md={11} className={classes.page_content}>
            {post && (
                <>
                <h1>{post.adress}</h1>
                </>
            )}
        </Grid>
    </div>
  )
}

export {WarehousePage}