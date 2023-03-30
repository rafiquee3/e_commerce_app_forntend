import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from '../../styles/editForm'
import { OrderType } from '@/pages/api/orders';

export const EditOrder = ({order, changePath, updateOrders}: {order: OrderType | undefined, changePath: (path: string) => void, updateOrders: (order: OrderType) => void }): JSX.Element => {
    const [products, setProducts] = useState<string | any>(order?.products);
    const [payment, setPayment] = useState<string | any>(order?.paymentMethod);
    const [itemsPrice, setItemsPrice] = useState<string | any>(order?.itemsPrice);
    const [shippingPrice, setShippingPrice] = useState<string | any>(order?.shippingPrice);
    const [totalPrice, setTotalPrice] = useState<number | any>(order?.totalPrice);
    const [name, setName] = useState<string | any>(order?.name);
    const [surname, setSurname] = useState<string | any>(order?.surname);
    const [login, setLogin] = useState<string | any>(order?.authorLogin);
    const [email, setEmail] = useState<string | any>(order?.email);
    const [address, setAddress] = useState<string | any>(order?.address);
    const [city, setCity] = useState<string | any>(order?.city);
    const [postal, setPostal] = useState<string | any>(order?.postal);
    const [telephone, setTelephone] = useState<string | any>(order?.telephone);
    const [path, setPath] = useState<string>();

    const handleChange = (e: any) => {
        const value = e.target.value;
        console.log('val: ', value)
        switch (e.target.name) {
            case 'name':
                setName(value);
                break;
            case 'surname':
                setSurname(value);
                break;
            case 'products':
                setProducts(value);
                break;
            case 'payment': 
                setPayment(value);
                break;
            case 'itemsPrice': 
                setItemsPrice(value);
                break;
            case 'shippingPrice': 
                setShippingPrice(value);
                break;
            case 'totalPrice': 
                setTotalPrice(value);
                break;
            case 'address': 
                setAddress(value);
                break;
            case 'city': 
                setCity(value);
                break;
            case 'postal': 
                setPostal(value);
                break;
            case 'telephone': 
                setTelephone(value);
                break;
        }   
    }
    const resetFields = () => {
        setName('');
        setSurname('');
        setProducts('');
        setPayment('');
        setItemsPrice('');
        setShippingPrice('');
        setTotalPrice('');
        setAddress('');
        setCity('');
        setPostal('');
        setTelephone('');
        setEmail('');
        setLogin('');
    }
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setPath('');
        let data: any = {
            id: order?.id,
            login,
            name,
            surname,
            email,
            products,
            payment,
            itemsPrice,
            shippingPrice,
            totalPrice,
            address,
            city,
            postal,
            telephone
          }

            axios.put('http://localhost:3000/api/user/edit', data)
            .then((res) => {
                resetFields();
                toast('Zapisano dane', {style: {background: "green", color: "white"}});
                changePath('orders');
                updateOrders(data);
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
            <input id="submitBttn" type="submit" value="Zapisz"/>
            <div className="row">
                <div className="label" style={path === "name" ? activePath : {}}>Imie</div>
                <input type="text" className="inputValue" name="name" id="name" value={name || ''} onChange={handleChange} onClick={() => setPath('name')} required/>
            </div>
            <div className="row">
                <div className="label" style={path === "surname" ? activePath : {}}>Nazwisko</div>
                <input type="text" className="inputValue" name="surname" id="surname" value={surname || ''} onChange={handleChange} onClick={() => setPath('surname')} required/>
            </div>
            <div className="row">
                <div className="label" style={path === "login" ? activePath : {}}>Login</div>
                <input type="text" className="inputValue" name="login" id="login" value={login || ''} onChange={handleChange} onClick={() => setPath('login')} required/>
            </div>
            <div className="row">
                <div className="label" style={path === "email" ? activePath : {}}>Email</div>
                <input type="text" className="inputValue" name="email" id="name" value={email || ''} onChange={handleChange} onClick={() => setPath('email')} required/>
            </div>
            <div className="row">
                <div className="label" style={path === "products" ? activePath : {}}>Produkty</div>
                <input type="text" className="inputValue" name="products" id="products" value={products || ''} onChange={handleChange} onClick={() => setPath('products')} required/>
            </div>
            <div className="row">
                <div className="label" style={path === "payment" ? activePath : {}}>Płatność</div>
                <input type="text" className="inputValue" name="payment" id="payment" value={payment || ''} onChange={handleChange} onClick={() => setPath('payment')} required/>
            </div>
            <div className="row">
                <div className="label" style={path === "itemsPrice" ? activePath : {}}>Cena</div>
                <input type="text" className="inputValue" name="itemsPrice" id="itemsPrice" value={itemsPrice || ''} onChange={handleChange} onClick={() => setPath('itemsPrice')} required/>
            </div>
            <div className="row">
                <div className="label" style={path === "shippingPrice" ? activePath : {}}>Dostawa</div>
                <input type="text" className="inputValue" name="shippingPrice" id="shippingPrice" value={shippingPrice || ''} onChange={handleChange} onClick={() => setPath('shippingPrice')} required/>
            </div>
            <div className="row">
                <div className="label" style={path === "totalPrice" ? activePath : {}}>Total</div>
                <input type="text" className="inputValue" name="totalPrice" id="totalPrice" value={totalPrice || ''} onChange={handleChange} onClick={() => setPath('totalPrice')} required/>
            </div>
            <div className="row">
                <div className="label" style={path === "address" ? activePath : {}}>Adres</div>
                <input type="text" className="inputValue" name="address" id="address" value={address || ''} onChange={handleChange} onClick={() => setPath('address')} required/>
            </div>
            <div className="row">
                <div className="label" style={path === "city" ? activePath : {}}>Miasto</div>
                <input type="text" className="inputValue" name="city" id="city" value={city || ''} onChange={handleChange} onClick={() => setPath('city')} required/>
            </div>
            <div className="row">
                <div className="label" style={path === "postal" ? activePath : {}}>K. Pocz.</div>
                <input type="text" className="inputValue" name="postal" id="postal" value={postal || ''} onChange={handleChange} onClick={() => setPath('postal')} required/>
            </div>
            <div className="row">
                <div className="label" style={path === "telephone" ? activePath : {}}>Telefon</div>
                <input type="text" className="inputValue" name="telephone" id="telephone" value={telephone || ''} onChange={handleChange} onClick={() => setPath('telephone')} required/>
            </div>
            <div className="row">
                <div className="label" style={path === "email" ? activePath : {}}>Email</div>
                <input type="text" className="inputValue" name="email" id="email" value={email || ''} onChange={handleChange} onClick={() => setPath('email')} required/>
            </div>
        </form>
    </Container>
    )
}