import React, { Component } from "react";
import { DataContext } from "../Context";
import { Link } from "react-router-dom";
import Colors from "./Colors";
import "../css/Details.css";
import "../css/Cart.css";
import shoe1 from "../shoes/running.jpg";

export class Cart extends Component {
  static contextType = DataContext;

  // componentDidMount(){
  //     this.context.getTotal();
  // }
  state = {
    loading: true,
    prod: null,
  };

  async componentDidMount() {
    const url = "https://fe-assignment.vaimo.net/";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ prod: data.product, loading: false });
    console.log({ prod: data.product, loading: false });
  }

  render() {
    const { cart, increase, reduction, removeProduct, total } = this.context;
    if (cart.length === 0) {
      return <h2 style={{ textAlign: "center" }}>Cart is empty</h2>;
    } else {
      return (
        
        <div className="details cart">
            {cart.map((item) => (
              <div className="details cart" keys={item._id}>
                <img
                  src={shoe1}
                  width="650"
                />
                <div className="box">
                  <div className="row">
                    <h2>{item.title}</h2>
                    <span>${item.price * item.count}</span>
                  </div>
                  <Colors colors={item.colors} />
                  <p>{item.description}</p>
                  <p>{item.content}</p>
                  <div className="amount">
                    <button
                      className="count"
                      onClick={() => reduction(item._id)}
                    >
                      {" "}
                      -{" "}
                    </button>
                    <span>{item.count}</span>
                    <button
                      className="count"
                      onClick={() => increase(item._id)}
                    >
                      {" "}
                      +{" "}
                    </button>
                  </div>
                </div>
                <div className="delete" onClick={() => removeProduct(item._id)}>
                  X
                </div>
              </div>
            ))}
            <div className="total">
              <Link to="/payment">Payment</Link>
              <h3>Total: $ {total}</h3>
            </div>
          
        </div>
        
        
      )
    }
  }
}

export default Cart;
