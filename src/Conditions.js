import { useState, useEffect } from 'react';
import tagGenre from './img/conditions_tags/tag_genre.png';
import tagVaccine from './img/conditions_tags/tag_vaccine.png';
import tagColor from './img/conditions_tags/tag_color.png';
import tagRace from './img/conditions_tags/tag_race.png';
import tagDanger from './img/conditions_tags/tag_danger.png';
import functions from './functions';

function Conditions(props) {
  let [conditionArray, setConditionArray] = useState([]);

  const getTag = (attribute, condition) => {
    let classes='condition-tag';
    let tagImg = '';
    let backgroundColor = {};
    let imgInvert = '';
    let conditionText = '';

    switch (attribute) {
      case 'genre':
        tagImg = tagGenre;
        break;
      case 'vaccinated':
        tagImg = tagVaccine;
        break;
      case 'color':
        tagImg = tagColor;
        break;
      case 'race':
        tagImg = tagRace;
        break;
      case 'dangerous':
        tagImg = tagDanger;
        break;
      default: break;
    }

    switch (condition.type) {
      case 'needed':
        backgroundColor = {'backgroundColor': 'white'};
        break;
      case 'excluding':
        imgInvert='condition-invert-img';
        backgroundColor = {'backgroundColor': 'black', 'color': 'white'};
        break;
      case 'optional':
        imgInvert='condition-invert-img';
        backgroundColor = {'backgroundColor': 'saddleBrown', 'color': 'white'};
        break;
      default: break;
    }

    switch (condition.rule) {
      case 'male':
        conditionText = 'macho';
        break;
      case 'female':
        conditionText = 'hembra';
        break;
      case true:
        conditionText = 'sí';
        break;
      case false:
        conditionText = 'no';
        break;
      default:
        conditionText = condition.rule;
        break;
    }

    return (
      <div className={classes} style={backgroundColor}>
        <img className={imgInvert} src={tagImg} alt='conditions' />
        <p>{conditionText}</p>
      </div>
    )
  }

  useEffect(() => {
    let array = [];
    for (let attribute in props.levelConditions) {
      if (props.levelConditions[attribute].active) {
        props.levelConditions[attribute].conditions.forEach(condition => {
          array.push(getTag(attribute, condition));
        });
      }
    }
    functions.shuffleArray(array)
    setConditionArray(array)
  }, [props.levelConditions])

  return (
    <div className='conditions'>
      <div className='conditions-title-container'>
        <p className='conditions-title'>condiciones</p>
      </div>
      <div className='conditions-explain'>
        <p className='condition-needed'>necesaria</p>
        <p className='condition-excluding'>excluyente</p>
        <p className='condition-optional'>opcional</p>
      </div>
      <div className='conditions-tags-container'>
        {props.conditionsLock && <div className='conditions-lock' />}
        {conditionArray.slice()
          .map((condition, key) => {return <div key={key} className='condition-tag-container'>{condition}</div>;}
        )}
      </div>
    </div>
  );
}

export default Conditions;