import { useState } from 'react';
import { toast } from 'react-toastify';
import styled from "styled-components";
import axios from 'axios';
import { ProductType } from '../Product/ProductItem.component';
import 'react-toastify/dist/ReactToastify.css';
import { UserType } from '@/helpers/types';

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
    }
`
export const EditUser = ({user, changePath, updateUsers}: {user: UserType | undefined, changePath: (path: string) => void, updateUsers: (user: UserType) => void }): JSX.Element => {
    const [login, setLogin] = useState<string | any>(user?.login);
    const [name, setName] = useState<string | any>(user?.name);
    const [surname, setSurname] = useState<string | any>(user?.surname);
    const [email, setEmail] = useState<string | any>(user?.email);
    const [path, setPath] = useState<string>();

    const handleChange = (e: any) => {
        const value = e.target.value;
        console.log('val: ', value)
        switch (e.target.name) {
            case 'name':
                setName(value);
                break;
            case 'login':
                setLogin(value);
                break;
            case 'surname':
                setSurname(value);
                break;
            case 'email': 
                setEmail(value);
                break;
        }
    }
    const resetFields = () => {
        setName('');
        setSurname('');
        setLogin('');
        setEmail('');
    }
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setPath('');
        let data: any = {
            login,
            name,
            surname,
            email
          }

            axios.put('http://localhost:3000/api/user/edit', data)
            .then((res) => {
                resetFields();
                toast('Produkt zaktualizowano', {style: {background: "green", color: "white"}});
                changePath('users');
                updateUsers(data);
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
                <div className="label" style={path === "login" ? activePath : {}}>Login</div>
                <input type="text" className="inputValue" name="login" id="login" value={login || ''} onChange={handleChange} onClick={() => setPath('login')} required/>
            </div>
            <div className="row">
                <div className="label" style={path === "name" ? activePath : {}}>Imie</div>
                <input type="text" className="inputValue" name="name" id="name" value={name || ''} onChange={handleChange} onClick={() => setPath('name')} required/>
            </div>
            <div className="row">
                <div className="label" style={path === "surname" ? activePath : {}}>Nazwisko</div>
                <input type="text" className="inputValue" name="surname" id="surname" value={surname || ''} onChange={handleChange} onClick={() => setPath('surname')} required/>
            </div>
            <div className="row">
                <div className="label" style={path === "email" ? activePath : {}}>Email</div>
                <input type="text" className="inputValue" name="email" id="name" value={email || ''} onChange={handleChange} onClick={() => setPath('email')} required/>
            </div>   
        </form>
    </Container>
    )
}