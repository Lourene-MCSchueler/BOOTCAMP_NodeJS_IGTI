import BrandService from "./service.js"


class BrandController {

  static async maisModelos(req, res) {
    try {
      const models = await BrandService.maisModelos();
      res.send(`Marca(s) com mais modelos: ${models}`);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async menosModelos(req, res) {
    try {
      const models = await BrandService.menosModelos();
      res.send(`Marca(s) com menos modelos: ${models}`);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async listaMaisModelos(req, res) {
    const qtd = parseInt(req.params.qtd)
    try {
      const models = await BrandService.listaMaisModelos(qtd);
      res.send(models)
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async listaMenosModelos(req, res) {
    const qtd = parseInt(req.params.qtd)
    try {
      const models = await BrandService.listaMenosModelos(qtd);
      res.send(models)
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async listaModelos(req, res) {
    try {
      const marca = (req.body.marca).toLowerCase();
      const models = await BrandService.listaModelos(marca);
      res.send(models)
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default BrandController;