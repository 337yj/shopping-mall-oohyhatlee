import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { addNewProduct } from "../../api/firebase";
import { uploadImage } from "../../api/uploader";
import { Button } from "../../components";
import useProducts from "../../hooks/useProducts";
import styles from "./newProduct.module.scss";

const NewProduct = () => {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  // 업로딩 중인지 UI
  const [isUploading, setIsUploading] = useState(false);
  // 업로드 성공했는지 UI
  const [success, setSuccess] = useState();
  const { addProduct } = useProducts();
  // const queryClient = useQueryClient();
  // const addProduct = useMutation(
  //   ({ product, url }) => addNewProduct(product, url),
  //   {
  //     onSuccess: () => queryClient.invalidateQueries(["product"]),
  //   }
  // );

  /**
   * 이미지파일의 경우에는 file을 value로 설정하는것이 아니라 나중에 이미지가 업로드된 url을 할당해줘야함
   * ==> file일 경우에는 setFile로 상태변경
   * 그리고 이미지를 하나만 선택해서 사용해야 되니까 files[0]
   * */
  const onChange = (e) => {
    const { name, value, files } = e.target;
    // console.log(e.target.files);
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
    // 제품의 사진을 Cloudinary에 업로드 하고 url을 획득
    uploadImage(file)
      .then((url) => {
        addProduct.mutate(
          { product, url },
          {
            onSuccess: () => {
              setSuccess("성공적으로 제품이 추가되었습니다.");
              setTimeout(() => {
                setSuccess(null);
              }, 4000);
            },
          }
        );
        // console.log(url);
        // Firebase에 새로운 제품을 추가함
        // addNewProduct(product, url) //
        //   .then(() => {
        //     setSuccess("성공적으로 제품이 추가되었습니다.");
        //     setTimeout(() => {
        //       setSuccess(null);
        //     }, 4000);
        //   });
      })
      .finally(() => setIsUploading(false));
  };

  return (
    <main className={styles.container}>
      <h2>New Product Upload</h2>
      {success && <p className={styles.uploadSuccess}>Upload {success}</p>}
      {file && (
        <img
          className={styles.uploadImage}
          src={URL.createObjectURL(file)}
          alt="local file"
        />
      )}
      <form className={styles.uploadForm} onSubmit={onSubmit}>
        {/* accept='image/*' 이미지 타입에 확장자는 상관없음 */}
        <input
          type="file"
          accept="image/*"
          name="file"
          required
          onChange={onChange}
        />
        {/* product에 title이 없다면 ''빈문자 반환 */}
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
        <button className={styles.btn} disabled={isUploading}>
          {isUploading ? "Uploading..." : "Submit"}
        </button>
        <Button text={"ㅋㄴ야러"} onClick />
      </form>
    </main>
  );
};

export default NewProduct;
