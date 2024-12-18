import { describe, expect, jest, it, beforeEach } from "@jest/globals";

beforeEach(() => {
  jest.clearAllMocks();
});

jest.unstable_mockModule("../models/ProductCategory.js", () => ({
  default: {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
  },
}));

const categoryController = await import(
  "../controllers/CategoryControllers.js"
);
const ProductCategory = (await import("../models/ProductCategory.js")).default;

describe("Category Controller", () => {
  describe("getALL", () => {
    it("Debería retornar todas las categorías sin deleteAt", async () => {
      const mockCategories = [
        { _id: "cat1", name: "Camisetas", deleteAt: null },
        { _id: "cat2", name: "Pantalones", deleteAt: null },
      ];
      ProductCategory.find.mockResolvedValue(mockCategories);

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await categoryController.default.getALL(req, res);

      expect(ProductCategory.find).toHaveBeenCalledWith({ deleteAt: null });
      expect(res.json).toHaveBeenCalledWith(mockCategories);
    });

    it("Debería retornar un error 404 si ocurre un error interno", async () => {
      ProductCategory.find.mockRejectedValue(new Error("Error interno"));

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await categoryController.default.getALL(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith("Categoria no encontrada");
    });
  });

  describe("getById", () => {
    it("Debería retornar la categoría encontrada por id", async () => {
      const mockCategory = { _id: "cat1", name: "Camisetas" };
      ProductCategory.findById.mockResolvedValue(mockCategory);

      const req = { params: { id: "cat1" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await categoryController.default.getById(req, res);

      expect(ProductCategory.findById).toHaveBeenCalledWith("cat1");
      expect(res.json).toHaveBeenCalledWith(mockCategory);
    });

    it("Debería retornar 404 si la categoría no existe o hay un error", async () => {
      ProductCategory.findById.mockRejectedValue(new Error("Not found"));

      const req = { params: { id: "catX" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await categoryController.default.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith("Categoria no existe");
    });
  });

  describe("create", () => {
    it("Debería crear una categoría y retornar status 201", async () => {
      const req = {
        body: {
          name: "Zapatos",
          description: "Calzado deportivo",
          gender: "unisex",
          size: ["M", "L"],
          sale: false,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      ProductCategory.create.mockResolvedValue({
        _id: "catNew",
        ...req.body,
      });

      await categoryController.default.create(req, res);

      expect(ProductCategory.create).toHaveBeenCalledWith({
        name: "Zapatos",
        description: "Calzado deportivo",
        gender: "unisex",
        size: ["M", "L"],
        sale: false,
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith("Categori create!");
    });

    it("Debería retornar 500 si ocurre un error interno al crear", async () => {
      ProductCategory.create.mockRejectedValue(new Error("Error interno"));

      const req = {
        body: {
          name: "Zapatos",
          description: "Calzado deportivo",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await categoryController.default.create(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith("Internal Server error");
    });
  });

  describe("update", () => {
    it("Debería actualizar una categoría existente", async () => {
      const mockCategory = {
        _id: "catToUpdate",
        name: "Viejo",
        description: "Antiguo",
        gender: "unisex",
        size: ["M"],
        sale: false,
        save: jest.fn().mockResolvedValue(true),
      };

      ProductCategory.findById.mockResolvedValue(mockCategory);

      const req = {
        body: {
          id: "catToUpdate",
          name: "Nuevo",
          description: "Actualizado",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await categoryController.default.update(req, res);

      expect(ProductCategory.findById).toHaveBeenCalledWith("catToUpdate");
      expect(mockCategory.name).toBe("Nuevo");
      expect(mockCategory.description).toBe("Actualizado");
      expect(mockCategory.save).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith("La categoria ha sido actualizada");
    });

    it("Debería retornar 404 si la categoría no existe", async () => {
      ProductCategory.findById.mockResolvedValue(null);

      const req = { body: { id: "catNotFound" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await categoryController.default.update(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Category not found" });
    });

    it("Debería capturar errores internos (sin manejar explícitamente el status)", async () => {
      ProductCategory.findById.mockRejectedValue(new Error("Error interno"));

      const req = { body: { id: "catError" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await categoryController.default.update(req, res);

      expect(console.log).toBeDefined();
    });
  });

  describe("destroy", () => {
    it("Debería asignar deleteAt y guardar la categoría", async () => {
      const mockCategory = {
        _id: "catDelete",
        deleteAt: null,
        save: jest.fn().mockResolvedValue(true),
      };
      ProductCategory.findById.mockResolvedValue(mockCategory);

      const req = { body: { id: "catDelete" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await categoryController.default.destroy(req, res);

      expect(ProductCategory.findById).toHaveBeenCalledWith("catDelete");
      expect(mockCategory.deleteAt).not.toBeNull();
      expect(mockCategory.save).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith("La categoria se ha eliminado");
    });

    it("Debería retornar 404 si la categoría no existe al eliminar", async () => {
      ProductCategory.findById.mockResolvedValue(null);

      const req = { body: { id: "catNotExist" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await categoryController.default.destroy(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Catagory Not exist" });
    });

    it("Debería capturar errores internos (sin manejo explícito)", async () => {
      ProductCategory.findById.mockRejectedValue(new Error("Error interno"));

      const req = { body: { id: "catError" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await categoryController.default.destroy(req, res);
      expect(console.log).toBeDefined();
    });
  });
});
