import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "../components/BlogForm";

describe("<BlogForm /> component test", () => {
	test("updates parent state and calls onSubmit", async () => {
		const createBlog = vi.fn();
		const user = userEvent.setup();

		render(<BlogForm handleCreate={createBlog} />);

		const blogTitle = screen.getByPlaceholderText("title");
		const blogAuthor = screen.getByPlaceholderText("author");
		const blogUrl = screen.getByPlaceholderText("url");

		await user.type(blogTitle, "React for Beginers");
		await user.type(blogAuthor, "Jhon Doe");
		await user.type(blogUrl, "https://example.com");
		await user.click(screen.getByText("create"));

		expect(createBlog.mock.calls).toHaveLength(1);
		expect(createBlog.mock.calls[0][0].title).toBe("React for Beginers");
		expect(createBlog.mock.calls[0][0].author).toBe("Jhon Doe");
		expect(createBlog.mock.calls[0][0].url).toBe("https://example.com");
	});
});