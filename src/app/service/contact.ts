import { api } from "../lib/api";

export const sendContact=async(
    name:string,
    phone:string,
    email:string,
    message:string
)=>{
   try {
  const response = await api.post("/contact-us", {
    name,
    phone,
    email,
    message,
  });
  // console.log(response.data)
  return response.data;
} catch (err ) {
  // console.log(err.response?.status);
  // console.log(err.response?.data);
  // console.log(err.response?.headers);
  throw err;
}
}