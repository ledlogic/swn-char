import {
  flow,
  __,
  subtract,
  divide,
  floor,
  map,
  find,
  matches,
  add,
  get,
  includes,
  reject,
  concat,
} from 'lodash/fp';

export function modifier(__) {
	switch (true) {
		case __ == 3 : return -2;
		case __ >= 4 && __ <= 8 : return -1;
		case __ >= 8 && __ <= 13 : return 0;
		case __ >= 14 && __ <= 17 : return 1;
		case __ == 18 : return 2;
	}
	return NaN;
}

export const abilityScores = (
  abilityScores,
  bonusAbilities = []
) => {
  return map(
    ability => {
      var bonusAbility = find(
        matches({name: ability.name}),
        bonusAbilities);

      return bonusAbility ?
        {
          ...ability,
          value: ability.value + bonusAbility.value
        } :
        ability;
    },
    abilityScores)
};

export const randomizeDie = (die) => {
	return Math.round(Math.random() * (die - 1)) + 1;
}

export const randomizeScore = () => {
	var total = 0;
	var qty = 3;
	var die = 6;
	for (var i=0; i<qty; i++) {
		total += randomizeDie(die);
	}
	return total;
}

export const randomizeScores = (
  abilityScores
) => {
	var map = [];
    for (var i in abilityScores) {
    	var ability = abilityScores[i];
    	var value = randomizeScore();
    	map.push({
    		name: ability.name,
    		value: value
    	})
    }
    return map;
};

export const proficient = (
  {
    name,
  },
  proficiencies = []
) => {
  return !!find(matches({name}), proficiencies);
};

export const skills = (
  skillList,
  proficiencies = {}
) => {
  var ret = map(
    skill => {
      return {
        ...skill,
        value: skill.value,
        proficient: proficient(skill, proficiencies.choices)
      };
    },
    skillList);
  return ret;
};

const changeAbilityWithFn = (name, abilities, fn) => {
	var min = 3;
    var max = 18;
    return map(
    	ability => (
    		ability.name === name ? {
    			...ability,
    			value: constrain(fn(ability.value), min, max)
	        } : ability),
	    abilities)
};

export const constrain = (val, min, max) => {
	return Math.min(Math.max(val, min), max);
};

export const incAbility = (name, abilities) => {
  return changeAbilityWithFn(name, abilities, add(1));
};

export const decAbility = (name, abilities) => {
  return changeAbilityWithFn(name, abilities, subtract(__, 1));
};

export const changeSkillsChosen = (
  skillsChosen,
  skills,
  skillName
) => {
  const skill = find(matches({name: skillName}), skills);
  const names = map(get('name'), skillsChosen);

  return includes(skillName, names) ?
    reject(matches({name: skillName}), skillsChosen) :
    concat(skillsChosen, skill);
};

export const getModifier = (
  name,
  abilities
) => {
  const {value} = find(matches({name}), abilities);
  return modifier(value);
}