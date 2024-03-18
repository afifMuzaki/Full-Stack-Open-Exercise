const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "Afif Muzaki",
        username: "const_muz",
        password: "password",
      }
    });

    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    await loginWith(page, "const_muz", "password");
    await expect(page.getByText("Afif Muzaki logged in")).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "const_muz", "password");
      await expect(page.getByText("Afif Muzaki logged in")).toBeVisible();
    });
    
    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "const_muz", "pass");
      const divErr = await page.locator(".error");
      await expect(divErr).toContainText("wrong username or password");
      await expect(page.getByText("Afif Muzaki logged in")).not.toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "const_muz", "password");
    });
  
    test("a new blog can be created", async ({ page }) => {
      await createBlog(page, "bloglist e2e testing", "Afif Muzaki", "http://example.com");
      await expect(page.getByText("bloglist e2e testing Afif Muzaki")).toBeVisible();
    });
    
    test("a blog can be updated", async ({ page }) => {
      await createBlog(page, "bloglist e2e testing new", "Afif Muzaki", "http://example.com");
      await page.getByRole("button", { name: "view" }).first().click();
      const likes = await page.getByTestId("likes").textContent();

      await page.getByRole("button", { name: "like" }).click();
      await expect(page.getByTestId("likes")).toContainText(`${(parseInt(likes) + 1)}`);
    });
  });
});