import * as abilities from './abilities';
import * as skills from './skills';
import {map, values} from 'lodash/fp';
import recursiveFreeze from '../recursive-freeze';

export const data = recursiveFreeze({
  abilities,
  skills
});

const initialState = recursiveFreeze({
  ...data,
  abilities: map(name => ({name, value: 10}), data.abilities),
  skills: map(skill => ({...skill, value: -1}), data.skills),
  baseAC: 10,
});

export const getInitialState = () => initialState;