import React, { useEffect, useState } from 'react';
import ProductService from '../../../service/ProductService';
import { urlImage } from '../../../config';
import currency from 'currency.js'
import axios from 'axios';
import CategoryService from '../../../service/CategoryService';
const Product = () => {

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [load, setLoad] = useState(Date.now());
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [categories, setCategories] = useState([]);
  const [tempProducts, setTempProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const storedProductIdsString = localStorage.getItem("search");
  
        if (storedProductIdsString !== null) {
          // Nếu storedProductIdsString không phải null, thực hiện tìm kiếm
          const resultProduct = await ProductService.search({ text: storedProductIdsString });
          setProducts(resultProduct.data);
          localStorage.removeItem("search");
        } else {
          // Ngược lại, gọi getList để lấy tất cả sản phẩm
          const response = await ProductService.getList();
          console.log('API Response:', response.data);
          setProducts(response.data);
          setTempProducts(response.data);
        }
  
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchProducts();
  }, []);
  
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await CategoryService.getList();
        console.log('API Response111:',response1.data); // Thêm trang vào yêu cầu API
        setCategories(response1.data);
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const FilterCategory = async (category_id) => {
    const childCategories = categories.filter(
      (category) => category.parent_id === category_id
    );
  
    const selectedCategories = [
      category_id,
      ...childCategories.map((cat) => cat.id),
    ];
  
    const filteredProducts = tempProducts.filter((product) =>
      selectedCategories.includes(product.category_id)
    );
  
    console.log("gghh",filteredProducts);
    
    setProducts(filteredProducts);
   
  };


  const handleCheckboxChange = (price) => {
    setSelectedPrice(price);
    handlePriceFilter(price); // Gọi hàm xử lý khi giá thay đổi
  };

  const handlePriceFilter = async (price) => {
    let updatedSelectedPrices = [...selectedPrices];

    // Xử lý checkbox giá được chọn hoặc bỏ chọn
    if (price === null) {
      updatedSelectedPrices = [];
    } else if (updatedSelectedPrices.includes(price)) {
      updatedSelectedPrices = updatedSelectedPrices.filter((selectedPrice) => selectedPrice !== price);
    } else {
      updatedSelectedPrices.push(price);
    }

    setSelectedPrices(updatedSelectedPrices);

    // Lọc danh sách sản phẩm dựa trên giá hoặc hiển thị tất cả sản phẩm
    try {
      let filteredProducts = [];

      if (updatedSelectedPrices.length > 0) {
        // Nếu có giá được chọn, thì lọc theo giá
        const response = await ProductService.getList(); // Thay đổi limit và category_id tùy ý
        filteredProducts = response.data.products.filter((product) => {
          for (const selectedPrice of updatedSelectedPrices) {
            if (selectedPrice === '<100000' && product.price < 100000) return true;
            if (selectedPrice === '100000-250000' && product.price >= 100000 && product.price <= 250000) return true;
            if (selectedPrice === '250000-500000' && product.price > 250000 && product.price <= 500000) return true;
            if (selectedPrice === '500000-800000' && product.price > 500000 && product.price <= 800000) return true;
            if (selectedPrice === '800000<' && product.price > 800000) return true;
          }
          return false;
        });
      } else {
        // Nếu không có giá được chọn, hiển thị tất cả sản phẩm
        const response = await ProductService.getList(); // Thay đổi limit và category_id tùy ý
        filteredProducts = response.data.products;
      }

      setProducts(filteredProducts);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const itemsPerPage = 5; // Số lượng mục trên mỗi trang

  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = products.slice(startIndex, endIndex);

  
  
  return (
    <>
     
      <div className="layout-collections 1001666735">
        <div className="breadcrumb-shop">
          <div className="container">
            <div className="breadcrumb-list">
              <ol className="breadcrumb breadcrumb-arrows">
                <li itemProp="itemListElement">
                  <a href="/" target="_self" itemProp="item"><span itemProp="name">Trang chủ</span></a>
                  <meta itemProp="position" content={1} />
                </li>
                <li className="active">
                  <span itemProp="item"><strong>Tất cả sản phẩm</strong></span>
                  <meta />
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div className="collection-banner-header">
          <div className="container container-xs-pd0"><img className="img-banner" src={require('../../../assets/408262752_684668803753403_5067146374617434954_n.jpg')} alt="Tất cả sản phẩm" /></div>
        </div>
        <div className="wrapper-mainCollection">
          <div className="collection-heading">
            <div className="container">
              <div className="bgwhite-heading">
                <div className="row">
                  <div className="col-md-6 col-sm-12 col-xs-12">
                    <h1 className="title">Tất cả sản phẩm</h1>
                  </div>
                  <div className="col-md-3 col-sm-12 col-xs-12">
                  <div className="collection-sortbyfilter-container">
                    <div className="collection-sortby-filter">
                      <div className="collection-filterby">
                        <div className="layered_filter_title boxstyle-mb" data-layered-click="#layered_filter_mobile">
                          <p className="title_filter"><span className="icon-filter"><svg viewBox="0 0 20 20">
                            <path fill="none" strokeWidth={2} strokeLinejoin="round" strokeMiterlimit={10} d="M12 9v8l-4-4V9L2 3h16z" /></svg></span> <span className="icon-close"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg></span> Bộ lọc</p>
                        </div>
                      </div>
                      <div className="collection-sortby">
                        <div className="layered_filter_title boxstyle-mb" data-layered-click="#layered_sortby_mobile">
                          <p className="title_filter">
                            <span class="icon-filter"><i class="fa fa-sort-alpha-asc" aria-hidden="true"></i></span>
                            <span className="icon-close">
                              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></span> Danh mục</p>
                        </div>
                      </div>
                    </div>

                    <div className="collection-sortby-option layered_filter_mobileContent" id="layered_sortby_mobile">
                     
                        <ul className="sort-by sort-by-content" >
                            {categories &&
                  categories
                    .filter((category) => category.id)
                    .map((category, index) => (
                          <li className=''><span  onClick={() => FilterCategory(category.id)}>{category.name}</span></li>
                          ))}
                        </ul>
                      
                    </div>

                  </div>

                </div>
                  <div className="col-md-3 col-sm-12 col-xs-12">
                    <div className="collection-sortbyfilter-container">
                      <div className="collection-sortby-filter">
                        <div className="collection-filterby">
                          <div className="layered_filter_title boxstyle-mb" data-layered-click="#layered_filter_mobile">
                            <p className="title_filter"><span className="icon-filter"><svg viewBox="0 0 20 20">
                              <path fill="none" strokeWidth={2} strokeLinejoin="round" strokeMiterlimit={10} d="M12 9v8l-4-4V9L2 3h16z" /></svg></span> <span className="icon-close"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg></span> Bộ lọc</p>
                          </div>
                        </div>
                        <div className="collection-sortby">
                          <div className="layered_filter_title boxstyle-mb" data-layered-click="#layered_sortby_mobile">
                            <p className="title_filter"><span className="icon-close"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg></span> Sắp xếp</p>
                          </div>
                        </div>
                      </div>
                      <div className="collection-sortby-option layered_filter_mobileContent" id="layered_sortby_mobile">
                        <ul className="sort-by sort-by-content">
                          <li><span>Sản phẩm nổi bật</span></li>
                          <li><span>Giá: Tăng dần</span></li>
                          <li><span>Giá: Giảm dần</span></li>
                          <li><span>Tên: A-Z</span></li>
                          <li><span>Tên: Z-A</span></li>
                          <li><span>Cũ nhất</span></li>
                          <li><span>Mới nhất</span></li>
                          <li><span>Bán chạy nhất</span></li>
                          <li><span>Tồn kho giảm dần</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="collection-filter">
            <div className="container">
              <div className="wrapper_layered_filter">
                <div className="layered_filter_container">
                  <div className="layered_filter_title hidden-xs hidden-sm">
                    <p className="title_filter"><span className="icon-filter"><svg viewBox="0 0 20 20">
                      <path fill="none" strokeWidth={2} strokeLinejoin="round" strokeMiterlimit={10} d="M12 9v8l-4-4V9L2 3h16z" /></svg></span> Bộ lọc</p>
                  </div>
                  <div className="layered_filter_group layered_filter_mobileContent" id="layered_filter_mobile">
                    <div className="row clearfix">
                      <div className="filter_group col-md-3 col-sm-12 col-xs-12" aria-expanded="true">
                        <div className="filter_group_block">
                          <div className="filter_group-subtitle">
                            <span>Lọc giá</span>
                          </div>
                          <div className="filter_group-content filter-price">
                            <ul className="checkbox-list">
                              <li><input type="checkbox" id="p1"  onChange={() => handleCheckboxChange('<100000')} /> <label htmlFor="p1"><span>Dưới</span> 100.000₫</label></li>
                              <li><input type="checkbox" id="p2"  onChange={() => handleCheckboxChange('100000-250000')} /> <label htmlFor="p2">100.000₫ - 250.000₫</label></li>
                              <li><input type="checkbox" id="p3"  onChange={() => handleCheckboxChange('250000-500000')} /> <label htmlFor="p3">250.000₫ - 500.000₫</label></li>
                              <li><input type="checkbox" id="p4"  onChange={() => handleCheckboxChange('500000-800000')} /> <label htmlFor="p4">500.000₫ - 800.000₫</label></li>
                              <li><input type="checkbox" id="p5"  onChange={() => handleCheckboxChange('>800000')} /> <label htmlFor="p5"><span>Trên</span> 800.000₫</label></li>
                            </ul>
                          </div>
                        </div>
                      </div>{/* ./filter color */}
                      <div className="filter_group col-md-3 col-sm-12 col-xs-12" aria-expanded="true">
                        <div className="filter_group_block">
                          <div className="filter_group-subtitle">
                            <span>Màu sắc</span>
                          </div>
                          <div className="filter_group-content filter-color">
                            <ul className="checkbox-list clearfix">
                              <li><input type="checkbox" id="data-color-p1" defaultValue="Tím" name="color-filter" data-color="(tag:product=color:tím)" /> <label htmlFor="data-color-p1" style={{ backgroundColor: '#eb11eb' }}>Tím</label></li>
                              <li><input type="checkbox" id="data-color-p2" defaultValue="Vàng" name="color-filter" data-color="(tag:product=color:vàng)" /> <label htmlFor="data-color-p2" style={{ backgroundColor: '#ffff05' }}>Vàng</label></li>
                              <li><input type="checkbox" id="data-color-p3" defaultValue="Cam" name="color-filter" data-color="(tag:product=color:cam)" /> <label htmlFor="data-color-p3" style={{ backgroundColor: '#f54105' }}>Cam</label></li>
                              <li><input type="checkbox" id="data-color-p4" defaultValue="Hồng" name="color-filter" data-color="(tag:product=color:hồng)" /> <label htmlFor="data-color-p4" style={{ backgroundColor: '#f23895' }}>Hồng</label></li>
                              <li><input type="checkbox" id="data-color-p5" defaultValue="Đen" name="color-filter" data-color="(tag:product=color:đen)" /> <label htmlFor="data-color-p5" style={{ backgroundColor: '#000000' }}>Đen</label></li>
                              <li><input type="checkbox" id="data-color-p6" defaultValue="Xám" name="color-filter" data-color="(tag:product=color:xám)" /> <label htmlFor="data-color-p6" style={{ backgroundColor: '#cccaca' }}>Xám</label></li>
                              <li><input type="checkbox" id="data-color-p7" defaultValue="Trắng" name="color-filter" data-color="(tag:product=color:trắng)" /> <label htmlFor="data-color-p7" style={{ backgroundColor: '#fffcfc' }}>Trắng</label></li>
                              <li><input type="checkbox" id="data-color-p8" defaultValue="Xanh dương" name="color-filter" data-color="(tag:product=color:xanh dương)" /> <label htmlFor="data-color-p8" style={{ backgroundColor: '#1757eb' }}>Xanh dương</label></li>
                              <li><input type="checkbox" id="data-color-p9" defaultValue="Xanh" name="color-filter" data-color="(tag:product=color:xanh)" /> <label htmlFor="data-color-p9" style={{ backgroundColor: '#099116' }}>Xanh</label></li>
                              <li><input type="checkbox" id="data-color-p10" defaultValue="Xanh lá" name="color-filter" data-color="(tag:product=color:xanh lá)" /> <label htmlFor="data-color-p10" style={{ backgroundColor: '#52ff52' }}>Xanh lá</label></li>
                            </ul>
                          </div>
                        </div>
                      </div>{/* ./filter size */}
                      <div className="filter_group col-md-3 col-sm-12 col-xs-12" aria-expanded="true">
                        <div className="filter_group_block">
                          <div className="filter_group-subtitle">
                            <span>Kích thước</span>
                          </div>
                          <div className="filter_group-content filter-size">
                            <ul className="checkbox-list">
                              <li><input type="checkbox" id="data-size-p1" defaultValue="S" name="size-filter" data-size="(variant:product=S)" /> <label htmlFor="data-size-p1">S</label></li>
                              <li><input type="checkbox" id="data-size-p2" defaultValue=" M" name="size-filter" data-size="(variant:product= M)" /> <label htmlFor="data-size-p2">M</label></li>
                              <li><input type="checkbox" id="data-size-p3" defaultValue=" L" name="size-filter" data-size="(variant:product= L)" /> <label htmlFor="data-size-p3">L</label></li>
                              <li><input type="checkbox" id="data-size-p4" defaultValue=" XS" name="size-filter" data-size="(variant:product= XS)" /> <label htmlFor="data-size-p4">XS</label></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="layered_filter_tags">
                  <div className="filter_tags">
                    Lọc giá: <span className="filter_tags_remove"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 50 50" xmlSpace="preserve">
                      <path fill="#333" d="M9.016 40.837a1.001 1.001 0 0 0 1.415-.001l14.292-14.309 14.292 14.309a1 1 0 1 0 1.416-1.413L26.153 25.129 40.43 10.836a1 1 0 1 0-1.415-1.413L24.722 23.732 10.43 9.423a1 1 0 1 0-1.415 1.413l14.276 14.293L9.015 39.423a1 1 0 0 0 .001 1.414z" /></svg></span>
                  </div>
                  <div className="filter_tags">
                    Màu sắc: <span className="filter_tags_remove"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 50 50" xmlSpace="preserve">
                      <path fill="#333" d="M9.016 40.837a1.001 1.001 0 0 0 1.415-.001l14.292-14.309 14.292 14.309a1 1 0 1 0 1.416-1.413L26.153 25.129 40.43 10.836a1 1 0 1 0-1.415-1.413L24.722 23.732 10.43 9.423a1 1 0 1 0-1.415 1.413l14.276 14.293L9.015 39.423a1 1 0 0 0 .001 1.414z" /></svg></span>
                  </div>
                  <div className="filter_tags">
                    Kích thước: <span className="filter_tags_remove"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 50 50" xmlSpace="preserve">
                      <path fill="#333" d="M9.016 40.837a1.001 1.001 0 0 0 1.415-.001l14.292-14.309 14.292 14.309a1 1 0 1 0 1.416-1.413L26.153 25.129 40.43 10.836a1 1 0 1 0-1.415-1.413L24.722 23.732 10.43 9.423a1 1 0 1 0-1.415 1.413l14.276 14.293L9.015 39.423a1 1 0 0 0 .001 1.414z" /></svg></span>
                  </div>
                  <div className="filter_tags filter_tags_remove_all">
                    <span>Xóa hết</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="collection-listproduct" id="collection-body">
            <div className="container">
              <div className="wraplist-collection">
                <div className="listProduct-row listProduct-resize listProduct-filter">

                  <div>
                    {products && currentItems.map((product) => (
                      <div key={product.id} product-id={product.id} style-id className="col-md-cus5 col-sm-6 col-xs-6 product-loop" data-id={product.id}>
                        <div className="product-inner product-resize">
                          <div className="proloop-image">
                            <div className="product--image image-resize">
                              <div className="product--image__inner">
                                <a href={"/product-detail/" + product.id}>
                                  <div className="prod-img first-image"><img className="img-loop" src={product.image} alt={product.name} /></div>
                                  <div className="prod-img second-image hovered-img hidden-xs"><img className="img-loop" src={product.image} alt={product.name} /></div>
                                </a>
                              </div>
                            </div>
                            <a href="#" className="proloop-link quickview-product" title={product.name} />
                          </div>
                          <div className="proloop-detail">
                            <h3><a href={"/product-detail/" + product.id} className="quickview-product">{product.name}</a></h3>
                            <p className="proloop--price on_sale">
                              <span className="price">{currency(product.price, { separator: '.', decimal: ',', symbol: '' }).format()}₫</span>
                              {product.price !== product.original_price && (
                                <span className="price-del">{currency(product.price, { separator: '.', decimal: ',', symbol: '' }).format()}₫</span>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

                <nav aria-label="..." style={{ marginLeft: "470px" }}>
                  <ul className="pagination">
                    <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                      <a className="page-link" href="#" onClick={() => handlePageClick(currentPage - 1)} tabindex="-1">
                        Previous
                      </a>
                    </li>
                    {[...Array(pageCount)].map((_, index) => (
                      <li key={index} className={`page-item ${currentPage === index ? 'active' : ''}`}>
                        <a className="page-link" href="#" onClick={() => handlePageClick(index)}>
                          {index + 1}
                          {currentPage === index && <span className="sr-only">(current)</span>}
                        </a>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === pageCount - 1 ? 'disabled' : ''}`}>
                      <a className="page-link" href="#" onClick={() => handlePageClick(currentPage + 1)}>
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div><input type="text" className="hidden" id="coll-handle" defaultValue="(collectionid:product=1001666735)" />
        </div>
      </div>
    </>
  )
};

// Trong file của bạn
export const handleSearch = async (searchTerm, setSearchResults) => {
  try {
    const response = await axios.post('/api/product/search', { text: searchTerm });
    setSearchResults(response.data);
  } catch (error) {
    console.error('Error searching for products:', error);
  }
};

export default Product;