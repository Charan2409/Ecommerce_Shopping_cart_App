import {
  Badge,
  Button,
  Container,
  Dropdown,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";
import { FaShoppingCart } from 'react-icons/fa'
import {Link} from 'react-router-dom'
import { CartState } from "../context/Context";
import { AiFillDelete } from "react-icons/ai";

const Header = () =>{
    const {state: {cart},dispatch} = CartState();
    return (
        <Navbar bg='dark' variant='dark' style={{ height: 80 }}>
            <Container>
                <Navbar.Brand>
                    <Link to="/">ShopHome</Link>
                </Navbar.Brand>
                <Navbar.Text className='search'>
                    <FormControl style={{ width: 500 }} placeholder='Search for a product..'  className='-auto' onChange={(e) => {
                productDispatch({
                  type: "FILTER_BY_SEARCH",
                  payload: e.target.value,
                });
              }}/>
                </Navbar.Text>
                <Dropdown>
                    <Dropdown.Toggle variant="success">
                    <FaShoppingCart color="white" fontSize="25px" />
                    <span><Badge>{cart.length}</Badge></span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{minWidth: 370, left: "auto", right: 0}}>
                        { cart.length > 0 ? (
                        <>
                  {cart.map((product) => (
                    <span className="cartitem" key={product.id}>
                      <img
                        src={product.image}
                        className="cartItemImg"
                        alt={product.name}
                      />
                      <div className="cartItemDetail">
                        <span>{product.name}</span>
                        <span>₹ {product.price.split(".")[0]}</span>
                      </div>
                      <AiFillDelete
                        fontSize="20px"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: product,
                          })
                        }
                      />
                    </span>
                  ))}
                  <Link to="/cart">
                    <Button style={{ width: "95%", margin: "0 10px" }}>
                      Go To Cart
                    </Button>
                  </Link>
                </>
                ) : (<span style={{ padding: 10 }}>Cart is Empty!</span>) }
                    </Dropdown.Menu>
                </Dropdown>
            </Container>
        </Navbar>
    )
}

export default Header;
