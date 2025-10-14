import React from "react";

const inputsInfo = [
  "Input a link to any website (omit https://).",
  "Image format: jpeg, png, or webp.",
  "true or false — remove ads.",
  "true or false — remove cookie banners.",
  "Width in pixels.",
  "Height in pixels.",
];

const APIForm = ({ inputs, handleChange, onSubmit }) => {
  return (
    <div>
      <h2>Select Your Image Attributes:</h2>
      <form className="form-container">
        {inputs &&
          Object.entries(inputs).map(([category, value], index) => (
            <li className="form" key={index}>
              <h3>{category}</h3>
              <input
                type="text"
                name={category}
                value={value}
                placeholder="Input this attribute..."
                onChange={handleChange}
                className="textbox"
              />
              <p>{inputsInfo[index]}</p>
            </li>
          ))}
      </form>
      <button type="button" className="button" onClick={onSubmit}>
        Take that Pic! 🎞
      </button>
    </div>
  );
};

export default APIForm;
