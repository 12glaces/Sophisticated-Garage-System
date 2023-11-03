import React, { useState, useEffect } from 'react';
import './App.css';

const carNames = [
  "Toyota Camry",
  "Honda Accord",
  "Ford Mustang",
  "Chevrolet Malibu",
  "Nissan Altima",
  "Subaru Impreza",
  "Volkswagen Passat",
  "Tesla Model 3",
  "Mercedes-Benz C-Class",
  "BMW 3 Series",
];

function CarAgent({ car, onRemove }) {
  const url = `https://picsum.photos/500/300?random=${Math.random()}`;
  return (
    <div className="CarAgent">
      <img src={url} alt="Car" className="CarImage" />
      <p>{car.model}</p>
      <button onClick={() => onRemove(car)}>Remove Car</button>
    </div>
  );
}

function FlashingLight() {
  const hasProblem = Math.random() < 0.5;

  const lightClass = `FlashingLight ${hasProblem ? 'Red' : 'Green'}`;

  return <div className={lightClass}></div>;
}

function Garage({ garageIndex, onAddCar, cars, onRemoveCar }) {
  return (
    <div className="Garage">
      <h2>Garage {garageIndex + 1}</h2>
      <button onClick={() => onAddCar(garageIndex)} className="GarageButton">
        Add Car
      </button>
      <FlashingLight/>
      <div className="CarAgents">
        {cars.map((car, index) => (
          <CarAgent key={index} car={car} onRemove={() => onRemoveCar(garageIndex, car)} />
        ))}
      </div>
    </div>
  );
}

function App() {
  const [garages, setGarages] = useState([[]]);

  useEffect(() => {
    if (garages.every(garage => garage.length === 5)) {
      addNewGarage();
    }
  }, [garages]);

  const addNewGarage = () => {
    setGarages([...garages, []]);
  }

  const addCarToGarage = (garageIndex) => {
    if (garages[garageIndex].length < 5) {
      const updatedGarages = [...garages];
      const randomCarName = carNames[Math.floor(Math.random() * carNames.length)];
      updatedGarages[garageIndex] = [...updatedGarages[garageIndex], { model: randomCarName }];
      setGarages(updatedGarages);
    }
  }

  const removeCarFromGarage = (garageIndex, carToRemove) => {
    const updatedGarages = [...garages];
    updatedGarages[garageIndex] = updatedGarages[garageIndex].filter((car) => car !== carToRemove);
    setGarages(updatedGarages);
  }

  return (
    <div className="App">
      <h1>Sophisticated Garage System</h1>
      <div className="Garages">
        {garages.map((garage, index) => (
          <div key={index}>
            <Garage
              garageIndex={index}
              cars={garage}
              onAddCar={() => addCarToGarage(index)}
              onRemoveCar={(car) => removeCarFromGarage(index, car)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;