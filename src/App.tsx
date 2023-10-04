import React from 'react';
import "react-toastify/dist/ReactToastify.css";
import RegistrationForm from "./components/RegistrationForm";
import {
    BrowserRouter,
    Route, Routes
} from 'react-router-dom';
import Todo from "./components/Todo/Todo";
import UploadAndCropImage from "./components/UploadAndCropImage/UploadAndCropImage";


function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<RegistrationForm />} />
              <Route path="/todo" element={<Todo />} />
              <Route path="/picture" element={<UploadAndCropImage />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
