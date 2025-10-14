import { useState } from "react";
import APIForm from "./components/APIForm";
import Gallery from "./components/Gallery";
import "./App.css";

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [inputs, setInputs] = useState({
    url: "",
    format: "",
    no_ads: "",
    no_cookie_banners: "",
    width: "",
    height: "",
  });

  const [currentImage, setCurrentImage] = useState("");
  const [prevImages, setPrevImages] = useState([]);

  // --- Helper: Reset form after API call
  const reset = () => {
    setInputs({
      url: "",
      format: "",
      no_ads: "",
      no_cookie_banners: "",
      width: "",
      height: "",
    });
  };

  // --- API Call function
  const callAPI = async (query) => {
    const response = await fetch(query);
    const json = await response.json();

    if (!json.url) {
      alert("Error: Screenshot could not be taken. Check your URL.");
    } else {
      setCurrentImage(json.url);
      setPrevImages((images) => [...images, json.url]);
      reset();
    }
  };

  // --- Build query
  const makeQuery = () => {
    const wait_until = "network_idle";
    const response_type = "json";
    const fail_on_status = "400%2C404%2C500-511";
    const url_starter = "https://";
    const fullURL = url_starter + inputs.url;

    const query = `https://api.apiflash.com/v1/urltoimage?access_key=${ACCESS_KEY}&url=${fullURL}&format=${inputs.format}&width=${inputs.width}&height=${inputs.height}&no_cookie_banners=${inputs.no_cookie_banners}&no_ads=${inputs.no_ads}&wait_until=${wait_until}&response_type=${response_type}&fail_on_status=${fail_on_status}`;
    callAPI(query).catch(console.error);
  };

  // --- Submit handler
  const submitForm = () => {
    let defaultValues = {
      format: "jpeg",
      no_ads: "true",
      no_cookie_banners: "true",
      width: "1920",
      height: "1080",
    };

    if (inputs.url === "") {
      alert("Please enter a valid URL!");
      return;
    } else {
      const updatedInputs = { ...inputs };
      for (const [key, value] of Object.entries(inputs)) {
        if (value === "") {
          updatedInputs[key] = defaultValues[key];
        }
      }
      setInputs(updatedInputs);
      makeQuery();
    }
  };

  return (
    <div className="whole-page">
      <h1>Build Your Own Screenshot! 📸</h1>

      <APIForm
        inputs={inputs}
        handleChange={(e) =>
          setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value.trim(),
          }))
        }
        onSubmit={submitForm}
      />

      <br />

      {currentImage ? (
        <img className="screenshot" src={currentImage} alt="Screenshot returned" />
      ) : (
        <div></div>
      )}

      <div className="container">
        <h3>Current Query Status:</h3>
        <p>
          https://api.apiflash.com/v1/urltoimage?access_key=ACCESS_KEY
          <br />
          &url={inputs.url}
          <br />
          &format={inputs.format}
          <br />
          &width={inputs.width}
          <br />
          &height={inputs.height}
          <br />
          &no_cookie_banners={inputs.no_cookie_banners}
          <br />
          &no_ads={inputs.no_ads}
        </p>
      </div>

      <div className="container">
        <Gallery images={prevImages} />
      </div>
    </div>
  );
}

export default App;
