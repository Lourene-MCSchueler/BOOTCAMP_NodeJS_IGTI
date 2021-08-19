import OrderService from "./service.js";

class OrderController {

  static async createOrder(req, res) {
    try {
      const { cliente, produto, valor } = req.body;
      if (!cliente || !produto || valor == null) {
        throw new Error("Cliente, Produto e Valor são obrigatórios.")
      }
      const entregue = false;
      const timestamp = new Date();
      const newOrder = { cliente, produto, valor, entregue, timestamp }
      const result = await OrderService.createOrder(newOrder)
      res.send(result)
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async updateOrder(req, res) {
    try {
      const order = req.body;
      const result = await OrderService.updateOrder(order)
      res.send(result)
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async updateDelivery(req, res) {
    try {
      const { id, entregue } = req.body;
      const result = await OrderService.updateDelivery(id, entregue)
      res.send(result)
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async deleteOrder(req, res) {
    try {
      const id = req.params.id;
      const result = await OrderService.deleteOrder(id)
      res.status(200).json(result);
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async listOrder(req, res) {
    try {
      const id = req.params.id;
      const result = await OrderService.listOrder(id)
      res.status(200).json(result);
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async listByClient(req, res) {
    try {
      const cliente = req.body.cliente;
      const result = await OrderService.listByClient(cliente)
      res.status(200).json(result);
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async listByProduct(req, res) {
    try {
      const produto = req.body.produto;
      const result = await OrderService.listByProduct(produto)
      res.status(200).json(result);
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async moreOrderByProduct(req, res) {
    try {
      const result = await OrderService.moreOrderByProduct()
      res.status(200).json(result);
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}








export default OrderController;