import React, { useState, useEffect, useRef } from "react";
import { Form, Row } from "react-bootstrap";
import CatApiService from "../app/services/CatApiService";
import CatImage from "../components/CatImage";

const loadBreeds = async () => {
    const result = await CatApiService.getBreeds();
    const data = result.data.map((elem) => {
        return {
            id: elem.id,
            name: elem.name
        }
    });
    return data;
}

const loadSearch = async (breedId) => {
    const ord = "rand"; //breedId === "" ? "rand" : "asc";
    const result = await CatApiService.searchCats({ breedId: breedId, order: ord });
    const data = result.data.map((elem) => {
        return {
            id: elem.id,
            url: elem.url
        }
    });
    return data;
}

const SearchTab = () => {
    const [breeds, setBreeds] = useState([]);
    const breedRef = useRef();
    const [lastSearch, setLastSearch] = useState([]);
    const [searchCount, setSearchCount] = useState(0);

    useEffect(() => {
        loadBreeds()
            .then((data) => setBreeds(data))
            .then(() => doSearch(breedRef.current.value));
    }, []);

    const doSearch = async () => {
        loadSearch(breedRef.current.value)
            .then((data) => {
                setSearchCount(data.length);
                /* organise the data into nested array here will make it easier to render */
                let gridData = [];
                let currRow = [];
                for (let i = 0; i < data.length; i++) {
                    if (i % 3 === 0 && i !== 0) {
                        gridData.push(currRow);
                        currRow = [];
                    }
                    currRow.push(data[i]);
                }
                /* push the last row on */
                if (currRow.length > 0) {
                    gridData.push(currRow);
                }
                setLastSearch(gridData)
            });
    }

    const breedsOptions = breeds.map((elem) => {
        return (<option key={elem.id} value={elem.id}>{elem.name}</option>)
    });

    const breedChanged = () => {
        doSearch()
    }

    return (
        <>
            <Row>
                <Form>
                    <Form.Group>
                        <Form.Label>Breed</Form.Label>
                        <Form.Select ref={breedRef} onChange={breedChanged}>
                            <option value="">All</option>
                            {breedsOptions}
                        </Form.Select>
                        <Form.Text>Change selection to see a specific breed</Form.Text>
                    </Form.Group>
                </Form>
            </Row>
            <Row className="justify-content-md-center">
                <table className="table" style={{ width: "auto" }}>
                    <tbody>
                        {lastSearch.map((elem) => {
                            return (
                                <tr key={elem.reduce((x, y) => x.id + y.id, "")}>{
                                    elem.map((item) => {
                                        return (
                                            <td key={item.id}>
                                                <CatImage id={item.id} url={item.url} dimensions={{ cx: "150px", cy: "150px" }} />
                                            </td>
                                        )
                                    })
                                }
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div>
                    <p>Total: {searchCount}</p>
                </div>
            </Row>
        </>
    )
}

export default SearchTab;