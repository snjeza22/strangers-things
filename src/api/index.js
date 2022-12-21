//import { json } from "react-router-dom"


export const createPost = async (
{
  token, 
  title, 
  description, 
  price, 
  willDeliver
}) => {
 try {
  const response = await fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`
    },
    
    body: JSON.stringify({
      post: {
        title,
        description,
        price,
        willDeliver
      }
    })
  })
  const result = await response.json()
  console.log(response)
  console.log("this is result", result)
 } catch(error){
console.error(error)
 }
}
