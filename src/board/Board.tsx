import React, {useEffect, useState} from 'react';
import Field from "../field/Field";
import axios from "axios";
import './Board.css'

const initialFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
const initialThinkingTime = 600;
const baseUrl = 'http://localhost:8080/chess';

const Board = () => {
  const [board, setBoard] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<number[]>([]);
  const [fen, setFen] = useState<string>(initialFen);
  const [isWhite, setIsWhite] = useState<boolean>(true);
  const [thinkingTime, setThinkingTime] = useState<number>(initialThinkingTime);
  const [endGameMessage, setEndGameMessage] = useState<string | null>(null);

  useEffect(() => {
    axios.post(`${baseUrl}/start`)
      .then(response => {
        setBoard(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleFieldClick = (index: number) => {
    if (selectedIndex === index) {
      setSelectedIndex(null);
      setPossibleMoves([]);
    } else if (possibleMoves.includes(index)) {
      axios.post(`${baseUrl}/move`, {from: selectedIndex, to: index, thinkingTime: thinkingTime})
        .then(response => {
          setBoard(response.data.board);
          setEndGameMessage(response.data.endGameMessage);
          setSelectedIndex(null);
          setPossibleMoves([]);
        })
        .catch(error => console.log(error));
    } else if (selectedIndex === null || !possibleMoves.includes(index)) {
      axios.post(`${baseUrl}/move/${index}`)
        .then(response => {
          setSelectedIndex(index);
          setPossibleMoves(response.data);
        })
        .catch(error => console.log(error));
    } else {
      setSelectedIndex(null);
      setPossibleMoves([]);
    }
  };

  const handleStartGameButtonClick = () => {
    axios.post(`${baseUrl}/start/fen`, {fen: fen, isWhite: isWhite})
      .then(response => {
        setBoard(response.data.board);
        setEndGameMessage(response.data.endGameMessage);
        setSelectedIndex(null);
        setPossibleMoves([]);
      })
      .catch(error => console.log(error));
  }

  const getFieldBackground = (index: number) => {
    const lightBackground = '#ebecd0';
    const darkBackground = '#779556';

    return (index % 2 === Math.floor(index / 8) % 2) ? lightBackground : darkBackground;
  }

  return (
    <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'space-between'}}>
      <div style={{
        aspectRatio: '1/1',
        margin: '20px',
        borderRadius: '10px',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignContent: 'flex-start',
      }}>
        {
          board.map((piece, i) => (
            <Field
              key={i}
              background={getFieldBackground(i)}
              piece={piece}
              isHighlighted={possibleMoves.includes(i)}
              onClick={() => handleFieldClick(i)}
            />
          ))
        }
      </div>
      <div style={{margin: '20px', width: '900%'}}>
        <label>Player color:</label>
        <br/>
        <select onChange={event => setIsWhite(event.target.value === 'white')}>
          <option selected={true} value="white">White</option>
          <option value="black">Black</option>
        </select>
        <br/>
        <br/>
        <label>Start game from FEN:</label>
        <br/>
        <input type="text" placeholder="Start game FEN" style={{width: '500px',}}
               defaultValue={initialFen}
               onChange={event => setFen(event.target.value)}/>
        <br/>
        <button onClick={handleStartGameButtonClick}>Start game</button>
        <br/>
        <br/>
        <br/>
        <label>Thinking time in milliseconds:</label>
        <br/>
        <input type="number" style={{width: '60px'}} defaultValue={initialThinkingTime}
               onChange={event => setThinkingTime(parseInt(event.target.value))}/>
        <br/>
        <br/>
        <br/>
        {endGameMessage && <h1>{endGameMessage}</h1>}
      </div>
    </div>
  );
}

export default Board;
