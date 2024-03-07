import httpAxios from "../httpAxios";

const OrderService = {

    getList: () => {
        return httpAxios.get(`order`)
    },

    storeorder: (data) => {
        return httpAxios.post(`order`,data);
      },
      
    storeorderdetail: (data) => {
        return httpAxios.post(`orderdetail`,data);
      },
    
}
export default OrderService;
