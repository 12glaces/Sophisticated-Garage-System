import React, { useState } from 'react';
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

function Garage({ onAddCar, cars, onRemoveCar }) {
  return (
    <div className="Garage">
      <h2>Garage</h2>
      <button onClick={onAddCar} className="GarageButton">Add Car</button>
      <div className="CarAgents">
        {cars.map((car, index) => (
          <CarAgent key={index} car={car} onRemove={() => onRemoveCar(car)} />
        ))}
      </div>
    </div>
  );
}

function App() {
  const [garages, setGarages] = useState([[]]);
  const [showBuyGarageAlert, setShowBuyGarageAlert] = useState(false);

  const addCarToGarage = (garageIndex) => {
    if (garages[garageIndex].length < 5) {
      const updatedGarages = [...garages];
      const randomCarName = carNames[Math.floor(Math.random() * carNames.length)];
      updatedGarages[garageIndex] = [...updatedGarages[garageIndex], { model: randomCarName }];
      setGarages(updatedGarages);
    } else if (garages.every(garage => garage.length === 5)) {
      setShowBuyGarageAlert(true);
    }
  }

  const removeCarFromGarage = (garageIndex, carToRemove) => {
    const updatedGarages = [...garages];
    updatedGarages[garageIndex] = updatedGarages[garageIndex].filter((car) => car !== carToRemove);
    setGarages(updatedGarages);
  }

  const buyNewGarage = () => {
    setGarages([...garages, []]);
    setShowBuyGarageAlert(false);
  }

  return (
    <div className="App">
      <h1>Sophisticated Garage System</h1>
      <div className="Garages">
        {garages.map((garage, index) => (
          <div key={index}>
            <Garage
              cars={garage}
              onAddCar={() => addCarToGarage(index)}
              onRemoveCar={(car) => removeCarFromGarage(index, car)}
            />
          </div>
        ))}
      </div>
      {showBuyGarageAlert && (
        <div className="BuyGarageAlert">
          <p>Your garages are full. Do you want to buy a new garage?</p>
          <button onClick={buyNewGarage}>Yes</button>
          <button onClick={() => setShowBuyGarageAlert(false)}>No</button>
        </div>
      )}
    </div>
  );
}

export default App;