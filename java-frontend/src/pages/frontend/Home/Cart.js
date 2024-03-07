import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import currency from 'currency.js'
import { useDispatch } from "react-redux";
import {removeFromCart, increaseCount, decreaseCount } from "../../../state/cartSlice";
import UserService from "../../../service/UserService";
import OrderService from "../../../service/OrderService";
const Cart = () => {
    const [delivery_name, setDeliveryName] = useState("");
    const [delivery_address, setDeliveryAddress] = useState("");
    const [delivery_email, setDeliveryEmail] = useState("");
    const [delivery_phone, setDeliveryPhone] = useState("");
    const [orderDetails, setOrderDetails] = useState([]);
    const [order_id, setOrderId] = useState("");
    const [note, setNote] = useState("");
    const [user_id, setUserId] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate();
    var cartItems = useSelector((state) => state.cart.items)
    const totalItems = cartItems.reduce((total, item)=>{
      return total + item.count;
    }, 0);
    const total = cartItems.reduce((totalPrice, item) =>{
      console.log(item)
      return totalPrice + item.count * item.price;
    }, 0);

   

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        setUserId(storedUserId);

      }, []);
    console.log("iu",user_id);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
         
          const newOrder = {
            delivery_name,
            delivery_email,
            delivery_phone,
            delivery_address,
            note,
            user_id,
          };
          
          // Send a POST request to the Spring Boot endpoint
          const response = await OrderService.storeorder(newOrder);
    
          // Handle the response as needed (e.g., show a success message, redirect)
          console.log("Product created successfully:", response.data.id);
          if(user_id===null)
          {
            alert("Bạn phải đăng nhập trước khi thực hiện thanh toán")
            navigate("/login");
          }
          else
          {
            const orderDetailsArray = cartItems.map((item, index) => ({
              order_id: response.data.id,
              product_id: item.id,
              qty: item.count,
              amount: item.count*item.price,
              price: item.price,
            }));
            setOrderDetails(orderDetailsArray);
            for (const orderDetail of orderDetailsArray) {
              const responseOrderDetail = await OrderService.storeorderdetail(orderDetail);
            }
            // Trigger a re-render by updating the forceUpdateTimestamp
            alert("Thêm đơn hàng mới thành công")
            setDeliveryAddress("")
            setDeliveryEmail("")
            setDeliveryName("")
            setDeliveryPhone("")
            setNote("")
          }
        } catch (error) {
          console.error("Error creating product:", error);
        }
      };
    


    return (
        <div id="layout-cart">
            <div className="breadcrumb-shop">
                <div className="container">
                    <div className="breadcrumb-list">
                        <ol className="breadcrumb breadcrumb-arrows">
                            <li itemProp="itemListElement">
                                <a href="/">Trang chủ</a>
                                <meta itemProp="position" content={1} />
                            </li>
                            <li className="active"><span><strong itemProp="name">Giỏ hàng ({totalItems})</strong></span></li>
                        </ol>
                    </div>
                </div>
            </div>
            <div className="wrapper-mainCart">
                <div className="content-bodyCart">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 col-sm-12 col-xs-12 contentCart-detail">
                                <div className="mainCart-detail">
                                    <div className="heading-cart">
                                        <h1>Giỏ hàng của bạn</h1>
                                    </div>
                                    <div className="list-pageform-cart">
                                        <form onSubmit={handleSubmit} method="post" id="cartformpage" name="cartformpage">
                                            <div className="cart-row">
                                                <p className="title-number-cart">Bạn đang có <strong className="count-cart">{totalItems} sản phẩm</strong> trong giỏ hàng</p>
                                                <div className="table-cart">
                                               { cartItems.map((item) =>(
                                                    <div className="media-line-item line-item" data-variant-id={1114318857} data-product-id={1050859858}>
                                                        <div className="media-left">
                                                            <div className="item-img"><img   src={item.image} alt="Hoodie Degrey Is Us - HDIS" /></div>
                                                            <div className="item-remove">
                                                            <button  onClick={() => dispatch(removeFromCart({id: item.id}))} style={{border:"none", backgroundColor:"initial"}}><a href="">Xóa</a></button>
                                                            </div>
                                                        </div>
                                                        <div className="media-right">
                                                            <div className="item-info">
                                                                <h3 className="item--title"><a href>{item.name}</a></h3>
                                                                <div className="item--variant">
                                                                    <span>S</span>
                                                                </div>
                                                            </div>
                                                            <div className="item-price">
                                                                <p><span>{currency(item.price,{ separator: '.', decimal: ',', symbol: '' }).format()}₫</span></p>
                                                            </div>
                                                        </div>
                                                        <div className="media-total">
                                                            <div className="item-total-price">
                                                                <span className="line-item-total">{currency(item.price * item.count,{ separator: '.', decimal: ',',symbol: '' }).format()}₫</span>
                                                            </div>
                                                            <div className="item-qty">
                                                                <div className="qty quantity-partent qty-click clearfix">
                                                                    <button type="button" onClick={() => dispatch(decreaseCount({id: item.id}))} className="qtyminus qty-btn">-</button> <input value={item.count} type="text" size={4} name="updates[]" min={1} productid={1050859858} id="updates_1114318857" data-price={39000000} defaultValue={1} className="tc line-item-qty item-quantity" /> <button onClick={() => dispatch(increaseCount({id: item.id}))} type="button" className="qtyplus qty-btn">+</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="cart-row">
                                                <div className="order-noted-block">
                                                    <div className="container-pd15">
                                                        <div className="checkout-buttons clearfix">
                                                            <label htmlFor="note" className="note-label">Ghi chú đơn hàng</label>
                                                            <textarea value={note} onChange={(e)=>setNote(e.target.value)} className="form-control" id="note" name="note" rows={5} defaultValue={""} /> <input type="text" className="hidden" name="attributes[Delivery Time]" defaultValue />
                                                        </div><button type="submit" id="update-cart" className="btn-update button hidden" name="update" value>Cập nhật</button> <button type="submit" id="checkout" className="btn-checkout button hidden" name="checkout" value>Thanh toán</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="cart-row">
                                                <div className="order-invoice-block">
                                                    <div className="checkbox">
                                                       
                                                       
                                                        <label htmlFor="checkbox-bill" className="title">Xuất hoá đơn cho đơn hàng</label>
                                                    </div>
                                                    <div className="bill-field" style={{ display: 'block' }}>
                                                        <div className="form-group">
                                                            <input type="text" name="delivery_name" value={delivery_name} onChange={(e)=>setDeliveryName(e.target.value)} className="form-control val-f check_change"  placeholder="Họ tên..." />
                                                        </div>
                                                        <div className="form-group">
                                                            <input type="number" name="delivery_phone" value={delivery_phone} onChange={(e)=>setDeliveryPhone(e.target.value)}className="form-control val-f val-n check_change"  placeholder="Số điện thoại..." />
                                                        </div>
                                                        <div className="form-group">
                                                            <input type="email" name="delivery_email" value={delivery_email} onChange={(e)=>setDeliveryEmail(e.target.value)}className="form-control val-f val-mail check_change"   placeholder="Email..." />
                                                        </div>
                                                        <div className="form-group">
                                                            <input type="text" name="delivery_address"value={delivery_address} onChange={(e)=>setDeliveryAddress(e.target.value)} className="form-control val-f check_change"  placeholder="Địa chỉ..." />
                                                        </div>
                                                        <div className="form-btn">
                                                            <button type="submit"  className="button btn-save">Lưu thông tin</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-12 col-xs-12 sidebarCart-sticky">
                                <div className="mainCart-sidebar wrap-order-summary">
                                    <div className="order-summary-block">
                                        <h2 className="summary-title">Thông tin đơn hàng</h2>
                                        <div className="summary-total">
                                            <p>Tổng tiền: <span>{currency(total,{ symbol: '', separator: '.', decimal: ',' }).format()}₫</span></p>
                                        </div>
                                        <div className="summary-action">
                                            <p>Phí vận chuyển sẽ được tính ở trang thanh toán.</p>
                                            <p>Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.</p>
                                            <div className="summary-alert alert alert-danger">
                                                Giỏ hàng của bạn hiện chưa đạt mức tối thiểu để thanh toán.
                                            </div>
                                            <div className="summary-button">
                                                <a id="btnCart-checkout" className="checkout-btn btnred" data-price-min={150000} data-price-total={390000} href="#">THANH TOÁN</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="order-summary-block order-summary-notify">
                                        <div className="summary-warning alert-order">
                                            <p className="textmr"><strong>Chính sách giao hàng</strong></p>
                                            <p>Hiện chúng tôi chỉ áp dụng thanh toán với đơn hàng có giá trị tối thiểu <strong>150.000₫</strong> trở lên.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Cart;