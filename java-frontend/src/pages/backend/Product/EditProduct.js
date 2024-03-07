import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CategoryService from "./../../../service/CategoryService";
import ProductService from "../../../service/ProductService";

const EditProduct = () => {
  const { id } = useParams();
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [price, setPrice] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState("");
  const [load, setLoad] = useState(Date.now());
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultCategory = await CategoryService.getList();
        setCategories(resultCategory.data);

        const result = await ProductService.getById(id);
        const productData = result.data;
        console.log(productData)

        setName(productData.name);
        setDescription(productData.description);
        setCategory_id(productData.category_id);
        setPrice(productData.price);
        setImage(productData.image);
        setSlug(productData.slug);
       
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, [id]);
  const getCategoryName = (categoryId) => {
        const category = categories.find((cat) => cat.id === categoryId);
        return category ? category.name : "Không có";
      };
  const handleSubmit = async (e) =>{ 
    e.preventDefault();

    try {
      const updatedProduct = {
        name,
        slug,
        description,
        category_id,
        price,
        image,
       
      };

      await ProductService.update(id, updatedProduct);

      // Handle success, redirect to the product list page or show a success message
      alert("Update thành công")
      navigate("/admin/product");
      setLoad(Date.now());
    } catch (error) {
      console.error("Error updating product:", error);
      // Handle error, show an error message to the user
    }
};
    return ( 
 <div className="content">
  <section className="content-header my-2">
    <h1 className="d-inline">Cập nhập sản phẩm</h1>
    <div className="mt-1 text-end">
      <Link className="btn btn-sm btn-primary" to="product_index.html">
        <i className="fa fa-arrow-left" /> Về danh sách
      </Link>
    </div>
  </section>
  <section className="content-body my-2">
    <form className="row" onSubmit={handleSubmit}>
      <div className="col-md-9">
        <div className="mb-3">
          <label><strong>Tên sản phẩm (*)</strong></label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nhập tên sản phẩm" name="name" className="form-control" />
        </div>
        <div className="mb-3">
          <label><strong>Slug(*)</strong></label>
          <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="Nhập tên sản phẩm" name="name" className="form-control" />
        </div>
        <div className="mb-3">
<label><strong>Mô tả (*)</strong></label>
          <textarea name="description"  value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="form-control" placeholder="Nhập mô tả" defaultValue={""} />
        </div>
        
      </div>
      <div className="col-md-3">
        <div className="box-container mt-4 bg-white">
          <div className="box-header py-1 px-2 border-bottom">
            <strong>Đăng</strong>
          </div>
         
          <div className="box-footer text-end px-2 py-2">
            <button type="submit" className="btn btn-success btn-sm text-end">
              <i className="fa fa-save" aria-hidden="true" /> Cập nhật
            </button>
          </div>
        </div>
        <div className="box-container mt-2 bg-white">
          <div className="box-header py-1 px-2 border-bottom">
            <strong>Danh mục(*)</strong>
          </div>
          <div className="box-body p-2 border-bottom">
          <select
                  name="brand_id"
                  value={category_id}
                  onChange={(e) => setCategory_id(e.target.value)}
                  className="form-select"
                >
                  <option value="">Chọn danh mục</option>
                  {categories.map((category) => (
                    <option value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
          </div>
        </div>
    
        <div className="box-container mt-2 bg-white">
         
          <div className="box-body p-2 border-bottom">
            <div className="mb-3">
              <label><strong>Giá bán (*)</strong></label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}  defaultValue={10000} min={10000} name="price" className="form-control" />
            </div>
          </div>
        </div>
        <div className="box-container mt-2 bg-white">
          <div className="box-header py-1 px-2 border-bottom">
            <strong>Hình đại diện(*)</strong>
          </div>
          <div className="box-body p-2 border-bottom">
            <input type="text"  value={image} onChange={(e) => setImage(e.target.value)} name="image" className="form-control" />
          </div>
        </div>
      </div>
    </form>
  </section>
</div>

     );
}
 
export default EditProduct;