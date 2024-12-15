import { describe, expect, jest } from "@jest/globals";

// Limpiar los mocks antes de cada prueba
beforeEach(() => {
  jest.clearAllMocks();
});

// Simulamos los métodos de Mongoose
jest.unstable_mockModule("../models/Location.js", () => ({
  default: {
    find: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    populate: jest.fn(),
  },
}));

jest.mock("../models/User.js", () => ({
  default: {
    findById: jest.fn(),
  },
}));

// Importación de los controladores después de simular los modelos
const locationController = await import("../controllers/locationController.js");
const Location = (await import("../models/Location.js")).default;

describe("Get All Locations", () => {
  it("Debería devolver una lista de ubicaciones con un estatus 200", async () => {
    const mockLocations = [
      {
        _id: "1",
        city: "Ciudad 1",
        zipCode: "12345",
        address: "Calle 1",
        user: { name: "Luis", lastName: "Lozano", email: "email@gmail.com" },
      },
      {
        _id: "2",
        city: "Ciudad 2",
        zipCode: "67890",
        address: "Calle 2",
        user: { name: "Camilo", lastName: "Vargas", email: "vargas@gmail.com" },
      },
    ];

    // Simulamos la respuesta exitosa para .find
    const mockPopulate = jest.fn().mockResolvedValue(mockLocations);
    Location.find.mockReturnValue({ populate: mockPopulate });

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Llamamos al controlador
    await locationController.getAll(req, res);

    expect(Location.find).toHaveBeenCalledWith({ deleteAt: null });
    expect(mockPopulate).toHaveBeenCalledWith("user", [
      "-_id",
      "name",
      "lastName",
      "email",
    ]);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
        locations: [
          { _id: "1", address: "Calle 1", city: "Ciudad 1", user: { email: "email@gmail.com", lastName: "Lozano", name: "Luis" }, zipCode: "12345" },
          { _id: "2", address: "Calle 2", city: "Ciudad 2", user: { email: "vargas@gmail.com", lastName: "Vargas", name: "Camilo" }, zipCode: "67890" }
        ]
      });
  });

  it("Debería arrojar un error con estatus 500 si ocurre un fallo", async () => {
    Location.find.mockReturnValue({
      populate: jest
        .fn()
        .mockRejectedValue(new Error("Error en la conexión a la base")),
    });
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Llamamos al controlador
    await locationController.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith("Error en la conexión a la base");
  });
});

describe("Get Location By ID", () => {
    it("Debería devolver la ubicación con estatus 200", async () => {
      const mockLocation = {
        _id: "1",
        city: "Ciudad 1",
        zipCode: "12345",
        address: "Calle 1",
        user: { name: "Luis", lastName: "Lozano", email: "email@gmail.com" },
      };
  
      const mockPopulate = jest.fn().mockResolvedValue(mockLocation);
      Location.findById.mockReturnValue({ populate: mockPopulate });
     
  
      const req = { params: { id: "location123" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await locationController.getLocationById(req, res);
  
     
    expect(Location.findById).toHaveBeenCalledWith("location123");
    expect(mockPopulate).toHaveBeenCalledWith("user");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockLocation);
  });
  
    it("Debería devolver un error con estatus 404 si la ubicación no es encontrada", async () => {
        const mockLocation = { deletedAt: null };
        const mockPopulate = jest.fn().mockResolvedValue(mockLocation);
        Location.findById.mockReturnValue({ populate: mockPopulate });
                
      const req = { params: { id: "location123" }};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await locationController.getLocationById(req, res);

    expect(Location.findById).toHaveBeenCalledWith("location123");
    expect(mockPopulate).toHaveBeenCalledWith("user");
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith("Location no encontrado");
  });
  it("Debería arrojar un error con estatus 500 en caso de un fallo en la base de datos", async () => {
    const mockPopulate = jest
      .fn()
      .mockRejectedValue(new Error("Error en la conexión a la base"));
    Location.findById.mockReturnValue({ populate: mockPopulate });

    const req = { params: { id: "location123" }};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await locationController.getLocationById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith("Error en la conexión a la base");
  });

});
  


describe("Create Location", () => {
  it("Debería crear una ubicación y devolver el estatus 201", async () => {
    const mockLocationReq = {
      body: {
        city: "Ciudad 1",
        zipCode: "12345",
        address: "Calle 1",
      },
      auth: { id: "user-id" },
    };

    // Simula la creación exitosa de una ubicación
    Location.create.mockResolvedValue({
      _id: "1",
      city: "Ciudad 1",
      zipCode: "12345",
      address: "Calle 1",
    });

    const req = mockLocationReq;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await locationController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith("Location create successfully");
  });

  it("Debería arrojar un error con estatus 500 si ocurre un fallo", async () => {
    const mockLocationReq = {
      body: {
        city: "Ciudad 1",
        zipCode: "12345",
        address: "Calle 1",
      },
      auth: { id: "user-id" },
    };

    // Simula un error en la creación de la ubicación
    Location.create.mockRejectedValue(new Error("Error en la conexión a la base"));

    const req = mockLocationReq;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await locationController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith("Error en la conexión a la base");
  });
});

describe("Update Location", () => {
  it("Debería actualizar la ubicación y devolver el estatus 200", async () => {
    const mockLocationReq = {
      body: {
        id: "1",
        city: "Ciudad Actualizada",
        zipCode: "67890",
        address: "Calle Actualizada",
      },
    };

    const mockLocationToUpdate = {
      _id: "1",
      city: "Ciudad 1",
      zipCode: "12345",
      address: "Calle 1",
      save: jest.fn(),
    };

    // Simula que se encontró la ubicación a actualizar
    Location.findById.mockResolvedValue(mockLocationToUpdate);

    const req = mockLocationReq;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await locationController.update(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockLocationToUpdate);
  });

  it("Debería devolver un error con estatus 404 si no se encuentra la ubicación", async () => {
    const mockLocationReq = {
      body: {
        id: "1",
        city: "Ciudad Actualizada",
        zipCode: "67890",
        address: "Calle Actualizada",
      },
    };

    // Simula que no se encuentra la ubicación a actualizar
    Location.findById.mockResolvedValue(null);

    const req = mockLocationReq;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await locationController.update(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "location not found" });
  });

  it("Debería arrojar un error con estatus 500 si ocurre un fallo", async () => {
    const mockLocationReq = {
      body: {
        id: "1",
        city: "Ciudad Actualizada",
        zipCode: "67890",
        address: "Calle Actualizada",
      },
    };

    // Simula un error interno
    Location.findById.mockRejectedValue(new Error("Internal server error"));

    const req = mockLocationReq;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await locationController.update(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith("Internal server error");
  });
});

describe("Delete Location", () => {
    it("Debería eliminar la ubicación y devolver el estatus 200", async () => {
      const mockLocationToDelete = {
        _id: "1",
        deleteAt: null,
        save: jest.fn().mockResolvedValue(true), // Simulamos que la ubicación se guarda correctamente
      };
  
      // Simula que se encontró la ubicación a eliminar
      Location.findById.mockResolvedValue(mockLocationToDelete);
  
      const req = { body: { id: "1" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await locationController.destroy(req, res);
  
      expect(Location.findById).toHaveBeenCalledWith("1"); // Asegúrate de que se busque por ID
      expect(mockLocationToDelete.save).toHaveBeenCalled(); // Verificamos que se haya llamado a `save`
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Location delete successfully" });
    });
  
    it("Debería devolver un error con estatus 404 si no se encuentra la ubicación", async () => {
      Location.findById.mockResolvedValue(null); // Simula que no se encuentra la ubicación
  
      const req = { body: { id: "1" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await locationController.destroy(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Location not found" });
    });
  
    it("Debería arrojar un error con estatus 500 si ocurre un fallo", async () => {
      Location.findById.mockRejectedValue(new Error("Error al buscar ubicación")); // Simulamos un error en la búsqueda
  
      const req = { body: { id: "1" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await locationController.destroy(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith("Error al buscar ubicación");
    });
  });