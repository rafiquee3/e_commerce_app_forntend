import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { UserType } from '@/helpers/types';
import { Container } from '../../styles/editForm'

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
            id: user?.id,
            login,
            name,
            surname,
            email
          }

            axios.put('http://localhost:3000/api/user/edit', data)
            .then((res) => {
                resetFields();
                toast('Zapisano dane', {style: {background: "green", color: "white"}});
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