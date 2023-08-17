import React from "react";
import { render } from "@testing-library/react";
import ProductsTableItem from "./ProductsTableItem";

test('renders the word "ID"', () => {
  const { getByText } = render(<ProductsTableItem />);
  const idHeader = getByText('ID');
  expect(idHeader).toBeInTheDocument();
});