import React from 'react';
import {map, includes, get} from 'lodash/fp';
import {Row, Col} from './Wrappers';
import './SkillList.css';

const disabled = (
  proficient,
  full,
  name,
  names
) => !proficient || (full && !includes(name, names));

const SkillList = ({
  skills,
  skillsChosen,
  full,
  onSkillChecked,
}) => {
  const names = map(get('name'), skillsChosen);
  return (
    <div>
      <h4>Skills</h4>
      <ul className='skill-list list-group'>
        {map(
          ({
            name,
            value,
            proficient
          }) => (
            <li key={name}
              className='list-group-item'>
              <Row>
                <Col sm='6'>{name}</Col>
                <Col sm='2'>
                <input type='checkbox'
                  checked={includes(name, names)}
                  onClick={() => onSkillChecked(name)}/>
                </Col>
                <Col sm='2'>
                {value !== -1 && 
                	<span>{value}</span>
                }                
                </Col>
              </Row>
            </li>
          ),
          skills
        )}
      </ul>
    </div>
  );
};

export default SkillList;