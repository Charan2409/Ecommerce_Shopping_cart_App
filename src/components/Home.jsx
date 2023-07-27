import React from 'react'
import { CartState } from '../context/Context'
import { SingleProduct } from './SingleProduct';
import Filter from './Filter';

const Home = () => {
  const { state: {products}, productState: {sort, byStock, byFastDelivery, byRating, searchQuery}} = CartState();
  const transformProducts = () =>{
    let sortedProducts = products;

    if(sort){
      sortedProducts = sortedProducts.sort((a,b)=>
      sort === 'lowToHigh' ? a.price - b.price : b.price - a.price)
    }
    if(!byStock){
      sortedProducts= sortedProducts.filter((product)=>product.inStock)
    }
    if(!byFastDelivery){
      sortedProducts= sortedProducts.filter((prod)=>prod.fastDelivery)
    }
    if(!byRating){
      sortedProducts = sortedProducts.filter((prod)=> prod.ratings>= byRating)
    }
    if(searchQuery){
      sortedProducts=sortedProducts.filter((prod)=>prod.name.toUpperCase().includes(searchQuery))
    }    
    return sortedProducts;
  }
  return (
    <div className='home'>
      <Filter />
      <div className='product-container'>
        {
        transformProducts().map((product,index) =>{
          return <SingleProduct product={product} key={product.id}/>
        }
        )
      }
      </div>
    </div>
  )
}

export default Home