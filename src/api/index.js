//import { json } from "react-router-dom"


export const createPost = async (
{
  token, 
  title, 
  description, 
  price, 
  willDeliver,
}) => {

 try {
  fetch('https://strangers-things.herokuapp.com/api/COHORT-NAME/posts', {
  method: "POST",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer TOKEN_STRING_HERE'
  },
  body: JSON.stringify({
    post: {
      title: "My favorite stuffed animal",
      description: "This is a pooh doll from 1973. It has been carefully taken care of since I first got it.",
      price: "$480.00",
      willDeliver: true
    }
  })
})
  console.log("here is an error")
  const result = await response.json()
  console.log("this is response",response)
  console.log("this is result", result)
  
 } catch(error){
console.error(error)

 }
}
