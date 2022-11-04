import axios from 'axios'
import React, { useEffect, useState } from 'react'


function Menu({cat}) {
    const [posts,setPost] = useState([])

    useEffect(()=>{
        const fetchData = async ()=>{
            try {
                const res = await axios.get(`/posts/?cat=${cat}`)
                setPost(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchData()
    },[cat])
// const data = [
//     {
//         "id": 1,
//         "title": "Donec diam neque,",
//         "desc": "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
//         "img": "https://www.leticialampert.com.br/wp-content/uploads/2016/02/random-city-4-shanghai_yangshuo-dubai-portoaegre-1-1920x1200.jpg"
//     }, 
//     {
//         "id": 2,
//         "title": "Quisque id justo sit amet sapien dignissim vestibulum.",
//         "desc": "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
//         "img": "https://www.leticialampert.com.br/wp-content/uploads/2016/02/random-city-4-shanghai_yangshuo-dubai-portoaegre-1-1920x1200.jpg"
//     }, 
//     {
//         "id": 3,
//         "title": "Aenean lectus. Pellentesque eget nunc.",
//         "desc": "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
//         "img": "https://www.leticialampert.com.br/wp-content/uploads/2016/02/random-city-4-shanghai_yangshuo-dubai-portoaegre-1-1920x1200.jpg"
//     }, 
//     {
//         "id": 4,
//         "title": "Fusce posuere felis sed lacus.",
//         "desc": "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
//         "img": "https://www.leticialampert.com.br/wp-content/uploads/2016/02/random-city-4-shanghai_yangshuo-dubai-portoaegre-1-1920x1200.jpg"
//     }
// ]
  return (
    <div className='menu'>
        <h1>Other posts you may like</h1>
        {posts.map((item) => (
            <div className="post" key={item.id}>
                <img src={item.img} alt="" />
                <h2>{item.title}</h2>
                <button>Read More</button>
            </div>
        ))}

    </div>
  )
}

export default Menu