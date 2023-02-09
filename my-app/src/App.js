import './App.css';
import data from './MOCK_DATA.json'
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControlLabel, Radio, RadioGroup, Card, CardContent, CardMedia, Box, Grid, TextField, Container, FormControl, InputLabel, Select, MenuItem, Button, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: 0,
  },
  cardsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 0,
  },
  card: {

    textAlign: 'center',
    width: "300px",
  },
  image: {
    width: '100%',
    height: '200px',

  },

}));

const genderList = Array.from(new Set(data.map(item => item.gender)));
const countryList = Array.from(new Set(data.map(item => item.country)));

const App = () => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  const handleClearFilter = () => {
    setSearchTerm('');
    setSelectedGender('');
    setSelectedCountry('');
  };


  const handleClearSearchFilter = () => {
    setSearchTerm('');
  };
  const handleClearSelectedFilter = () => {
    setSelectedGender('');
    setSelectedCountry('');
  };

  const filteredData = data
    .filter(person =>
      person.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.last_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(person => {
      if (selectedGender === '') {
        return true;
      } else {
        return person.gender === selectedGender;
      }
    })
    .filter(person => {
      if (selectedCountry === '') {
        return true;
      } else {
        return person.country === selectedCountry;
      }
    });


  return (<>
    <Container style={{ display: 'flex', justifyContent: 'center' }}>
      <Typography variant='h5' style={{ display: 'flex', alignItems: 'center' }}>Test</Typography>
    </Container>


    <Container className={classes.cardsContainer} style={{ marginTop: 10, marginBottom: 10 }} >
      <Container style={{ width: '100%', justifyContent: 'center' }}>
        <FormControl style={{ width: '100%', justifyContent: 'center' }}>

          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            labelId="gender-select-label"
            id="gender-select"
            value={selectedGender}
            onChange={e => {
              setSelectedGender(e.target.value);
              handleClearSearchFilter();
            }}
          >
            {genderList.map(item => (
              <FormControlLabel
                value={item}
                control={
                  <Radio
                    classes={{
                      // root: classes.radioButton,
                      // checked: classes.radioButton,
                    }}
                    icon={<Button variant='contained'>{item}</Button>}
                    checkedIcon={<Button variant='outlined'>{item}</Button>}
                  />
                }
              // label={<Button>{item}</Button>}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Container>
      <Container style={{ width: '100%', justifyContent: 'center' }}>
        <FormControl style={{ width: '100%', justifyContent: 'center' }}>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            labelId="country-select-label"
            id="country-select"
            value={selectedCountry}
            onChange={e => {
              setSelectedCountry(e.target.value);
              handleClearSearchFilter();
            }}
          >
            {countryList.map(item => (
              <FormControlLabel
                value={item}
                control={
                  <Radio
                    icon={<Button variant='contained'>{item}</Button>}
                    checkedIcon={<Button variant='outlined'>{item}</Button>}
                  />
                }
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Container>
      <TextField
        id="standard-basic"
        label="Search"
        value={searchTerm}
        onChange={e => {
          setSearchTerm(e.target.value);
          handleClearSelectedFilter();
        }
        }

      />
      <Button onClick={handleClearFilter}>Clear Filters</Button>



      <Grid spacing={5} container style={{ justifyContent: 'center', marginTop: '10px' }}>
        {filteredData.map((person) => (
          <Card
            className={classes.card}
            key={person.id}

          // style={{ background: '#000000' }}
          >
            <CardContent >
              <CardMedia
                component="img"
                height="194"
                image={person.image}
                alt={`${person.first_name} ${person.last_name}`}
                className={classes.image}
              />
              <div className={classes.card}>
                <Typography variant="body2">
                  {person.first_name} {person.last_name}<br />
                </Typography>
                <Typography variant="body3" color="textSecondary">
                  {person.gender}<br />
                </Typography>
                <Typography variant="body3" color="textSecondary">
                  {person.email}<br />
                </Typography>
                <Typography variant="body3" color="textSecondary">
                  {person.country}<br />
                </Typography>
              </div>
            </CardContent>
          </Card>
        ))}
      </Grid>

    </Container>
  </>
  );
};

export default App;
