import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { useParams } from 'react-router-dom'
import { ProductContext } from '../context/ProductContext'

const ProductDetails = () => {
  const {id} = useParams()
  const {products} = useContext(ProductContext)
  const {addToCart} = useContext(CartContext)
  // get the single product based on id
  const product = products.find((item)=>{
    return item.id === parseInt(id);
  })
  //console.log(product)
  if(!product){
    return (
      <section className='h-screen flexCenter'>
       <h3 className='h3'>  ...Loading</h3>
      </section>
    )
  }
  //destructure product
  const {title, price, description, image} = product

  return (
    <section className='max-padd-container py-28 xl:py32'>
      <div>
        {/* container */}
        <div className='flex flex-col xl:flex-row gap-16'>
          {/* image */}
          <div className='flex-1 flexCenter'>
            <img src={image} alt="prdctImg" height={255} width={255} className='object-contain aspect-square p-1'/>
          </div>
          {/* text */}
          <div className='flex-1'>
            <h3 className='h3'>{title}</h3>
            <h5 className='bold-24'>{price}</h5>
            <p className='my-8'>{description}</p>
            <button onClick={()=>addToCart(product, product.id)} className='btn-dark'>Add to cart</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails
