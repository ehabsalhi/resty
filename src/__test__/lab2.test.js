import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "../App";

it("get any text", () => {
  render(<App />);
  const linkElement = screen.getByText(/Loading/i);
  expect(linkElement).toBeInTheDocument();
});

it("test if text Request_Method", () => {
  render(<App />);
  const linkElement = screen.getByTestId("Request_Method");
  expect(linkElement.textContent).toEqual("Request Method: ");
});

it("test if text Request_Method", async () => {
  render(<App />);
  const submitBtn = screen.getByTestId("submitBtn").textContent;
  const getSpan = screen.getByTestId("get").textContent;
  const url = screen.getByTestId("url").textContent;

  expect(submitBtn).toEqual("GO!");
  expect(getSpan).toEqual("GET");
  expect(url).toEqual("URL: ");


});
