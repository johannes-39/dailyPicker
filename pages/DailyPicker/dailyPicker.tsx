import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {useState} from "react";
import {Grid} from "@mui/material";

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
        <Container maxWidth="lg">
            <Box sx={{border: 'solid', height: '100%'}}>
                <Box sx={{border: 'solid', width: '50%'}}><h1>Teilnehmer:</h1></Box>
                <Grid container spacing={0}>
                        <Box sx={{border: 'solid', height: '500px', width: '50%'}}>
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
                        ))}
                    </Box>
                    <Box sx={{border: 'solid', height: '500px', width: '50%'}}><h3>Gewonnen hat:</h3><Box>
                        {artists.length > 0 && clickedRandom ?
                            <div>
                                {artists[randomNumber].name}</div> : null
                        }
                    </Box></Box>



                </Grid>



                <Box sx={{border: 'solid', width: '100%', height: '100px'}}><button onClick={() => {
                    setArtists([
                        ...artists,
                        { id: nextId++, name: name }
                    ]);
                }}>Hinzufügen</button><button className='ui button' onClick={generateRandomNumber}>Mischen</button></Box>
            </Box>


        </Container>
    )
}
export default DailyPicker;