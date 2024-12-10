import { describe, expect, jest } from "@jest/globals";


beforeEach(() => {
  jest.clearAllMocks;
});

jest.unstable_mockModule("../models/Product.js", () => ({
  default: {
    find: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    populate: jest.fn(),
  },
}));

const productController = await import('../controllers/productController.js');
const Product = (await import('../models/Product.js')).default;

describe("get Product", () => {
  it("Deberia devolver una lista con los productos de la base y un estatus 200", async () => {

    const mockProducts = [
      {
        name: "Tennis 1",
        size: [12, 14, 15],
        stock: 154,
        price: 150000,
        category:'oppnpi456456',
        brand: "Adidas",
        images: ["poop.png", "pokiuj.png"],
        deleteAt: null,
        description: "Un producto ....",
        sale: 0.23,
      },
      {
        name: "Tennis 2",
        size: [12, 14, 15],
        stock: 121,
        price: 110000,
        category:'ppoiipo15654opoop',
        brand: "Rebbot",
        images: ["popi.png", "lakiuj.png"],
        deleteAt: null,
        description: "Un producto ....",
        sale: 0.23,
      },
    ];
    const mockPopulate = {category:{
      _id:'ppoiipo15654opoop',
      name:'Zapatos',
      gender:'Male'
    }}

    const mockInstPolulate = {populate: jest.fn()}

    await Product.find.mockResolvedValue(mockProducts).mockResolvedValueOnce(mockInstPolulate)
    // await Product.populate.mockResolvedValueOnce(mockPopulate);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await productController.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockProducts);
  });

  it("Deberia arrojar un error con estatus 500", async () => {
    await Product.find.mockRejectedValue(new Error("Error en la conexion a la base"));

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await productController.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(500);

    expect(res.json).toHaveBeenCalledWith("Error en la conexion a la base");
  });
});

describe("Get One Product", () => {
  it("deberia devolver un producto y un estatus 200", async () => {
    const mockUser = {
      _id: "Poiji154687",
      name: "Luis",
      lastName: "Lozano",
      email: "email@gmail.com",
      password: "1245684Plo*",
      avatar: "userGeneric.png",
      typeUser: "Customer",
      deleteAt: null,
    };

    const mockReq = {
      params: { id: "Poiji154687" },
    };

    await Product.findById.mockResolvedValue(mockUser);

    const req = mockReq;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await productController.getOneById(req, res);
    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  it("Deberia generar un error al no encontrar el usuario y arrojar un error 404", () => {
    const mockReq = {
      params: { id: "Poiji154687" },
    };
    Product.findById.mockResolvedValue(null);

    const req = mockReq;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    productController.getOneById(req, res);

    expect(res.status).toHaveBeenLastCalledWith(404);
    expect(res.json).toHaveBeenCalledWith("Producto no encontrado");
  });

  it('Deberia arrojar un estatus 500 al presentar un error en la consulta',async()=>{
    const mockReq = {
      params: { id: "Poiji154687" },
    };

    // await Product.findById.mockRejectedValue();

    const req = mockReq;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    productController.getOneById(req, res);

    expect(res.status).toHaveBeenLastCalledWith(500);
    expect(res.json).toHaveBeenCalledWith('Error en la conexion a la base');
  })
});

// // describe('Create Product',()=>{
// // it('Deberia Crear un producto y devolver el estatus 201',()=>{

// // })
// })
