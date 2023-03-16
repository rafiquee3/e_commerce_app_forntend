import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    width: 85%;
    height: 880px;
    min-width: 890px;
    background-color: #F9FAFD;
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
            background: white;
            border-top-right-radius: 25px;
            
            #addProductTitle {
                position: relative;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;

                button {
                    position: absolute;
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
                button:hover {
                    color: #22C5D1;
                    cursor: pointer;
                }
            }

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