import httpAxios from "../httpAxios";

const ProductService = {

    getList: () => {
        return httpAxios.get(`product`)
    },
    get(id,params){
        var url=`product/ ${id}`;
        return httpAxios.get(url,{params});
    },

    getById: (id) => {
        return httpAxios.get(`product/${id}`)

    },
    getBySlug: (slug) => {
        return httpAxios.get(`product/showSlug/${slug}`)

    },
    store: (data) => {
        return httpAxios.post("product/create", data)
    },
    deleteProduct: (id) => {
        return httpAxios.delete(`product/delete/${id}`)
    },
    destroy: (id) => {
        return httpAxios.delete(`product/destroy/${id}`)
    },
    update: (id, data) => {
        return httpAxios.put(`product/update/${id}`, data);
    },
    restore: (id) => {
        return httpAxios.post(`product/restore/${id}`);
    },

    search: (keyword) => {
        return httpAxios.post(`product/search`,keyword);
      },
    
}
export default ProductService;
