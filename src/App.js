import React, {
  Component
}
from 'react';

import {Row, Col, ContainerFluid} from './Wrappers';

import AbilityScores from './AbilityScores';

import {
  getInitialState
}
from './data';

import {
  map,
  get,
  find,
  matches,
}
from 'lodash/fp';

import {
  abilityScores,
  skills,
  incAbility,
  decAbility,
  changeSkillsChosen,
  savingThrows,
  calcAC,
  getModifier,
  randomizeScores
}
from './calculations';

import './App.css';

class App extends Component {
	constructor() {
	    super();
	    this.state = {
	      ...getInitialState(),
	   	race: {
          name: ''
        },
	    name: '',
	      playerName: ''
	    };
	  }
  name = map(get('name'))
  get abilityScores() {
    return abilityScores(
      this.state.abilities,
      this.state.race.abilities);
  }
  handleAddAbilityScore = (name) => {
    this.setState({
      abilities: incAbility(name, this.state.abilities)
    });
  }
  handleRemoveAbilityScore = (name) => {
    this.setState({
      abilities: decAbility(name, this.state.abilities)
    });
  }
  handleRandomizeScores = () => {
	this.setState({ 
		abilities: randomizeScores(this.state.abilities)
	});
  }
  render() {
    return (
      <div className="App">
        <ContainerFluid>
            <Row>
	          <Col sm='12'>
	          </Col>
	        </Row>
            <span className='space-16'></span>
        	<Row>
        		<Col sm='4'>
        		<AbilityScores
        		    abilityScores={this.abilityScores}
        			onAddAbilityScore={this.handleAddAbilityScore}
        			onRemoveAbilityScore={this.handleRemoveAbilityScore}
        		    onRandomizeScores={this.handleRandomizeScores}
        		/>
        		</Col>
        		<Col sm='4'>
        		</Col>
        		<Col sm='4'>
        		</Col>
        		<Col sm='4'>
        		</Col>
        	</Row>
        </ContainerFluid>
      </div>
    );
  }
}

export default App;
