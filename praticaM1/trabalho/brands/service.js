import { promises as fs } from "fs";


async function getBrands() {
  const data = await fs.readFile("car-list.json");
  return JSON.parse(data);
}

class BrandService {

  static async maisModelos() {
    const brands = await getBrands();
    let result = [];
    let max = 0;
    for (const b of brands) {
      if (b.models.length > max) {
        result = [];
        result.push(b.brand);
        max = b.models.length;
      } else if (b.models.length === max) {
        result.push(b.brand);
      }
    }
    if (result.length === 1) {
      return result[0];
    } else {
      return result;
    }
  }

  static async menosModelos() {
    const brands = await getBrands();
    let result = [];
    let inicial = brands[0].models.length;
    for (const b of brands) {
      if (b.models.length < inicial) {
        result = [];
        result.push(b.brand);
        inicial = b.models.length;
      } else if (b.models.length === inicial) {
        result.push(b.brand);
      }
    }
    if (result.length === 1) {
      return result[0];
    } else {
      return result;
    }
  }

  static async listaMaisModelos(qtd) {
    const brands = await getBrands();
    let result = []
    for (const b of brands) {
      result.push({ name: b.brand, value: b.models.length });
    }

    function ordenarPorValor(a, b) {
      let resultado = ((b.value - a.value) || (a.name.localeCompare(b.name)))
      return resultado
    }
    result.sort(ordenarPorValor)
    let total = result.length - qtd
    result.splice(qtd, total);
    return result
  }

  static async listaMenosModelos(qtd) {
    const brands = await getBrands();
    let result = []
    for (const b of brands) {
      result.push({ name: b.brand, value: b.models.length });
    }
    function ordenarPorValor(a, b) {
      let resultado = ((a.value - b.value) || (a.name.localeCompare(b.name)))
      return resultado
    }
    result.sort(ordenarPorValor)
    let total = result.length - qtd
    result.splice(qtd, total);
    return result
  }

  static async listaModelos(marca) {
    const brands = await getBrands();
    let result = []
    for (const b of brands) {
      if (b.brand.toLowerCase() === marca) {
        result.push(b.models)
      } else if ((marca == "") || (b.brand != marca)) {
        result
      }
    }
    if (result.length === 1) {
      return result[0];
    } else {
      return result;
    }
  }
}

export default BrandService;

