import React from "react";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom'
import PaginationNumeric from "./PaginationNumeric";
import { MemoryRouter } from "react-router-dom"; 
import { fireEvent } from "@testing-library/dom";

test('render paginator buttons and are clickable ', () => {
  const pagination = {
    totalPages: 5,
    totalResults: 10
  };

  const {getByText} = render(
    <MemoryRouter>
      <PaginationNumeric pagination={pagination} />
    </MemoryRouter>
  );

  const page1Button = getByText("1");
  fireEvent.click(page1Button);
});