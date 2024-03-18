const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "Jhon Doe",
        username: "jhon123",
        password: "password",
      }
    });

    await request.post("/api/users", {
      data: {
        name: "Jane Doe",
        username: "jane123",
        password: "password",
      }
    });

    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    await loginWith(page, "jhon123", "password");
    await expect(page.getByText("Jhon Doe logged in")).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "jhon123", "password");
      await expect(page.getByText("Jhon Doe logged in")).toBeVisible();
    });
    
    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "jhon123", "pass");
      const divErr = await page.locator(".error");
      await expect(divErr).toContainText("wrong username or password");
      await expect(page.getByText("Jhon Doe logged in")).not.toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "jhon123", "password");
      await createBlog(page, "initial e2e testing blog", "Jhon Doe", "http://example.com");
    });
  
    test("a new blog can be created", async ({ page }) => {
      await createBlog(page, "new e2e testing blog", "Jhon Doe", "http://example.com");
      await expect(page.getByText("new e2e testing blog Jhon Doe")).toBeVisible();
    });
    
    test("a blog can be updated (clicking like button)", async ({ page }) => {
      await page.getByRole("button", { name: "view" }).first().click();
      const likes = await page.getByTestId("likes").textContent();
      
      await page.getByRole("button", { name: "like" }).click();
      await expect(page.getByTestId("likes")).toContainText(`${(parseInt(likes) + 1)}`);
    });
    
    test("a blog can be deleted", async ({ page }) => {
      await createBlog(page, "new e2e testing blog", "Jhon Doe", "http://example.com");
      await page.getByRole("button", { name: "view" }).first().click();
      await page.getByRole("button", { name: "remove" }).click();
      page.on("dialog", async dialog => {
        expect(dialog.message()).toContain("Remove blog");
        await dialog.accept();
      });

      await expect(page.getByText("initial e2e testing blog Jhon Doe")).not.toBeVisible();
    });

    test("a blog can only be deleted by the user who added it", async ({ page }) => {
      await page.getByRole("button", { name: "logout" }).click();
      await loginWith(page, "jane123", "password");
      await page.getByRole("button", { name: "view" }).first().click();
      await expect(page.getByRole("button", { name: "remove" })).not.toBeVisible();
    });
    
    test("bloglist sorted by most likes", async ({ page }) => {
      await createBlog(page, "new e2e testing blog", "Jhon Doe", "http://example.com");
      await page.getByRole("button", { name: "view" }).last().click();
      await page.getByRole("button", { name: "like" }).click();
      await page.getByRole("button", { name: "like" }).click();
      await expect(page.locator(".blogDetails").first()).toContainText("likes 2");
      await expect(page.locator(".blogDetails").last()).toContainText("likes 0");
    });
  });
});