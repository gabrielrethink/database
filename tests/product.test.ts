import { describe, expect, jest } from "@jest/globals";
import { productParams } from "./mocks";

import productService from "../src/services/productService";
import productRepositories from "../src/repositories/Repositories";

describe("Product tests", () => {
  const idCategory = () =>
    jest
      .spyOn(productRepositories, "verifyCategory")
      .mockResolvedValueOnce([{ id: 2 }]);
  it("Create a Product ", async () => {
    idCategory();
    jest.spyOn(productRepositories, "insertProduct").mockResolvedValueOnce([1]);

    const result = await productService.createProduct(productParams);

    expect(result).toMatchObject({ ...productParams, id: 1 });
  });
  it("Category does not exist", async () => {
    try {
      jest
        .spyOn(productRepositories, "verifyCategory")
        .mockResolvedValueOnce([]);

      await productService.createProduct(productParams);
    } catch (error: any) {
      expect(error.message).toBe("Categoria não existe");
      expect(error.status).toBe(400);
    }

    // expect(result).toMatchObject({ ...params, id: 1 });
  });
});
