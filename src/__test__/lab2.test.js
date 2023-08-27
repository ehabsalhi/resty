import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import App from "../App";


const server = setupServer(
  rest.get('hello', (req, res, ctx) => {
    return res(ctx.json({ 'name' : 'ehab'}))
  }),
  rest.post('hello', (req, res, ctx) => {
    return res(ctx.json({ 'name' : 'LTUC'}))
  }),
  rest.put('hello', (req, res, ctx) => {
    return res(ctx.json({ 'age' : '23'}))
  }),
  rest.delete('hello/1', (req, res, ctx) => {
    return res(ctx.json({ 'message' : 'deleted'}))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())




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
  const submitBtn = screen.getByTestId("submitBtn");
  const getSpan = screen.getByTestId("get").textContent;
  const url = screen.getByTestId("url").textContent;

  fireEvent.submit(submitBtn)
 

  expect(submitBtn.textContent).toEqual("GO!");
  expect(getSpan).toEqual("get");
  expect(url).toEqual("URL: ");
});



 
test('fetches and displays data from GET request', async () => {
  render(<App />);
  
  fireEvent.click(screen.getByTestId('get'));
  fireEvent.change(screen.getByLabelText('URL:'), { target: { value: 'hello' } });

  fireEvent.click(screen.getByTestId('submitBtn'));

  await waitFor(() => screen.getByTestId('response'));

  const responseData = screen.getByTestId('response');
  expect((responseData.textContent).includes('ehab')).toBe(true);
});

test('fetches and displays data from POST request', async () => {
  render(<App />);
  
  fireEvent.click(screen.getByTestId('post'));
  fireEvent.change(screen.getByLabelText('URL:'), { target: { value: 'hello' } });


  fireEvent.click(screen.getByTestId('submitBtn'));

  await waitFor(() => screen.getByTestId('response'));

  const responseData = screen.getByTestId('response');
  expect((responseData.textContent).includes('LTUC')).toBe(true);
});


test('fetches and displays data from PUT request', async () => {
  render(<App />);
  
  fireEvent.click(screen.getByTestId('put'));
  fireEvent.change(screen.getByLabelText('URL:'), { target: { value: 'hello' } });


  fireEvent.click(screen.getByTestId('submitBtn'));

  await waitFor(() => screen.getByTestId('response'));

  const responseData = screen.getByTestId('response');
  expect((responseData.textContent).includes('age')).toBe(true);
});

test('fetches and displays data from DELETE request', async () => {
  render(<App />);
  
  fireEvent.click(screen.getByTestId('delete'));
  fireEvent.change(screen.getByLabelText('URL:'), { target: { value: 'hello/1' } });


  fireEvent.click(screen.getByTestId('submitBtn'));

  await waitFor(() => screen.getByTestId('response'));

  const responseData = screen.getByTestId('response');
  expect((responseData.textContent).includes('deleted')).toBe(true);
});