import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsOrder } from "../actions/orderAction";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";

export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsOrder(orderId))
  }, [dispatch, orderId]);
  return loading ? (<LoadingBox></LoadingBox>) :
    error ? (<MessageBox variant="danger">{error}</MessageBox>)
      : (
        <div>
          <div className="row top">
            <div className="col-2">
              <ul>
                <div className="card">Order {order._id}</div>
                <li>
                  <div className="card card-body">
                    <h2>Shipping</h2>
                    <p>
                      <strong>Name:</strong>{order.shippingAddress.fullname}<br />
                      <strong>Address:</strong>{order.shippingAddress.address},
                      {order.shippingAddress.city},{order.shippingAddress.postalcode}
                      ,{order.shippingAddress.country}
                    </p>
                  </div>
                </li>
                <li>
                  <div className="card card-body">
                    <h2>Payment</h2>
                    <p>
                      <strong>Method:</strong>{order.paymentMethod}
                    </p>
                  </div>
                </li>
                <li>
                  <div className="card card-body">
                    <h2>Order Itema</h2>
                    <ul>
                      {order.orderItems.map((item) => (
                        <li key={item.product}>
                          <div className="row">
                            <div>
                              <img
                                src={item.image}
                                alt={item.name}
                                className="small" />
                            </div>
                            <div className="min-30">
                              <Link to={`/product/${item.product}`}>{item.name}</Link>
                            </div>
                            <div>{item.qty} x ${item.price} = ${item.qty * item.price}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <h2>Order Summary</h2>
                  </li>
                  <li>
                    <div className="row">
                      <div>Items</div>
                      <div>${order.itemsPrice.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Shipping</div>
                      <div>${order.shippingPrice.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Tax</div>
                      <div>${order.taxPrice.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>
                        <strong> Order  </strong>
                      </div>
                      <div>${order.totalPrice.toFixed(2)}</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
}