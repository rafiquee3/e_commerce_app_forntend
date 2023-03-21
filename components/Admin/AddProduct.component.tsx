import { useState } from 'react';
import { toast } from 'react-toastify';
import styled from "styled-components";
import axios from 'axios';
import { ProductType } from '../Product/ProductItem.component';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    
    form {
        margin-top: 15px;
        textarea:focus, input:focus, select:focus {
            outline: none;
        }
        #submitBttn {
            position: absolute;
            top: -55px;
            right: 30px;
            padding-right: 30px;
            background-color: black;
            color: white;
            padding: 10px;
            width: 70px;
            height: 40px;
            border: none;
            border-radius: 8px;
        }
        #submitBttn:hover {
                color: #22C5D1;
                cursor: pointer;
        }
        #priceAndQtRow {
            display: flex;
            .row {
                width: 170px;
                margin: 0;
                margin-right: 25px;
            }
        }
        #catAndFeatureRow {
            margin-top: 25px;
            display: flex;
            .row {
                width: 190px;
                margin: 0;
                margin-right: 25px;
                select {
                    border: none;
                    font-size: inherit;
                    border-top-right-radius: 8px;
                    border-bottom-right-radius: 8px;
                    padding: 0 10px;
                    text-align: center;
                }
                #featuredSelect {
                    width:70px;
                }
            }
        }
        .row {
            display: flex;
            margin: 25px 0;
            width: 450px;     
            border-radius: 8px;
        
            .label {
                width: 120px;
                text-align: center;
                background: #DEDEDE;
                padding: 9px;
                border-top-left-radius: 8px;
                border-bottom-left-radius: 8px;
            }
            .inputValue {
                border: none;
                width: 100%;
                font-size: inherit;
                border-top-right-radius: 8px;
                border-bottom-right-radius: 8px;
                padding: 0 10px;
            }
        }
        #description {
            display: flex;
            flex-direction: column;
            #descriptionInput {
                border: none;
                height: 260px;
                border-radius: 8px;
                border-top-left-radius: 0px;
                resize: none;
                padding: 10px;
            }
            #descriptionLabel {
                border-top-left-radius: 8px;
                border-top-right-radius: 8px;
                border-bottom-left-radius: 0px;
            }
        }
    }
`
export const AddProduct = ({editMode}: {editMode: boolean}): JSX.Element => {
    const [name, setName] = useState<string>('');
    const [slug, setSlug] = useState<string>('');
    const [category, setCategory] = useState<string>('meble');
    const [imgUrl, setImgUrl] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [brand, setBrand] = useState<string>('');
    const [rating, setRating] = useState<number>(0);
    const [numReviews, setNumReviews] = useState<number>(0);
    const [countInStock, setCountInStock] = useState<number>(0);
    const [description, setDescription] = useState<string>('');
    const [isFeatured, setIsFeatured] = useState<any>(true);
    const [path, setPath] = useState<string>();

    const handleChange = (e: any) => {
        const value = e.target.value;
        console.log('val: ', value)
        switch (e.target.name) {
            case 'name':
                setName(value);
                break;
            case 'brand':
                setBrand(value);
                break;
            case 'slug':
                setSlug(value);
                break;
            case 'foto': 
                setImgUrl(value);
                break;
            case 'price':
                setPrice(value);
                break;
            case 'quantity':
                setCountInStock(value);
                break;
            case 'category':
                setCategory(value);
                break;
            case 'featured':
                setIsFeatured(value);
                break;
            case 'description':
                setDescription(value);
                break;
        }
    }
    const resetFields = () => {
        setName('');
        setBrand('');
        setSlug('');
        setImgUrl('');
        setPrice(0);
        setCountInStock(0);
        setCategory('');
        setIsFeatured('');
        setDescription('');
    }
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setPath('');
        const result: boolean = isFeatured === 'true' ? true : false;
        const data: ProductType = {
            name,
            slug,
            category,
            image: imgUrl,
            price: Number(price),
            brand,
            rating,
            numReviews,
            countInStock: Number(countInStock),
            description,
            isFeatured: result
          }
          axios.post('http://localhost:3000/api/products/add', data)
          .then((res) => {
            resetFields();
            toast('Produkt dodany', {style: {background: "green", color: "white"}})
          })
          .catch((err) => {
            toast.error(err.response.data.error[0].error
            , {style: {background: "red", color: "white"}});
          });
    }
    const activePath = {
        background: "black",
        color: "white"
    }
    return (
    <Container>
        <form onSubmit={handleSubmit}>
            <input id="submitBttn" type="submit" value="Dodaj"/>
            <div className="row">
                <div className="label" style={path === "name" ? activePath : {}}>Nazwa</div>
                <input type="text" className="inputValue" name="name" id="name" value={name || ''} onChange={handleChange} onClick={() => setPath('name')} required/>
            </div>
            <div className="row">
                <div className="label" style={path === "brand" ? activePath : {}}>Marka</div>
                <input type="text" className="inputValue" name="brand" id="name" value={brand || ''} onChange={handleChange} onClick={() => setPath('brand')} required/>
            </div>
            <div className="row">
                <div className="label" style={path === "slug" ? activePath : {}}>Slug</div>
                <input type="text" className="inputValue" name="slug" id="name" value={slug || ''} onChange={handleChange} onClick={() => setPath('slug')} required/>
            </div>
            <div className="row">
                <div className="label" style={path === "foto" ? activePath : {}}>Foto url</div>
                <input type="text" className="inputValue" name="foto" id="name" value={imgUrl || ''} onChange={handleChange} onClick={() => setPath('foto')} required/>
            </div>
            <div id="priceAndQtRow">
                <div className="row">
                    <div className="label" style={path === "price" ? activePath : {}}>Cena</div>
                    <input type="text" className="inputValue" name="price" id="name" value={price || ''} pattern="^([0]|[1-9]{1}[0-9]*)\.[0-9]{2}$" onChange={handleChange} onClick={() => setPath('price')} required/>
                </div>
                <div className="row">
                    <div className="label" style={path === "quantity" ? activePath : {}}>Ilość</div>
                    <input type="text" className="inputValue" name="quantity" id="name" value={countInStock || ''} pattern="[0-9]+" onChange={handleChange} onClick={() => setPath('quantity')} required/>
                </div>
            </div>
            <div id="catAndFeatureRow">
                <div className="row">
                    <div className="label" style={path === "category" ? activePath : {}}>Kat.</div>
                    <select id="pet-select" name="category" onChange={handleChange} onClick={() => setPath('category')} required>
                        <option value="meble">Meble</option>
                        <option value="akcesoria">Akcesoria</option>
                    </select>
                </div>
                <div className="row">
                    <div className="label" style={path === "featured" ? activePath : {}}>Publikować</div>
                    <select id="featuredSelect" name="featured" onChange={handleChange} onClick={() => setPath('featured')}>
                        <option value="true">tak</option>
                        <option value="false">nie</option>
                    </select>
                </div>
            </div>
            <div className="row" id="description">
                <div id="descriptionLabel" className="label" style={path === "description" ? activePath : {}}>Opis</div>
                <textarea id="descriptionInput" name="description" value={description || ''} onChange={handleChange} onClick={() => setPath('description')} required/>
            </div>
        </form>
    </Container>
    )
}