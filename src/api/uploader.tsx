// upload된 url을 리턴하는 함수
export const uploadImage = async (file: any): Promise<string> => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET!);
  console.log(file);
  console.log(process.env.REACT_APP_CLOUDINARY_URL);
  return fetch(process.env.REACT_APP_CLOUDINARY_URL!, {
    method: "POST",
    body: data,
  })
    .then((res) => res.json())
    .then((data) => data.url);
};
