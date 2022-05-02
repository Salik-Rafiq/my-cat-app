import React, { useEffect, useState } from "react";
import CatImage from "../components/CatImage";
import CatApiService from "../app/services/CatApiService";
import { parseISO, format } from "date-fns";
import { Image } from "react-bootstrap";
import Spinner from '../assets/spinner.gif';

const UploadsTab = () => {
    const [images, setImages] = useState([]);
    const [isLoading, setIsloading] = useState(false);

    useEffect(() => {
        setIsloading(true);
        CatApiService.getMyImages().then(({ data }) => {
            setImages(data);
            setIsloading(false);
        });
        ;
    }, [])

    const catList = images.map((data) => {
        const imageDate = parseISO(data.created_at);
        return (
            <figure key={data.id}>
                <CatImage id={data.id} url={data.url} dimensions={{ cx: "500px", cy: "500px" }} />
                <figcaption>{format(imageDate, "ccc d LLLL y")}</figcaption>
            </figure>
        );
    });

    return (
        <>
            <div className="mt-2">
                <h4>Your last 10 uploads</h4>
            </div>
            <div className="mt-2">
                <Image src={Spinner} style={{ display: isLoading ? "block" : "none", height: "125px", width: "125px" }} />
                {isLoading ? null : catList}
            </div>
            <p>Todo: add vote counts</p>
        </>
    )
}

export default UploadsTab;