import React from 'react'
import './styles.css';
import { Button, Card } from 'react-bootstrap';
import Rating from './Rating';
import { CartState } from '../context/Context';

export const SingleProduct = ({product}) => {
  const {
    state: {cart },
    dispatch,
  } = CartState();
  return (
    <div className='products'>
      <Card>
        <Card.Img variant='top' src={product.image} alt="product image"></Card.Img>
        <Card.Body>
          <Card.Title>
            {product.name}
          </Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10}}>
            <span>₹ {product.price.split(",")[0]} </span>
              {product.fastDelivery ? (<div>Fast Delivery</div>) :  (<div> 4 days Delivery </div>)}
              <Rating rating={product.ratings}/>
          </Card.Subtitle>
          {cart.some(p=>p.id ===product.id) ? (<Button onClick={()=>{
            dispatch({
              type: "REMOVE_FROM_CART",
              payload: product,
            })
          }} variant='danger'>Remove from Cart</Button>) : (<Button onClick={()=>{
            dispatch({
              type: "ADD_TO_CART",
              payload: product,
            })
          }} disabled={!product.inStock} style={{ marginRight: 6}}>{!product.inStock ? "Out of Stock" : "Add to Cart"}</Button>)}
          
          
        </Card.Body>
      </Card>
    </div>
  )
}
