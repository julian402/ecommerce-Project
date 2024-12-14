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

const productController = await import("../controllers/productController.js");
const Product = (await import("../models/Product.js")).default;

describe("getAll Products", () => {
  it("Debería devolver una lista de productos con sus categorías y un estatus 200", async () => {
    const mockProducts = [
      {
        name: "Tennis 1",
        size: [12, 14, 15],
        stock: 154,
        price: 150000,
        category: {
          name: "Zapatos",
          gender: "Male",
        },
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
        category: {
          name: "Zapatos Deportivos",
          gender: "Female",
        },
        brand: "Reebok",
        images: ["popi.png", "lakiuj.png"],
        deleteAt: null,
        description: "Otro producto ....",
        sale: 0.23,
      },
    ];

    const mockPopulate = jest.fn().mockResolvedValue(mockProducts);
    Product.find.mockReturnValue({ populate: mockPopulate });

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await productController.getAll(req, res);

    expect(Product.find).toHaveBeenCalledWith({ deleteAt: null });
    expect(mockPopulate).toHaveBeenCalledWith("category", [
      "-_id",
      "name",
      "gender",
    ]);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockProducts);
  });

  it("Debería arrojar un error con estatus 500", async () => {
    Product.find.mockReturnValue({
      populate: jest
        .fn()
        .mockRejectedValue(new Error("Error en la conexión a la base")),
    });

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await productController.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith("Error en la conexión a la base");
  });
});

describe("getOneById Product", () => {
  it("Debería devolver un producto y un estatus 200 si el producto existe", async () => {
    const mockProduct = {
      name: "Tennis 1",
      size: [12, 14, 15],
      stock: 154,
      price: 150000,
      category: {
        _id: "category123",
        name: "Zapatos",
        gender: "Male",
      },
      brand: "Adidas",
      images: ["poop.png", "pokiuj.png"],
      deleteAt: null,
      description: "Un producto ....",
      sale: 0.23,
    };

    const mockPopulate = jest.fn().mockResolvedValue(mockProduct);
    Product.findById.mockReturnValue({ populate: mockPopulate });

    const req = { params: { id: "product123" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await productController.getOneById(req, res);

    expect(Product.findById).toHaveBeenCalledWith("product123");
    expect(mockPopulate).toHaveBeenCalledWith("category");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockProduct);
  });

  it("Debería devolver un error 404 si el producto no existe", async () => {
    const mockProduct = { deletedAt: null };
    const mockPopulate = jest.fn().mockResolvedValue(mockProduct);
    Product.findById.mockReturnValue({ populate: mockPopulate });

    const req = { params: { id: "product123" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await productController.getOneById(req, res);

    expect(Product.findById).toHaveBeenCalledWith("product123");
    expect(mockPopulate).toHaveBeenCalledWith("category");
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith("Producto no encontrado");
  });

  it("Debería arrojar un error con estatus 500 en caso de un fallo en la base de datos", async () => {
    const mockPopulate = jest
      .fn()
      .mockRejectedValue(new Error("Error en la conexión a la base"));
    Product.findById.mockReturnValue({ populate: mockPopulate });

    const req = { params: { id: "product123" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await productController.getOneById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith("Error en la conexión a la base");
  });
});

describe("create Product", () => {
  it("Deberia devolver el producto creado y un estatus 200", async () => {
    const mockProductsReq = {
      body: {
        name: "Tennis 1",
        size: [12, 14, 15],
        stock: 154,
        price: 150000,
        category: "polojj",
        brand: "Adidas",
        description: "Un producto ....",
        sale: 0.23,
      },
      files: [{ filename: "userGeneric.png" }, { filename: "userGeneric.png" }],
    };

    const mockRespose = { message: "product create" };

    Product.create.mockReturnValue({
      push: jest.fn().mockResolvedValue(mockRespose),
    });

    const req = mockProductsReq;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await productController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith({
      message: "Product create successfully",
    });
  });

  it("Debaria arrojar un error 500", async () => {
    const mockProductsReq = {
      body: {
        name: "Tennis 1",
        size: [12, 14, 15],
        stock: 154,
        price: 150000,
        category: "polojj",
        brand: "Adidas",
        description: "Un producto ....",
        sale: 0.23,
      },
      files: [{ filename: "userGeneric.png" }, { filename: "userGeneric.png" }],
    };

    Product.create.mockRejectedValue(
      new Error("Error en la conexión a la base")
    );

    const req = mockProductsReq;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await productController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith("Error en la conexión a la base");
  });
});

describe("update Products", () => {
  it("Deberia permitir actualizar la informacion de un producto y devolver un estatus 200", async () => {
    const mockReqProduct = {
      body: {
        id: "polki1454poki",
        name: "Tennis 1",
        size: [12, 14, 15],
        stock: 154,
        price: 150000,
        category: "polojj",
        brand: "Adidas",
        description: "Un producto ....",
        sale: 0.23,
      },
      files: [{ filename: "userGeneric.png" }, { filename: "userGeneric.png" }],
    };

    const mockProduct = {
      name: "Tennis 1",
      size: [12, 14, 15],
      stock: 154,
      price: 150000,
      category: {
        _id: "category123",
        name: "Zapatos",
        gender: "Male",
      },
      brand: "Adidas",
      images: ["poop.png", "pokiuj.png"],
      deleteAt: null,
      description: "Un producto ....",
      sale: 0.23,
    };

    const mockProductFinal = {
      id: "polki1454poki",
      name: "Tennis 1",
      size: [12, 14, 15],
      stock: 154,
      price: 150000,
      category: "polojj",
      brand: "Adidas",
      images: ["poop.png", "pokiuj.png"],
      deleteAt: null,
      description: "Un producto ....",
      sale: 0.23,
    };

    const mockIsntancia = { save: jest.fn() };

    Product.findById
      .mockReturnValue({ push: jest.fn().mockResolvedValue(mockProduct) })
      .mockResolvedValueOnce(mockIsntancia);

    const req = mockReqProduct;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await productController.update(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    // expect(res.json).toHaveBeenCalledWith(mockProductFinal);
  });

  it("Deberia devolver un error 404 al no encontrar un producto", async () => {
    const mockReqProduct = {
      body: {
        id: "polki1454poki",
        name: "Tennis 1",
        size: [12, 14, 15],
        stock: 154,
        price: 150000,
        category: "polojj",
        brand: "Adidas",
        description: "Un producto ....",
        sale: 0.23,
      },
      files: [{ filename: "userGeneric.png" }, { filename: "userGeneric.png" }],
    };
    const mockProduct = null;

    Product.findById.mockReturnValue(mockProduct);

    const req = mockReqProduct;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await productController.update(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Product not found" });
  });

  it("Deberia arrojar un error 500 al fallar en la funcion", async () => {
    const mockProductsReq = {
      body: {
        name: "Tennis 1",
        size: [12, 14, 15],
        stock: 154,
        price: 150000,
        category: "polojj",
        brand: "Adidas",
        description: "Un producto ....",
        sale: 0.23,
      },
      files: [{ filename: "userGeneric.png" }, { filename: "userGeneric.png" }],
    };

    const mockintancia = {save: jest.fn().mockRejectedValue(new Error("opopop"))};

    const mockPush = jest.fn().mockRejectedValue(new Error("opopop"));

  
    Product.findById
      .mockReturnValue({ push: mockPush }).mockRejectedValueOnce(mockintancia)

    const req = mockProductsReq;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await productController.update(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe("destroy Products", ()=>{
  it("Deberia cambiar el campo deleteAt y devolver un estatus 200", async()=>{

    const mockReqId = {
      body: {
        id: "polki1454poki",
      }};

      const mockProduct = {
        name: "Tennis 1",
        size: [12, 14, 15],
        stock: 154,
        price: 150000,
        category: {
          _id: "category123",
          name: "Zapatos",
          gender: "Male",
        },
        brand: "Adidas",
        images: ["poop.png", "pokiuj.png"],
        deleteAt: null,
        description: "Un producto ....",
        sale: 0.23,
      };

      const mockIsntancia = { save: jest.fn() };

      Product.findById.mockReturnValue({push: jest.fn().mockResolvedValue(mockProduct)}).mockResolvedValueOnce(mockIsntancia);

      const req = mockReqId;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }

      await productController.destroy(req,res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Product deleted successfully" })
  })

  it("Deberia arrojar un error con estarus 404 al no encontrar el producto a eliminar", async ()=>{

    const mockReqId = {
      body:{
        id: "poldjof4652561pojpo"
      }
    };

    Product.findById.mockResolvedValue(null);

    const req = mockReqId;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    await productController.destroy(req,res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Product not exist" });
  })

  it("Deberia arrojar un error con estatus 500, al presentar algun otro error",async ()=> {
    
    const mockReqId = {
      body:{
        id:"polkfi165489Pjijdo"
      }
    };

    Product.findById.mockRejectedValue(new Error ("Error en la conexion de la base de datos"));

    const req = mockReqId;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    await productController.destroy(req,res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith("Error en la conexion de la base de datos")
  })
})
