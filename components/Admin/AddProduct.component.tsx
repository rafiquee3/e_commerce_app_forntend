import { useState } from 'react';
import { toast } from 'react-toastify';
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;

    form {
        .row {
            display: flex;
            .label {
                width: 100px;
                text-align: center;
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
                <input type="text" name="name" id="name" value={name} onChange={handleChange}/>
            </div>
            {

            }
            <div className="row">
                <div className="label">Marka</div>
                <input type="text" name="name" id="name" value={brand} onChange={handleChange}/>
            </div>
            <div className="row">
                <div className="label">Slug</div>
                <input type="text" name="name" id="name" value={slug} onChange={handleChange}/>
            </div>
            <div className="row">
                <div className="label">Zdjęcie url</div>
                <input type="text" name="name" id="name" value={imgUrl} onChange={handleChange}/>
            </div>
            <div className="row">
                <div className="label">Cena</div>
                <input type="text" name="name" id="name" value={price} onChange={handleChange}/>
            </div>
            <div className="row">
                <div className="label">Ilość</div>
                <input type="text" name="name" id="name" value={countInStock} onChange={handleChange}/>
            </div>
            { editMode ?
                <div className="row">
                    <div className="label">Publikować</div>
                    <input type="text" name="name" id="name" value={isFeatured} onChange={handleChange}/>
                </div>
                :
                ''
            }
            <div className="row">
                <div className="label">Opis</div>
                <input type="text" name="name" id="name" value={description} onChange={handleChange}/>
            </div>
        </form>
    </Container>
    )
}