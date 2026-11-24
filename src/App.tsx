import { useState } from "react";
import "./App.css";
import Checkboxes from "./Checkboxes";
import { CheckboxesData } from "./data";

function App() {
  const [checked, setChecked] = useState({});

  return (
    <>
      <h2>Nested Checkboxes</h2>
      <Checkboxes
        data={CheckboxesData}
        checked={checked}
        setChecked={setChecked}
      />
    </>
  );
}

export default App;
