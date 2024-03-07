import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductService from "../../../service/ProductService";


const ListProduct = () => {
    const [products, setProducts] = useState([]);
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(1);
    const [load, setLoad] = useState(Date.now());
 const [currentPage, setCurrentPage] = useState(0);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await ProductService.getList();
                console.log('API Response:', response.data);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [load]);


    const handDelete = (id) => {
        (async () => {
            const result = await ProductService.deleteProduct(id);
            setLoad(Date.now());

        })();
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
        <div>
            <section className="content-header my-2">
                <h1 className="d-inline">Sản phẩm</h1>
                <Link to="/admin/product/create" className="btn-add">Thêm mới</Link>
                <div className="row mt-3 align-items-center">
                    <div className="col-6">
                        <ul className="manager">
                            <li><a href="product_index.html">Tất cả (123)</a></li>
                            <li><a href="#">Xuất bản (12)</a></li>
                            <li><Link to={"/admin/product/trash"}>Rác (12)</Link></li>
                        </ul>
                    </div>
                    <div className="col-6 text-end">
                        <input type="text" className="search d-inline" />
                        <button className="d-inline btnsearch">Tìm kiếm</button>
                    </div>
                </div>
                <div className="row mt-1 align-items-center">
                    <div className="col-md-8">
                        <select name className="d-inline me-1">
                            <option value>Hành động</option>
                            <option value>Bỏ vào thùng rác</option>
                        </select>
                        <button className="btnapply">Áp dụng</button>
                        <select name className="d-inline me-1">
                            <option value>Tất cả danh mục</option>
                        </select>
                        <select name className="d-inline me-1">
                            <option value>Tất cả thương hiệu</option>
                        </select>
                        <button className="btnfilter">Lọc</button>
                    </div>
                    
                    <div className="col-md-4 text-end">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination pagination-sm justify-content-end">
                                <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`} >
                                    <a className="page-link" href="#" onClick={() => handlePageClick(currentPage - 1)} tabindex="-1">«</a>
                                </li>
                                {[...Array(pageCount)].map((_, index) => (
                                <li key={index} className={`page-item ${currentPage === index ? 'active' : ''}`}>
                                    <a className="page-link" href="#" onClick={() => handlePageClick(index)}>{index + 1}
                          </a>
                                    </li>
                                ))}
                                <li className={`page-item ${currentPage === pageCount - 1 ? 'disabled' : ''}`}>
                                    <a className="page-link" href="#" onClick={() => handlePageClick(currentPage + 1)}>»</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </section>
            <section className="content-body my-2">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th className="text-center" style={{ width: 30 }}>
                                <input type="checkbox" id="checkboxAll" />
                            </th>
                            <th className="text-center" style={{ width: 130 }}>Hình ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Slug</th>
                            <th>Giá</th>
                            <th>ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && currentItems.map((product, index) => (
                            <tr className="datarow">
                                <td>
                                    <input type="checkbox" id="checkId" />
                                </td>
                                <td>
                                    <img className="img-fluid" src={product.image} alt="product.jpg" />
                                </td>
                                <td>
                                    <div className="name">
                                        <a href="product_edit.html">
                                            {product.name}
                                        </a>
                                    </div>
                                    <div className="function_style">
                                        <Link href="#" className="px-1 text-success">
                                            <i className="fa fa-toggle-on" />
                                        </Link>
                                        <Link to={"/admin/product/edit/" + product.id} className="px-1 text-primary">
                                            <i className="fa fa-edit" />
                                        </Link>
                                        <Link to={"/admin/product/show/" + product.id} className="px-1 text-info">
                                            <i className="fa fa-eye" />
                                        </Link>
                                        <Link onClick={() => handDelete(product.id)} className="px-1 text-danger">
                                            <i className="fa fa-trash" />
                                        </Link>
                                    </div>
                                </td>

                                <td>{product.slug}</td>

                                <td>{product.price}</td>
                                <td className="text-center" style={{ width: 30 }}>{product.id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>

    );
}

export default ListProduct;