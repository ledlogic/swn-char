import React, {
  Component
}
from 'react';
import {Row, Col, ContainerFluid} from './Wrappers';
import AbilityScores from './AbilityScores';
import SkillList from './SkillList';
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
  randomizeScores,
  baseSkillLevel
}
from './calculations';
import './App.css';

class App extends Component {
	constructor() {
	    super();
	    this.state = {
	      ...getInitialState(),
        skillsChosen: [],
	    name: '',
	    playerName: ''
	    };
	  }
	
  name = map(get('name'))
  get abilityScores() {
    return abilityScores(this.state.abilities);
  }
  get skills() {
    return skills(this.state.skills, {}.skills);
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
  handleAddSkill = (skillName) => {
	    const {skills, skillsChosen, classChosen} = this.state;
	    const newSkillsChosen = changeSkillsChosen(skillsChosen, skills, skillName);
	    this.setState({
	      skillsChosen: newSkillsChosen
	    });
	  }
  handleRemoveSkill = (skillName) => {
	    const {skills, skillsChosen, classChosen} = this.state;
	    const newSkillsChosen = changeSkillsChosen(skillsChosen, skills, skillName);

	    this.setState({
	      skillsChosen: newSkillsChosen
	    });
	  }
  handleSkillChecked = (skillName) => {
	    const {skills, skillsChosen, classChosen} = this.state;
	    const newSkillsChosen = changeSkillsChosen(skillsChosen, skills, skillName);
	    const newSkills = baseSkillLevel(skillsChosen, skills, skillName);
	    this.setState({
	      skillsChosen: newSkillsChosen
	    });	    
	    this.setState({
	      skills: newSkills
	    });
	  }
  render() {
    return (
      <div className="App">
    	<header>
	  		<h1>SWN Character Sheet</h1>
	  	</header>
        <ContainerFluid>
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
                	<SkillList skills={this.skills}
	                	skillsChosen={this.state.skillsChosen}
	                	full={this.state.skillsFull}
                		onSkillChecked={this.handleSkillChecked}
                	/>
        		</Col>
        	</Row>
        </ContainerFluid>
      </div>
    );
  }
}

export default App;
