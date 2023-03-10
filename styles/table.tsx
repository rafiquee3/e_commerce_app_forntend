import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background: #F9FAFD;

    .error {
        margin: 30px;
    }
`
export const Table = styled.table`
    width: 70%;
    border-spacing : 1;
    margin-top: 40px;
    margin-bottom: 40px;
    
    th {
        text-align: center;
        background: #F9FAFD;
        color: black;
    }
    td {
        text-align: center;
        position: relative;
        a {
            width: 200px;
            background: red;
        }
        img {
            margin: 0;
            position: absolute;
            top: 50%;
            left: 50%;
            -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
        }
    }
    tr {
       height: 60px;
       margin: 5px;
       background: white;

       .id {
            padding-left: 10px;
            padding-right: 10px;
       }
       .edit {
            padding-left: 10px;
            padding-right: 10px;
       }
       .delete {
            padding-left: 10px;
            padding-right: 10px;
            cursor: pointer;
       }
    }
    thead tr:first-child {
        height: 40px;
    }
    tr:hover {
        border-left: 5px solid black;
    }
    tbody {
        tr:nth-child(even) {
            background: #DEDEDE;
        }
    }
    .item {
        text-align: left;
    }
`