import { describe, expect, jest } from "@jest/globals";

beforeEach(() => {
  jest.clearAllMocks(); // Añadir paréntesis para ejecutar la función
});

jest.unstable_mockModule("../models/PurchaseOrder.js", () => ({
  default: {
    find: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    populate: jest.fn(),
  },
}));

const purchOrdController = await import("../controllers/purchOrdController.js");
const PurchaseOrder = (await import("../models/PurchaseOrder.js")).default;
const Location = (await import("../models/Location.js")).default;

describe("Get All", () => {
  it("Debería devolver una lista de ordenes de compra con sus productos y un estatus 200", async () => {
    const mockPurchaseOrder = {
      amount: 250000,
      products: [
        {
          product: "64b0c3f1e1d3e9a5f0e12345",
          quantity: 3,
        },
        {
          product: "64b0c3f1e1d3e9a5f0e67890",
          quantity: 2,
        },
      ],
      user: "64b0c3f1e1d3e9a5f0e54321",
      paymentMet: "Credit_Card",
      address: "64b0c3f1e1d3e9a5f0e09876",
      deleteAt: null,
      createdAt: "2024-12-15T12:34:56.789Z",
      updatedAt: "2024-12-15T12:34:56.789Z",
    };
    // Configuración del mock para las llamadas encadenadas a populate
    const mockPopulate = jest.fn().mockReturnThis(); // Permite el encadenamiento
    PurchaseOrder.find.mockReturnValue({
      populate: mockPopulate,
      exec: jest.fn().mockResolvedValue([mockPurchaseOrder]),
    });

    // Simulación de los objetos req y res
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Llamada al controlador
    await purchOrdController.default.getAll(req, res);

    // Verificaciones
    expect(PurchaseOrder.find).toHaveBeenCalledWith({ deleteAt: null });

    // Verificar que populate fue llamado tres veces con los argumentos correctos
    expect(mockPopulate).toHaveBeenCalledTimes(3);
    expect(mockPopulate).toHaveBeenNthCalledWith(1, "user", [
      "-_id",
      "name",
      "lastName",
      "email",
    ]);
    expect(mockPopulate).toHaveBeenNthCalledWith(2, {
      path: "products.product",
      select: ["-_id", "-stock", "-sale"],
      populate: {
        path: "category",
        select: ["-_id", "name", "gender", "sale"],
      },
    });
    expect(mockPopulate).toHaveBeenNthCalledWith(3, "address", [
      "city",
      "zipCode",
      "address",
    ]);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("Debería arrojar un error con estatus 500", async () => {
    const mockThirdPopulate = jest
      .fn()
      .mockRejectedValue(new Error("Internal server Error"));
    const mockSecondPopulate = jest.fn().mockReturnValue({
      populate: mockThirdPopulate,
    });
    const mockFirstPopulate = jest.fn().mockReturnValue({
      populate: mockSecondPopulate,
    });
    PurchaseOrder.find.mockReturnValue({
      populate: mockFirstPopulate,
    });

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await purchOrdController.default.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Internal server Error" });
  });
});

describe("Get By User ID", () => {
  it("Debería devolver una lista de órdenes para el usuario y un estatus 200", async () => {
    const mockOrders = [
      {
        _id: "order123",
        user: { name: "John", lastName: "Doe", email: "john@example.com" },
        products: [
          {
            product: {
              _id: "prod123",
              category: { name: "Shirts", gender: "male", sale: false },
            },
            quantity: 2,
          },
        ],
      },
    ];

    const mockPopulate = jest.fn().mockReturnThis();
    // La última llamada debe resolver la promesa con las órdenes
    mockPopulate.mockReturnValueOnce({
      populate: mockPopulate.mockReturnThis(),
      then: (cb) => cb(mockOrders), // Simula el await final del query
    });

    PurchaseOrder.find.mockReturnValue({
      populate: mockPopulate,
    });

    const req = {
      auth: {
        id: "user123",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await purchOrdController.default.getByuserId(req, res);

    expect(PurchaseOrder.find).toHaveBeenCalledWith({ user: "user123" });
    // Verificar que se llame a populate con los parámetros correctos
    expect(mockPopulate).toHaveBeenCalledWith("user", [
      "-_id",
      "name",
      "lastName",
      "email",
    ]);
    expect(mockPopulate).toHaveBeenCalledWith({
      path: "products.product",
      select: ["-_id", "-stock", "-sale"],
      populate: {
        path: "category",
        select: ["-_id", "name", "gender", "sale"],
      },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockOrders);
  });

  it("Debería devolver un mensaje si no existen órdenes para ese usuario", async () => {
    const mockPopulate = jest.fn().mockReturnThis();

    mockPopulate.mockReturnValueOnce({
      populate: mockPopulate.mockReturnThis(),
      then: (cb) => cb(null), // Simula que no se encontraron órdenes
    });

    PurchaseOrder.find.mockReturnValue({
      populate: mockPopulate,
    });

    const req = {
      auth: {
        id: "user123",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await purchOrdController.default.getByuserId(req, res);

    expect(res.json).toHaveBeenCalledWith({
      message: "not exist order for this user",
    });
  });

  it("Debería retornar un error 500 si ocurre un error interno", async () => {
    // Simulamos un error lanzado por la BD
    PurchaseOrder.find.mockImplementation(() => {
      throw new Error("Error interno de BD");
    });

    const req = {
      auth: {
        id: "user123",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await purchOrdController.default.getByuserId(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Internal server Error" });
  });
});

describe("Create PurchaseOrder", () => {
  it("Debería crear una orden de compra y retornar status 201 con el mensaje de éxito", async () => {
    // Mocks
    const mockLocation = { _id: "location123", user: "user123" };
    Location.findOne = jest.fn().mockResolvedValue(mockLocation);

    PurchaseOrder.create.mockResolvedValue({
      _id: "order123",
      user: "user123",
      amount: 100000,
      products: [{ product: "prod123", quantity: 1 }],
      paymentMet: "Credit_Card",
      address: "location123",
    });

    // Datos de entrada
    const req = {
      auth: { id: "user123" },
      body: {
        amount: 100000,
        products: [{ product: "prod123", quantity: 1 }],
        paymentMet: "Credit_Card",
        address: "location123", // Este campo se ignora ya que se toma la location encontrada
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Llamada al controlador
    await purchOrdController.default.create(req, res);

    // Verificaciones
    expect(Location.findOne).toHaveBeenCalledWith({ user: "user123" });
    expect(PurchaseOrder.create).toHaveBeenCalledWith({
      amount: 100000,
      products: [{ product: "prod123", quantity: 1 }],
      user: "user123",
      paymentMet: "Credit_Card",
      address: "location123",
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith("Purchase Order create successfully");
  });

  it("Debería crear la orden aunque no exista ubicación, estableciendo address como undefined", async () => {
    // Si no existe la ubicación, location será null
    Location.findOne.mockResolvedValue(null);

    PurchaseOrder.create.mockResolvedValue({
      _id: "order124",
      user: "user123",
      amount: 50000,
      products: [{ product: "prod456", quantity: 2 }],
      paymentMet: "PayPal",
      address: undefined, // dirección no encontrada
    });

    const req = {
      auth: { id: "user123" },
      body: {
        amount: 50000,
        products: [{ product: "prod456", quantity: 2 }],
        paymentMet: "PayPal",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await purchOrdController.default.create(req, res);

    expect(Location.findOne).toHaveBeenCalledWith({ user: "user123" });
    expect(PurchaseOrder.create).toHaveBeenCalledWith({
      amount: 50000,
      products: [{ product: "prod456", quantity: 2 }],
      user: "user123",
      paymentMet: "PayPal",
      address: undefined,
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith("Purchase Order create successfully");
  });

  it("Debería retornar un error 500 si ocurre un error interno", async () => {
    // Simulamos que Location.findOne lanza un error
    Location.findOne.mockRejectedValue(new Error("Error interno"));

    const req = {
      auth: { id: "user123" },
      body: {
        amount: 100000,
        products: [{ product: "prod123", quantity: 1 }],
        paymentMet: "Credit_Card",
        address: "location123",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await purchOrdController.default.create(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith("Internal server error");
  });
});

describe("Destroy PurchaseOrder", () => {
  it("Debería borrar lógicamente la orden si existe y retornar status 200", async () => {
    const mockOrder = {
      _id: "order123",
      deleteAt: null,
      save: jest.fn().mockResolvedValue(true),
    };

    PurchaseOrder.findById.mockResolvedValue(mockOrder);

    const req = {
      body: {
        id: "order123",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await purchOrdController.default.destroy(req, res);

    expect(PurchaseOrder.findById).toHaveBeenCalledWith("order123");
    expect(mockOrder.deleteAt).not.toBeNull(); // Se debería asignar una fecha
    expect(mockOrder.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Purchase Order delete successfully",
    });
  });

  it("Debería retornar un mensaje si no existe la orden", async () => {
    PurchaseOrder.findById.mockResolvedValue(null);

    const req = {
      body: {
        id: "orderNotExist",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await purchOrdController.default.destroy(req, res);

    expect(PurchaseOrder.findById).toHaveBeenCalledWith("orderNotExist");
    expect(res.json).toHaveBeenCalledWith({
      message: "Not exist Purchase order with this id",
    });
  });

  it("Debería retornar 500 si ocurre un error interno", async () => {
    PurchaseOrder.findById.mockRejectedValue(new Error("Error interno"));

    const req = {
      body: {
        id: "orderError",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await purchOrdController.default.destroy(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith("Internal server error");
  });
});
