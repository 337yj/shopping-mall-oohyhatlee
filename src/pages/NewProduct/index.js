import React, { useState } from "react";
import { uploadImage } from "../../api/uploader";
import useProducts from "../../hooks/useProducts";
import { Button } from "../../components/Common";
import styles from "./newProduct.module.scss";

const NewProduct = () => {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();
  const { addProduct } = useProducts();

  const onChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({
      ...product,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    uploadImage(file)
      .then((url) => {
        addProduct.mutate(
          { product, url },
          {
            onSuccess: () => {
              setSuccess("The product has been successfully added.");
              setTimeout(() => {
                setSuccess(null);
              }, 4000);
            },
          },
        );
      })
      .finally(() => setIsUploading(false));
  };

  return (
    <main className={styles.wrapper}>
      <h2 className={styles.subHeader}>New Product Upload</h2>
      {success && <p className={styles.uploadSuccess}>{success}</p>}
      <section className={styles.uploadWrap}>
        <figure>
          {file && (
            <img
              className={styles.uploadImage}
              src={URL.createObjectURL(file)}
              alt="local file"
            />
          )}
        </figure>
        <form className={styles.uploadForm} onSubmit={onSubmit}>
          <label htmlFor="file">
            <div className={styles.uploadBtn}>Choose File</div>
          </label>
          <input
            type="file"
            accept="image/*"
            name="file"
            id="file"
            required
            onChange={onChange}
            className={styles.fileInput}
          />
          <input
            type="text"
            name="title"
            value={product.title ?? ""}
            placeholder="제품명"
            required
            onChange={onChange}
          />
          <input
            type="number"
            name="price"
            value={product.price ?? ""}
            placeholder="가격"
            required
            onChange={onChange}
          />
          <input
            type="text"
            name="category"
            value={product.category ?? ""}
            placeholder="카테고리"
            required
            onChange={onChange}
          />
          <input
            type="text"
            name="description"
            value={product.description ?? ""}
            placeholder="제품 설명"
            required
            onChange={onChange}
          />
          <input
            type="text"
            name="options"
            value={product.options ?? ""}
            placeholder="옵션들(콤마(,)로 구분)"
            required
            onChange={onChange}
          />

          <Button
            text={isUploading ? "UPLOADING..." : "UPLOAD"}
            disabled={isUploading}
          />
        </form>
      </section>
    </main>
  );
};

export default NewProduct;
