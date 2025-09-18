import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const getTotalAmount = () => {
        let totalAmount = 0
        cartList.forEach(each => {
          totalAmount += each.price * each.quantity
        })
        return totalAmount
      }
      return (
        <div className="total-price-container">
          <div className="price-text-container">
            <h1 className="order-total">
              Order Total: <span>Rs {getTotalAmount()}/-</span>
            </h1>
            <p className="items-count">{cartList.length} Items in cart</p>
            <button type="button" className="check-out-btn">
              Checkout
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
