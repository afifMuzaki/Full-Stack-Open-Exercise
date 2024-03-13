import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";

describe("<Blog /> component test", () => {
	const blog = {
		title: "Learn Javascript Basic",
		author: "Jhon Doe",
		url: "https://example.com",
		likes: 3,
		user: {
			id: "fdfr2324882dfef",
		}
	};

	test("component only render title and author by default", () => {
		const { container } = render(<Blog blog={blog} />);

		const titleAuthor = screen.getByText("Learn javascript basic Jhon doe", { exact: false });
		const blogDetails = container.querySelector(".blogDetails");
		expect(titleAuthor).toBeDefined();
		expect(blogDetails).toHaveStyle("display: none");
	});

	test("component show details when 'view' button is clicked", async () => {
		const { container } = render(<Blog blog={blog} />);

		const user = userEvent.setup();
		await user.click(container.querySelector(".viewBtn"));

		const titleAuthorParent = screen
			.getByText("Learn javascript basic Jhon doe", { exact: false })
			.closest("div");
		const blogDetails = container.querySelector(".blogDetails");

		expect(titleAuthorParent).toHaveStyle("display: none");
		expect(blogDetails).toHaveStyle("display: block");
		expect(blogDetails).toHaveTextContent("example.com");
		expect(blogDetails).toHaveTextContent("3");
	});

	test("event handler for 'like' button is called twice if the button clicked twice too", async () => {
		const mockHandler = vi.fn();
		const { container } = render(<Blog blog={blog} handleUpdate={mockHandler} />);

		const user = userEvent.setup();
		await user.click(container.querySelector(".likeBtn"));
		await user.click(container.querySelector(".likeBtn"));
		expect(mockHandler.mock.calls).toHaveLength(2);
	});
});