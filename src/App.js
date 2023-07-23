import { useState } from 'react';
import './App.css';
import Status from './components/Status';
import Card from './components/Card';

  //create global constants, including functional expressions
const imagePath = 'Cards/';

const fillImages = () => {
    let images = Array(20).fill(null);
        let values = ['a', 'k', 'q', 'j', 't', '9', '8', '7', '6', '5'];
        let suits = ['h', 's'];
        let index = 0;
        for (let value = 0; value < values.length; value++){
            for (let suit = 0; suit < suits.length; suit ++) {
                images[index] = "card" + values[value] + suits[suit] + ".jpg";
                index++;
            }
        }
        return images;
  }

const shuffleImages = (images) => {
    for (let i = 0; i < images.length; i++) {
      let rnd = Math.floor(Math.random() * images.length);
      [images[i], images[rnd]] = [images[rnd], images[i]];
    }
  }
  //check this
function fillAndShuffle() {
    let images = fillImages();
    shuffleImages(images);
    return images;
  }

const isMatch = (firstPick, secondPick, imagesIn) => {
  if(firstPick!=-1 && secondPick!=-1 && (imagesIn[firstPick].substr(4, 1) == imagesIn[secondPick].substr(4, 1)))
    {return true;}
  else
    {return false;}
  }

  //start function
function App (){
  //create state variables
  // pattern is const [xIsNext, setXIsNext] = useState(true);
  const [images, setImages] = useState(fillAndShuffle());
  const [matches, setMatches] = useState(0);
  const [tries, setTries] = useState(0);
  const [picks, setPicks] = useState({first:-1, second: -1});

   
  const renderCard = (i) =>{
    const image = (images[i] === null) ? 'none' : 
    (( picks.first === i || picks.second === i) ? 
    'url(' + imagePath + images[i] + ')' : 
    'url(' + imagePath + 'black_back.jpg)');
    const enabled = (images[i] !== null && 
      (i !== picks.first && i !== picks.second) &&
      (picks.first === -1 || picks.second === -1) &&
      (matches < 10)) ? true : false;
    
    const eventHandler = (enabled) ? handleClick : () => {};
    const cursor = (enabled) ? "pointer" : "none";
    const style = { 
    backgroundImage: image, 
    cursor: cursor };

    return (
      <Card 
        index={i}
        eventHandler = {eventHandler}
        style={style}
      />
      );
    }
    //end renderCard

    const handleClick = (event) =>{
      const index = parseInt(event.target.id);
      console.log("handleclick called on " + index);
      let localPicks = {...picks};

      if (localPicks.first == -1)
          localPicks.first = index;
      else {
          localPicks.second=index;   
      }
      
      setPicks(localPicks);

      let localImages = [...images];
      let matchesIn = matches;
      let triesIn = tries;
      setTimeout(
        checkCards, 
        1600, 
        localPicks.first, localPicks.second, localImages, tries, matches);
      
        //setImages(localImages);
        //setMatches(matchesIn);
        //setTries(triesIn);
    }
    //end handleClick
    const checkCards = (firstPick, secondPick, localImages, triesIn, matchesIn) => {
      if(secondPick!==-1)
      {
        triesIn++;
        if (isMatch(firstPick, secondPick, localImages)) {
          //changes state but we cant do that here, alter the copy to save by ref
          matchesIn++;
          //changes state but we can't do that here
          localImages[firstPick] = null;
          localImages[secondPick] = null;
          }
      //changes state - use setState or pass back?
      setPicks({first: -1, second:-1});
      setMatches(matchesIn);
      setTries(triesIn);
      setImages(localImages);
        }
      
      }
      //end checkCards
  
  
    let status = (matches < 10) ?
    'Matches: ' + matches + " Tries: " + tries :
    "Congratulations!  You found all 10 matches in " + tries + " tries!";
  
    return (
    <div className="container" id="board">
            <Status status={status}/>
            <div className="row">
                <div className="col-sm-1"></div>
                {renderCard(0)}
                {renderCard(1)}
                {renderCard(2)}
                {renderCard(3)}
                {renderCard(4)}
                <div className="col-1"></div>
            </div>
            <div className="row">
                <div className="col-sm-1"></div>
                {renderCard(5)}
                {renderCard(6)}
                {renderCard(7)}
                {renderCard(8)}
                {renderCard(9)}
                <div className="col-1"></div>
            </div>
            <div className="row">
                <div className="col-sm-1"></div>
                {renderCard(10)}
                {renderCard(11)}
                {renderCard(12)}
                {renderCard(13)}
                {renderCard(14)}
                <div className="col-1"></div>
            </div>
            <div className="row">
                <div className="col-sm-1"></div>
                {renderCard(15)}
                {renderCard(16)}
                {renderCard(17)}
                {renderCard(18)}
                {renderCard(19)}
                <div className="col-1"></div>
            </div>
        </div>);
}

export default App;
