import { useState } from 'react';
import { toast } from 'react-toastify';
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
    font-size: 18px;
    form {
        margin-top: 15px;
        textarea:focus, input:focus {
            outline: none;
        }
        .row {
            display: flex;
            margin: 25px;
            width: 450px;
            border-radius: 8px;
            .label {
                width: 120px;
                text-align: center;
                background: #DEDEDE;
                padding: 13px;
                border-top-left-radius: 8px;
                border-bottom-left-radius: 8px;
            }
            .inputValue {
                border: none;
                width: 100%;
                font-size: 18px;
                border-top-right-radius: 8px;
                border-bottom-right-radius: 8px;
                padding: 0 10px;
            }
        }
        #description {
            display: flex;
            flex-direction: column;
            #descritionInput {
                border: none;
                height: 220px;
                border-radius: 8px;
                border-top-left-radius: 0px;
                resize: none;
                padding: 10px;
            }
            #descritionLabel {
                border-top-left-radius: 8px;
                border-top-right-radius: 8px;
                border-bottom-left-radius: 0px;
            }
        }

    }
`
export const AddProduct = ({editMode}: {editMode: boolean}): JSX.Element => {
    const [name, setName] = useState<string>();
    const [slug, setSlug] = useState<string>();
    const [category, setCategory] = useState<string>();
    const [imgUrl, setImgUrl] = useState<string>();
    const [price, setPrice] = useState<number>();
    const [brand, setBrand] = useState<string>();
    const [rating, setRating] = useState<number>(0);
    const [numReviews, setNumReviews] = useState<number>(0);
    const [countInStock, setCountInStock] = useState<number>();
    const [description, setDescription] = useState<string>();
    const [isFeatured, setIsFeatured] = useState<any>(true);

    const handleChange = (e: React.SyntheticEvent) => {
        console.log(e);
    }
    return (
    <Container>
        <form action="" method="get">
            <div className="row">
                <div className="label">Nazwa</div>
                <input type="text" className="inputValue" name="name" id="name" value={name} onChange={handleChange}/>
            </div>
            {

            }
            <div className="row">
                <div className="label">Marka</div>
                <input type="text" className="inputValue" name="name" id="name" value={brand} onChange={handleChange}/>
            </div>
            <div className="row">
                <div className="label">Slug</div>
                <input type="text" className="inputValue" name="name" id="name" value={slug} onChange={handleChange}/>
            </div>
            <div className="row">
                <div className="label">Foto url</div>
                <input type="text" className="inputValue" name="name" id="name" value={imgUrl} onChange={handleChange}/>
            </div>
            <div className="row">
                <div className="label">Cena</div>
                <input type="text" className="inputValue" name="name" id="name" value={price} onChange={handleChange}/>
            </div>
            <div className="row">
                <div className="label">Ilość</div>
                <input type="text" className="inputValue" name="name" id="name" value={countInStock} onChange={handleChange}/>
            </div>
            { editMode ?
                <div className="row">
                    <div className="label">Publikować</div>
                    <input type="text" className="inputValue" name="name" id="name" value={isFeatured} onChange={handleChange}/>
                </div>
                :
                ''
            }
            <div className="row" id="description">
                <div id="descritionLabel" className="label">Opis</div>
                <textarea id="descritionInput" name="name" value={description} onChange={handleChange}/>
            </div>
        </form>
    </Container>
    )
}