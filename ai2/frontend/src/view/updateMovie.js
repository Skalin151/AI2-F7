import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


const baseUrl = "http://localhost:3000";

export default function UpdateMovie() {
  const [Movie, setMovie] = useState("");
  const [Title, setTitle] = useState("");
  const [Photo, setPhoto] = useState("");
  const [Genre, setGenre] = useState("");
  const [Description, setDescription] = useState("");
  const [dataGenre, setdataGenre] = useState([]);

  const { movieId } = useParams();

  useEffect(() => {
    const url = baseUrl + "/movie/get/" + movieId;
    axios.get(url)
   .then(res => {
        if (res.data.success) {
          const data = res.data.data[0];
          if (data) {
            setMovie(data);
            setTitle(data.title);
            setPhoto(data.photo);
            setDescription(data.description);
            setGenre(data.genre.description);
          } else {
            alert("Error web service");
          }
        }
      })
   .catch(error => {
        alert("Error server: " + error);
      });

    const urlgenre = baseUrl + "/genre/list";
    axios.get(urlgenre)
   .then(res => {
        if (res.data.success) {
          const data = res.data.data;
          setdataGenre(data);
        } else {
          alert("Erro Web Service");
        }
      })
   .catch(error => {
        alert(error);
      });
  }, []);

  function SendUpdate() {
    const url = baseUrl + "/movie/update/" + movieId;
    const datapost = {
      title: Title,
      photo: Photo,
      genreId: Genre,
      description: Description,
    };
    axios.put(url, datapost)
    .then((response) => {
        if (response.data.success === true) {
          alert(response.data.message);
        } else {
          alert("Error");
        }
      })
    .catch((error) => {
        alert("Error 34: " + error);
      });
  }

  function LoadFillData() {
    return dataGenre.map((data, index) => {
      return (
        <option key={index} value={data.id}>
          {data.description}
        </option>
      );
    });
  }

  return (
    <div>
      <div className="form-row justify-content-center">
        <div className="form-group col-md-6">
          <label htmlFor="inputPassword4">Título</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            value={Title}
            onChange={(value) => setTitle(value.target.value)}
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inputPassword4">Insira Foto:</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            value={Photo}
            onChange={(value) => setPhoto(value.target.value)}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="inputState">Género:</label>
          <select
            id="inputState"
            className="form-control"
            value={Genre}
            onChange={(value) => setGenre(value.target.value)}
          >
            <option default></option>
            {LoadFillData()}
          </select>
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inputPassword4">Description:</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            value={Description}
            onChange={(value) => setDescription(value.target.value)}
          />
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-primary mt-2"
        onClick={() => SendUpdate()}
      >
        Atualizar
      </button>
    </div>
  );
}