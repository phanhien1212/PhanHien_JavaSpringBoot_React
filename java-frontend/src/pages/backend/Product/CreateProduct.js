import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductService from "../../../service/ProductService";
import CategoryService from "../../../service/CategoryService";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [categories, setCategories] = useState([])
  const navigate = useNavigate();
  const [forceUpdateTimestamp, setForceUpdateTimestamp] = useState(Date.now());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultCategory = await CategoryService.getList();
        setCategories(resultCategory.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, [forceUpdateTimestamp]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a product object with the form data
      const newProduct = {
        name,
        description,
        slug,
        price,
        image,
        category_id

        
      };

      // Send a POST request to the Spring Boot endpoint
      const response = await ProductService.store(newProduct);

      // Handle the response as needed (e.g., show a success message, redirect)
      console.log("Product created successfully:", response.data);

      // Trigger a re-render by updating the forceUpdateTimestamp
      alert("Thêm sản phẩm mới thành công")
      setForceUpdateTimestamp(Date.now());
      navigate("/admin/product");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };


  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Không có";
  };

    return (
      <div className="content">
        <section className="content-header my-2">
          <h1 className="d-inline">Thêm sản phẩm</h1>
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
                <label>
                  <strong>Tên sản phẩm (*)</strong>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nhập tên sản phẩm"
                  name="name"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label>
                  <strong>Slug (*)</strong>
                </label>
                <textarea
name="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  rows={3}
                  className="form-control"
                  placeholder="Nhập mô tả"
                  defaultValue={""}
                />
              </div>
              <div className="mb-3">
                <label>
                  <strong>Mô tả (*)</strong>
                </label>
                <textarea
name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="form-control"
                  placeholder="Nhập mô tả"
                  defaultValue={""}
                />
              </div>
            </div>
            
            <div className="col-md-3">
              <div className="box-container mt-4 bg-white">
                <div className="box-header py-1 px-2 border-bottom">
                  <strong>Đăng</strong>
                </div>
                
                <div className="box-footer text-end px-2 py-2">
                  <button
                    type="submit"
                    className="btn btn-success btn-sm text-end"
                  >
                    <i className="fa fa-save" aria-hidden="true" /> Đăng
                  </button>
                </div>
              </div>
              <div className="box-body p-2 border-bottom">
                  <select name="category_id" value={category_id} onChange={(e)=>setCategoryId(e.target.value)} className="form-select">
                    <option value>Chọn danh mục</option>
                    {categories.map((category, index) => (
                      <option value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
              <div className="box-container mt-2 bg-white">
                <div className="box-body p-2 border-bottom">
                  <div className="mb-3">
                    <label>
                      <strong>Giá bán (*)</strong>
                    </label>
                    <input
                      type="number"
                      defaultValue={10000}
                      min={10000}
                      value={price}
                      onChange={(e)=>setPrice(e.target.value)}
                      name="price"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              <div className="box-container mt-2 bg-white">
                <div className="box-header py-1 px-2 border-bottom">
                  <strong>Hình đại diện(*)</strong>
                </div>
       <div className="box-body p-2 border-bottom">
                  <input type="text" value={image} onChange={(e)=>setImage(e.target.value)} name="image" className="form-control" />
                </div>
              </div>
            </div>
          </form>
        </section>
      </div>
    );
  };
  
  export default CreateProduct;