import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ProductType } from '../Product/ProductItem.component';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from '../../styles/editForm'

export const AddProduct = ({product, editMode, changePath, updateProducts}: {product: ProductType | undefined, editMode: boolean, changePath: (path: string) => void, updateProducts: (product: ProductType) => void }): JSX.Element => {
    const [name, setName] = useState<string | any>(editMode ? product?.name : '');
    const [slug, setSlug] = useState<string | any>(editMode ? product?.slug : '');
    const [category, setCategory] = useState<string | any>(editMode ? product?.category : 'meble');
    const [imgUrl, setImgUrl] = useState<string | any>(editMode ? product?.image : '');
    const [price, setPrice] = useState<number | any>(editMode ? product?.price : 0);
    const [brand, setBrand] = useState<string | any>(editMode ? product?.brand : '');
    const [rating, setRating] = useState<number | any>(editMode ? product?.rating : 0);
    const [numReviews, setNumReviews] = useState<number | any>(editMode ? product?.numReviews : 0);
    const [countInStock, setCountInStock] = useState<number | undefined>(editMode ? product?.countInStock : 0);
    const [description, setDescription] = useState<string | any>(editMode ? product?.description : '');
    const [isFeatured, setIsFeatured] = useState<any>(editMode ? product?.isFeatured : true);
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
        setCategory('meble');
        setIsFeatured(true);
        setDescription('');
    }
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
  
        setPath('');
        const result: boolean = isFeatured === 'true' ? true : false;
        let data: any = {
            name,
            slug,
            category,
            image: imgUrl,
            price: price,
            brand,
            rating,
            numReviews,
            countInStock: Number(countInStock),
            description,
            isFeatured: result
          }
          if (editMode) {
            data.id = product?.name;
            axios.put('http://localhost:3000/api/products/edit', data)
            .then((res) => {
                resetFields();
                toast('Produkt zaktualizowano', {style: {background: "green", color: "white"}});
                changePath('products');
                updateProducts(data);
            })
            .catch((err) => {
                toast.error(err.response.data.error[0].error
                , {style: {background: "red", color: "white"}});
            });
          } else {
            axios.post('http://localhost:3000/api/products/add', data)
            .then((res) => {
                resetFields();
                toast('Produkt dodany', {style: {background: "green", color: "white"}});
                updateProducts(data);
            })
            .catch((err) => {
                toast.error(err.response.data.error[0].error
                , {style: {background: "red", color: "white"}});
            });
        }
    }
    const activePath = {
        background: "black",
        color: "white"
    }
    return (
    <Container>
        <form onSubmit={handleSubmit}>
            <input id="submitBttn" type="submit" value={editMode ? "Zapisz" : "Dodaj"}/>
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