import React from 'react';

const VehicleItem = ({ vehicle }) => {
  return (
    <div className="v-item__container">
      <div className="v-item__title">
        <h3>
          {vehicle.make} {vehicle.model}
        </h3>
      </div>

      <div className="v-item__engine-power">
        <h4>Engine Power</h4>
        <p>{vehicle.enginePowerPS} HP</p>
        <p>{vehicle.enginePowerKW} KW</p>
      </div>

      <div className="v-item__fuel">
        <h4>Fuel Type</h4>
        <p>{vehicle.fuelType}</p>
      </div>

      <div className="v-item__body">
        <h4>Vehicle Body Type</h4>
        <p>{vehicle.bodyType}</p>
      </div>

      <div className="v-item__engine-capacity">
        <h4>Engine Capacity</h4>
        <p>{vehicle.engineCapacity} cc</p>
      </div>
    </div>
  );
};

export default VehicleItem;
