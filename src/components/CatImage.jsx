import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';

const CatImage = ({ id, url, dimensions, onClick }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
    }, [url]);

    const onLoad = () => {
        setIsLoading(false);
    }

    return (
        <div key={id} onClick={onClick} className="d-block mx-auto" style={{ height: "500px", width: "500px" }}>
            <Image src='/spinner.gif' style={{ display: !isLoading ? "none" : "block" }} className="mx-auto mt-auto mb-auto" />
            <Image src={url} className="mx-auto mt-auto mb-auto" style={{
                display: isLoading ? "none" : "block",
                maxHeight: "500px", maxWidth: "500px", cursor: "pointer", border: "solid 1px #CDCDCD",
                boxShadow: "5px 5px 5px #1a1a1a"
            }} onLoad={onLoad} />
        </div>

    )
}

export default CatImage;