import * as React from "react";
import {useState} from "react";

interface Artist {
    id: number;
    name: string;
}

let nextId = 0;
const DailyPicker: React.FC<any> = () => {
    const [randomNumber, setRandomNumber] = useState(0);
    const [clickedRandom, setClickedRandom] = useState(false);

    const [name, setName] = useState('');
    const [artists, setArtists] = useState<Artist[]>([]);
    const [myState, setMyState ] = useState(false);
    const generateRandomNumber = () => {
        const randomNumber = Math.floor(Math.random() * artists.length);
        console.log(randomNumber);
        setRandomNumber(randomNumber);
        setClickedRandom(true);
    }

    return(
        <div>
            <h1>Teilnehmer:</h1>
            <input
                value={name}
                onChange={e => setName(e.target.value)}
            />
            {artists.map(artist => (
                <li key={artist.id}>{artist.name} <button onClick={() => {
                    setArtists(
                        artists.filter(a =>
                            a.id !== artist.id
                        )
                    );
                }}>
                    Delete
                </button></li>
            ))}<h3>Gewonnen hat:</h3>
            {artists.length > 0 && clickedRandom ?
                <div>
                    {artists[randomNumber].name}</div> : null
            }
            <button onClick={() => {
                setArtists([
                    ...artists,
                    { id: nextId++, name: name }
                ]);
            }}>Hinzufügen</button><button className='ui button' onClick={generateRandomNumber}>Mischen</button>
        </div>

    )
}
export default DailyPicker;