import { css } from '@emotion/css'
import Image from 'next/image'
import axios from 'axios';
import { FC, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { FontColor } from '../../styles/colors';

const RegisterForm: FC = (): JSX.Element => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [currentField, setCurrentField] = useState('');
  const [errorFields, setErrorFields] = useState([]);
  const [success, setSuccess] = useState(false);
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const style = css`
    display: flex;
    position: relative;
    min-height: 250px;
    max-width: 470px;
    border: 2px solid #166587;
    border-radius: 18px;
    overflow: hidden;

    div:nth-child(1) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: #166587;
      padding: 30px;
    }
    div:nth-child(2) {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      padding: 25px;
      background: #183D61;

      input {
        font-size: 1em;
        color: ${FontColor.DEFAULT};
      }
      span {
        color: ${FontColor.RED};
        font-size: 0.7em;
        align-self: flex-start;
        padding-left: 0.5em;
        flex-wrap: wrap;
      }
      input[type="text"], input[type="password"] {
        height: 50px;
        width: 220px;
        margin: 5px;
        border: none;
        border-bottom: 1px solid #166587;
        background: #183D61;
      }
      input[type="submit"], input[type="button"] {
        align-self: flex-end;
        height: 50px;
        color: #7FA2B3;
        background: #183D61;
        border: 1px solid #166587;
        border-radius: 14px;
        padding: 12px 12px;
        margin-top: 20px;

        &:hover {
          color: ${FontColor.GREEN};
          cursor: pointer;
          border-color: green;
        }
      }
      input:focus-visible {
        outline: none;
        border-bottom: 1px solid ${FontColor.GREEN};
      }
      input::placeholder {
        font-size: 1em;
        opacity: .5;
        color: ${FontColor.GRAY};
      }
    }
    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus, 
    input:-webkit-autofill:active{
      -webkit-box-shadow: 0 0 0 30px #183D61 inset !important;
    }
  `
  const styleImg = css`
    opacity: ${success ? 0.5 : 0.4};
    filter: ${success ? 'hue-rotate(340deg) saturate(130%) brightness(1.9)' : ''};
  `
  const styleCurrentField = css`
    position: absolute;
    padding: 10px;
    color: ${success ?  '#BABFBF' : FontColor.DEFAULT};
    bottom: 0;
  `
  const styleSuccess = css`
    color: ${FontColor.DEFAULT};
    & p {
      text-align: left;
    }
    & b {
      color: #166587;
      filter: brightness(1.4);
    }
  `
  const styleErrField = {
    color: FontColor.RED, 
    borderBottom: `1px solid ${FontColor.RED}`
  }
  type ErrorObj = {
    field: string;
    error: string;
  }
  type User = {
    login: string;
    password: string;
    email: string;
  }
  const userValidator = (user: User): ErrorObj[] => {
    const errors: ErrorObj[] = [];

    if (user.login.length < 5)
      errors.push({
        field: 'login',
        error: 'the entered word should contain at least 5 characters',
      });
    if (user.login.length > 13)
      errors.push({
        field: 'login',
        error: 'the entered word should contain at max 13 characters',
      });
    if (user.password.length < 5)
      errors.push({
        field: 'password',
        error: 'the entered password should contain at least 5 characters',
      });
    if (user.password.length > 13)
      errors.push({
        field: 'password',
        error: 'the entered password should contain at max 13 characters',
      });
    if (user.login.length > 0 && user.password.length > 0) {
      const reg = /^[a-zA-Z0-9]+[_]?[a-zA-Z0-9]+$/;
  
      if (!reg.test(user.login))
        errors.push({
          field: 'login',
          error:
            'login should consist of letters and numbers and may contain _',
        });
      if (!reg.test(user.password))
        errors.push({
          field: 'password',
          error:
            'password should consist of letters and numbers and may contain _',
        });
    }
    if(!user.email.length) {
      errors.push({
        field: 'email',
        error:
          'email is empty',
      });
    } else {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      if (!reg.test(user.email))
        errors.push({
          field: 'email',
          error:
            'email format incorrect',
        });
    }
    return errors;
  }
  const apiConnect = (login: string, password: string, email: string, firstName: string, lastName: string) => {
    axios.post('http://localhost:3001/auth/signup', {
      login,
      email,
      password,
      firstName,
      lastName
    })
    .then((res) => {
      setSuccess(true);
      setCurrentField(login);
    })
    .catch((err) => {
      const validationErrors = err.response.data.errors;
      setErrorFields(validationErrors);
      focusOnErrField(validationErrors);
    });
  }
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const validationErrors: any = userValidator({login, password, email});
    if(validationErrors.length) {
      setErrorFields(validationErrors);
      focusOnErrField(validationErrors);
    } else {
      apiConnect(login, password, email, firstName, lastName);
    }
  }
  const handleOnChange = (callback: () => void) => {
    if(errorFields.length) {
      if(currentField === 'login') {
        setErrorFields(prev => prev.filter((elem: ErrorObj) => elem.field !== 'login'));
      } else if (currentField === 'password') {
        setErrorFields(prev => prev.filter((elem: ErrorObj) => elem.field !== 'password'));
      } else if (currentField === 'email') {
        setErrorFields(prev => prev.filter((elem: ErrorObj) => elem.field !== 'email'));
      }
    }
    callback();
  }
  type ValidationField = {
    res: Boolean;
    elem: ErrorObj | undefined;
  }
  const isValid = (formField: string): ValidationField => {
    const result = errorFields?.find((elem: ErrorObj) => elem.field === formField);
    return {
      res: !Boolean(result),
      elem: result
    }
  }
  const focusOnErrField = (validationErrors: ErrorObj[]): void => {
    const [firstErrField] = validationErrors;
    const {field} = firstErrField;
    
    if(field === 'login') {
      loginRef.current?.focus();
    } else if(field === 'password') {
      passwordRef.current?.focus();
    } else if(field === 'email') {
      emailRef.current?.focus();
    }
  }
  const Form = (
          <form 
            method="post"
            className={style}
            onSubmit={handleSubmit}
            autoComplete="do-not-autofill"
          >
            <div>
              <div className={styleCurrentField}>{currentField}</div>
              <Image
                src="/login.png"
                alt="Picture of the author"
                width={130}
                height={130}
                className={styleImg}
              />
            </div>
            <div>
              <input 
                type="text" 
                value={login} 
                style={isValid('login').res ? {} : styleErrField}
                onChange={e => handleOnChange(() => setLogin(e.target.value))}
                onFocus={() => setCurrentField('login')}
                ref={loginRef} 
                name="login"
                placeholder="login"
              />
              <span>{isValid('login').elem?.error}</span>
              <input 
                type="password" 
                value={password}
                style={isValid('password').res ? {} : styleErrField} 
                onChange={e => handleOnChange(() => setPassword(e.target.value))}
                onFocus={() => setCurrentField('password')}
                ref={passwordRef}  
                name="password" 
                placeholder="password"
              /> 
              <span>{isValid('password').elem?.error}</span>
              <input 
                type="text" 
                value={email} 
                style={isValid('email').res ? {} : styleErrField} 
                onChange={e => handleOnChange(() => setEmail(e.target.value))}
                onFocus={() => setCurrentField('email')}
                ref={emailRef} 
                name="email" 
                placeholder="email"
              />
              <span>{isValid('email').elem?.error}</span>
              <input 
                type="text" 
                value={firstName} 
                onChange={e => handleOnChange(() => setFirstName(e.target.value))}
                onFocus={() => setCurrentField('first name')}
                name="firstName" 
                placeholder="first name"
              /> 
              <input 
                type="text" 
                value={lastName} 
                onChange={e => handleOnChange(() => setLastName(e.target.value))}
                onFocus={() => setCurrentField('last name')}
                name="lastName" 
                placeholder="last name"
              /> 
              <input type="submit" value="Signup" name="submit"></input>
            </div>
          </form>
  );
  const SuccessMsg = (
          <div className={style}>
            <div>
              <div style={{position: 'absolute', bottom: '0', padding: '30px 0px', color: '#BABFBF'}}>{currentField}</div>
              <Image
                src="/login.png"
                alt="Picture of the author"
                width={110}
                height={110}
                className={styleImg}
              />
            </div>
            <div className={styleSuccess}>
              <p>User <b>{login}</b> has been successfully registered.</p>
              <input 
                type="button" 
                value="Login" 
                name="goLogin"
                onClick={() => router.push('/signin')}>
              </input>
            </div>
          </div>
  );
  return (
    <>
      {success ? SuccessMsg : Form}
    </>
  )
}
export default RegisterForm;