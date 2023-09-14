import {Box, CircularProgress, Container, Fab, Grid, ListItem, TextField} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from "@mui/material/Avatar";
import CasinoIcon from '@mui/icons-material/Casino';

interface Artist {
    id: number;
    name: string;
}

let nextId = 0;
const DailyPicker: React.FC<any> = () => {
    const [randomNumber, setRandomNumber] = useState(0);
    const [clickedRandom, setClickedRandom] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [name, setName] = useState('');
    const [artists, setArtists] = useState<Artist[]>([]);
    const [myState, setMyState ] = useState(false);
    const generateRandomNumber = () => {
        setIsLoading(true);
        const randomNumber = Math.floor(Math.random() * artists.length);
        console.log(randomNumber);
        setTimeout(() => { setIsLoading(false);setRandomNumber(randomNumber);
            setClickedRandom(true);}, 1000);
    }

    return(
        <Container maxWidth="lg">
            <Box sx={{height: '100%'}}>
                <Box sx={{width: '50%', mt: 3}}></Box>
                <Grid container spacing={0}>
                    <Box sx={{ width: '50%'}}>
                        <Box sx={{ml: 4, mt: 4}}>
                            <TextField
                                sx={{width: '60%'}}
                                size="small"
                                label="Spieler hinzufügen"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                            <IconButton sx={{ml: 1}} onClick={() => {
                                setArtists([
                                    ...artists,
                                    { id: nextId++, name: name }
                                ]);
                            }}><AddIcon/></IconButton>
                        </Box>
                        <Box sx={{ml: 4, mt: 2}}>
                            {artists.map(artist => (
                                <ListItem key={artist.id}><Avatar sx={{mr: 2}}></Avatar> {artist.name} <IconButton onClick={() => {
                                    setArtists(
                                        artists.filter(a =>
                                            a.id !== artist.id
                                        )
                                    );
                                }}>
                                    <DeleteIcon/>
                                </IconButton></ListItem>
                            ))}
                        </Box>

                    </Box>
                    <Box sx={{height: '500px', width: '50%', mt: 4}}><Box><Fab onClick={generateRandomNumber} variant="extended">
                        <CasinoIcon sx={{ mr: 1 }} />
                        Auslosen
                    </Fab>{ isLoading ? <CircularProgress sx={{ml: 2}} size={12} /> : null}</Box><Box>
                        {artists.length > 0 && clickedRandom ?
                            <ListItem sx={{mt: 4, ml: 4}}><Avatar sx={{mr: 2}}></Avatar> {artists[randomNumber].name} </ListItem>: null
                        }
                    </Box></Box>



                </Grid>



            </Box>


        </Container>

    )
}
export default DailyPicker;