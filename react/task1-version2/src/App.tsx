import { useState } from "react";
import "./App.css";
import MyModal from "./components/my-modal";

function App() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open modal window</button>
      <p>
        Some text to check scrolling. Lorem ipsum dolor sit amet consectetur,
        adipisicing elit. Dolorum labore vitae voluptatum ipsam quod, odio
        molestias? Officiis incidunt maxime doloremque, iste est aperiam eveniet
        quas dicta pariatur corporis voluptate rerum.
      </p>
      <MyModal open={open} disableGlobalScroll={true}>
        <div>
          <h1>Some content</h1>
          <p>Some content detailes</p>
          <button onClick={() => setOpen(false)}>close</button>
        </div>
      </MyModal>
    </>
  );
}

export default App;
