import { useEffect, useState } from "react";
import { Button, Col, Form, Image, ListGroup, ModalDialog, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { CartState } from "../context/Context";
import Rating from "./Rating";
import Modal from 'react-bootstrap/Modal';


const Cart = () => {
  const [modalCard,setModalCard] = useState(false);

  const {
    state: { cart },
    dispatch,
  } = CartState();
  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  const cartEmpty = () =>{
    dispatch({
      type: "CLEAR_CART",
    })
  }

  const handleProceedToCheckout = ()=> {

    setModalCard(true);
    console.log("modal will open");

  }
  const handleCloseModal = ()=>{
    setModalCard(false);
    cart.qty = 0;
  }
  

  return (
    <div className="home">
      <div className="product-container">
        <ListGroup>
          {cart.map((product) => (
            <ListGroup.Item key={product.id}>
              <Row>
                <Col md={2}>
                  <Image src={product.image} alt={product.name} fluid rounded />
                </Col>
                <Col md={2}>
                  <span>{product.name}</span>
                </Col>
                <Col md={2}>₹ {product.price}</Col>
                <Col md={2}>
                  <Rating rating={product.ratings} />
                </Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={product.qty}
                    onChange={(e) =>
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                          id: product.id,
                          qty: e.target.value,
                        },
                      })
                    }
                  >

                    {[...Array(product.inStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: product,
                      })
                    }
                  >
                    <AiFillDelete fontSize="20px" />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="filters summary">
        <span className="title">Subtotal ({cart.length}) items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>Total: ₹ {total}</span>
        <Button type="button" disabled={cart.length === 0} onClick={() => {handleProceedToCheckout(); cartEmpty();}}>
          Proceed to Checkout
        </Button>

        <div>
      {/* Your other content here */}
      <button onClick={handleProceedToCheckout}>Proceed to Checkout</button>
      {/* Modal */}
      {modalCard && (
        <div className="modal">
          <Modal show={modalCard} onHide={handleCloseModal}>
            <Modal.Header>
              <Modal.Title className="modal-title">Order Status</Modal.Title>
              <Button type="button" variant="none" className="btn-x" onClick={handleCloseModal}> X </Button>
            </Modal.Header>
            <Modal.Body className="modal-body">Yayy!! Order placed Successfully.</Modal.Body>
            <Modal.Footer>
              <Button type="button" variant="danger" className="btn-close" onClick={handleCloseModal}>Close </Button>
            </Modal.Footer>
            {/* You can add a footer or other content here if needed */}
          </Modal>
        </div>
      )}
    </div>
      </div>
    </div>
  );
};

export default Cart;