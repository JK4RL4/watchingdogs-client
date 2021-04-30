import dogLivesImg from './img/dog_lives.png';

function DogLives(props) {

    return (
      <div className='dog-lives'>
        <img className='dog-lives-img' src={dogLivesImg} alt='lives' />
        <p>{props.dogLives}</p>
      </div>
    );
  }
  
export default DogLives;