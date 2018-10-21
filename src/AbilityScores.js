import React from 'react';
import AbilityScore from './AbilityScore';
import {map} from 'lodash/fp';
import './AbilityScores.css';
import {modifier} from './calculations';

const AbilityScores = ({
  onAddAbilityScore,
  onRemoveAbilityScore,
  onRandomizeScores,
  abilityScores
}) => (
  <div className='col-sm-12 ability-scores'>
    <span class="clearfix">
    	<h4>Attributes</h4>
    	<span class="swn-actions">
    		<button onClick={onRandomizeScores}>Randomize</button>
    	</span>
    </span>
    <ul className='list-group'>
      <li className='list-group-item'>
      <div className='ability-score row legend'>
	      <label className='col-sm-4'>Name</label>
	      <span className='col-sm-2'>Score</span>
	      <span className='col-sm-2'>Modifier</span>
	    </div>
      </li>
      {map(
        ({name, value}) => (
          <li key={name} className='list-group-item'>
            <AbilityScore
              name={name}
              value={value}
              modifier={modifier(value)}
              onPlusClick={() => onAddAbilityScore(name, 1)}
              onMinusClick={() => onRemoveAbilityScore(name, 1)}>
            </AbilityScore>
          </li>
        ),
        abilityScores
      )}
    </ul>
  </div>
);

export default AbilityScores;