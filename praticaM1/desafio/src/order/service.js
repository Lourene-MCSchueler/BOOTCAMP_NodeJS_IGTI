import OrderRepository from "./repository.js";

class OrderService {

  static async createOrder(newOrder) {
    return await OrderRepository.insertOrder(newOrder)
  };

  static async updateOrder(order) {
    return await OrderRepository.updateOrder(order)
  };

  static async updateDelivery(id, entregue) {
    return await OrderRepository.updateDelivery(id, entregue)
  };

  static async deleteOrder(id) {
    return await OrderRepository.deleteOrder(id)
  };

  static async listOrder(id) {
    return await OrderRepository.listOrder(id)
  };

  static async listByClient(cliente) {
    return await OrderRepository.listByClient(cliente)
  };

  static async listByProduct(produto) {
    return await OrderRepository.listByProduct(produto)
  };

  static async moreOrderByProduct() {
    return await OrderRepository.moreOrderByProduct()
  };

}

export default OrderService;