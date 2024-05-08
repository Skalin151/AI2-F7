import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import React ,{useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import { data } from 'jquery';


const baseUrl = "http://localhost:3000";

export default function ListGenre(){

    const [dataGenre, setdataGenre] = useState([]);

    useEffect(() => {
        LoadGenre();
    }, []);

    function LoadGenre() {
        const url = baseUrl + "/genre/list";
        axios.get(url)
        .then(res => {
            if (res.data.success === true){
                const data = res.data.data;
                setdataGenre(data);
            }
            else {
                alert("Erro Web Service");
            }
        })
        .catch(error => {
            alert(error)
        });
    }

    return (
        <table className="table table-hover table-striped">
            <thead className = "thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Género</th>
                </tr>
            </thead>
            <tbody>
                <LoadFillData/>
            </tbody>
        </table>
    );

    function LoadFillData(){
        return dataGenre.map((data, index) => {
            return(
            <tr key = {index}>
                <th>{index + 1}</th>
                <td>{data.description}</td>
                <td>
                    <Link className='btn btn-outline-info' to = {"/genre/update/" + data.id}>Editar</Link>
                </td>
                <td>
                    <button className='btn btn-outline-danger' onClick={() => onDelete(data.id)}>Apagar</button>
                </td>
            </tr>
        )
        });
    }

    function onDelete(genre){
        Swal.fire({
            title: 'Tem a certeza?',
            text: 'Esta ação é irreversível!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, apagar!',
            cancelButtonText: 'Não, manter'
        }).then((result) => {
            if (result.value) {
                sendDelete(genre)
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                'Operação cancelada',
                'Género não foi apagado',
                'error'
                )
            }
        })
    }

    function sendDelete(genre){
        const url = baseUrl + "/genre/delete/" + genre
        axios.put(url)
        .then(response =>{
            if (response.data.success){
                Swal.fire(
                    'Apagado!',
                    'Género foi removido.',
                    'success'
                )
                LoadGenre();
            }
            else{
                Swal.fire(
                    'Cancelado',
                    'Género associado a um filme!',
                    'error'
                )
            }
        })
        .catch ( error => {
            alert("Error 325 ")
        });
    }
}