import React, { Component } from 'react';

import VehiclesList from './VehiclesList';
import VehiclesSelector from './VehiclesSelector';

const GET_MAKES_API = 'http://localhost:8080/api/makes';
const GET_MODELS_API = 'http://localhost:8080/api/models';
const GET_VEHICLES_API = 'http://localhost:8080/api/vehicles';
const API_CALL_TRIES = 5;

export class Vehicles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      message: true,
      makes: ['-'],
      models: ['-'],
      vehicles: [],
      userMake: undefined,
      userModel: undefined
    };
  }

  componentDidMount() {
    this.tryToFetchMakes(API_CALL_TRIES);
  }

  tryToFetchMakes = async numberOfTries => {
    try {
      return await fetch(GET_MAKES_API)
        .then(res => res.json())
        .then(result => {
          this.setState({
            makes: ['-', ...result]
          });
        });
    } catch (err) {
      console.log(numberOfTries);
      if (numberOfTries === 1) throw err;
      return await this.tryToFetchMakes(numberOfTries - 1);
    }
  };

  tryToFetchModels = async numberOfTries => {
    try {
      return await fetch(GET_MODELS_API + `?make=${this.state.userMake}`)
        .then(res => res.json())
        .then(result => {
          this.setState({
            models: ['-', ...result]
          });
        });
    } catch (err) {
      console.log(numberOfTries);
      if (numberOfTries === 1) throw err;
      return await this.tryToFetchModels(numberOfTries - 1);
    }
  };

  tryToFetchVehicles = async numberOfTries => {
    try {
      return await fetch(
        GET_VEHICLES_API +
          `?make=${this.state.userMake}&model=${this.state.userModel}`
      )
        .then(res => res.json())
        .then(result => {
          this.setState({
            isLoaded: true,
            vehicles: result
          });
        });
    } catch (err) {
      console.log(numberOfTries);
      if (numberOfTries === 1) throw err;
      return await this.tryToFetchVehicles(numberOfTries - 1);
    }
  };

  selectVehicleMake = e => {
    const userMake = e.target.value;
    this.setState(
      {
        userMake,
        userModel: undefined,
        vehicles: [],
        message: false
      },
      () => {
        this.tryToFetchModels(API_CALL_TRIES);
      }
    );
  };

  selectVehicleModel = e => {
    const userModel = e.target.value;
    this.setState(
      {
        userModel
      },
      () => {
        this.tryToFetchVehicles(API_CALL_TRIES);
      }
    );
  };

  render() {
    return (
      <div>
        <VehiclesSelector
          makes={this.state.makes}
          models={this.state.models}
          selectVehicleMake={this.selectVehicleMake}
          selectVehicleModel={this.selectVehicleModel}
        />
        <VehiclesList
          vehicles={this.state.vehicles}
          message={this.state.message}
        />
      </div>
    );
  }
}

export default Vehicles;
