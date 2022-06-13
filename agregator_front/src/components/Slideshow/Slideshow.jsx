import React, {useState} from 'react'
import BtnSlider from './BtnSlider'
import './styles.css'



const Slideshow = ({warehouseImages}) => {
    const [slideIndex, setSlideIndex] = useState(1)

    const nextSlide = () => {
        if (slideIndex !== warehouseImages?.count) { //TODO: бывает багает, что каунта нет, почему? Через раз
            setSlideIndex(slideIndex + 1)
        } else if (slideIndex === warehouseImages?.count) {
            setSlideIndex(1)
        }
    }

    const prevSlide = () => {
        if(slideIndex !== 1) {
            setSlideIndex(slideIndex - 1)
        }
        else if (slideIndex === 1) {
            setSlideIndex(warehouseImages?.count)
        }
    }

    const moveDot = index => {
        setSlideIndex(index)
    }

    console.log(warehouseImages)
    return (
        <>
        { warehouseImages.count === 0 ? (
            <div>Привет</div>
        ) : (
        <div className="container-slider">
            { warehouseImages?.results?.map((image, i) => {
                return (
                    <div 
                    key = {image.id}
                    className={slideIndex === i + 1 ? "slide active-anim" : "slide" }
                    >
                        <img alt = "" src = {image.images}></img>
                    </div>
                )
            })}
            <BtnSlider moveSlide={nextSlide} direction={"next"}/>
            <BtnSlider moveSlide={prevSlide} direction={"prev"}/>

            <div className="container-dots">
                {Array.from({length: warehouseImages?.count}).map((item, index) => (
                    <div 
                    onClick={() => moveDot(index+1)}
                    className={slideIndex === index + 1 ? "dot active" : "dot"}
                    ></div>
                ))}
            </div>
        </div>
        )}
        </>
    )
}

export default Slideshow