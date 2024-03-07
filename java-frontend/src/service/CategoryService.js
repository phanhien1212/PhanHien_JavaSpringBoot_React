import httpAxios from "../httpAxios";

const CategoryService = {

    getList: () => {
        return httpAxios.get(`category`)
    },

    getById: (id) => {
        return httpAxios.get(`category/${id}`)

    },
   
    
}
export default CategoryService;
