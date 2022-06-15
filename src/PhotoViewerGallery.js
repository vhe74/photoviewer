import React, { useState, useEffect, useRef } from 'react';
import { PhotoService } from './PhotoService';
import { Galleria } from 'primereact/galleria';

const Gallery = () => {

    const [images, setImages] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const photoService = new PhotoService();
    const galleria = useRef(null);

    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    useEffect(() => {
        photoService.getImages().then(data => setImages(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const itemTemplate = (item) => {
        return <img src={item.itemImageSrc} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
    }

    const thumbnailTemplate = (item) => {
        return <img src={item.thumbnailImageSrc} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={item.alt} style={{ display: 'block' }} />;
    }

    return (
        <div>
            <div className="card">
                <h5>Custom Content</h5>
                <Galleria ref={galleria} value={images} responsiveOptions={responsiveOptions} numVisible={7} style={{ maxWidth: '850px' }}
                    activeIndex={activeIndex} onItemChange={(e) => setActiveIndex(e.index)}
                    circular fullScreen showItemNavigators showThumbnails={false} item={itemTemplate} thumbnail={thumbnailTemplate} />

                <div className="grid" style={{ maxWidth: '400px' }}>
                    {
                        images && images.map((image, index) => {
                            let imgEl = <img src={image.thumbnailImageSrc} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={image.alt} style={{ cursor: 'pointer' }} onClick={
                                () => {setActiveIndex(index); galleria.current.show()}
                            } />
                            return (
                                <div className="col-3" key={index}>
                                    {imgEl}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Gallery;