import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    min-width: 950px;
    min-height: 100vh;
    width: 85%;
    background-color: white;
    padding: 0px;
    margin: 40px 0;
    border-radius: 25px;

    .left {
        width: 20%;
        height: 100%;
        background-color: #1C34AB;
        color: #8995D7;
        border-top-left-radius: 25px;
        border-bottom-left-radius: 25px;

        ul {
            list-style: none;
        }
        h2 {
            margin-top: 40px;
            text-align: center
        }
        li {
            display: flex;
            padding: 20px;
            cursor: pointer;

            p {
                line-height: 30px;
                padding-left: 10px;
            }
        }
        li:hover {
            background-color: #1C2FA3;
        }
        .adminIcon {
            width: 100%;
            height: 100px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .productMenu {
            background: #19288B;
            border-left: 8px solid #23C5D1;
        }
        .productMenu:hover {
            background: #19288B;
            color: #D4D8EE;
        }
    }
    .right {
        width: 80%;
        border-top-right-radius: 25px;
        border-bottom-right-radius: 25px;

        #search {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 70px;
            
            .searchIcon {
            display: flex;
            width: 400px;   
            border-radius: 12px;
            background: #23C5D1;
            align-items: center;

                img {
                    margin: 7px;
                }
                input {
                    border: none;
                    width: 100%;
                    height: 40px;
                    background: #F9FAFD;
                    border-top-right-radius: 10px;
                    border-bottom-right-radius: 10px;
                    padding: 0 10px;
                    outline: none;
                }
            }
        }
    }
` 
export const li_active = {
    background: '#1C2FA3', 
    color: '#D4D8EE',
    borderLeft: '8px solid #23C5D1'
}