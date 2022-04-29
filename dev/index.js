/* eslint-disable no-console */

import React, { useState, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import InputMask from "../src";

const Input = () => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  }

  return <InputMask mask="99/99/9999" value={value} onChange={onChange} />;
}

const root = createRoot(document.getElementById("root"));

root.render(<StrictMode><Input /></StrictMode>);
