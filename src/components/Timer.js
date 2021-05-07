import { useContext } from 'react';
import Timer from 'react-compound-timer';
import { ScoreContext } from '../context/ScoreContext';
import { WordsContext } from '../context/WordsContext';

const Countdown = ({ setIsGameOver, isTimeOut, setIsTimeOut }) => {
  const { setScore } = useContext(ScoreContext);
  const { wordArray, currentWord, setCurrentWord } = useContext(WordsContext);
  return (
    <div>
      <Timer
        initialTime={5000}
        startImmediately={false}
        lastUnit='s'
        direction='backward'
        timeToUpdate={100}
        checkpoints={[
          {
            time: 0,
            callback: () => {
              setIsGameOver(true);
              setIsTimeOut(true);
            },
          },
        ]}
      >
        {({ start, reset }) => (
          <>
            <div>
              <Timer.Seconds />
            </div>
            <div>
              {isTimeOut ? (
                <button
                  onClick={() => {
                    reset();
                    start();
                    setIsGameOver(false);
                    setIsTimeOut(false);
                    setScore(0);
                    setCurrentWord(
                      wordArray[wordArray.indexOf(currentWord) + 1]
                    );
                  }}
                >
                  Reset
                </button>
              ) : (
                <button
                  onClick={() => {
                    start();
                    setIsGameOver(false);
                  }}
                >
                  Start
                </button>
              )}
            </div>
          </>
        )}
      </Timer>
    </div>
  );
};

export default Countdown;
