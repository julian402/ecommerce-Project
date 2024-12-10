import { describe, expect, jest } from "@jest/globals";

beforeEach(() => {
  jest.clearAllMocks;
});

jest.unstable_mockModule("../models/User.js", () => ({
  default: {
    find: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
  },
}));

const userController = await import("../controllers/userController.js");
const User = (await import("../models/User.js")).default;

describe("Get Users", () => {
  it("Deberia devolver una lista con los usuarios y un estatus 200", async () => {
    //Arrange
    const mockUsers = [
      {
        _id: "Poiji154687",
        name: "Luis",
        lastName: "Lozano",
        email: "email@gmail.com",
        password: "1245684Plo*",
        avatar: "userGeneric.png",
        typeUser: "Customer",
        deleteAt: null,
      },
      {
        _id: "opkiojonji154687",
        name: "Camilo",
        lastName: "Vargas",
        email: "vargas@gmail.com",
        password: "1p785684Plo*",
        avatar: "userGeneric.png",
        typeUser: "Customer",
        deleteAt: null,
      },
    ];

    await User.find.mockResolvedValue(mockUsers);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.getAll(req, res);
    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith(mockUsers);
  });

  it("Deberia arrojar un error con estatus 500", async () => {
    User.find.mockRejectedValue(new Error("Error en la conexion a la base"));

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(500);

    expect(res.json).toHaveBeenCalledWith("Error en la conexion a la base");
  });
});

describe("Create User", () => {
  it("Deberia crear un usuario y devolver el estatus 201", async () => {
    const mockUserReq = {
      body: {
        name: "Luis",
        lastName: "Lozano",
        email: "email@gmail.com",
        password: "1245684Plo*",
        typeUser: "Customer",
      },
      file: {
        filename: "userGeneric.png",
      },
    };
    const mockRespose = { message: "user create successfully" };

    await User.create.mockResolvedValue(mockRespose);

    const req = mockUserReq;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "user create successfully",
    });
  });

  it("Deberia arrojar un error con estatus 500", async () => {
    const mockUserReq = {
      body: {
        name: "Luis",
        lastName: "Lozano",
        email: "email@gmail.com",
        password: "1245684Plo*",
        typeUser: "Customer",
      },
      file: {
        filename: "userGeneric.png",
      },
    };

    User.create.mockRejectedValue(new Error("Error en la conexion a la base"));

    const req = mockUserReq;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(500);

    expect(res.json).toHaveBeenCalledWith("Error en la conexion a la base");
  });
});

describe("update User", () => {
  it("Deberia modificar el usuarios y devolver un mensaje de logrado y estatus 200", async () => {
    const mockUserRes = {
      _id: "",
      name: "Luis",
      lastName: "Lozano",
      email: "email@gmail.com",
      password: "1245684Plo*",
      typeUser: "Customer",
      avatar: "",
    };

    const mockUserReq = {
      auth: { id: "" },
      body: {
        name: "Luis",
        lastName: "Ariza",
        email: "email@gmail.com",
        password: "1245684Plo*",
        typeUser: "Customer",
      },
      file: {
        filename: "userGeneric.png",
      },
    };

    const mockIsntancia = { save: jest.fn() };

    User.findById
      .mockResolvedValue(mockUserRes)
      .mockResolvedValueOnce(mockIsntancia);

    const req = mockUserReq;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.update(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({message:'User Update - ok'});
  });

  it("Deberia generar un status 404 al no encontrar el usuario", async () => {
    const mockUserReq = {
      auth: { id: "" },
      body: {
        name: "Luis",
        lastName: "Ariza",
        email: "email@gmail.com",
        password: "1245684Plo*",
        typeUser: "Customer",
      },
      file: {
        filename: "userGeneric.png",
      },
    };

    User.findById.mockResolvedValue(null);

    const req = mockUserReq;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.update(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
  });

  it("Deberia arrojar un error con estatus 500", async () => {
    const mockUserReq = {
      auth: { id: "oppjp" },
      body: {
        name: "Luis",
        lastName: "Lozano",
        email: "email@gmail.com",
        password: "1245684Plo*",
        typeUser: "Customer",
      },
      file: {
        filename: "userGeneric.png",
      },
    };

    User.findById.mockRejectedValue(
      new Error("Error en la conexion a la base")
    );

    const req = mockUserReq;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.update(req, res);

    expect(res.status).toHaveBeenCalledWith(500);

    expect(res.json).toHaveBeenCalledWith("Error en la conexion a la base");
  });
});

describe("Delete User", () => {
  it("Deberia eliminar el usuarior y devolver un mensaje de logrado y estatus 200", async () => {
    const mockUserRes = {
      _id: "",
      name: "Luis",
      lastName: "Lozano",
      email: "email@gmail.com",
      password: "1245684Plo*",
      typeUser: "Customer",
      avatar: "",
    };

    const mockIsntancia = { save: jest.fn() };

    const mockUserReq = {
      auth: { id: "" },
    };

    User.findById
      .mockResolvedValue(mockUserRes)
      .mockResolvedValueOnce(mockIsntancia);

    const req = mockUserReq;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.destroy(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "User deleted successfully",
    });
  });

  it('Deberia generar un estatus 404 al no encontrar el usuario a eliminar', async()=>{

    const mockUserReq = {
      auth: { id: "" },
    };

    User.findById
      .mockResolvedValue(null)

    const req = mockUserReq
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    await userController.destroy(req,res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "User not exist" })

  })

  it('Deberia arrojar un error de estatus 500, al intentar ejecutar el controlador', async()=>{
    const mockUserReq = {
      auth: { id: "" },
    };

    User.findById
      .mockRejectedValue(new Error ('Error al conectar a la Base de datos'))

    const req = mockUserReq
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    await userController.destroy(req,res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith('Error al conectar a la Base de datos')
  })
});
