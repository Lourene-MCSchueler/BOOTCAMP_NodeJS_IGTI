import { promises as fs } from 'fs';
import path from 'path';

const { readFile, writeFile } = fs;
const file = path.resolve("../desafio/src/database/pedidos.json")

async function getOrder() {
  const orders = await readFile(file)
  return JSON.parse(orders);
}

class OrderRepository {

  static async insertOrder(newOrder) {
    const { cliente, produto, valor, entregue, timestamp } = newOrder
    const data = await getOrder();
    newOrder = {
      id: data.nextId++,
      cliente: cliente,
      produto: produto,
      valor: valor,
      entregue: entregue,
      data: timestamp
    }
    data.pedidos.push(newOrder)
    await writeFile(file, JSON.stringify(data));
    return newOrder;
  }

  static async updateOrder(order) {
    const data = await getOrder();
    const index = data.pedidos.findIndex(pedido => pedido.id === order.id);
    if (index === -1) {
      throw new Error("Pedido não encontrado")
    }
    data.pedidos[index].cliente = order.cliente;
    data.pedidos[index].produto = order.produto;
    data.pedidos[index].valor = order.valor;
    data.pedidos[index].entregue = order.entregue;
    await writeFile(file, JSON.stringify(data));
    return data.pedidos[index];
  }

  static async updateDelivery(id, entregue) {
    const data = await getOrder();
    const index = data.pedidos.findIndex(pedido => pedido.id === id);
    if (index === -1) {
      throw new Error("Pedido não encontrado")
    }
    data.pedidos[index].entregue = entregue;
    await writeFile(file, JSON.stringify(data));
    return data.pedidos[index];
  }

  static async deleteOrder(id) {
    const data = await getOrder();
    data.pedidos = data.pedidos.filter(
      pedido => pedido.id !== parseInt(id))
    await writeFile(file, JSON.stringify(data));
    return `Pedido ${id} deletado com sucesso`;
  }

  static async listOrder(id) {
    const data = await getOrder();
    const order = data.pedidos.find(pedido => pedido.id === parseInt(id))
    if (order) {
      return order;
    }
    throw new Error("Pedido não encontrado")
  }

  static async listByClient(cliente) {
    const data = await getOrder();
    const orders = data.pedidos;
    let list = [];
    let total = 0;
    for (const order of orders) {
      if ((order.cliente === cliente) && (order.entregue == true)) {
        list.push(order.valor)
      }
    }
    total = list.reduce((total, numero) => total + numero, 0);
    console.log(total)
    return total
  }

  static async listByProduct(produto) {
    const data = await getOrder();
    const orders = data.pedidos;
    let list = [];
    let total = 0;
    for (const order of orders) {
      if ((order.produto === produto) && (order.entregue == true)) {
        list.push(order.valor)
      }
    }
    total = list.reduce((total, numero) => total + numero, 0);
    console.log(total);
    return total
  }

  static async moreOrderByProduct() {
    const data = await getOrder();
    const orders = data.pedidos;
    let list = []

    for (const order of orders) {
      if (order.entregue == true) {
        list.push(order.produto)
      }
    }

    let newList = Object.create(null);

    list.forEach(item => {
      if (newList[item]) {
        newList[item] += 1;
      } else {
        newList[item] = 1
      }
    });

    let result = Object.entries(newList)
      .map((item) => ({ produto: item[0], qtde: item[1] }))
      .sort((a, b) => { return b.qtde - a.qtde })
      .map(itemMap => `${itemMap.produto} - ${itemMap.qtde}`);

    return result
  }

  static async moreOrderByProduct() {
    const data = await getOrder();
    let lista = []
    data.filter(p => p.entregue).forEach(p => {
      const index = lista.findIndex(it => it.produto === p.produto);
      if (index === -1) {
        lista.push({ produto: p.produto, quantidade: 1 });
      } else {
        lista[index].quantidade++
      }
    });
    lista.sort((a, b) => b.quantidade - a.quantidade);
    return lista.map(it => it.produto + " - " + it.quantidade);
  }
}

export default OrderRepository;

