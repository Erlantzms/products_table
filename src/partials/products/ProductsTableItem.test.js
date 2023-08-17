import React from "react";
import { render } from "@testing-library/react";
import ProductsTableItem from "./ProductsTableItem";
import '@testing-library/jest-dom'

let mockProduct = {
  "id": "1",
  "title": "Product 1",
  "price": 100.00,
  "tax": "es_general_21",
  "stock": 50
}

test('renders the product parameters', () => {

  const {getByText} = render(<ProductsTableItem
    key={mockProduct.id}
    id={mockProduct.id}
    title={mockProduct.title}
    price={mockProduct.price}
    stock={mockProduct.stock}
    tax={mockProduct.tax}/>
  );

  expect(getByText('1')).toBeInTheDocument();
  expect(getByText('Product 1')).toBeInTheDocument();
  expect(getByText(100.00)).toBeInTheDocument();
  expect(getByText(50)).toBeInTheDocument();
});

test('renders the product tax in the correct format', () => {
  const {getByText} = render(<ProductsTableItem
    key={mockProduct.id}
    id={mockProduct.id}
    title={mockProduct.title}
    price={mockProduct.price}
    stock={mockProduct.stock}
    tax={mockProduct.tax}/>
  );

  expect(getByText('21%')).toBeInTheDocument();
})