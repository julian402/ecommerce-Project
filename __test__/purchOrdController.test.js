import { describe, expect, jest } from "@jest/globals";

beforeEach(() => {
  jest.clearAllMocks;
});

jest.unstable_mockModule("../models/PurchaseOrder.js", () => ({
  default: {
    find: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    populate: jest.fn(),
  },
}));

const purchaseOrderController = await import(
  "../controllers/purchOrdController.js"
);
const PurchaseOrder = (await import("../models/PurchaseOrder.js")).default;
