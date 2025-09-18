import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeCartItem = productId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(each => each.id !== productId),
    }))
  }

  addCartItem = product => {
    this.setState(prevState => {
      const existingProduct = prevState.cartList.find(
        each => each.id === product.id,
      )
      if (existingProduct) {
        const updatedProduct = prevState.cartList.map(item =>
          item.id === product.id
            ? {...item, quantity: item.quantity + product.quantity}
            : item,
        )
        return {cartList: updatedProduct}
      }
      return {cartList: [...prevState.cartList, product]}
    })
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => {
      const updatedCartItem = prevState.cartList.map(item =>
        item.id === id ? {...item, quantity: item.quantity + 1} : item,
      )
      return {cartList: updatedCartItem}
    })
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => {
      const existingProductData = prevState.cartList.find(
        each => each.id === id,
      )

      if (existingProductData.quantity > 1) {
        const updatedCartItem = prevState.cartList.map(item =>
          item.id === id ? {...item, quantity: item.quantity - 1} : item,
        )
        return {cartList: updatedCartItem}
      }
      const updatedCartList = prevState.cartList.filter(each => each.id !== id)
      return {cartList: updatedCartList}
    })
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
