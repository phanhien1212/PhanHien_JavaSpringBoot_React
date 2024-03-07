import { Link, useParams } from "react-router-dom";
import ProductService from "../../../service/ProductService";
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { addToCart } from "../../../state/cartSlice";
import currency from 'currency.js'
const ProductDetail = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [product, setProduct] = useState({});
   
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await ProductService.getById(id);
          setProduct(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [id]);


  


    return (
        <div>
      
        <div id="product-template" className="layout-productDetail layout-pageProduct">
            <div className="breadcrumb-shop hidden-xs">
                <div className="container">
                    <div className="breadcrumb-list">
                        <ol className="breadcrumb breadcrumb-arrows">
                            <li>
                                <a href="/" target="_self" itemProp="item"><span itemProp="name">Trang chủ</span></a>
                                <meta itemProp="position" content={1} />
                            </li>
                            <li>
                                <a href target="_self" itemProp="item"><span itemProp="name">PHỤ KIỆN</span></a>
                                <meta itemProp="position" content={1} />
                            </li>
                            <li className="active">
                                <span><strong itemProp="name">Áo thun GOLDIE REQUIEM FOR A DREAM 100% cotton 2 chiều</strong></span>
                                <meta itemProp="position" content={3} />
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
            <section className="productDetail-information productDetail_style__03">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-sm-12 col-xs-12 productDetail--gallery">
                            <div className="product-container-gallery">
                                <div className="wrapbox-image wrapbox-image-verticalSlide">
                                    <div className="productGallery_thumb">
                                        <ul className="productList-thumb productSlick-thumb slick-initialized slick-slider slick-vertical" id="productSlick-thumb">
                                            <div className="slick-list draggable" style={{ height: 468 }}>
                                                <div className="slick-track" style={{ opacity: 1, height: 312, transform: 'translate3d(0px, 0px, 0px)' }}>
                                                    <ul>
                                                        <li className="product-thumb slick-slide slick-current slick-active" data-slick-index={0} aria-hidden="false" style={{ width: 70 }} tabIndex={0}>
                                                            <a className="product-thumb__item" href="javascript:void(0);" tabIndex={0}><img src={product.image}  alt=" Degrey Leather Basic Balo Nâu Small Size - LBBMNA " /></a>
                                                        </li>
                                                        <li className="product-thumb slick-slide slick-active" data-slick-index={2} aria-hidden="false" style={{ width: 70 }} tabIndex={0}>
                                                            <a className="product-thumb__item" href="javascript:void(0);" tabIndex={0}><img src={product.image}  alt=" Degrey Leather Basic Balo Nâu Small Size - LBBMNA " /></a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </ul>
                                    </div>
                                    <div className="productGallery_slider">
                                        <ul className="productList-slider productSlick-slider slick-initialized slick-slider slick-dotted" id="productSlick-slider">
                                            <div className="slick-list draggable">
                                                <div className="slick-track" style={{ opacity: 1, width: 1880, transform: 'translate3d(0px, 0px, 0px)' }}>
                                                    <ul>
                                                        <li className="product-gallery slick-slide slick-current slick-active" data-slick-index={0} aria-hidden="false" style={{ width: 470 }} tabIndex={0} role="tabpanel" id="slick-slide00" aria-describedby="slick-slide-control00">
                                                            <a className="product-gallery__item" data-fancybox="gallery" href tabIndex={0}><img src={product.image} alt=" Degrey Leather Basic Balo Nâu Small Size - LBBMNA " /></a>
                                                        </li>
                                                        <li className="product-gallery slick-slide" data-slick-index={1} aria-hidden="true" style={{ width: 470 }} tabIndex={-1} role="tabpanel" id="slick-slide01" aria-describedby="slick-slide-control01">
                                                            <a className="product-gallery__item" data-fancybox="gallery" href tabIndex={-1}><img src={product.image} alt=" Degrey Leather Basic Balo Nâu Small Size - LBBMNA " /></a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <ul className="slick-dots" style={{ display: 'block' }} role="tablist">
                                                <li className="slick-active" role="presentation"><button type="button" role="tab" id="slick-slide-control00" aria-controls="slick-slide00" aria-label="1 of 4" tabIndex={0} aria-selected="true">1</button></li>
                                                <li role="presentation"><button type="button" role="tab" id="slick-slide-control01" aria-controls="slick-slide01" aria-label="2 of 4" tabIndex={-1}>2</button></li>
                                                <li role="presentation"><button type="button" role="tab" id="slick-slide-control02" aria-controls="slick-slide02" aria-label="3 of 4" tabIndex={-1}>3</button></li>
                                                <li role="presentation"><button type="button" role="tab" id="slick-slide-control03" aria-controls="slick-slide03" aria-label="4 of 4" tabIndex={-1}>4</button></li>
                                            </ul>
                                        </ul>
                                        <div className="product-percent">
                                            <span className="pro-sale">-13%<br />
                                                OFF</span>
                                        </div>
                                        <div className="product-sharing">
                                            <span className="sharing__iconCircleState"><span className="sharing__primaryState"><svg className="icon icon--share" role="presentation" viewBox="0 0 24 24">
                                                <g stroke="currentColor" fill="none" fillRule="evenodd" strokeWidth="1.5">
                                                    <path d="M8.6,10.2 L15.4,6.8" />
                                                    <path d="M8.6,13.7 L15.4,17.1" />
                                                    <circle strokeLinecap="square" cx={5} cy={12} r={4} />
                                                    <circle strokeLinecap="square" cx={19} cy={5} r={4} />
                                                    <circle strokeLinecap="square" cx={19} cy={19} r={4} />
                                                </g></svg></span> <span className="sharing__secondaryState"><svg className="icon icon--close" role="presentation" viewBox="0 0 16 14">
                                                    <path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" fillRule="evenodd" /></svg></span></span> <a href target="_blank"><span className="facebook" aria-hidden="true"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24" xmlSpace="preserve">
                                                        <g>
                                                            <path d="M16.4,1l-3.1,0C9.8,1,9.6,3.3,9.6,6.8v1.7H6.5C6.2,8.5,6,8.8,6,9v1.9c0,0.3,0.2,0.5,0.5,0.5h3.1v9.9c0,0.3,0.2,0.5,0.5,0.5h2c0.3,0,0.5-0.2,0.5-0.5v-9.9h3.6c0.3,0,0.5-0.2,0.5-0.5l0-1.9c0-0.1-0.1-0.3-0.1-0.3c-0.1-0.1-0.2-0.1-0.3-0.1h-3.6V5.3c0-1.1,0.3-1.7,1.7-1.7l2.1,0c0.3,0,0.5-0.2,0.5-0.5V1.5C16.8,1.2,16.6,1,16.4,1z" />
                                                        </g></svg></span> <span className="toollip-txt">Chia sẻ facebook</span></a> <a className="sharing__link" onclick="HRT.Product.copyLinkProduct()"><span className="toollip-txt">Sao chép url</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12 col-xs-12 productDetail--content" id="detail-product">
                            <div className="product-container-detail">
                                <div className="product-container-order">
                                    <div className="product-variants">
                                        <form id="add-item-form" action="/cart/add" method="post" className="variants clearfix" name="add-item-form">
                                            <div className="select clearfix" style={{ display: 'none' }}>
                                                <select id="product-select" name="id" style={{ display: 'none' }}>
                                                    <option value={1115187229}>
                                                        Default Title - 340,000₫
                                                    </option>
                                                </select>
                                            </div>
                                            <div className="select-swatch clearfix" />
                                            <div className="select-actions hidden-xs hidden-sm clearfix">
                                                <div className="quantity-area clearfix">
                                                    <input type="button" defaultValue="-" onclick="HRT.All.minusQuantity()" className="qty-btn" /> <input type="text" id="quantity" name="quantity" defaultValue={1} min={1} className="quantity-input" /> <input type="button" defaultValue="+" onclick="HRT.All.plusQuantity()" className="qty-btn" />
                                                </div>
                                                <div className="addcart-area">
                                                    <button onClick={() => dispatch(addToCart({item: { ...product, count: 1}}))} type="button"  id="add-to-cart" className="add-to-cartProduct button dark btn-addtocart addtocart-modal" name="add">Thêm vào giỏ</button> <button type="button" id="buy-now" disabled className="disabled add-to-cartProduct button dark btn-addtocart addtocart-modal hidden" name="add">Mua ngay</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="product-heading">
                                        <h1>{product.name}</h1>
                                        <ul className="product-meta hidden-lg hidden-md hidden-sm hidden-xs">
                                            <li className="pro-sku">Mã sản phẩm: <span>LBBMNA</span></li>
                                            <li className="pro-vendor">Thương hiệu: <a href="#">DEGREY</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="product-price" id="price-preview">
                                        <del>390,000₫</del> <span className="pro-price">{currency(product.price,{ separator: '.', decimal: ',', symbol: '' }).format()}₫</span> <span className="pro-percent">13% giảm</span>
                                    </div>
                                </div>
                                <div className="product-available">
                                    <p className="txt-inventory" />
                                </div>
                                <div className="combo-info d-none">
                                    <h3 className="combo-info--title">THƯỜNG ĐƯỢC MUA CÙNG</h3>
                                </div>
                                <div className="product-coutdown product-coutdown-jsdata" />
                                <div className="product-policy-detail">
                                    <div className="item-policy-detail">
                                        Freeship đơn hàng giá trị trên 1 triệu đồng
                                    </div>
                                    <div className="item-policy-detail">
                                        Đổi hàng chưa qua sử dụng trong vòng 30 ngày
                                    </div>
                                </div>
                                <div className="product-description product-description--accordion">
                                    <div className="panel-group opened">
                                        <div className="panel-title">
                                            <h2>THông tin sản phẩm</h2>
                                        </div>
                                        <div className="panel-description" style={{ display: 'block' }}>
                                            <div className="description-productdetail typeList-style">
                                                <p>- Chất liệu: Simili</p>
                                                <p>- Hoạ tiết: dập chìm logo</p>
                                                <p>- Size: 35cmx30cmX13cm</p>
                                                <p>- Ngăn chống sốc đựng vừa laptop 13inch&nbsp;</p>
                                                <p>- Thương hiệu: Goldie</p>
                                                <p>- Sản xuất: Việt Nam</p>
                                                <p>- Màu sắc và họa tiết được thiết kế riêng bởi team design GOLDIE</p>
                                                <p>&nbsp;</p>
                                                <p>+ HƯỚNG DẪN BẢO QUẢN SẢN PHẨM GOLDIE:</p>
                                                <p>- Không dùng hóa chất tẩy mạnh lên sản phẩm</p>
                                                <p>- Không dùng vật dụng sắc, nhọn cà trực tiếp lên bề mặt Balo</p>
                                                <p>- Không giặt máy</p>
                                                <p>- Sử dụng bàn chải có lông mềm</p>
                                                <p>- Tuyệt đối không dùng bàn chải cước cứng sẽ gây ra các vết xước trên nền vải</p>
                                                <p>&nbsp;</p>
                                                <p>+ CHÍNH SÁCH ĐỔI SẢN PHẨM:</p>
                                                <p>1.Điều kiện đổi hàng</p>
                                                <p>- Bạn lưu ý giữ lại hoá đơn để đổi hàng trong vòng 30 ngày.</p>
                                                <p>- Đối với mặt hàng giảm giá, phụ kiện cá nhân (áo lót, khẩu trang, vớ ...) không nhận đổi hàng.</p>
                                                <p>- Tất cả sản phẩm đã mua sẽ không được đổi trả lại bằng tiền mặt.</p>
                                                <p>- Bạn có thể đổi size hoặc sản phẩm khác trong 30 ngày (Lưu ý: sản phẩm chưa qua sử dụng, còn tag nhãn và hóa đơn mua hàng.)</p>
                                                <p>- Bạn vui lòng gửi cho chúng mình clip đóng gói và hình ảnh của đơn hàng đổi trả của bạn, nhân viên tư vấn sẽ xác nhận và tiến hành lên đơn đổi trả cho bạn.</p>
                                                <p>&nbsp;</p>
                                                <p>2. Trường hợp khiếu nại</p>
                                                <p>- Bạn phải có video unbox hàng</p>
                                                <p>- Quay video rõ nét 6 mặt của gói hàng</p>
                                                <p>- Quay rõ: Tên người nhận, mã đơn, địa chỉ, số điện thoại.</p>
                                                <p>- Video không cắt ghép, chỉnh sửa</p>
                                                <p>- Goldie xin không tiếp nhận giải quyết các trường hợp không thỏa các điều kiện trên.</p>
                                            </div>
                                        </div>
                                    </div>{/* TAB 1*/}
                                    {/* TAB 2*/}
                                    {/* TAB 3*/}
                                    <div className="panel-group">
                                        <div className="panel-title">
                                            <h2>Dịch vụ giao hàng</h2>
                                        </div>
                                        <div className="panel-description description-content">
                                            <div className="product-deliverly">
                                                <ul className="infoList-deliverly">
                                                    <li><span><img className="lazyload" data-src="https://file.hstatic.net/1000397797/file/delivery-ico1_f26631929e1b41dab022d9960006297c.svg" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" alt="Cam kết 100% chính hãng Degrey" /></span> Cam kết 100% chính hãng Degrey</li>
                                                    <li><span><img className="lazyload" data-src="https://file.hstatic.net/1000397797/file/delivery-ico2_5ea2de2f279b4dbfa10fcb9b9c448b4d.svg" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" alt="Giao hàng dự kiến: Thứ 2 - Thứ 7 từ 9h00 - 17h00" /></span> Giao hàng dự kiến:<br />
                                                        <strong>Thứ 2 - Thứ 7 từ 9h00 - 17h00</strong></li>
                                                    <li><span><img className="lazyload" data-src="https://file.hstatic.net/1000397797/file/delivery-ico3_dd589d9c49584441a9ef0c2f9300649f.svg" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" alt="Hỗ trợ 24/7 Với các kênh chat, email & phone" /></span> Hỗ trợ 24/7<br />
                                                        Với các kênh chat, email &amp; phone</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>{/* TAB 4*/}
                            </div>
                        </div>
                    </div>
                </div>
            </section>{/* related */}
            <section className="productDetail-listprod productDetail-related">
                <div className="container">
                    <div className="listprod-title">
                        <h2>Sản phẩm liên quan</h2>
                    </div>
                    <div className="listprod-content">
                        <div className="listProduct-related listProduct-resize owl-carousel owlCarousel-style owl-loaded owl-drag" id="owlProduct-related">
                            <div className="owl-stage-outer">
                                <div className="owl-stage" style={{ transform: 'translate3d(0px, 0px, 0px)', transition: 'all 0s ease 0s', width: 1848 }}>
                               
                                    <div className="owl-item active" style={{ width: 216, marginRight: 15 }}>
                                  
                                        <div style-id className="product-loop">
                                            <div className="product-inner product-resize">
                                                <div className="proloop-image">
                                                    <div className="product--image image-resize">
                                                        <div className="product--image__inner">
                                                            <div className="quick-add-carousel-images slick-initialized slick-slider">
                                                                <div className="slick-list draggable" style={{ height: 216 }}>
                                                                    <div className="slick-track">
                                                                        <div className="img-item slick-slide slick-cloned" style={{ width: 216 }}>
                                                                            <Link to={"/product-detail/" + product.slug}><picture><img className="img-loop"  alt=" Balo Degrey simili nắp đậy nhiều ngăn - NNGAN " /></picture></Link>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="proloop-detail">
                                                    <h3><a href className>{product.name}</a></h3>
                                                    <p className="proloop--price"><span className="price">{product.price}₫</span> <span className="price-del">500,000₫</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        </div>
    );
}

export default ProductDetail;