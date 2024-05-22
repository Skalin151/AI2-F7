import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import React ,{useEffect, useState} from "react";

const baseUrl = "http://localhost:3000";

export default function CreateGenre(){

    const [Description, setDescription] = useState("");

    return(
        <div>
            <div className='form-row justify-content-center'>
                <div className='form-group col-md-6'>
                    <label htmlFor="inputPassword4">Descrição:</label>
                    <input type="text"
                    className="form-control"
                    placeholder=""
                    value={Description} onChange={value=>
                        setDescription(value.target.value)}/>
                </div>
            </div>
            <button type="submit" className="btn btn-primary mt-2" onClick={()=>SendSave()}>Add</button>
        </div>
    );

    function SendSave(){
        if (Description === "") {
            alert("Adicione uma descrição!")
        }
        else {
            const url = baseUrl + "/genre/create"
            const datapost = {
                description : Description
            }
            axios.post(url, datapost)
            .then(response => {
                if (response.data.success===true) {
                        alert(response.data.message)
                }
                else {
                        alert(response.data.message)
                }
            })
            .catch(error=>{
                alert("Error 34 " + error)
            })
        }
    }
}