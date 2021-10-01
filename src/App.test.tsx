import React from "react";
import { render, RenderResult } from "@testing-library/react";

import App from "./App";

describe("<App />", () => {
  let component: RenderResult;

  beforeEach(() => {
    component = render(<App />);
  });

  it("should render the component", () => {
    expect(component.asFragment()).toMatchSnapshot();
  });
});
