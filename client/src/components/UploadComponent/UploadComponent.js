import axios from "axios";
import React, { useState } from "react";

const UploadComponent = () => {
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];

      if (!file) return alert("No se ha subido ningún archivo");

      if (file.size > 1024 * 1024 * 2) return alert("Archivo demasiado grande");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return alert("Formato de archivo no soportado");

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await axios.post(
        `http://localhost:5000/post/newPost`,
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
            token: window.sessionStorage.token,
          },
        }
      );
      setLoading(false);
      setImages({
        data: res.data,
        url: res.data.post.image,
        id: res.data.post.imageId,
      });
      //   console.log(res.data.post);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(
        `http://localhost:5000/post/deletePost`,
        { public_id: images.id },
        {
          headers: {
            token: window.sessionStorage.token,
          },
        }
      );
      setLoading(false);

      setImages(false);
    } catch (err) {
      alert(err.message);
    }
  };

  console.log(images);

  const styleUpload = {
    display: images ? "block" : "none",
  };

  return (
    <div>
      <div>
        <label>
          Subir Foto
          <input type="file" name="file" onChange={handleUpload} />
        </label>
        {loading ? (
          <div></div>
        ) : (
          <div style={styleUpload}>
            <img src={images ? images.url : ""} alt="foto" />
            <span onClick={handleDelete}>X</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadComponent;
