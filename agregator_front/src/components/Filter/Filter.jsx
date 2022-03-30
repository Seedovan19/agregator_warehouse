import { Typography, InputLabel, MenuItem, FormControl, FormControlLabel, Select, Checkbox } from '@material-ui/core'
import useStyles from './styles'



const Filter = ({ type, setType, alco, setAlco }) => {
    const classes = useStyles();
    const options = [
        {
          label: "Хранение алкоголя",
          value: {alco},
        }
      ];

    return (
      <div className={ classes.container }>
        <Typography variant="h4">
          Склады в заданной местности
        </Typography>
       
          <FormControl className={ classes.formControl }>
            <InputLabel>Класс</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="A+">A+</MenuItem>
              <MenuItem value="A">A</MenuItem>
              <MenuItem value="B">B</MenuItem>
              <MenuItem value="B+">B+</MenuItem>
              <MenuItem value="C">C</MenuItem>
            </Select>
          </FormControl>
          { options?.map((option, _) => (
              <FormControlLabel
                control={
                      <Checkbox
                        onChange={(e) => setAlco(true)}
                      />
                    }
              label={option.label}
              key={option.value}
            />
          )) }
          
      </div>
    );
}
  
export default Filter;