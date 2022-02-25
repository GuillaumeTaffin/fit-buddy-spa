import {fireEvent, render} from "@testing-library/svelte";
import App from "../src/App.svelte";

test("should render", async () => {
    const results = render(App, {props: {name: "world"}});

    expect(() => results.getByText("Hello world!")).toThrow();

    await fireEvent.click(results.getByText("ADD"));

    expect(results.getByText("Hello world!")).toBeInTheDocument();

});