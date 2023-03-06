import React, { useState } from 'react';

const NewProduct = () => {
  const [product, setProduct] = useState();
  const [file, setFile] = useState();

  /** 
   * 이미지파일의 경우에는 file을 value로 설정하는것이 아니라 나중에 이미지가 업로드된 url을 할당해줘야함
   * ==> file일 경우에는 setFile로 상태변경
   * 그리고 이미지를 하나만 선택해서 사용해야 되니까
   * */ 
  const onChange = (e) => {
    const {name, value, files} = e.target;
    if(name === 'file'){
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({
      ...product,
      [name]: value
    }));
  };

  const onSubmit = (e) => {

  };

  return (
    <section>
      <form onSubmit={onSubmit}>
        {/* accept='image/*' 이미지 타입에 확장자는 상관없음 */}
        <input
          type='file'
          accept='image/*'
          name='file'
          required
          onChange={onChange}
        />
        {/* product에 title이 없다면 ''빈문자 반환 */}
        <input
          type='text'
          name='title'
          value={product.title ?? ''}
          placeholder='제품명'
          required
          onChange={onChange}
        />
        <input
          type='number'
          name='price'
          value={product.price ?? ''}
          placeholder='가격'
          required
          onChange={onChange}
        />
        <input
          type='text'
          name='category'
          value={product.category ?? ''}
          placeholder='카테고리'
          required
          onChange={onChange}
        />
        <input
          type='text'
          name='description'
          value={product.description ?? ''}
          placeholder='제품 설명'
          required
          onChange={onChange}
        />
        <input
          type='text'
          name='options'
          value={product.options ?? ''}
          placeholder='옵션들(콤마(,)로 구분)'
          required
          onChange={onChange}
        />
        <Button
          text={isUploading ? '업로드중...' : '제품 등록하기'}
          disabled={isUploading}
        />
      </form>
    </section>
  );
}

export default NewProduct;