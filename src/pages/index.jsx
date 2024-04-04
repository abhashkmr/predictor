// pages/index.js
import { useState } from "react";
import "./style.css";

export default function Home() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || name === "") {
      return;
    }

    try {
      const [ageResponse, genderResponse, countryResponse] = await Promise.all([
        fetch(`https://api.agify.io?name=${name}`),
        fetch(`https://api.genderize.io?name=${name}`),
        fetch(`https://api.nationalize.io?name=${name}`),
      ]);

      const ageData = await ageResponse.json();
      const genderData = await genderResponse.json();
      const countryData = await countryResponse.json();

      setGender(genderData?.gender);
      setAge(ageData?.age);
      setCountry(countryData?.country?.[0]?.country_id ?? "Unknown");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="form-container">
      <div>
        <h1>Guess Age, Gender, and Country</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button type="submit">Guess</button>
          </div>
        </form>
      </div>
      <div className="prediction-container">
        <h5>The Predicted output is :</h5>
        {age !== null && (
          <div className="prediction">
            <label>Predicted age:</label>
            <span className="prediction-value">{age}</span>
          </div>
        )}
        {gender !== "" && (
          <div className="prediction">
            <label>Predicted gender:</label>
            <span className="prediction-value">{gender}</span>
          </div>
        )}
        {country !== "" && (
          <div className="prediction">
            <label>Predicted country code:</label>
            <span className="prediction-value">{country}</span>
          </div>
        )}
      </div>
    </div>
  );
}
