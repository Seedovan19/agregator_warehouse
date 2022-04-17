import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const WarehousePage = () => {
    const { id } = useParams();
    const [ post, setPost ] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/warehouses/${id}`)
        .then(res => res.json())
        .then(data => setPost(data))
    }, [id]);

    return (
    <div>
        {post && (
            <>
            <h1>{post.adress}</h1>
            </>
        )}
    </div>
  )
}

export {WarehousePage}