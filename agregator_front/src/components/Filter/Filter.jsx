import React from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Popper from '@mui/material/Popper';
import useStyles from './styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';
import { styled } from '@mui/material/styles';
import { FormControlUnstyledContext } from '@mui/base';


const borderRadiusBottom = '20px';
const heightBottom = '35px';

const StyledAutocomplete = styled(Autocomplete)({

  "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
    // Default transform is "translate(14px, 20px) scale(1)""
    // This lines up the A with the initial cursor position in the input
    // after changing its padding-left.
    transform: "translate(14px, calc(50% + 2px)) scale(1)",
    fontFamily: "Lato-Regular",
    fontSize: "15px",
    color: '#BFD1E4',
  },

  "& .MuiAutocomplete-inputRoot": {
    fontFamily: "Lato-Regular",
    fontSize: "15px",
    height: "47px",

    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#E2E5EA",
      borderRadius: "10px"
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      transition: 'box-shadow .3s',
      borderColor: "#E2E5EA",
      boxShadow: '0px 0px 5px 5px #F0F2FB',
      borderRadius: "10px"
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#284AC2",
      boxShadow: '0px 0px 5px 5px #F0F2FB',
      borderRadius: "10px"
    },
    ".MuiAutocomplete-endAdornment": {
      top: 'calc(50% - 13px)'
    }
  }
});

const StyledSelect = styled(Select)({
  width: '100%',
  height: heightBottom,
  "& .MuiOutlinedInput-notchedOutline": {

    borderColor: "#E2E5EA",
    borderRadius: borderRadiusBottom,
  },
  "& .MuiSvgIcon-root": {
    color: "#000000",
  },
});

const StyledButton = styled(Button)({
  width: '157px',
  fontFamily: 'Montserrat-medium',
  textTransform: 'None',
  height: heightBottom,
  backgroundColor: '#ffffff',
  borderWidth: '1px',
  borderRadius: borderRadiusBottom,
  borderColor: '#E2E5EA',
  color: '#000000',
});

const StyledFormControl = styled(FormControl)({
  width: '150px',
  backgroundColor: '#ffffff',
  borderRadius: borderRadiusBottom,

  "& .MuiInputLabel-root": {
    fontFamily: 'Montserrat-medium',
    fontSize: '13px',
    color: '#000000',
    // lineHeight: '1.4em',
  }
});


const Filter = ({ resultsCount, type, setType, palletQuantity, setPalletQuantity, setModalActive, setRegionPosition, setNoRegionFlag }) => {
  const classes = useStyles();

  const iconComponent = (props) => {
    return (
      <ExpandMoreIcon className={props.className + " " + classes.icon}/>
    )};
  
  // moves the menu below the select input
  const menuProps = {
    classes: {
      list: classes.list
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left"
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left"
    },
    getcontentanchorel: null
  };

    return (
      <Box>
        <StyledAutocomplete
          popupIcon ={<ExpandMoreIcon/>}
          options={regions}
          onChange={(event, newValue) => {
              if (newValue?.latitude !== undefined) {
                setNoRegionFlag(false);
                setRegionPosition([newValue.latitude, newValue.longitude]);
              } else {
                setNoRegionFlag(true);
              }
            }
          }
          style={{
            width: '100%',
            height: '47px',
            backgroundColor: '#FFFFFF',
            borderRadius: "10px",
            marginTop: "1.5rem",
          }}
          renderInput={(params) => (
            <TextField
                {...params}
                label="Введите ближайший город..."
                // variant="outlined"
                // fullWidth
                // InputProps={{
                //   ...params.InputProps,
                //   type: 'search',
                // }}
              />
          )}
        />
        <Grid 
          container
          direction="row"
          alignItems="flex-end"
          sx = {{
            paddingTop: "1rem",
          }}
        >
          <Typography
            sx = {{
              fontFamily: 'Lato-Regular',
              fontSize: '15px',
            }}
          >
            Найдено:
          </Typography>
          <Typography 
            sx = {{
              fontFamily: 'Lato-Bold',
              fontSize: '19px',
              paddingLeft: '5px',
              lineHeight: '1.3'
            }}
          >
            {resultsCount}
          </Typography>
        </Grid>
        <Grid 
          container 
          spacing={2}
          sx = {{
            paddingTop: '1rem',
            paddingBottom: '1rem',
          }}
        >
          <Grid item>
            <StyledButton
              variant = 'outlined'
              startIcon={<FilterListIcon />}
              onClick={() => setModalActive(true)}
            >
              Все фильтры
            </StyledButton> 
          </Grid>
          <Grid item>
          <StyledFormControl size="small">
            <InputLabel>Класс склада</InputLabel>
            <StyledSelect
                label="Количество паллет"
                value={type} 
                IconComponent={iconComponent}
                onChange={(e) => setType(e.target.value)} 
                MenuProps={menuProps}
              >
              <MenuItem value="" >
                <em>Не задано</em>
              </MenuItem>
              <MenuItem value="A+">A+</MenuItem>
              <MenuItem value="A">A</MenuItem>
              <MenuItem value="B">B</MenuItem>
              <MenuItem value="B+">B+</MenuItem>
              <MenuItem value="C">C</MenuItem>
            </StyledSelect>
          </StyledFormControl>
          </Grid>
          <Grid item>
          <StyledFormControl size="small">
           <InputLabel>Число паллет</InputLabel>
           <StyledSelect
            label="Количество паллет"
            value={palletQuantity} 
            IconComponent={iconComponent}
            onChange={(e) => setPalletQuantity(e.target.value)} 
            MenuProps={menuProps}
          >
             <MenuItem value="" >
                <em>Не задано</em>
              </MenuItem>
             <MenuItem value="50">меньше 50</MenuItem>
             <MenuItem value="250">50-250</MenuItem>
             <MenuItem value="500">250-500</MenuItem>
             <MenuItem value="1000">500-1000</MenuItem>
             <MenuItem value="500000">больше 1000</MenuItem>
           </StyledSelect>
          </StyledFormControl>
          </Grid>
          
          
          {/* //TODO: нарисовать кнопку класс filter_button */}
          </Grid>
      </Box>
    );
}
  
export default Filter;


// Регионы, в которых есть склады
const regions = [
  { latitude: '55.7522200', longitude: '37.6155600', label: 'Москва'},
  { latitude: '59.939096', longitude: '30.315871', label: 'Санкт-Петербург'},
  {
    "label": "Адыгейск",
    "latitude": "44.8783715",
    "longitude": "39.190172"
  },
  {
    "label": "Майкоп",
    "latitude": "44.6098268",
    "longitude": "40.1006527"
  },
  {
    "label": "Горно-Алтайск",
    "latitude": "51.9582681",
    "longitude": "85.9602957"
  },
  {
    "label": "Алейск",
    "latitude": "52.4920914",
    "longitude": "82.7794145"
  },
  {
    "label": "Барнаул",
    "latitude": "53.3481145",
    "longitude": "83.7798362"
  },
  {
    "label": "Белокуриха",
    "latitude": "51.9960534",
    "longitude": "84.9840343"
  },
  {
    "label": "Бийск",
    "latitude": "52.5393683",
    "longitude": "85.2138852"
  },
  {
    "label": "Горняк",
    "latitude": "50.9979032",
    "longitude": "81.4643059"
  },
  {
    "label": "Заринск",
    "latitude": "53.7063495",
    "longitude": "84.9314703"
  },
  {
    "label": "Змеиногорск",
    "latitude": "51.1580235",
    "longitude": "82.1872476"
  },
  {
    "label": "Камень-на-Оби",
    "latitude": "53.7915454",
    "longitude": "81.3545173"
  },
  {
    "label": "Новоалтайск",
    "latitude": "53.4120811",
    "longitude": "83.9311249"
  },
  {
    "label": "Рубцовск",
    "latitude": "51.5013075",
    "longitude": "81.2077729"
  },
  {
    "label": "Славгород",
    "latitude": "52.9993053",
    "longitude": "78.6459674"
  },
  {
    "label": "Яровое",
    "latitude": "52.9251728",
    "longitude": "78.5729898"
  },
  {
    "label": "Белогорск",
    "latitude": "50.9212235",
    "longitude": "128.4738742"
  },
  {
    "label": "Благовещенск",
    "latitude": "50.2905935",
    "longitude": "127.5272186"
  },
  {
    "label": "Завитинск",
    "latitude": "50.1064678",
    "longitude": "129.4392897"
  },
  {
    "label": "Зея",
    "latitude": "53.7339151",
    "longitude": "127.2658079"
  },
  {
    "label": "Райчихинск",
    "latitude": "49.7941882",
    "longitude": "129.4112149"
  },
  {
    "label": "Свободный",
    "latitude": "51.361264",
    "longitude": "128.1218995"
  },
  {
    "label": "Сковородино",
    "latitude": "53.9871004",
    "longitude": "123.943729"
  },
  {
    "label": "Тында",
    "latitude": "55.1546401",
    "longitude": "124.7468634"
  },
  {
    "label": "Циолковский",
    "latitude": "51.7624346",
    "longitude": "128.121972"
  },
  {
    "label": "Шимановск",
    "latitude": "52.0052856",
    "longitude": "127.7006559"
  },
  {
    "label": "Архангельск",
    "latitude": "64.5392985",
    "longitude": "40.5170083"
  },
  {
    "label": "Вельск",
    "latitude": "61.0660057",
    "longitude": "42.1032858"
  },
  {
    "label": "Каргополь",
    "latitude": "61.5008762",
    "longitude": "38.9636415"
  },
  {
    "label": "Коряжма",
    "latitude": "61.2885993",
    "longitude": "47.1002315"
  },
  {
    "label": "Котлас",
    "latitude": "61.2529842",
    "longitude": "46.6331915"
  },
  {
    "label": "Мезень",
    "latitude": "65.8398386",
    "longitude": "44.2531865"
  },
  {
    "label": "Мирный",
    "latitude": "62.7644267",
    "longitude": "40.3359976"
  },
  {
    "label": "Новодвинск",
    "latitude": "64.4136023",
    "longitude": "40.8208003"
  },
  {
    "label": "Няндома",
    "latitude": "61.6653735",
    "longitude": "40.2061699"
  },
  {
    "label": "Онега",
    "latitude": "63.9163966",
    "longitude": "38.0805749"
  },
  {
    "label": "Северодвинск",
    "latitude": "64.56253",
    "longitude": "39.8182715"
  },
  {
    "label": "Сольвычегодск",
    "latitude": "61.3318091",
    "longitude": "46.920351"
  },
  {
    "label": "Шенкурск",
    "latitude": "62.1057423",
    "longitude": "42.89959"
  },
  {
    "label": "Астрахань",
    "latitude": "46.3655808",
    "longitude": "48.0559979"
  },
  {
    "label": "Ахтубинск",
    "latitude": "48.2753078",
    "longitude": "46.1906741"
  },
  {
    "label": "Знаменск",
    "latitude": "48.5865618",
    "longitude": "45.7367908"
  },
  {
    "label": "Камызяк",
    "latitude": "46.1105429",
    "longitude": "48.0732724"
  },
  {
    "label": "Нариманов",
    "latitude": "46.6916597",
    "longitude": "47.8501624"
  },
  {
    "label": "Харабали",
    "latitude": "47.4089187",
    "longitude": "47.2524467"
  },
  {
    "label": "Агидель",
    "latitude": "55.89976",
    "longitude": "53.9221149"
  },
  {
    "label": "Баймак",
    "latitude": "52.5912632",
    "longitude": "58.3111995"
  },
  {
    "label": "Белебей",
    "latitude": "54.1033832",
    "longitude": "54.1111878"
  },
  {
    "label": "Белорецк",
    "latitude": "53.9675927",
    "longitude": "58.4099562"
  },
  {
    "label": "Бирск",
    "latitude": "55.4157107",
    "longitude": "55.5582335"
  },
  {
    "label": "Благовещенск",
    "latitude": "55.0499592",
    "longitude": "55.955309"
  },
  {
    "label": "Давлеканово",
    "latitude": "54.2227617",
    "longitude": "55.0313419"
  },
  {
    "label": "Дюртюли",
    "latitude": "55.4848047",
    "longitude": "54.8524875"
  },
  {
    "label": "Ишимбай",
    "latitude": "53.4546314",
    "longitude": "56.043874"
  },
  {
    "label": "Кумертау",
    "latitude": "52.7565537",
    "longitude": "55.7969915"
  },
  {
    "label": "Межгорье",
    "latitude": "54.239683",
    "longitude": "57.96146"
  },
  {
    "label": "Мелеуз",
    "latitude": "52.9590637",
    "longitude": "55.9283483"
  },
  {
    "label": "Нефтекамск",
    "latitude": "56.0883075",
    "longitude": "54.2483391"
  },
  {
    "label": "Октябрьский",
    "latitude": "54.4815344",
    "longitude": "53.4656611"
  },
  {
    "label": "Салават",
    "latitude": "53.3616311",
    "longitude": "55.9245559"
  },
  {
    "label": "Сибай",
    "latitude": "52.7205811",
    "longitude": "58.6663303"
  },
  {
    "label": "Стерлитамак",
    "latitude": "53.6302498",
    "longitude": "55.9315707"
  },
  {
    "label": "Туймазы",
    "latitude": "54.5999889",
    "longitude": "53.6949081"
  },
  {
    "label": "Уфа",
    "latitude": "54.734853",
    "longitude": "55.9578647"
  },
  {
    "label": "Учалы",
    "latitude": "54.3066965",
    "longitude": "59.4126559"
  },
  {
    "label": "Янаул",
    "latitude": "56.2650336",
    "longitude": "54.9298314"
  },
  {
    "label": "Алексеевка",
    "latitude": "50.6299932",
    "longitude": "38.6881776"
  },
  {
    "label": "Белгород",
    "latitude": "50.5977351",
    "longitude": "36.5858236"
  },
  {
    "label": "Бирюч",
    "latitude": "50.6483899",
    "longitude": "38.4006203"
  },
  {
    "label": "Валуйки",
    "latitude": "50.2112799",
    "longitude": "38.0998765"
  },
  {
    "label": "Грайворон",
    "latitude": "50.4862699",
    "longitude": "35.6662957"
  },
  {
    "label": "Губкин",
    "latitude": "51.2836362",
    "longitude": "37.5347608"
  },
  {
    "label": "Короча",
    "latitude": "50.8130123",
    "longitude": "37.1896543"
  },
  {
    "label": "Новый Оскол",
    "latitude": "50.7635162",
    "longitude": "37.8774026"
  },
  {
    "label": "Старый Оскол",
    "latitude": "51.2965991",
    "longitude": "37.8349849"
  },
  {
    "label": "Строитель",
    "latitude": "50.7845571",
    "longitude": "36.4886619"
  },
  {
    "label": "Шебекино",
    "latitude": "50.4005506",
    "longitude": "36.8877988"
  },
  {
    "label": "Брянск",
    "latitude": "53.2420071",
    "longitude": "34.3652716"
  },
  {
    "label": "Дятьково",
    "latitude": "53.5958283",
    "longitude": "34.355092"
  },
  {
    "label": "Жуковка",
    "latitude": "53.5341219",
    "longitude": "33.7302166"
  },
  {
    "label": "Злынка",
    "latitude": "52.4265906",
    "longitude": "31.7360386"
  },
  {
    "label": "Карачев",
    "latitude": "53.1297194",
    "longitude": "34.9887859"
  },
  {
    "label": "Клинцы",
    "latitude": "52.7529052",
    "longitude": "32.2339161"
  },
  {
    "label": "Мглин",
    "latitude": "53.0600644",
    "longitude": "32.8467217"
  },
  {
    "label": "Новозыбков",
    "latitude": "52.5371426",
    "longitude": "31.9356826"
  },
  {
    "label": "Почеп",
    "latitude": "52.9154724",
    "longitude": "33.4744608"
  },
  {
    "label": "Севск",
    "latitude": "52.1484215",
    "longitude": "34.4918198"
  },
  {
    "label": "Сельцо",
    "latitude": "53.3738801",
    "longitude": "34.1059226"
  },
  {
    "label": "Стародуб",
    "latitude": "52.5851881",
    "longitude": "32.7603628"
  },
  {
    "label": "Сураж",
    "latitude": "53.0171239",
    "longitude": "32.3938351"
  },
  {
    "label": "Трубчевск",
    "latitude": "52.5791314",
    "longitude": "33.7660013"
  },
  {
    "label": "Унеча",
    "latitude": "52.8460665",
    "longitude": "32.6757071"
  },
  {
    "label": "Фокино",
    "latitude": "53.4554552",
    "longitude": "34.4158537"
  },
  {
    "label": "Бабушкин",
    "latitude": "51.7113066",
    "longitude": "105.8673633"
  },
  {
    "label": "Гусиноозерск",
    "latitude": "51.2865751",
    "longitude": "106.5230732"
  },
  {
    "label": "Закаменск",
    "latitude": "50.3726774",
    "longitude": "103.2867452"
  },
  {
    "label": "Кяхта",
    "latitude": "50.3466291",
    "longitude": "106.4534938"
  },
  {
    "label": "Северобайкальск",
    "latitude": "55.6357165",
    "longitude": "109.3362606"
  },
  {
    "label": "Улан-Удэ",
    "latitude": "51.8334378",
    "longitude": "107.5841511"
  },
  {
    "label": "Александров",
    "latitude": "56.3919652",
    "longitude": "38.711035"
  },
  {
    "label": "Владимир",
    "latitude": "56.1281561",
    "longitude": "40.4082995"
  },
  {
    "label": "Вязники",
    "latitude": "56.2976528",
    "longitude": "42.2687311"
  },
  {
    "label": "Гороховец",
    "latitude": "56.2021059",
    "longitude": "42.692517"
  },
  {
    "label": "Гусь-Хрустальный",
    "latitude": "55.6198065",
    "longitude": "40.6578769"
  },
  {
    "label": "Камешково",
    "latitude": "56.3488712",
    "longitude": "40.9955682"
  },
  {
    "label": "Карабаново",
    "latitude": "56.3133447",
    "longitude": "38.7034267"
  },
  {
    "label": "Киржач",
    "latitude": "56.1485263",
    "longitude": "38.8635035"
  },
  {
    "label": "Ковров",
    "latitude": "56.3553895",
    "longitude": "41.3169568"
  },
  {
    "label": "Кольчугино",
    "latitude": "56.3327616",
    "longitude": "39.391201"
  },
  {
    "label": "Костерево",
    "latitude": "55.9336424",
    "longitude": "39.624822"
  },
  {
    "label": "Курлово",
    "latitude": "55.4525994",
    "longitude": "40.6124362"
  },
  {
    "label": "Лакинск",
    "latitude": "56.0180614",
    "longitude": "39.9564706"
  },
  {
    "label": "Меленки",
    "latitude": "55.3387017",
    "longitude": "41.634124"
  },
  {
    "label": "Муром",
    "latitude": "55.5632276",
    "longitude": "42.023006"
  },
  {
    "label": "Петушки",
    "latitude": "55.9297657",
    "longitude": "39.4507913"
  },
  {
    "label": "Покров",
    "latitude": "55.9167118",
    "longitude": "39.1733641"
  },
  {
    "label": "Радужный",
    "latitude": "55.9961034",
    "longitude": "40.3323247"
  },
  {
    "label": "Собинка",
    "latitude": "55.993798",
    "longitude": "40.0180034"
  },
  {
    "label": "Струнино",
    "latitude": "56.3750001",
    "longitude": "38.583938"
  },
  {
    "label": "Судогда",
    "latitude": "55.949897",
    "longitude": "40.8563392"
  },
  {
    "label": "Суздаль",
    "latitude": "56.4273814",
    "longitude": "40.4525581"
  },
  {
    "label": "Юрьев-Польский",
    "latitude": "56.4938067",
    "longitude": "39.6679311"
  },
  {
    "label": "Волгоград",
    "latitude": "48.7072005",
    "longitude": "44.5170207"
  },
  {
    "label": "Волжский",
    "latitude": "48.7978483",
    "longitude": "44.7462417"
  },
  {
    "label": "Дубовка",
    "latitude": "49.0555342",
    "longitude": "44.8270813"
  },
  {
    "label": "Жирновск",
    "latitude": "50.9767561",
    "longitude": "44.7857694"
  },
  {
    "label": "Калач-на-Дону",
    "latitude": "48.6887569",
    "longitude": "43.5306866"
  },
  {
    "label": "Камышин",
    "latitude": "50.0651261",
    "longitude": "45.3843816"
  },
  {
    "label": "Котельниково",
    "latitude": "47.6310808",
    "longitude": "43.1331198"
  },
  {
    "label": "Котово",
    "latitude": "50.3205433",
    "longitude": "44.8031864"
  },
  {
    "label": "Краснослободск",
    "latitude": "48.7068777",
    "longitude": "44.5631799"
  },
  {
    "label": "Ленинск",
    "latitude": "48.6936234",
    "longitude": "45.1992835"
  },
  {
    "label": "Михайловка",
    "latitude": "50.0708749",
    "longitude": "43.2400847"
  },
  {
    "label": "Николаевск",
    "latitude": "50.0166952",
    "longitude": "45.4733204"
  },
  {
    "label": "Новоаннинский",
    "latitude": "50.5296873",
    "longitude": "42.6666038"
  },
  {
    "label": "Палласовка",
    "latitude": "50.0501422",
    "longitude": "46.8803355"
  },
  {
    "label": "Петров Вал",
    "latitude": "50.1380355",
    "longitude": "45.2091455"
  },
  {
    "label": "Серафимович",
    "latitude": "49.566286",
    "longitude": "42.7360013"
  },
  {
    "label": "Суровикино",
    "latitude": "48.6189756",
    "longitude": "42.8541308"
  },
  {
    "label": "Урюпинск",
    "latitude": "50.7904767",
    "longitude": "42.0288589"
  },
  {
    "label": "Фролово",
    "latitude": "49.7647809",
    "longitude": "43.6648936"
  },
  {
    "label": "Бабаево",
    "latitude": "59.389309",
    "longitude": "35.9378318"
  },
  {
    "label": "Белозерск",
    "latitude": "60.0307914",
    "longitude": "37.7891123"
  },
  {
    "label": "Великий Устюг",
    "latitude": "60.7603243",
    "longitude": "46.3053893"
  },
  {
    "label": "Вологда",
    "latitude": "59.2484186",
    "longitude": "39.8356461"
  },
  {
    "label": "Вытегра",
    "latitude": "61.0064157",
    "longitude": "36.4495835"
  },
  {
    "label": "Грязовец",
    "latitude": "58.8757657",
    "longitude": "40.248477"
  },
  {
    "label": "Кадников",
    "latitude": "59.5037947",
    "longitude": "40.3440473"
  },
  {
    "label": "Кириллов",
    "latitude": "59.8590353",
    "longitude": "38.3749854"
  },
  {
    "label": "Красавино",
    "latitude": "60.9613991",
    "longitude": "46.481465"
  },
  {
    "label": "Никольск",
    "latitude": "59.5350162",
    "longitude": "45.4575468"
  },
  {
    "label": "Сокол",
    "latitude": "59.4759156",
    "longitude": "40.1114414"
  },
  {
    "label": "Тотьма",
    "latitude": "59.9735051",
    "longitude": "42.7589701"
  },
  {
    "label": "Устюжна",
    "latitude": "58.8383671",
    "longitude": "36.4425046"
  },
  {
    "label": "Харовск",
    "latitude": "59.9477728",
    "longitude": "40.2000794"
  },
  {
    "label": "Череповец",
    "latitude": "59.1269214",
    "longitude": "37.9092243"
  },
  {
    "label": "Бобров",
    "latitude": "51.0902048",
    "longitude": "40.0320014"
  },
  {
    "label": "Богучар",
    "latitude": "49.9352997",
    "longitude": "40.5592467"
  },
  {
    "label": "Борисоглебск",
    "latitude": "51.3654619",
    "longitude": "42.100947"
  },
  {
    "label": "Бутурлиновка",
    "latitude": "50.8313227",
    "longitude": "40.5977541"
  },
  {
    "label": "Воронеж",
    "latitude": "51.6592378",
    "longitude": "39.1968284"
  },
  {
    "label": "Калач",
    "latitude": "50.4241213",
    "longitude": "41.0162858"
  },
  {
    "label": "Лиски",
    "latitude": "50.9944734",
    "longitude": "39.518302"
  },
  {
    "label": "Нововоронеж",
    "latitude": "51.3092463",
    "longitude": "39.2162865"
  },
  {
    "label": "Новохоперск",
    "latitude": "51.0953461",
    "longitude": "41.6173714"
  },
  {
    "label": "Острогожск",
    "latitude": "50.8678083",
    "longitude": "39.0406398"
  },
  {
    "label": "Павловск",
    "latitude": "50.4533684",
    "longitude": "40.1369087"
  },
  {
    "label": "Поворино",
    "latitude": "51.1953446",
    "longitude": "42.2472432"
  },
  {
    "label": "Россошь",
    "latitude": "50.170089",
    "longitude": "39.6225534"
  },
  {
    "label": "Семилуки",
    "latitude": "51.6951846",
    "longitude": "39.0189797"
  },
  {
    "label": "Эртиль",
    "latitude": "51.831024",
    "longitude": "40.8074054"
  },
  {
    "label": "Буйнакск",
    "latitude": "42.8213799",
    "longitude": "47.1164452"
  },
  {
    "label": "Дагестанские Огни",
    "latitude": "42.1151021",
    "longitude": "48.1939983"
  },
  {
    "label": "Дербент",
    "latitude": "42.058935",
    "longitude": "48.2908653"
  },
  {
    "label": "Избербаш",
    "latitude": "42.565098",
    "longitude": "47.871002"
  },
  {
    "label": "Каспийск",
    "latitude": "42.8916599",
    "longitude": "47.6366674"
  },
  {
    "label": "Кизилюрт",
    "latitude": "43.2039094",
    "longitude": "46.8729311"
  },
  {
    "label": "Кизляр",
    "latitude": "43.8483915",
    "longitude": "46.7232828"
  },
  {
    "label": "Махачкала",
    "latitude": "42.9848572",
    "longitude": "47.5046303"
  },
  {
    "label": "Хасавюрт",
    "latitude": "43.2505191",
    "longitude": "46.5852276"
  },
  {
    "label": "Южно-Сухокумск",
    "latitude": "44.6600972",
    "longitude": "45.6499304"
  },
  {
    "label": "Биробиджан",
    "latitude": "48.7945975",
    "longitude": "132.9217594"
  },
  {
    "label": "Облучье",
    "latitude": "49.0188344",
    "longitude": "131.0539984"
  },
  {
    "label": "Балей",
    "latitude": "51.5822063",
    "longitude": "116.6380088"
  },
  {
    "label": "Борзя",
    "latitude": "50.3875437",
    "longitude": "116.5235682"
  },
  {
    "label": "Краснокаменск",
    "latitude": "50.092858",
    "longitude": "118.0323407"
  },
  {
    "label": "Могоча",
    "latitude": "53.7362465",
    "longitude": "119.7661232"
  },
  {
    "label": "Нерчинск",
    "latitude": "51.9595512",
    "longitude": "116.5854018"
  },
  {
    "label": "Петровск-Забайкальский",
    "latitude": "51.2748381",
    "longitude": "108.8467139"
  },
  {
    "label": "Сретенск",
    "latitude": "52.2462356",
    "longitude": "117.7116971"
  },
  {
    "label": "Хилок",
    "latitude": "51.3635236",
    "longitude": "110.458989"
  },
  {
    "label": "Чита",
    "latitude": "52.0340128",
    "longitude": "113.4994884"
  },
  {
    "label": "Шилка",
    "latitude": "51.8495302",
    "longitude": "116.033575"
  },
  {
    "label": "Вичуга",
    "latitude": "57.2044545",
    "longitude": "41.9131192"
  },
  {
    "label": "Гаврилов Посад",
    "latitude": "56.5585967",
    "longitude": "40.1228288"
  },
  {
    "label": "Заволжск",
    "latitude": "57.4916546",
    "longitude": "42.1374455"
  },
  {
    "label": "Иваново",
    "latitude": "56.9994677",
    "longitude": "40.9728231"
  },
  {
    "label": "Кинешма",
    "latitude": "57.4425441",
    "longitude": "42.1690039"
  },
  {
    "label": "Комсомольск",
    "latitude": "57.0273907",
    "longitude": "40.3775952"
  },
  {
    "label": "Кохма",
    "latitude": "56.9325151",
    "longitude": "41.0933071"
  },
  {
    "label": "Наволоки",
    "latitude": "57.4678426",
    "longitude": "41.9607371"
  },
  {
    "label": "Плес",
    "latitude": "57.4605304",
    "longitude": "41.512301"
  },
  {
    "label": "Приволжск",
    "latitude": "57.3807249",
    "longitude": "41.2809239"
  },
  {
    "label": "Пучеж",
    "latitude": "56.982075",
    "longitude": "43.1683878"
  },
  {
    "label": "Родники",
    "latitude": "57.1024137",
    "longitude": "41.7298908"
  },
  {
    "label": "Тейково",
    "latitude": "56.8542712",
    "longitude": "40.5355289"
  },
  {
    "label": "Фурманов",
    "latitude": "57.2538043",
    "longitude": "41.1053808"
  },
  {
    "label": "Шуя",
    "latitude": "56.8560743",
    "longitude": "41.3802455"
  },
  {
    "label": "Южа",
    "latitude": "56.5926458",
    "longitude": "42.0457159"
  },
  {
    "label": "Юрьевец",
    "latitude": "57.3178701",
    "longitude": "43.1110553"
  },
  {
    "label": "Карабулак",
    "latitude": "43.3054762",
    "longitude": "44.9094521"
  },
  {
    "label": "Магас",
    "latitude": "43.1686967",
    "longitude": "44.8130849"
  },
  {
    "label": "Малгобек",
    "latitude": "43.5097009",
    "longitude": "44.5901517"
  },
  {
    "label": "Назрань",
    "latitude": "43.2257977",
    "longitude": "44.764685"
  },
  {
    "label": "Алзамай",
    "latitude": "55.5550493",
    "longitude": "98.6644106"
  },
  {
    "label": "Ангарск",
    "latitude": "52.5448102",
    "longitude": "103.8885385"
  },
  {
    "label": "Байкальск",
    "latitude": "51.5231282",
    "longitude": "104.1485752"
  },
  {
    "label": "Бирюсинск",
    "latitude": "55.9608611",
    "longitude": "97.8203624"
  },
  {
    "label": "Бодайбо",
    "latitude": "57.8468822",
    "longitude": "114.1867148"
  },
  {
    "label": "Братск",
    "latitude": "56.1513951",
    "longitude": "101.6339892"
  },
  {
    "label": "Вихоревка",
    "latitude": "56.1207708",
    "longitude": "101.170332"
  },
  {
    "label": "Железногорск-Илимский",
    "latitude": "56.5847382",
    "longitude": "104.1141747"
  },
  {
    "label": "Зима",
    "latitude": "53.9206865",
    "longitude": "102.0492066"
  },
  {
    "label": "Иркутск",
    "latitude": "52.2863513",
    "longitude": "104.280655"
  },
  {
    "label": "Киренск",
    "latitude": "57.7757126",
    "longitude": "108.1107766"
  },
  {
    "label": "Нижнеудинск",
    "latitude": "54.8969105",
    "longitude": "99.0313481"
  },
  {
    "label": "Саянск",
    "latitude": "54.1107787",
    "longitude": "102.1802563"
  },
  {
    "label": "Свирск",
    "latitude": "53.0842576",
    "longitude": "103.3364192"
  },
  {
    "label": "Слюдянка",
    "latitude": "51.6562679",
    "longitude": "103.7186877"
  },
  {
    "label": "Тайшет",
    "latitude": "55.9405397",
    "longitude": "98.0030649"
  },
  {
    "label": "Тулун",
    "latitude": "54.5571409",
    "longitude": "100.5779402"
  },
  {
    "label": "Усолье-Сибирское",
    "latitude": "52.7567192",
    "longitude": "103.6387694"
  },
  {
    "label": "Усть-Илимск",
    "latitude": "57.9431325",
    "longitude": "102.7414683"
  },
  {
    "label": "Усть-Кут",
    "latitude": "56.7928049",
    "longitude": "105.7756883"
  },
  {
    "label": "Черемхово",
    "latitude": "53.1369385",
    "longitude": "103.090119"
  },
  {
    "label": "Шелехов",
    "latitude": "52.2102462",
    "longitude": "104.0973531"
  },
  {
    "label": "Баксан",
    "latitude": "43.6820621",
    "longitude": "43.5345627"
  },
  {
    "label": "Майский",
    "latitude": "43.6281779",
    "longitude": "44.0516663"
  },
  {
    "label": "Нальчик",
    "latitude": "43.4846312",
    "longitude": "43.6070316"
  },
  {
    "label": "Нарткала",
    "latitude": "43.5577208",
    "longitude": "43.8576411"
  },
  {
    "label": "Прохладный",
    "latitude": "43.7589521",
    "longitude": "44.0101936"
  },
  {
    "label": "Терек",
    "latitude": "43.4838439",
    "longitude": "44.1402524"
  },
  {
    "label": "Тырныауз",
    "latitude": "43.3981939",
    "longitude": "42.9215127"
  },
  {
    "label": "Чегем",
    "latitude": "43.5672039",
    "longitude": "43.5865338"
  },
  {
    "label": "Багратионовск",
    "latitude": "54.3866976",
    "longitude": "20.6418545"
  },
  {
    "label": "Балтийск",
    "latitude": "54.6514128",
    "longitude": "19.9141911"
  },
  {
    "label": "Гвардейск",
    "latitude": "54.6588981",
    "longitude": "21.0500584"
  },
  {
    "label": "Гурьевск",
    "latitude": "54.7705368",
    "longitude": "20.6039109"
  },
  {
    "label": "Гусев",
    "latitude": "54.5915477",
    "longitude": "22.1944114"
  },
  {
    "label": "Зеленоградск",
    "latitude": "54.9600226",
    "longitude": "20.4753274"
  },
  {
    "label": "Калининград",
    "latitude": "54.7073218",
    "longitude": "20.5072458"
  },
  {
    "label": "Краснознаменск",
    "latitude": "54.9452612",
    "longitude": "22.4928511"
  },
  {
    "label": "Ладушкин",
    "latitude": "54.5693538",
    "longitude": "20.1691909"
  },
  {
    "label": "Мамоново",
    "latitude": "54.4645591",
    "longitude": "19.9454114"
  },
  {
    "label": "Неман",
    "latitude": "55.0315543",
    "longitude": "22.0323961"
  },
  {
    "label": "Нестеров",
    "latitude": "54.6314454",
    "longitude": "22.5713658"
  },
  {
    "label": "Озерск",
    "latitude": "54.4084804",
    "longitude": "22.013508"
  },
  {
    "label": "Пионерский",
    "latitude": "54.9516927",
    "longitude": "20.227697"
  },
  {
    "label": "Полесск",
    "latitude": "54.8626321",
    "longitude": "21.0998148"
  },
  {
    "label": "Правдинск",
    "latitude": "54.4430604",
    "longitude": "21.0083638"
  },
  {
    "label": "Приморск",
    "latitude": "54.7311185",
    "longitude": "19.9983108"
  },
  {
    "label": "Светлогорск",
    "latitude": "54.9439566",
    "longitude": "20.1514789"
  },
  {
    "label": "Светлый",
    "latitude": "54.6774051",
    "longitude": "20.1356625"
  },
  {
    "label": "Славск",
    "latitude": "55.0451054",
    "longitude": "21.6742294"
  },
  {
    "label": "Советск",
    "latitude": "55.0810474",
    "longitude": "21.8886272"
  },
  {
    "label": "Черняховск",
    "latitude": "54.6243928",
    "longitude": "21.7969179"
  },
  {
    "label": "Городовиковск",
    "latitude": "46.0875351",
    "longitude": "41.9354039"
  },
  {
    "label": "Лагань",
    "latitude": "45.3929617",
    "longitude": "47.3432943"
  },
  {
    "label": "Элиста",
    "latitude": "46.3082947",
    "longitude": "44.2701417"
  },
  {
    "label": "Балабаново",
    "latitude": "55.1773652",
    "longitude": "36.6567255"
  },
  {
    "label": "Белоусово",
    "latitude": "55.0957679",
    "longitude": "36.6777239"
  },
  {
    "label": "Боровск",
    "latitude": "55.2130965",
    "longitude": "36.4927446"
  },
  {
    "label": "Ермолино",
    "latitude": "55.1972714",
    "longitude": "36.5951966"
  },
  {
    "label": "Жиздра",
    "latitude": "53.7522384",
    "longitude": "34.7386719"
  },
  {
    "label": "Жуков",
    "latitude": "55.0301386",
    "longitude": "36.7393279"
  },
  {
    "label": "Калуга",
    "latitude": "54.5060439",
    "longitude": "36.2515933"
  },
  {
    "label": "Киров",
    "latitude": "54.0790823",
    "longitude": "34.3077508"
  },
  {
    "label": "Козельск",
    "latitude": "54.0348417",
    "longitude": "35.7807136"
  },
  {
    "label": "Кондрово",
    "latitude": "54.796051",
    "longitude": "35.9276099"
  },
  {
    "label": "Кременки",
    "latitude": "54.8863306",
    "longitude": "37.116878"
  },
  {
    "label": "Людиново",
    "latitude": "53.8701406",
    "longitude": "34.4385498"
  },
  {
    "label": "Малоярославец",
    "latitude": "55.0176756",
    "longitude": "36.4632122"
  },
  {
    "label": "Медынь",
    "latitude": "54.9690755",
    "longitude": "35.887313"
  },
  {
    "label": "Мещовск",
    "latitude": "54.3191127",
    "longitude": "35.2816065"
  },
  {
    "label": "Мосальск",
    "latitude": "54.4825589",
    "longitude": "34.987206"
  },
  {
    "label": "Обнинск",
    "latitude": "55.0943892",
    "longitude": "36.6121785"
  },
  {
    "label": "Сосенский",
    "latitude": "54.056525",
    "longitude": "35.9621458"
  },
  {
    "label": "Спас-Деменск",
    "latitude": "54.4099201",
    "longitude": "34.0190263"
  },
  {
    "label": "Сухиничи",
    "latitude": "54.0973787",
    "longitude": "35.3443077"
  },
  {
    "label": "Таруса",
    "latitude": "54.7236791",
    "longitude": "37.1670866"
  },
  {
    "label": "Юхнов",
    "latitude": "54.7445873",
    "longitude": "35.2424857"
  },
  {
    "label": "Вилючинск",
    "latitude": "52.930428",
    "longitude": "158.4057276"
  },
  {
    "label": "Елизово",
    "latitude": "53.1829573",
    "longitude": "158.3882833"
  },
  {
    "label": "Петропавловск-Камчатский",
    "latitude": "53.0370213",
    "longitude": "158.6559142"
  },
  {
    "label": "Карачаевск",
    "latitude": "43.773197",
    "longitude": "41.9143726"
  },
  {
    "label": "Теберда",
    "latitude": "43.4438408",
    "longitude": "41.7414924"
  },
  {
    "label": "Усть-Джегута",
    "latitude": "44.083852",
    "longitude": "41.971128"
  },
  {
    "label": "Черкесск",
    "latitude": "44.2268637",
    "longitude": "42.0467829"
  },
  {
    "label": "Беломорск",
    "latitude": "64.5378468",
    "longitude": "34.7799717"
  },
  {
    "label": "Кемь",
    "latitude": "64.9543657",
    "longitude": "34.5948547"
  },
  {
    "label": "Кондопога",
    "latitude": "62.2059866",
    "longitude": "34.2681778"
  },
  {
    "label": "Костомукша",
    "latitude": "64.5889946",
    "longitude": "30.6015567"
  },
  {
    "label": "Лахденпохья",
    "latitude": "61.5189466",
    "longitude": "30.199592"
  },
  {
    "label": "Медвежьегорск",
    "latitude": "62.9127678",
    "longitude": "34.4567614"
  },
  {
    "label": "Олонец",
    "latitude": "60.9793604",
    "longitude": "32.9726031"
  },
  {
    "label": "Петрозаводск",
    "latitude": "61.78909",
    "longitude": "34.3596263"
  },
  {
    "label": "Питкяранта",
    "latitude": "61.5756886",
    "longitude": "31.4641309"
  },
  {
    "label": "Пудож",
    "latitude": "61.8059147",
    "longitude": "36.5330088"
  },
  {
    "label": "Сегежа",
    "latitude": "63.7437211",
    "longitude": "34.3126755"
  },
  {
    "label": "Сортавала",
    "latitude": "61.7032216",
    "longitude": "30.6917021"
  },
  {
    "label": "Суоярви",
    "latitude": "62.0787769",
    "longitude": "32.3499029"
  },
  {
    "label": "Анжеро-Судженск",
    "latitude": "56.0787179",
    "longitude": "86.0202207"
  },
  {
    "label": "Белово",
    "latitude": "54.4221442",
    "longitude": "86.3036438"
  },
  {
    "label": "Березовский",
    "latitude": "55.6692853",
    "longitude": "86.2744636"
  },
  {
    "label": "Гурьевск",
    "latitude": "54.2860005",
    "longitude": "85.947723"
  },
  {
    "label": "Калтан",
    "latitude": "53.5210461",
    "longitude": "87.2772143"
  },
  {
    "label": "Кемерово",
    "latitude": "55.3909721",
    "longitude": "86.0467864"
  },
  {
    "label": "Киселевск",
    "latitude": "54.0060382",
    "longitude": "86.6367387"
  },
  {
    "label": "Ленинск-Кузнецкий",
    "latitude": "54.6674092",
    "longitude": "86.1796724"
  },
  {
    "label": "Мариинск",
    "latitude": "56.2127836",
    "longitude": "87.7454392"
  },
  {
    "label": "Междуреченск",
    "latitude": "53.6865695",
    "longitude": "88.0703888"
  },
  {
    "label": "Мыски",
    "latitude": "53.7125516",
    "longitude": "87.8056657"
  },
  {
    "label": "Новокузнецк",
    "latitude": "53.7942757",
    "longitude": "87.2144046"
  },
  {
    "label": "Осинники",
    "latitude": "53.5987397",
    "longitude": "87.3369948"
  },
  {
    "label": "Полысаево",
    "latitude": "54.6053968",
    "longitude": "86.2808803"
  },
  {
    "label": "Прокопьевск",
    "latitude": "53.8604562",
    "longitude": "86.7183428"
  },
  {
    "label": "Салаир",
    "latitude": "54.2351588",
    "longitude": "85.8029215"
  },
  {
    "label": "Тайга",
    "latitude": "56.0622767",
    "longitude": "85.6207907"
  },
  {
    "label": "Таштагол",
    "latitude": "52.7594505",
    "longitude": "87.8477272"
  },
  {
    "label": "Топки",
    "latitude": "55.2766036",
    "longitude": "85.6153223"
  },
  {
    "label": "Юрга",
    "latitude": "55.7202689",
    "longitude": "84.8885516"
  },
  {
    "label": "Белая Холуница",
    "latitude": "58.8415212",
    "longitude": "50.8461002"
  },
  {
    "label": "Вятские Поляны",
    "latitude": "56.2286058",
    "longitude": "51.0614666"
  },
  {
    "label": "Зуевка",
    "latitude": "58.4031674",
    "longitude": "51.1330787"
  },
  {
    "label": "Киров",
    "latitude": "58.6035313",
    "longitude": "49.6679219"
  },
  {
    "label": "Кирово-Чепецк",
    "latitude": "58.5559921",
    "longitude": "50.0317608"
  },
  {
    "label": "Кирс",
    "latitude": "59.3400586",
    "longitude": "52.2415895"
  },
  {
    "label": "Котельнич",
    "latitude": "58.3035238",
    "longitude": "48.3474288"
  },
  {
    "label": "Луза",
    "latitude": "60.6290781",
    "longitude": "47.2612069"
  },
  {
    "label": "Малмыж",
    "latitude": "56.5243722",
    "longitude": "50.6782757"
  },
  {
    "label": "Мураши",
    "latitude": "59.3956347",
    "longitude": "48.9637651"
  },
  {
    "label": "Нолинск",
    "latitude": "57.5596946",
    "longitude": "49.9357867"
  },
  {
    "label": "Омутнинск",
    "latitude": "58.6697684",
    "longitude": "52.1893554"
  },
  {
    "label": "Орлов",
    "latitude": "58.5389402",
    "longitude": "48.8929268"
  },
  {
    "label": "Слободской",
    "latitude": "58.7311934",
    "longitude": "50.1670091"
  },
  {
    "label": "Советск",
    "latitude": "57.5841434",
    "longitude": "48.9589228"
  },
  {
    "label": "Сосновка",
    "latitude": "56.2533149",
    "longitude": "51.2833412"
  },
  {
    "label": "Уржум",
    "latitude": "57.1097612",
    "longitude": "50.0056278"
  },
  {
    "label": "Яранск",
    "latitude": "57.304195",
    "longitude": "47.8479185"
  },
  {
    "label": "Воркута",
    "latitude": "67.4973484",
    "longitude": "64.0611045"
  },
  {
    "label": "Вуктыл",
    "latitude": "63.8615209",
    "longitude": "57.3165207"
  },
  {
    "label": "Емва",
    "latitude": "62.5965314",
    "longitude": "50.8731889"
  },
  {
    "label": "Инта",
    "latitude": "66.0368196",
    "longitude": "60.1154612"
  },
  {
    "label": "Микунь",
    "latitude": "62.3580188",
    "longitude": "50.0719738"
  },
  {
    "label": "Печора",
    "latitude": "65.1485717",
    "longitude": "57.22388"
  },
  {
    "label": "Сосногорск",
    "latitude": "63.5990137",
    "longitude": "53.8762792"
  },
  {
    "label": "Сыктывкар",
    "latitude": "61.668789",
    "longitude": "50.8356491"
  },
  {
    "label": "Усинск",
    "latitude": "65.9941116",
    "longitude": "57.5570054"
  },
  {
    "label": "Ухта",
    "latitude": "63.5564779",
    "longitude": "53.7014202"
  },
  {
    "label": "Буй",
    "latitude": "58.473445",
    "longitude": "41.5306746"
  },
  {
    "label": "Волгореченск",
    "latitude": "57.4423712",
    "longitude": "41.1593076"
  },
  {
    "label": "Галич",
    "latitude": "58.3826861",
    "longitude": "42.3654563"
  },
  {
    "label": "Кологрив",
    "latitude": "58.826988",
    "longitude": "44.3185323"
  },
  {
    "label": "Кострома",
    "latitude": "57.8029445",
    "longitude": "40.9907282"
  },
  {
    "label": "Макарьев",
    "latitude": "57.8808916",
    "longitude": "43.8014428"
  },
  {
    "label": "Мантурово",
    "latitude": "58.3264667",
    "longitude": "44.7575036"
  },
  {
    "label": "Нерехта",
    "latitude": "57.4543706",
    "longitude": "40.5725438"
  },
  {
    "label": "Нея",
    "latitude": "58.2944499",
    "longitude": "43.8780965"
  },
  {
    "label": "Солигалич",
    "latitude": "59.0786729",
    "longitude": "42.2877245"
  },
  {
    "label": "Чухлома",
    "latitude": "58.7534246",
    "longitude": "42.6883783"
  },
  {
    "label": "Шарья",
    "latitude": "58.3761832",
    "longitude": "45.4060762"
  },
  {
    "label": "Абинск",
    "latitude": "44.8679931",
    "longitude": "38.1618437"
  },
  {
    "label": "Анапа",
    "latitude": "44.8950777",
    "longitude": "37.3163142"
  },
  {
    "label": "Апшеронск",
    "latitude": "44.4585239",
    "longitude": "39.7300092"
  },
  {
    "label": "Армавир",
    "latitude": "45.0010338",
    "longitude": "41.132392"
  },
  {
    "label": "Белореченск",
    "latitude": "44.7652733",
    "longitude": "39.8780457"
  },
  {
    "label": "Геленджик",
    "latitude": "44.5631053",
    "longitude": "38.0790184"
  },
  {
    "label": "Горячий Ключ",
    "latitude": "44.6343251",
    "longitude": "39.1356421"
  },
  {
    "label": "Гулькевичи",
    "latitude": "45.3605769",
    "longitude": "40.6918484"
  },
  {
    "label": "Ейск",
    "latitude": "46.7114611",
    "longitude": "38.2764915"
  },
  {
    "label": "Кореновск",
    "latitude": "45.4640868",
    "longitude": "39.4590178"
  },
  {
    "label": "Краснодар",
    "latitude": "45.040235",
    "longitude": "38.9760801"
  },
  {
    "label": "Кропоткин",
    "latitude": "45.4332464",
    "longitude": "40.5727852"
  },
  {
    "label": "Крымск",
    "latitude": "44.9344108",
    "longitude": "37.9855314"
  },
  {
    "label": "Курганинск",
    "latitude": "44.8876442",
    "longitude": "40.5913858"
  },
  {
    "label": "Лабинск",
    "latitude": "44.6353153",
    "longitude": "40.724385"
  },
  {
    "label": "Новокубанск",
    "latitude": "45.1038782",
    "longitude": "41.0473679"
  },
  {
    "label": "Новороссийск",
    "latitude": "44.7234264",
    "longitude": "37.7687218"
  },
  {
    "label": "Приморско-Ахтарск",
    "latitude": "46.0515",
    "longitude": "38.1704654"
  },
  {
    "label": "Славянск-на-Кубани",
    "latitude": "45.2605079",
    "longitude": "38.1260725"
  },
  {
    "label": "Сочи",
    "latitude": "43.5855829",
    "longitude": "39.7231419"
  },
  {
    "label": "Темрюк",
    "latitude": "45.2611082",
    "longitude": "37.445519"
  },
  {
    "label": "Тимашевск",
    "latitude": "45.6159358",
    "longitude": "38.9350513"
  },
  {
    "label": "Тихорецк",
    "latitude": "45.8546953",
    "longitude": "40.1258702"
  },
  {
    "label": "Туапсе",
    "latitude": "44.1103707",
    "longitude": "39.082645"
  },
  {
    "label": "Усть-Лабинск",
    "latitude": "45.222676",
    "longitude": "39.6930239"
  },
  {
    "label": "Хадыженск",
    "latitude": "44.412303",
    "longitude": "39.5319151"
  },
  {
    "label": "Артемовск",
    "latitude": "54.3472901",
    "longitude": "93.4356543"
  },
  {
    "label": "Ачинск",
    "latitude": "56.2538662",
    "longitude": "90.47949"
  },
  {
    "label": "Боготол",
    "latitude": "56.209881",
    "longitude": "89.5300182"
  },
  {
    "label": "Бородино",
    "latitude": "55.9054308",
    "longitude": "94.9021138"
  },
  {
    "label": "Дивногорск",
    "latitude": "55.9577868",
    "longitude": "92.380085"
  },
  {
    "label": "Дудинка",
    "latitude": "69.4031339",
    "longitude": "86.1908135"
  },
  {
    "label": "Енисейск",
    "latitude": "58.4485234",
    "longitude": "92.165237"
  },
  {
    "label": "Железногорск",
    "latitude": "56.2529346",
    "longitude": "93.532167"
  },
  {
    "label": "Заозерный",
    "latitude": "55.9617268",
    "longitude": "94.7091037"
  },
  {
    "label": "Зеленогорск",
    "latitude": "56.1133001",
    "longitude": "94.5888736"
  },
  {
    "label": "Игарка",
    "latitude": "67.4667947",
    "longitude": "86.5814287"
  },
  {
    "label": "Иланский",
    "latitude": "56.2374163",
    "longitude": "96.0672656"
  },
  {
    "label": "Канск",
    "latitude": "56.2049776",
    "longitude": "95.7051246"
  },
  {
    "label": "Кодинск",
    "latitude": "58.6033961",
    "longitude": "99.1797563"
  },
  {
    "label": "Красноярск",
    "latitude": "56.009466",
    "longitude": "92.8524162"
  },
  {
    "label": "Лесосибирск",
    "latitude": "58.2218201",
    "longitude": "92.5036986"
  },
  {
    "label": "Минусинск",
    "latitude": "53.7105509",
    "longitude": "91.6871866"
  },
  {
    "label": "Назарово",
    "latitude": "56.0113176",
    "longitude": "90.4167947"
  },
  {
    "label": "Норильск",
    "latitude": "69.3490828",
    "longitude": "88.2009965"
  },
  {
    "label": "Сосновоборск",
    "latitude": "56.1202088",
    "longitude": "93.3353411"
  },
  {
    "label": "Ужур",
    "latitude": "55.3141977",
    "longitude": "89.8333827"
  },
  {
    "label": "Уяр",
    "latitude": "55.8131698",
    "longitude": "94.3282148"
  },
  {
    "label": "Шарыпово",
    "latitude": "55.5389684",
    "longitude": "89.1801557"
  },
  {
    "label": "Ялта",
    "latitude": "44.416366",
    "longitude": "34.04455"
  },
  {
    "label": "Алушта",
    "latitude": "44.6764419",
    "longitude": "34.4100387"
  },
  {
    "label": "Армянск",
    "latitude": "46.1059247",
    "longitude": "33.6910325"
  },
  {
    "label": "Бахчисарай",
    "latitude": "44.751388",
    "longitude": "33.8750341"
  },
  {
    "label": "Белогорск",
    "latitude": "45.0571581",
    "longitude": "34.5998775"
  },
  {
    "label": "Джанкой",
    "latitude": "45.7092436",
    "longitude": "34.388332"
  },
  {
    "label": "Евпатория",
    "latitude": "45.1904322",
    "longitude": "33.3667685"
  },
  {
    "label": "Керчь",
    "latitude": "45.3561128",
    "longitude": "36.4674285"
  },
  {
    "label": "Красноперекопск",
    "latitude": "45.9537956",
    "longitude": "33.7921523"
  },
  {
    "label": "Саки",
    "latitude": "45.1342889",
    "longitude": "33.6032508"
  },
  {
    "label": "Симферополь",
    "latitude": "44.9482645",
    "longitude": "34.100117"
  },
  {
    "label": "Старый Крым",
    "latitude": "45.0290659",
    "longitude": "35.0900885"
  },
  {
    "label": "Судак",
    "latitude": "44.8505913",
    "longitude": "34.9761591"
  },
  {
    "label": "Феодосия",
    "latitude": "45.031878",
    "longitude": "35.3824772"
  },
  {
    "label": "Щелкино",
    "latitude": "45.4289847",
    "longitude": "35.8251329"
  },
  {
    "label": "Ялта",
    "latitude": "44.4951948",
    "longitude": "34.166386"
  },
  {
    "label": "Далматово",
    "latitude": "56.2621393",
    "longitude": "62.9387378"
  },
  {
    "label": "Катайск",
    "latitude": "56.2908118",
    "longitude": "62.5800669"
  },
  {
    "label": "Курган",
    "latitude": "55.4443448",
    "longitude": "65.3161339"
  },
  {
    "label": "Куртамыш",
    "latitude": "54.9368491",
    "longitude": "64.4203009"
  },
  {
    "label": "Макушино",
    "latitude": "55.2154025",
    "longitude": "67.2452558"
  },
  {
    "label": "Петухово",
    "latitude": "55.0649932",
    "longitude": "67.8874369"
  },
  {
    "label": "Шадринск",
    "latitude": "56.0870152",
    "longitude": "63.6298234"
  },
  {
    "label": "Шумиха",
    "latitude": "55.2281833",
    "longitude": "63.2902391"
  },
  {
    "label": "Щучье",
    "latitude": "55.20883",
    "longitude": "62.7478475"
  },
  {
    "label": "Дмитриев",
    "latitude": "52.1269291",
    "longitude": "35.0739504"
  },
  {
    "label": "Железногорск",
    "latitude": "52.3378753",
    "longitude": "35.3516834"
  },
  {
    "label": "Курск",
    "latitude": "51.7303391",
    "longitude": "36.1926448"
  },
  {
    "label": "Курчатов",
    "latitude": "51.6605475",
    "longitude": "35.6571711"
  },
  {
    "label": "Льгов",
    "latitude": "51.6596935",
    "longitude": "35.2611592"
  },
  {
    "label": "Обоянь",
    "latitude": "51.212012",
    "longitude": "36.275425"
  },
  {
    "label": "Рыльск",
    "latitude": "51.568165",
    "longitude": "34.6802178"
  },
  {
    "label": "Суджа",
    "latitude": "51.1919711",
    "longitude": "35.2719619"
  },
  {
    "label": "Фатеж",
    "latitude": "52.0918591",
    "longitude": "35.8538912"
  },
  {
    "label": "Щигры",
    "latitude": "51.8787808",
    "longitude": "36.8910674"
  },
  {
    "label": "Бокситогорск",
    "latitude": "59.4735032",
    "longitude": "33.8456521"
  },
  {
    "label": "Волосово",
    "latitude": "59.4445107",
    "longitude": "29.492277"
  },
  {
    "label": "Волхов",
    "latitude": "59.9006057",
    "longitude": "32.35212"
  },
  {
    "label": "Всеволожск",
    "latitude": "60.0190094",
    "longitude": "30.6455834"
  },
  {
    "label": "Выборг",
    "latitude": "60.7130748",
    "longitude": "28.7328813"
  },
  {
    "label": "Высоцк",
    "latitude": "60.6296511",
    "longitude": "28.5709914"
  },
  {
    "label": "Гатчина",
    "latitude": "59.5650861",
    "longitude": "30.1281859"
  },
  {
    "label": "Ивангород",
    "latitude": "59.3765845",
    "longitude": "28.2230504"
  },
  {
    "label": "Каменногорск",
    "latitude": "60.9508768",
    "longitude": "29.1308061"
  },
  {
    "label": "Кингисепп",
    "latitude": "59.3739407",
    "longitude": "28.6112981"
  },
  {
    "label": "Кириши",
    "latitude": "59.4742626",
    "longitude": "32.0625536"
  },
  {
    "label": "Кировск",
    "latitude": "59.875371",
    "longitude": "30.9815205"
  },
  {
    "label": "Коммунар",
    "latitude": "59.6215929",
    "longitude": "30.393466"
  },
  {
    "label": "Лодейное Поле",
    "latitude": "60.7320564",
    "longitude": "33.5522225"
  },
  {
    "label": "Луга",
    "latitude": "58.7373818",
    "longitude": "29.8466657"
  },
  {
    "label": "Любань",
    "latitude": "59.3492573",
    "longitude": "31.2485276"
  },
  {
    "label": "Никольское",
    "latitude": "59.7042633",
    "longitude": "30.7874879"
  },
  {
    "label": "Новая Ладога",
    "latitude": "60.1100013",
    "longitude": "32.3141446"
  },
  {
    "label": "Отрадное",
    "latitude": "59.772596",
    "longitude": "30.7988403"
  },
  {
    "label": "Пикалево",
    "latitude": "59.5130655",
    "longitude": "34.1773982"
  },
  {
    "label": "Подпорожье",
    "latitude": "60.9127463",
    "longitude": "34.1567832"
  },
  {
    "label": "Приморск",
    "latitude": "60.3660787",
    "longitude": "28.6135962"
  },
  {
    "label": "Приозерск",
    "latitude": "61.03313",
    "longitude": "30.15876"
  },
  {
    "label": "Светогорск",
    "latitude": "61.1112679",
    "longitude": "28.8726666"
  },
  {
    "label": "Сертолово",
    "latitude": "60.14458",
    "longitude": "30.2094595"
  },
  {
    "label": "Сланцы",
    "latitude": "59.1178693",
    "longitude": "28.088106"
  },
  {
    "label": "Сосновый Бор",
    "latitude": "59.8772921",
    "longitude": "29.1290866"
  },
  {
    "label": "Сясьстрой",
    "latitude": "60.1402454",
    "longitude": "32.5602015"
  },
  {
    "label": "Тихвин",
    "latitude": "59.6273809",
    "longitude": "33.5072307"
  },
  {
    "label": "Тосно",
    "latitude": "59.5406697",
    "longitude": "30.8777872"
  },
  {
    "label": "Шлиссельбург",
    "latitude": "59.9443923",
    "longitude": "31.0334136"
  },
  {
    "label": "Грязи",
    "latitude": "52.4873931",
    "longitude": "39.9331785"
  },
  {
    "label": "Данков",
    "latitude": "53.25769",
    "longitude": "39.1457625"
  },
  {
    "label": "Елец",
    "latitude": "52.6151738",
    "longitude": "38.5289121"
  },
  {
    "label": "Задонск",
    "latitude": "52.4004611",
    "longitude": "38.9205772"
  },
  {
    "label": "Лебедянь",
    "latitude": "53.0156678",
    "longitude": "39.143498"
  },
  {
    "label": "Липецк",
    "latitude": "52.6103027",
    "longitude": "39.5946266"
  },
  {
    "label": "Усмань",
    "latitude": "52.0444165",
    "longitude": "39.7264516"
  },
  {
    "label": "Чаплыгин",
    "latitude": "53.2404794",
    "longitude": "39.9671563"
  },
  {
    "label": "Магадан",
    "latitude": "59.5681763",
    "longitude": "150.8085289"
  },
  {
    "label": "Сусуман",
    "latitude": "62.7804628",
    "longitude": "148.154033"
  },
  {
    "label": "Волжск",
    "latitude": "55.8622987",
    "longitude": "48.371553"
  },
  {
    "label": "Звенигово",
    "latitude": "55.9739374",
    "longitude": "48.0170276"
  },
  {
    "label": "Йошкар-Ола",
    "latitude": "56.6343763",
    "longitude": "47.8998445"
  },
  {
    "label": "Козьмодемьянск",
    "latitude": "56.333346",
    "longitude": "46.5466282"
  },
  {
    "label": "Ардатов",
    "latitude": "54.8465693",
    "longitude": "46.2412736"
  },
  {
    "label": "Инсар",
    "latitude": "53.8770384",
    "longitude": "44.3696866"
  },
  {
    "label": "Ковылкино",
    "latitude": "54.0391464",
    "longitude": "43.9191229"
  },
  {
    "label": "Краснослободск",
    "latitude": "54.4248634",
    "longitude": "43.7845096"
  },
  {
    "label": "Рузаевка",
    "latitude": "54.0583238",
    "longitude": "44.949116"
  },
  {
    "label": "Саранск",
    "latitude": "54.1807601",
    "longitude": "45.1862263"
  },
  {
    "label": "Темников",
    "latitude": "54.6309086",
    "longitude": "43.2161785"
  },
  {
    "label": "",
    "latitude": "55.7538789",
    "longitude": "37.6203735"
  },
  {
    "label": "Апрелевка",
    "latitude": "55.5276336",
    "longitude": "37.0651105"
  },
  {
    "label": "Балашиха",
    "latitude": "55.7963352",
    "longitude": "37.9381413"
  },
  {
    "label": "Бронницы",
    "latitude": "55.4255534",
    "longitude": "38.2640794"
  },
  {
    "label": "Верея",
    "latitude": "55.3674668",
    "longitude": "36.1563083"
  },
  {
    "label": "Видное",
    "latitude": "55.5518323",
    "longitude": "37.7062062"
  },
  {
    "label": "Волоколамск",
    "latitude": "56.0358121",
    "longitude": "35.9585027"
  },
  {
    "label": "Воскресенск",
    "latitude": "55.3071305",
    "longitude": "38.7026949"
  },
  {
    "label": "Высоковск",
    "latitude": "56.336141",
    "longitude": "36.5251316"
  },
  {
    "label": "Голицыно",
    "latitude": "55.6189762",
    "longitude": "36.9855559"
  },
  {
    "label": "Дедовск",
    "latitude": "55.8704718",
    "longitude": "37.1244724"
  },
  {
    "label": "Дзержинский",
    "latitude": "55.6241079",
    "longitude": "37.8440691"
  },
  {
    "label": "Дмитров",
    "latitude": "56.3477176",
    "longitude": "37.5267184"
  },
  {
    "label": "Долгопрудный",
    "latitude": "55.9384901",
    "longitude": "37.5100527"
  },
  {
    "label": "Домодедово",
    "latitude": "55.4363901",
    "longitude": "37.7666263"
  },
  {
    "label": "Дрезна",
    "latitude": "55.7442991",
    "longitude": "38.8499228"
  },
  {
    "label": "Дубна",
    "latitude": "56.7417949",
    "longitude": "37.1757163"
  },
  {
    "label": "Егорьевск",
    "latitude": "55.3831326",
    "longitude": "39.0358236"
  },
  {
    "label": "Жуковский",
    "latitude": "55.5998408",
    "longitude": "38.1224185"
  },
  {
    "label": "Зарайск",
    "latitude": "54.7625993",
    "longitude": "38.8851485"
  },
  {
    "label": "Звенигород",
    "latitude": "55.7296168",
    "longitude": "36.8552843"
  },
  {
    "label": "Ивантеевка",
    "latitude": "55.9742303",
    "longitude": "37.9208755"
  },
  {
    "label": "Истра",
    "latitude": "55.9061087",
    "longitude": "36.8600854"
  },
  {
    "label": "Кашира",
    "latitude": "54.8534263",
    "longitude": "38.1903818"
  },
  {
    "label": "Клин",
    "latitude": "56.3424886",
    "longitude": "36.7240912"
  },
  {
    "label": "Коломна",
    "latitude": "55.1027797",
    "longitude": "38.7531734"
  },
  {
    "label": "Королев",
    "latitude": "55.9162558",
    "longitude": "37.8545224"
  },
  {
    "label": "Котельники",
    "latitude": "55.659898",
    "longitude": "37.8632865"
  },
  {
    "label": "Красноармейск",
    "latitude": "51.0268595",
    "longitude": "45.7011086"
  },
  {
    "label": "Красногорск",
    "latitude": "55.8318475",
    "longitude": "37.32942"
  },
  {
    "label": "Краснозаводск",
    "latitude": "56.4408723",
    "longitude": "38.2320671"
  },
  {
    "label": "Краснознаменск",
    "latitude": "55.5978962",
    "longitude": "37.0395137"
  },
  {
    "label": "Кубинка",
    "latitude": "55.5755679",
    "longitude": "36.6952487"
  },
  {
    "label": "Куровское",
    "latitude": "55.5791491",
    "longitude": "38.9208543"
  },
  {
    "label": "Ликино-Дулево",
    "latitude": "55.7078531",
    "longitude": "38.9577103"
  },
  {
    "label": "Лобня",
    "latitude": "56.0328745",
    "longitude": "37.4614671"
  },
  {
    "label": "Лосино-Петровский",
    "latitude": "55.8714441",
    "longitude": "38.2005377"
  },
  {
    "label": "Луховицы",
    "latitude": "54.9651617",
    "longitude": "39.0261346"
  },
  {
    "label": "Лыткарино",
    "latitude": "55.5778065",
    "longitude": "37.9034952"
  },
  {
    "label": "Люберцы",
    "latitude": "55.700416",
    "longitude": "37.9606496"
  },
  {
    "label": "Можайск",
    "latitude": "55.5069819",
    "longitude": "36.0240724"
  },
  {
    "label": "Мытищи",
    "latitude": "55.9104647",
    "longitude": "37.7363702"
  },
  {
    "label": "Наро-Фоминск",
    "latitude": "55.3802749",
    "longitude": "36.7608038"
  },
  {
    "label": "Ногинск",
    "latitude": "55.8686239",
    "longitude": "38.4621635"
  },
  {
    "label": "Одинцово",
    "latitude": "55.6789292",
    "longitude": "37.2636389"
  },
  {
    "label": "Озеры",
    "latitude": "54.8539944",
    "longitude": "38.55987"
  },
  {
    "label": "Орехово-Зуево",
    "latitude": "55.8151729",
    "longitude": "38.9870711"
  },
  {
    "label": "Павловский Посад",
    "latitude": "55.7806718",
    "longitude": "38.6596047"
  },
  {
    "label": "Пересвет",
    "latitude": "56.4158828",
    "longitude": "38.1733567"
  },
  {
    "label": "Подольск",
    "latitude": "55.4389588",
    "longitude": "37.57027"
  },
  {
    "label": "Протвино",
    "latitude": "54.8706614",
    "longitude": "37.2183307"
  },
  {
    "label": "Пушкино",
    "latitude": "56.0104548",
    "longitude": "37.8471438"
  },
  {
    "label": "Пущино",
    "latitude": "54.832521",
    "longitude": "37.6210428"
  },
  {
    "label": "Раменское",
    "latitude": "55.549529",
    "longitude": "38.273015"
  },
  {
    "label": "Реутов",
    "latitude": "55.758236",
    "longitude": "37.8619443"
  },
  {
    "label": "Рошаль",
    "latitude": "55.6632504",
    "longitude": "39.8655434"
  },
  {
    "label": "Руза",
    "latitude": "55.7015302",
    "longitude": "36.1960043"
  },
  {
    "label": "Сергиев Посад",
    "latitude": "56.3063411",
    "longitude": "38.1502568"
  },
  {
    "label": "Серпухов",
    "latitude": "54.9225396",
    "longitude": "37.4032682"
  },
  {
    "label": "Солнечногорск",
    "latitude": "56.2148655",
    "longitude": "37.0967653"
  },
  {
    "label": "Старая Купавна",
    "latitude": "55.8038411",
    "longitude": "38.1426144"
  },
  {
    "label": "Ступино",
    "latitude": "54.9238403",
    "longitude": "38.1186976"
  },
  {
    "label": "Талдом",
    "latitude": "56.7308993",
    "longitude": "37.5276414"
  },
  {
    "label": "Фрязино",
    "latitude": "55.9590154",
    "longitude": "38.0409171"
  },
  {
    "label": "Химки",
    "latitude": "55.8886705",
    "longitude": "37.4304154"
  },
  {
    "label": "Хотьково",
    "latitude": "56.2515725",
    "longitude": "37.9395225"
  },
  {
    "label": "Черноголовка",
    "latitude": "56.0100909",
    "longitude": "38.3792328"
  },
  {
    "label": "Чехов",
    "latitude": "55.1507175",
    "longitude": "37.4532591"
  },
  {
    "label": "Шатура",
    "latitude": "55.5777942",
    "longitude": "39.5443781"
  },
  {
    "label": "Щелково",
    "latitude": "55.9234303",
    "longitude": "37.9784419"
  },
  {
    "label": "Электрогорск",
    "latitude": "55.8778573",
    "longitude": "38.7805239"
  },
  {
    "label": "Электросталь",
    "latitude": "55.7847718",
    "longitude": "38.4446531"
  },
  {
    "label": "Электроугли",
    "latitude": "55.7170329",
    "longitude": "38.2194049"
  },
  {
    "label": "Яхрома",
    "latitude": "56.2889858",
    "longitude": "37.4831016"
  },
  {
    "label": "Апатиты",
    "latitude": "67.5678295",
    "longitude": "33.4067218"
  },
  {
    "label": "Гаджиево",
    "latitude": "69.2490009",
    "longitude": "33.3152445"
  },
  {
    "label": "Заозерск",
    "latitude": "69.4003895",
    "longitude": "32.4502225"
  },
  {
    "label": "Заполярный",
    "latitude": "69.413232",
    "longitude": "30.7985332"
  },
  {
    "label": "Кандалакша",
    "latitude": "67.1567298",
    "longitude": "32.4142303"
  },
  {
    "label": "Кировск",
    "latitude": "67.6150979",
    "longitude": "33.6637196"
  },
  {
    "label": "Ковдор",
    "latitude": "67.5661466",
    "longitude": "30.4742082"
  },
  {
    "label": "Кола",
    "latitude": "68.8785079",
    "longitude": "33.0262014"
  },
  {
    "label": "Мончегорск",
    "latitude": "67.9385206",
    "longitude": "32.9358886"
  },
  {
    "label": "Мурманск",
    "latitude": "69.0076958",
    "longitude": "33.0686019"
  },
  {
    "label": "Оленегорск",
    "latitude": "68.1422068",
    "longitude": "33.2670094"
  },
  {
    "label": "Островной",
    "latitude": "68.0509133",
    "longitude": "39.5076034"
  },
  {
    "label": "Полярные Зори",
    "latitude": "67.3730192",
    "longitude": "32.497541"
  },
  {
    "label": "Полярный",
    "latitude": "69.1988373",
    "longitude": "33.4509985"
  },
  {
    "label": "Североморск",
    "latitude": "69.0765029",
    "longitude": "33.4178354"
  },
  {
    "label": "Снежногорск",
    "latitude": "69.1921469",
    "longitude": "33.2382821"
  },
  {
    "label": "Нарьян-Мар",
    "latitude": "67.6381525",
    "longitude": "53.0069336"
  },
  {
    "label": "Арзамас",
    "latitude": "55.3947544",
    "longitude": "43.8407855"
  },
  {
    "label": "Балахна",
    "latitude": "56.4949932",
    "longitude": "43.5758953"
  },
  {
    "label": "Богородск",
    "latitude": "56.1019905",
    "longitude": "43.513678"
  },
  {
    "label": "Бор",
    "latitude": "56.3565179",
    "longitude": "44.0644851"
  },
  {
    "label": "Ветлуга",
    "latitude": "57.8558395",
    "longitude": "45.7762692"
  },
  {
    "label": "Володарск",
    "latitude": "56.2168974",
    "longitude": "43.1597623"
  },
  {
    "label": "Ворсма",
    "latitude": "55.9900425",
    "longitude": "43.2719879"
  },
  {
    "label": "Выкса",
    "latitude": "55.3207103",
    "longitude": "42.1679169"
  },
  {
    "label": "Горбатов",
    "latitude": "56.1307901",
    "longitude": "43.0626829"
  },
  {
    "label": "Городец",
    "latitude": "56.6447459",
    "longitude": "43.4722975"
  },
  {
    "label": "Дзержинск",
    "latitude": "56.2376438",
    "longitude": "43.4599363"
  },
  {
    "label": "Заволжье",
    "latitude": "56.6404237",
    "longitude": "43.3871565"
  },
  {
    "label": "Княгинино",
    "latitude": "55.8205157",
    "longitude": "45.0322947"
  },
  {
    "label": "Кстово",
    "latitude": "56.1433353",
    "longitude": "44.1665081"
  },
  {
    "label": "Кулебаки",
    "latitude": "55.429716",
    "longitude": "42.512483"
  },
  {
    "label": "Лукоянов",
    "latitude": "55.0327349",
    "longitude": "44.4933829"
  },
  {
    "label": "Лысково",
    "latitude": "56.0262298",
    "longitude": "45.0356702"
  },
  {
    "label": "Навашино",
    "latitude": "55.5439105",
    "longitude": "42.1887734"
  },
  {
    "label": "Нижний Новгород",
    "latitude": "56.3242093",
    "longitude": "44.0053948"
  },
  {
    "label": "Павлово",
    "latitude": "55.9797995",
    "longitude": "43.0996232"
  },
  {
    "label": "Первомайск",
    "latitude": "54.8676182",
    "longitude": "43.8012829"
  },
  {
    "label": "Перевоз",
    "latitude": "55.596904",
    "longitude": "44.5450268"
  },
  {
    "label": "Саров",
    "latitude": "54.9227002",
    "longitude": "43.3447792"
  },
  {
    "label": "Семенов",
    "latitude": "56.788935",
    "longitude": "44.4903571"
  },
  {
    "label": "Сергач",
    "latitude": "55.5200364",
    "longitude": "45.4813193"
  },
  {
    "label": "Урень",
    "latitude": "57.4612547",
    "longitude": "45.783394"
  },
  {
    "label": "Чкаловск",
    "latitude": "56.7651549",
    "longitude": "43.2420193"
  },
  {
    "label": "Шахунья",
    "latitude": "57.6764773",
    "longitude": "46.6129673"
  },
  {
    "label": "Боровичи",
    "latitude": "58.3839866",
    "longitude": "33.9176761"
  },
  {
    "label": "Валдай",
    "latitude": "57.9822906",
    "longitude": "33.2369492"
  },
  {
    "label": "Великий Новгород",
    "latitude": "58.5214003",
    "longitude": "31.2755051"
  },
  {
    "label": "Малая Вишера",
    "latitude": "58.8458076",
    "longitude": "32.2247984"
  },
  {
    "label": "Окуловка",
    "latitude": "58.3908717",
    "longitude": "33.2902474"
  },
  {
    "label": "Пестово",
    "latitude": "58.5973944",
    "longitude": "35.8144523"
  },
  {
    "label": "Сольцы",
    "latitude": "58.1201693",
    "longitude": "30.309285"
  },
  {
    "label": "Старая Русса",
    "latitude": "57.9906873",
    "longitude": "31.3555076"
  },
  {
    "label": "Холм",
    "latitude": "57.1451036",
    "longitude": "31.1787812"
  },
  {
    "label": "Чудово",
    "latitude": "59.1247477",
    "longitude": "31.6865406"
  },
  {
    "label": "Барабинск",
    "latitude": "55.3515917",
    "longitude": "78.3465012"
  },
  {
    "label": "Бердск",
    "latitude": "54.7582375",
    "longitude": "83.1072212"
  },
  {
    "label": "Болотное",
    "latitude": "55.6693773",
    "longitude": "84.3906599"
  },
  {
    "label": "Искитим",
    "latitude": "54.6266869",
    "longitude": "83.2951444"
  },
  {
    "label": "Карасук",
    "latitude": "53.7343772",
    "longitude": "78.042457"
  },
  {
    "label": "Каргат",
    "latitude": "55.1943829",
    "longitude": "80.2831324"
  },
  {
    "label": "Куйбышев",
    "latitude": "55.4684104",
    "longitude": "78.3241042"
  },
  {
    "label": "Купино",
    "latitude": "54.3660317",
    "longitude": "77.2972969"
  },
  {
    "label": "Новосибирск",
    "latitude": "55.0281016",
    "longitude": "82.9210575"
  },
  {
    "label": "Обь",
    "latitude": "54.9945882",
    "longitude": "82.6937925"
  },
  {
    "label": "Татарск",
    "latitude": "55.2145894",
    "longitude": "75.9740805"
  },
  {
    "label": "Тогучин",
    "latitude": "55.2250038",
    "longitude": "84.4103867"
  },
  {
    "label": "Черепаново",
    "latitude": "54.2206974",
    "longitude": "83.3724392"
  },
  {
    "label": "Чулым",
    "latitude": "55.0906205",
    "longitude": "80.9592152"
  },
  {
    "label": "Исилькуль",
    "latitude": "54.9096156",
    "longitude": "71.2816107"
  },
  {
    "label": "Калачинск",
    "latitude": "55.0598547",
    "longitude": "74.5655075"
  },
  {
    "label": "Называевск",
    "latitude": "55.5688811",
    "longitude": "71.3502572"
  },
  {
    "label": "Омск",
    "latitude": "54.9848136",
    "longitude": "73.3674638"
  },
  {
    "label": "Тара",
    "latitude": "56.9159171",
    "longitude": "74.3649643"
  },
  {
    "label": "Тюкалинск",
    "latitude": "55.8705121",
    "longitude": "72.1956156"
  },
  {
    "label": "Абдулино",
    "latitude": "53.6778096",
    "longitude": "53.6473115"
  },
  {
    "label": "Бугуруслан",
    "latitude": "53.6522636",
    "longitude": "52.4326166"
  },
  {
    "label": "Бузулук",
    "latitude": "52.7881434",
    "longitude": "52.2623757"
  },
  {
    "label": "Гай",
    "latitude": "51.4649138",
    "longitude": "58.4436189"
  },
  {
    "label": "Кувандык",
    "latitude": "51.4784845",
    "longitude": "57.3612029"
  },
  {
    "label": "Медногорск",
    "latitude": "51.4039421",
    "longitude": "57.5832185"
  },
  {
    "label": "Новотроицк",
    "latitude": "51.1965071",
    "longitude": "58.3017455"
  },
  {
    "label": "Оренбург",
    "latitude": "51.7875191",
    "longitude": "55.1017379"
  },
  {
    "label": "Орск",
    "latitude": "51.2293069",
    "longitude": "58.4751889"
  },
  {
    "label": "Соль-Илецк",
    "latitude": "51.1634976",
    "longitude": "54.9895391"
  },
  {
    "label": "Сорочинск",
    "latitude": "52.4265081",
    "longitude": "53.1542123"
  },
  {
    "label": "Ясный",
    "latitude": "51.0369499",
    "longitude": "59.8743256"
  },
  {
    "label": "Болхов",
    "latitude": "53.4440204",
    "longitude": "36.0076969"
  },
  {
    "label": "Дмитровск",
    "latitude": "52.5053481",
    "longitude": "35.141535"
  },
  {
    "label": "Ливны",
    "latitude": "52.4285122",
    "longitude": "37.603944"
  },
  {
    "label": "Малоархангельск",
    "latitude": "52.4001151",
    "longitude": "36.5037931"
  },
  {
    "label": "Мценск",
    "latitude": "53.2790021",
    "longitude": "36.574992"
  },
  {
    "label": "Новосиль",
    "latitude": "52.9747225",
    "longitude": "37.0438402"
  },
  {
    "label": "Орёл",
    "latitude": "52.9672573",
    "longitude": "36.0696479"
  },
  {
    "label": "Белинский",
    "latitude": "52.9641169",
    "longitude": "43.4185003"
  },
  {
    "label": "Городище",
    "latitude": "53.2727888",
    "longitude": "45.702731"
  },
  {
    "label": "Заречный",
    "latitude": "53.1961009",
    "longitude": "45.1691502"
  },
  {
    "label": "Каменка",
    "latitude": "53.1855474",
    "longitude": "44.0468501"
  },
  {
    "label": "Кузнецк",
    "latitude": "53.1131686",
    "longitude": "46.6052497"
  },
  {
    "label": "Нижний Ломов",
    "latitude": "53.5301274",
    "longitude": "43.6729216"
  },
  {
    "label": "Никольск",
    "latitude": "53.7138397",
    "longitude": "46.079962"
  },
  {
    "label": "Пенза",
    "latitude": "53.1753884",
    "longitude": "45.0347408"
  },
  {
    "label": "Сердобск",
    "latitude": "52.4697532",
    "longitude": "44.2122688"
  },
  {
    "label": "Спасск",
    "latitude": "53.927163",
    "longitude": "43.1860475"
  },
  {
    "label": "Сурск",
    "latitude": "53.0760597",
    "longitude": "45.6911897"
  },
  {
    "label": "Александровск",
    "latitude": "59.1613773",
    "longitude": "57.5764851"
  },
  {
    "label": "Березники",
    "latitude": "59.4079898",
    "longitude": "56.8040725"
  },
  {
    "label": "Верещагино",
    "latitude": "58.0797908",
    "longitude": "54.6580948"
  },
  {
    "label": "Горнозаводск",
    "latitude": "58.3743406",
    "longitude": "58.3230329"
  },
  {
    "label": "Гремячинск",
    "latitude": "58.5625603",
    "longitude": "57.8520073"
  },
  {
    "label": "Губаха",
    "latitude": "58.837024",
    "longitude": "57.5544441"
  },
  {
    "label": "Добрянка",
    "latitude": "58.4696353",
    "longitude": "56.4131294"
  },
  {
    "label": "Кизел",
    "latitude": "59.0511764",
    "longitude": "57.6471214"
  },
  {
    "label": "Красновишерск",
    "latitude": "60.3902242",
    "longitude": "57.0537244"
  },
  {
    "label": "Краснокамск",
    "latitude": "58.0820946",
    "longitude": "55.7479797"
  },
  {
    "label": "Кудымкар",
    "latitude": "59.0168605",
    "longitude": "54.6573459"
  },
  {
    "label": "Кунгур",
    "latitude": "57.4283217",
    "longitude": "56.9437787"
  },
  {
    "label": "Лысьва",
    "latitude": "58.0995987",
    "longitude": "57.8085728"
  },
  {
    "label": "Нытва",
    "latitude": "57.9337429",
    "longitude": "55.3357261"
  },
  {
    "label": "Оса",
    "latitude": "57.2889992",
    "longitude": "55.4688982"
  },
  {
    "label": "Оханск",
    "latitude": "57.7178946",
    "longitude": "55.387153"
  },
  {
    "label": "Очер",
    "latitude": "57.8851991",
    "longitude": "54.7161756"
  },
  {
    "label": "Пермь",
    "latitude": "58.0103211",
    "longitude": "56.2341778"
  },
  {
    "label": "Соликамск",
    "latitude": "59.6483518",
    "longitude": "56.7710358"
  },
  {
    "label": "Усолье",
    "latitude": "59.4279356",
    "longitude": "56.6837783"
  },
  {
    "label": "Чайковский",
    "latitude": "56.7780203",
    "longitude": "54.1478482"
  },
  {
    "label": "Чердынь",
    "latitude": "60.4011184",
    "longitude": "56.4801391"
  },
  {
    "label": "Чермоз",
    "latitude": "58.7842527",
    "longitude": "56.1507562"
  },
  {
    "label": "Чернушка",
    "latitude": "56.5161079",
    "longitude": "56.0763919"
  },
  {
    "label": "Чусовой",
    "latitude": "58.2974725",
    "longitude": "57.8193122"
  },
  {
    "label": "Арсеньев",
    "latitude": "44.16208",
    "longitude": "133.269622"
  },
  {
    "label": "Артем",
    "latitude": "43.350053",
    "longitude": "132.1596594"
  },
  {
    "label": "Большой Камень",
    "latitude": "43.1112737",
    "longitude": "132.3480354"
  },
  {
    "label": "Владивосток",
    "latitude": "43.1163807",
    "longitude": "131.882348"
  },
  {
    "label": "Дальнегорск",
    "latitude": "44.5539909",
    "longitude": "135.5662536"
  },
  {
    "label": "Дальнереченск",
    "latitude": "45.9307882",
    "longitude": "133.7316542"
  },
  {
    "label": "Лесозаводск",
    "latitude": "45.4780192",
    "longitude": "133.4185501"
  },
  {
    "label": "Находка",
    "latitude": "42.8240404",
    "longitude": "132.8927812"
  },
  {
    "label": "Партизанск",
    "latitude": "43.1279833",
    "longitude": "133.1264754"
  },
  {
    "label": "Спасск-Дальний",
    "latitude": "44.5900929",
    "longitude": "132.8157564"
  },
  {
    "label": "Уссурийск",
    "latitude": "43.79726",
    "longitude": "131.9517262"
  },
  {
    "label": "Фокино",
    "latitude": "42.9707163",
    "longitude": "132.4110209"
  },
  {
    "label": "Великие Луки",
    "latitude": "56.3321847",
    "longitude": "30.550757"
  },
  {
    "label": "Гдов",
    "latitude": "58.7432585",
    "longitude": "27.8263328"
  },
  {
    "label": "Дно",
    "latitude": "57.8269802",
    "longitude": "29.9629569"
  },
  {
    "label": "Невель",
    "latitude": "56.0201544",
    "longitude": "29.9240505"
  },
  {
    "label": "Новоржев",
    "latitude": "57.0298332",
    "longitude": "29.343333"
  },
  {
    "label": "Новосокольники",
    "latitude": "56.3407627",
    "longitude": "30.1527712"
  },
  {
    "label": "Опочка",
    "latitude": "56.7107956",
    "longitude": "28.6717455"
  },
  {
    "label": "Остров",
    "latitude": "57.3452408",
    "longitude": "28.3437107"
  },
  {
    "label": "Печоры",
    "latitude": "57.8146689",
    "longitude": "27.6222823"
  },
  {
    "label": "Порхов",
    "latitude": "57.7764223",
    "longitude": "29.5436424"
  },
  {
    "label": "Псков",
    "latitude": "57.819284",
    "longitude": "28.3318188"
  },
  {
    "label": "Пустошка",
    "latitude": "56.3375131",
    "longitude": "29.3668243"
  },
  {
    "label": "Пыталово",
    "latitude": "57.0637109",
    "longitude": "27.9234759"
  },
  {
    "label": "Себеж",
    "latitude": "56.2907663",
    "longitude": "28.4725735"
  },
  {
    "label": "Азов",
    "latitude": "47.1120631",
    "longitude": "39.4232597"
  },
  {
    "label": "Аксай",
    "latitude": "47.2676075",
    "longitude": "39.8755485"
  },
  {
    "label": "Батайск",
    "latitude": "47.138321",
    "longitude": "39.7508382"
  },
  {
    "label": "Белая Калитва",
    "latitude": "48.176948",
    "longitude": "40.8033169"
  },
  {
    "label": "Волгодонск",
    "latitude": "47.5165181",
    "longitude": "42.1984531"
  },
  {
    "label": "Гуково",
    "latitude": "48.0449422",
    "longitude": "39.9484635"
  },
  {
    "label": "Донецк",
    "latitude": "48.3350928",
    "longitude": "39.9460654"
  },
  {
    "label": "Зверево",
    "latitude": "48.043451",
    "longitude": "40.1264948"
  },
  {
    "label": "Зерноград",
    "latitude": "46.8494991",
    "longitude": "40.312765"
  },
  {
    "label": "Каменск-Шахтинский",
    "latitude": "48.3204412",
    "longitude": "40.268874"
  },
  {
    "label": "Константиновск",
    "latitude": "47.5773456",
    "longitude": "41.0967362"
  },
  {
    "label": "Красный Сулин",
    "latitude": "47.8830826",
    "longitude": "40.0781385"
  },
  {
    "label": "Миллерово",
    "latitude": "48.925821",
    "longitude": "40.3983302"
  },
  {
    "label": "Морозовск",
    "latitude": "48.3511724",
    "longitude": "41.8308006"
  },
  {
    "label": "Новочеркасск",
    "latitude": "47.4119248",
    "longitude": "40.1042066"
  },
  {
    "label": "Новошахтинск",
    "latitude": "47.7576522",
    "longitude": "39.9364709"
  },
  {
    "label": "Пролетарск",
    "latitude": "46.7038968",
    "longitude": "41.7274533"
  },
  {
    "label": "Ростов-на-Дону",
    "latitude": "47.2224364",
    "longitude": "39.7187866"
  },
  {
    "label": "Сальск",
    "latitude": "46.4751689",
    "longitude": "41.5412229"
  },
  {
    "label": "Семикаракорск",
    "latitude": "47.5177981",
    "longitude": "40.811585"
  },
  {
    "label": "Таганрог",
    "latitude": "47.2094907",
    "longitude": "38.935154"
  },
  {
    "label": "Цимлянск",
    "latitude": "47.6477668",
    "longitude": "42.093022"
  },
  {
    "label": "Шахты",
    "latitude": "47.7084247",
    "longitude": "40.2159154"
  },
  {
    "label": "Касимов",
    "latitude": "54.9373788",
    "longitude": "41.3912912"
  },
  {
    "label": "Кораблино",
    "latitude": "53.9245422",
    "longitude": "40.0227867"
  },
  {
    "label": "Михайлов",
    "latitude": "54.2296493",
    "longitude": "39.0090857"
  },
  {
    "label": "Новомичуринск",
    "latitude": "54.0377979",
    "longitude": "39.7467023"
  },
  {
    "label": "Рыбное",
    "latitude": "54.7255937",
    "longitude": "39.513438"
  },
  {
    "label": "Ряжск",
    "latitude": "53.7067718",
    "longitude": "40.0521358"
  },
  {
    "label": "Рязань",
    "latitude": "54.625457",
    "longitude": "39.7359992"
  },
  {
    "label": "Сасово",
    "latitude": "54.350807",
    "longitude": "41.9117458"
  },
  {
    "label": "Скопин",
    "latitude": "53.8236028",
    "longitude": "39.5493286"
  },
  {
    "label": "Спас-Клепики",
    "latitude": "55.1291472",
    "longitude": "40.1745036"
  },
  {
    "label": "Спасск-Рязанский",
    "latitude": "54.4071497",
    "longitude": "40.3764367"
  },
  {
    "label": "Шацк",
    "latitude": "54.0288845",
    "longitude": "41.7182108"
  },
  {
    "label": "Жигулевск",
    "latitude": "53.4011545",
    "longitude": "49.494529"
  },
  {
    "label": "Кинель",
    "latitude": "53.2209985",
    "longitude": "50.6343039"
  },
  {
    "label": "Нефтегорск",
    "latitude": "52.797259",
    "longitude": "51.1637126"
  },
  {
    "label": "Новокуйбышевск",
    "latitude": "53.0995303",
    "longitude": "49.9477662"
  },
  {
    "label": "Октябрьск",
    "latitude": "53.1640886",
    "longitude": "48.6707463"
  },
  {
    "label": "Отрадный",
    "latitude": "53.3800609",
    "longitude": "51.3438695"
  },
  {
    "label": "Похвистнево",
    "latitude": "53.6498197",
    "longitude": "52.1235517"
  },
  {
    "label": "Самара",
    "latitude": "53.1951657",
    "longitude": "50.1067691"
  },
  {
    "label": "Сызрань",
    "latitude": "53.1557213",
    "longitude": "48.4745419"
  },
  {
    "label": "Тольятти",
    "latitude": "53.5206438",
    "longitude": "49.389461"
  },
  {
    "label": "Чапаевск",
    "latitude": "52.9289662",
    "longitude": "49.8674222"
  },
  {
    "label": "",
    "latitude": "59.939125",
    "longitude": "30.3158225"
  },
  {
    "label": "Аркадак",
    "latitude": "51.9387813",
    "longitude": "43.4997558"
  },
  {
    "label": "Аткарск",
    "latitude": "51.8736331",
    "longitude": "45.0003199"
  },
  {
    "label": "Балаково",
    "latitude": "52.0222694",
    "longitude": "47.7828146"
  },
  {
    "label": "Балашов",
    "latitude": "51.5389502",
    "longitude": "43.1839828"
  },
  {
    "label": "Вольск",
    "latitude": "52.0459932",
    "longitude": "47.3873504"
  },
  {
    "label": "Ершов",
    "latitude": "51.3508407",
    "longitude": "48.2763313"
  },
  {
    "label": "Калининск",
    "latitude": "51.4992917",
    "longitude": "44.4710177"
  },
  {
    "label": "Красноармейск",
    "latitude": "51.0236026",
    "longitude": "45.695141"
  },
  {
    "label": "Красный Кут",
    "latitude": "50.9596867",
    "longitude": "46.9712472"
  },
  {
    "label": "Маркс",
    "latitude": "51.7133973",
    "longitude": "46.7400684"
  },
  {
    "label": "Новоузенск",
    "latitude": "50.4551744",
    "longitude": "48.1412622"
  },
  {
    "label": "Петровск",
    "latitude": "52.3093782",
    "longitude": "45.3851649"
  },
  {
    "label": "Пугачев",
    "latitude": "52.0158464",
    "longitude": "48.7972652"
  },
  {
    "label": "Ртищево",
    "latitude": "52.2616298",
    "longitude": "43.7842399"
  },
  {
    "label": "Саратов",
    "latitude": "51.530376",
    "longitude": "45.9530257"
  },
  {
    "label": "Хвалынск",
    "latitude": "52.4950057",
    "longitude": "48.1045147"
  },
  {
    "label": "Шиханы",
    "latitude": "52.1148241",
    "longitude": "47.2022928"
  },
  {
    "label": "Энгельс",
    "latitude": "51.4854893",
    "longitude": "46.1267479"
  },
  {
    "label": "Александровск-Сахалинский",
    "latitude": "50.8973664",
    "longitude": "142.1579322"
  },
  {
    "label": "Анива",
    "latitude": "46.7132526",
    "longitude": "142.5265052"
  },
  {
    "label": "Долинск",
    "latitude": "47.3255903",
    "longitude": "142.7945985"
  },
  {
    "label": "Корсаков",
    "latitude": "46.6323995",
    "longitude": "142.7994094"
  },
  {
    "label": "Курильск",
    "latitude": "45.2271915",
    "longitude": "147.8796713"
  },
  {
    "label": "Макаров",
    "latitude": "48.6236287",
    "longitude": "142.7803508"
  },
  {
    "label": "Невельск",
    "latitude": "46.6527314",
    "longitude": "141.8631741"
  },
  {
    "label": "Оха",
    "latitude": "53.5868238",
    "longitude": "142.941221"
  },
  {
    "label": "Поронайск",
    "latitude": "49.2387983",
    "longitude": "143.1007104"
  },
  {
    "label": "Северо-Курильск",
    "latitude": "50.6731056",
    "longitude": "156.1280722"
  },
  {
    "label": "Томари",
    "latitude": "47.7619957",
    "longitude": "142.061508"
  },
  {
    "label": "Углегорск",
    "latitude": "49.0816311",
    "longitude": "142.0693033"
  },
  {
    "label": "Холмск",
    "latitude": "47.0408637",
    "longitude": "142.0416619"
  },
  {
    "label": "Южно-Сахалинск",
    "latitude": "46.959133",
    "longitude": "142.7381252"
  },
  {
    "label": "Алапаевск",
    "latitude": "57.8475542",
    "longitude": "61.6693934"
  },
  {
    "label": "Арамиль",
    "latitude": "56.6945341",
    "longitude": "60.8343825"
  },
  {
    "label": "Артемовский",
    "latitude": "57.3384162",
    "longitude": "61.8946599"
  },
  {
    "label": "Асбест",
    "latitude": "57.0052428",
    "longitude": "61.4581071"
  },
  {
    "label": "Березовский",
    "latitude": "56.9096284",
    "longitude": "60.8180256"
  },
  {
    "label": "Богданович",
    "latitude": "56.7764419",
    "longitude": "62.0463692"
  },
  {
    "label": "Верхний Тагил",
    "latitude": "57.3762768",
    "longitude": "59.9516521"
  },
  {
    "label": "Верхняя Пышма",
    "latitude": "56.9757833",
    "longitude": "60.564885"
  },
  {
    "label": "Верхняя Салда",
    "latitude": "58.0466039",
    "longitude": "60.5560397"
  },
  {
    "label": "Верхняя Тура",
    "latitude": "58.3643839",
    "longitude": "59.8266854"
  },
  {
    "label": "Верхотурье",
    "latitude": "58.8621145",
    "longitude": "60.8104543"
  },
  {
    "label": "Волчанск",
    "latitude": "59.9350515",
    "longitude": "60.0797964"
  },
  {
    "label": "Дегтярск",
    "latitude": "56.7048199",
    "longitude": "60.0792227"
  },
  {
    "label": "Екатеринбург",
    "latitude": "56.8386326",
    "longitude": "60.6054887"
  },
  {
    "label": "Заречный",
    "latitude": "56.8103345",
    "longitude": "61.3380592"
  },
  {
    "label": "Ивдель",
    "latitude": "60.6944353",
    "longitude": "60.4244661"
  },
  {
    "label": "Ирбит",
    "latitude": "57.6838406",
    "longitude": "63.0576639"
  },
  {
    "label": "Каменск-Уральский",
    "latitude": "56.4149095",
    "longitude": "61.9189837"
  },
  {
    "label": "Камышлов",
    "latitude": "56.8465469",
    "longitude": "62.7120432"
  },
  {
    "label": "Карпинск",
    "latitude": "59.7664444",
    "longitude": "60.0011798"
  },
  {
    "label": "Качканар",
    "latitude": "58.7051759",
    "longitude": "59.4840198"
  },
  {
    "label": "Кировград",
    "latitude": "57.4298451",
    "longitude": "60.0623588"
  },
  {
    "label": "Краснотурьинск",
    "latitude": "59.7636934",
    "longitude": "60.1934451"
  },
  {
    "label": "Красноуральск",
    "latitude": "58.3486334",
    "longitude": "60.0409011"
  },
  {
    "label": "Красноуфимск",
    "latitude": "56.6122864",
    "longitude": "57.7636958"
  },
  {
    "label": "Кушва",
    "latitude": "58.2825406",
    "longitude": "59.7646113"
  },
  {
    "label": "Лесной",
    "latitude": "58.634981",
    "longitude": "59.7980528"
  },
  {
    "label": "Михайловск",
    "latitude": "56.4369736",
    "longitude": "59.113865"
  },
  {
    "label": "Невьянск",
    "latitude": "57.491233",
    "longitude": "60.2181839"
  },
  {
    "label": "Нижние Серги",
    "latitude": "56.6544606",
    "longitude": "59.2952291"
  },
  {
    "label": "Нижний Тагил",
    "latitude": "57.9101038",
    "longitude": "59.9813242"
  },
  {
    "label": "Нижняя Салда",
    "latitude": "58.0749243",
    "longitude": "60.7026555"
  },
  {
    "label": "Нижняя Тура",
    "latitude": "58.6310942",
    "longitude": "59.8521265"
  },
  {
    "label": "Новая Ляля",
    "latitude": "59.053961",
    "longitude": "60.5945405"
  },
  {
    "label": "Новоуральск",
    "latitude": "57.2471507",
    "longitude": "60.095701"
  },
  {
    "label": "Первоуральск",
    "latitude": "56.9081665",
    "longitude": "59.9429205"
  },
  {
    "label": "Полевской",
    "latitude": "56.4958085",
    "longitude": "60.2366314"
  },
  {
    "label": "Ревда",
    "latitude": "56.79869",
    "longitude": "59.9071464"
  },
  {
    "label": "Реж",
    "latitude": "57.3717914",
    "longitude": "61.3833223"
  },
  {
    "label": "Североуральск",
    "latitude": "60.1533333",
    "longitude": "59.9525274"
  },
  {
    "label": "Серов",
    "latitude": "59.6048651",
    "longitude": "60.5752136"
  },
  {
    "label": "Среднеуральск",
    "latitude": "56.991883",
    "longitude": "60.4771953"
  },
  {
    "label": "Сухой Лог",
    "latitude": "56.9075938",
    "longitude": "62.0358708"
  },
  {
    "label": "Сысерть",
    "latitude": "56.50052",
    "longitude": "60.8190708"
  },
  {
    "label": "Тавда",
    "latitude": "58.0434196",
    "longitude": "65.2743232"
  },
  {
    "label": "Талица",
    "latitude": "57.0123359",
    "longitude": "63.7322467"
  },
  {
    "label": "Туринск",
    "latitude": "58.0394258",
    "longitude": "63.698142"
  },
  {
    "label": "Инкерман",
    "latitude": "44.6135153",
    "longitude": "33.6100739"
  },
  {
    "label": "",
    "latitude": "44.6167334",
    "longitude": "33.5253552"
  },
  {
    "label": "Алагир",
    "latitude": "43.0416151",
    "longitude": "44.2198622"
  },
  {
    "label": "Ардон",
    "latitude": "43.1756719",
    "longitude": "44.2955701"
  },
  {
    "label": "Беслан",
    "latitude": "43.1937634",
    "longitude": "44.5338746"
  },
  {
    "label": "Владикавказ",
    "latitude": "43.0205039",
    "longitude": "44.6819383"
  },
  {
    "label": "Дигора",
    "latitude": "43.1567386",
    "longitude": "44.1551132"
  },
  {
    "label": "Моздок",
    "latitude": "43.7471209",
    "longitude": "44.6571456"
  },
  {
    "label": "Велиж",
    "latitude": "55.6058845",
    "longitude": "31.1857376"
  },
  {
    "label": "Вязьма",
    "latitude": "55.2115563",
    "longitude": "34.2951196"
  },
  {
    "label": "Гагарин",
    "latitude": "55.5526532",
    "longitude": "34.9949049"
  },
  {
    "label": "Демидов",
    "latitude": "55.2682611",
    "longitude": "31.5062078"
  },
  {
    "label": "Десногорск",
    "latitude": "54.1465117",
    "longitude": "33.2834063"
  },
  {
    "label": "Дорогобуж",
    "latitude": "54.9137794",
    "longitude": "33.3024596"
  },
  {
    "label": "Духовщина",
    "latitude": "55.1950509",
    "longitude": "32.4012351"
  },
  {
    "label": "Ельня",
    "latitude": "54.5836832",
    "longitude": "33.1749566"
  },
  {
    "label": "Починок",
    "latitude": "54.4063031",
    "longitude": "32.4397914"
  },
  {
    "label": "Рославль",
    "latitude": "53.9449601",
    "longitude": "32.8479617"
  },
  {
    "label": "Рудня",
    "latitude": "54.9441357",
    "longitude": "31.0794758"
  },
  {
    "label": "Сафоново",
    "latitude": "55.1199868",
    "longitude": "33.233799"
  },
  {
    "label": "Смоленск",
    "latitude": "54.7867168",
    "longitude": "31.8153366"
  },
  {
    "label": "Сычевка",
    "latitude": "55.8307397",
    "longitude": "34.277868"
  },
  {
    "label": "Ярцево",
    "latitude": "55.0564933",
    "longitude": "32.6902457"
  },
  {
    "label": "Благодарный",
    "latitude": "45.0990834",
    "longitude": "43.4307042"
  },
  {
    "label": "Буденновск",
    "latitude": "44.7814437",
    "longitude": "44.1650859"
  },
  {
    "label": "Георгиевск",
    "latitude": "44.1486421",
    "longitude": "43.4739718"
  },
  {
    "label": "Ессентуки",
    "latitude": "44.044461",
    "longitude": "42.8589078"
  },
  {
    "label": "Железноводск",
    "latitude": "44.1320689",
    "longitude": "43.0306475"
  },
  {
    "label": "Зеленокумск",
    "latitude": "44.403359",
    "longitude": "43.8841326"
  },
  {
    "label": "Изобильный",
    "latitude": "45.3684342",
    "longitude": "41.7086448"
  },
  {
    "label": "Ипатово",
    "latitude": "45.7181897",
    "longitude": "42.8969695"
  },
  {
    "label": "Кисловодск",
    "latitude": "43.905235",
    "longitude": "42.7167187"
  },
  {
    "label": "Лермонтов",
    "latitude": "44.1052526",
    "longitude": "42.9731433"
  },
  {
    "label": "Минеральные Воды",
    "latitude": "44.2088942",
    "longitude": "43.1383482"
  },
  {
    "label": "Михайловск",
    "latitude": "45.1296297",
    "longitude": "42.028787"
  },
  {
    "label": "Невинномысск",
    "latitude": "44.6227404",
    "longitude": "41.9476147"
  },
  {
    "label": "Нефтекумск",
    "latitude": "44.7544866",
    "longitude": "44.9865041"
  },
  {
    "label": "Новоалександровск",
    "latitude": "45.4933561",
    "longitude": "41.2154482"
  },
  {
    "label": "Новопавловск",
    "latitude": "43.9617565",
    "longitude": "43.6342855"
  },
  {
    "label": "Пятигорск",
    "latitude": "44.0411669",
    "longitude": "43.0661091"
  },
  {
    "label": "Светлоград",
    "latitude": "45.3284769",
    "longitude": "42.8566923"
  },
  {
    "label": "Ставрополь",
    "latitude": "45.0445439",
    "longitude": "41.9690168"
  },
  {
    "label": "Жердевка",
    "latitude": "51.8421783",
    "longitude": "41.4617407"
  },
  {
    "label": "Кирсанов",
    "latitude": "52.650594",
    "longitude": "42.7284872"
  },
  {
    "label": "Котовск",
    "latitude": "52.592393",
    "longitude": "41.5102486"
  },
  {
    "label": "Мичуринск",
    "latitude": "52.891294",
    "longitude": "40.510475"
  },
  {
    "label": "Моршанск",
    "latitude": "53.4436469",
    "longitude": "41.8115687"
  },
  {
    "label": "Рассказово",
    "latitude": "52.6537517",
    "longitude": "41.8743779"
  },
  {
    "label": "Тамбов",
    "latitude": "52.7213021",
    "longitude": "41.452258"
  },
  {
    "label": "Уварово",
    "latitude": "51.9768835",
    "longitude": "42.2529568"
  },
  {
    "label": "Агрыз",
    "latitude": "56.5232645",
    "longitude": "52.994257"
  },
  {
    "label": "Азнакаево",
    "latitude": "54.8599054",
    "longitude": "53.0745505"
  },
  {
    "label": "Альметьевск",
    "latitude": "54.9013662",
    "longitude": "52.2970654"
  },
  {
    "label": "Арск",
    "latitude": "56.0913636",
    "longitude": "49.8770441"
  },
  {
    "label": "Бавлы",
    "latitude": "54.4063588",
    "longitude": "53.2457946"
  },
  {
    "label": "Болгар",
    "latitude": "54.9748862",
    "longitude": "49.0302977"
  },
  {
    "label": "Бугульма",
    "latitude": "54.5363428",
    "longitude": "52.7895286"
  },
  {
    "label": "Буинск",
    "latitude": "54.9641106",
    "longitude": "48.2900576"
  },
  {
    "label": "Елабуга",
    "latitude": "55.7566727",
    "longitude": "52.0544438"
  },
  {
    "label": "Заинск",
    "latitude": "55.2988854",
    "longitude": "52.0063634"
  },
  {
    "label": "Зеленодольск",
    "latitude": "55.8466751",
    "longitude": "48.5010882"
  },
  {
    "label": "Иннополис",
    "latitude": "55.7521544",
    "longitude": "48.7446161"
  },
  {
    "label": "Казань",
    "latitude": "55.7943877",
    "longitude": "49.1115312"
  },
  {
    "label": "Лаишево",
    "latitude": "55.4042646",
    "longitude": "49.5498201"
  },
  {
    "label": "Лениногорск",
    "latitude": "54.5966917",
    "longitude": "52.4432118"
  },
  {
    "label": "Мамадыш",
    "latitude": "55.7149876",
    "longitude": "51.4128614"
  },
  {
    "label": "Менделеевск",
    "latitude": "55.8950646",
    "longitude": "52.3144177"
  },
  {
    "label": "Мензелинск",
    "latitude": "55.7270908",
    "longitude": "53.1005321"
  },
  {
    "label": "Набережные Челны",
    "latitude": "55.7436475",
    "longitude": "52.3958739"
  },
  {
    "label": "Нижнекамск",
    "latitude": "55.6311963",
    "longitude": "51.814407"
  },
  {
    "label": "Нурлат",
    "latitude": "54.4281578",
    "longitude": "50.8050431"
  },
  {
    "label": "Тетюши",
    "latitude": "54.936575",
    "longitude": "48.8314915"
  },
  {
    "label": "Чистополь",
    "latitude": "55.3699372",
    "longitude": "50.628495"
  },
  {
    "label": "Андреаполь",
    "latitude": "56.6507072",
    "longitude": "32.2621196"
  },
  {
    "label": "Бежецк",
    "latitude": "57.7861144",
    "longitude": "36.6903445"
  },
  {
    "label": "Белый",
    "latitude": "55.8337663",
    "longitude": "32.9388976"
  },
  {
    "label": "Бологое",
    "latitude": "57.885655",
    "longitude": "34.0536895"
  },
  {
    "label": "Весьегонск",
    "latitude": "58.6584004",
    "longitude": "37.2568605"
  },
  {
    "label": "Вышний Волочек",
    "latitude": "57.5683326",
    "longitude": "34.5402931"
  },
  {
    "label": "Западная Двина",
    "latitude": "56.2568002",
    "longitude": "32.0805972"
  },
  {
    "label": "Зубцов",
    "latitude": "56.1760709",
    "longitude": "34.5825504"
  },
  {
    "label": "Калязин",
    "latitude": "57.2579471",
    "longitude": "37.7821253"
  },
  {
    "label": "Кашин",
    "latitude": "57.3600486",
    "longitude": "37.6118674"
  },
  {
    "label": "Кимры",
    "latitude": "56.873359",
    "longitude": "37.3557064"
  },
  {
    "label": "Конаково",
    "latitude": "56.7275533",
    "longitude": "36.8011699"
  },
  {
    "label": "Красный Холм",
    "latitude": "58.0570193",
    "longitude": "37.1125975"
  },
  {
    "label": "Кувшиново",
    "latitude": "57.0263733",
    "longitude": "34.1676435"
  },
  {
    "label": "Лихославль",
    "latitude": "57.122256",
    "longitude": "35.4667886"
  },
  {
    "label": "Нелидово",
    "latitude": "56.2232417",
    "longitude": "32.7766656"
  },
  {
    "label": "Осташков",
    "latitude": "57.1457205",
    "longitude": "33.1116707"
  },
  {
    "label": "Ржев",
    "latitude": "56.2629393",
    "longitude": "34.3291178"
  },
  {
    "label": "Старица",
    "latitude": "56.514955",
    "longitude": "34.9335145"
  },
  {
    "label": "Тверь",
    "latitude": "56.8585396",
    "longitude": "35.9117898"
  },
  {
    "label": "Торжок",
    "latitude": "57.0412804",
    "longitude": "34.9600691"
  },
  {
    "label": "Торопец",
    "latitude": "56.5011791",
    "longitude": "31.6354366"
  },
  {
    "label": "Удомля",
    "latitude": "57.8787885",
    "longitude": "35.016716"
  },
  {
    "label": "Асино",
    "latitude": "56.9908444",
    "longitude": "86.1765724"
  },
  {
    "label": "Кедровый",
    "latitude": "57.5618465",
    "longitude": "79.5678914"
  },
  {
    "label": "Колпашево",
    "latitude": "58.3114716",
    "longitude": "82.9027528"
  },
  {
    "label": "Северск",
    "latitude": "56.6031143",
    "longitude": "84.8809687"
  },
  {
    "label": "Стрежевой",
    "latitude": "60.7328199",
    "longitude": "77.6040323"
  },
  {
    "label": "Томск",
    "latitude": "56.4847036",
    "longitude": "84.9481737"
  },
  {
    "label": "Алексин",
    "latitude": "54.5083788",
    "longitude": "37.047891"
  },
  {
    "label": "Белев",
    "latitude": "53.8113348",
    "longitude": "36.1383153"
  },
  {
    "label": "Богородицк",
    "latitude": "53.7700516",
    "longitude": "38.1225308"
  },
  {
    "label": "Болохово",
    "latitude": "54.0820644",
    "longitude": "37.826844"
  },
  {
    "label": "Венев",
    "latitude": "54.3542431",
    "longitude": "38.2642325"
  },
  {
    "label": "Донской",
    "latitude": "53.9679582",
    "longitude": "38.3372104"
  },
  {
    "label": "Ефремов",
    "latitude": "53.1465725",
    "longitude": "38.0922412"
  },
  {
    "label": "Кимовск",
    "latitude": "53.9698378",
    "longitude": "38.5380267"
  },
  {
    "label": "Киреевск",
    "latitude": "53.9321173",
    "longitude": "37.9220791"
  },
  {
    "label": "Липки",
    "latitude": "53.9418109",
    "longitude": "37.7019452"
  },
  {
    "label": "Новомосковск",
    "latitude": "54.0109754",
    "longitude": "38.2915652"
  },
  {
    "label": "Плавск",
    "latitude": "53.7095993",
    "longitude": "37.2863144"
  },
  {
    "label": "Советск",
    "latitude": "53.9337099",
    "longitude": "37.6315517"
  },
  {
    "label": "Суворов",
    "latitude": "54.1345367",
    "longitude": "36.4806933"
  },
  {
    "label": "Тула",
    "latitude": "54.192017",
    "longitude": "37.6153885"
  },
  {
    "label": "Узловая",
    "latitude": "53.9731407",
    "longitude": "38.1763104"
  },
  {
    "label": "Чекалин",
    "latitude": "54.0985105",
    "longitude": "36.2474377"
  },
  {
    "label": "Щекино",
    "latitude": "54.0020749",
    "longitude": "37.517686"
  },
  {
    "label": "Ясногорск",
    "latitude": "54.4795178",
    "longitude": "37.689669"
  },
  {
    "label": "Ак-Довурак",
    "latitude": "51.1785658",
    "longitude": "90.5984511"
  },
  {
    "label": "Кызыл",
    "latitude": "51.7191542",
    "longitude": "94.4377234"
  },
  {
    "label": "Туран",
    "latitude": "52.144932",
    "longitude": "93.9172495"
  },
  {
    "label": "Чадан",
    "latitude": "51.2844482",
    "longitude": "91.5789135"
  },
  {
    "label": "Шагонар",
    "latitude": "51.5347357",
    "longitude": "92.9199618"
  },
  {
    "label": "Заводоуковск",
    "latitude": "56.5012193",
    "longitude": "66.5505094"
  },
  {
    "label": "Ишим",
    "latitude": "56.0952037",
    "longitude": "69.4643292"
  },
  {
    "label": "Тобольск",
    "latitude": "58.2016828",
    "longitude": "68.2538392"
  },
  {
    "label": "Тюмень",
    "latitude": "57.1530824",
    "longitude": "65.5343118"
  },
  {
    "label": "Ялуторовск",
    "latitude": "56.649167",
    "longitude": "66.297034"
  },
  {
    "label": "Воткинск",
    "latitude": "57.0517641",
    "longitude": "53.9874635"
  },
  {
    "label": "Глазов",
    "latitude": "58.1359111",
    "longitude": "52.6634998"
  },
  {
    "label": "Ижевск",
    "latitude": "56.8527444",
    "longitude": "53.2113961"
  },
  {
    "label": "Камбарка",
    "latitude": "56.2659745",
    "longitude": "54.1934153"
  },
  {
    "label": "Можга",
    "latitude": "56.4427219",
    "longitude": "52.2138882"
  },
  {
    "label": "Сарапул",
    "latitude": "56.4616117",
    "longitude": "53.8036967"
  },
  {
    "label": "Барыш",
    "latitude": "53.6534563",
    "longitude": "47.1180805"
  },
  {
    "label": "Димитровград",
    "latitude": "54.2168446",
    "longitude": "49.6261645"
  },
  {
    "label": "Инза",
    "latitude": "53.8550467",
    "longitude": "46.3532786"
  },
  {
    "label": "Новоульяновск",
    "latitude": "54.1447691",
    "longitude": "48.3911701"
  },
  {
    "label": "Сенгилей",
    "latitude": "53.9590553",
    "longitude": "48.7767869"
  },
  {
    "label": "Ульяновск",
    "latitude": "54.3080674",
    "longitude": "48.3748717"
  },
  {
    "label": "Амурск",
    "latitude": "50.2345017",
    "longitude": "136.8791135"
  },
  {
    "label": "Бикин",
    "latitude": "46.8186244",
    "longitude": "134.2551046"
  },
  {
    "label": "Вяземский",
    "latitude": "47.5354416",
    "longitude": "134.7553701"
  },
  {
    "label": "Комсомольск-на-Амуре",
    "latitude": "50.550011",
    "longitude": "137.0079286"
  },
  {
    "label": "Николаевск-на-Амуре",
    "latitude": "53.1461943",
    "longitude": "140.7109642"
  },
  {
    "label": "Советская Гавань",
    "latitude": "48.9664554",
    "longitude": "140.2852223"
  },
  {
    "label": "Хабаровск",
    "latitude": "48.4647991",
    "longitude": "135.0598811"
  },
  {
    "label": "Абаза",
    "latitude": "52.6517296",
    "longitude": "90.0885929"
  },
  {
    "label": "Абакан",
    "latitude": "53.7223661",
    "longitude": "91.4437792"
  },
  {
    "label": "Саяногорск",
    "latitude": "53.1008226",
    "longitude": "91.4121643"
  },
  {
    "label": "Сорск",
    "latitude": "54.0001451",
    "longitude": "90.2595674"
  },
  {
    "label": "Черногорск",
    "latitude": "53.8258425",
    "longitude": "91.3259669"
  },
  {
    "label": "Белоярский",
    "latitude": "63.712181",
    "longitude": "66.6772357"
  },
  {
    "label": "Когалым",
    "latitude": "62.2638914",
    "longitude": "74.4828687"
  },
  {
    "label": "Лангепас",
    "latitude": "61.2536667",
    "longitude": "75.1807905"
  },
  {
    "label": "Лянтор",
    "latitude": "61.6391639",
    "longitude": "72.1793828"
  },
  {
    "label": "Мегион",
    "latitude": "61.0318946",
    "longitude": "76.1024772"
  },
  {
    "label": "Нефтеюганск",
    "latitude": "61.0882837",
    "longitude": "72.6164185"
  },
  {
    "label": "Нижневартовск",
    "latitude": "60.9397379",
    "longitude": "76.5696206"
  },
  {
    "label": "Нягань",
    "latitude": "62.1454839",
    "longitude": "65.3944361"
  },
  {
    "label": "Покачи",
    "latitude": "61.7421977",
    "longitude": "75.5942069"
  },
  {
    "label": "Пыть-Ях",
    "latitude": "60.7585769",
    "longitude": "72.8366445"
  },
  {
    "label": "Радужный",
    "latitude": "62.1343067",
    "longitude": "77.4584346"
  },
  {
    "label": "Советский",
    "latitude": "61.3706695",
    "longitude": "63.566863"
  },
  {
    "label": "Сургут",
    "latitude": "61.2539773",
    "longitude": "73.3961726"
  },
  {
    "label": "Урай",
    "latitude": "60.1295842",
    "longitude": "64.8040117"
  },
  {
    "label": "Ханты-Мансийск",
    "latitude": "61.0024344",
    "longitude": "69.0183322"
  },
  {
    "label": "Югорск",
    "latitude": "61.3124504",
    "longitude": "63.3364787"
  },
  {
    "label": "Аша",
    "latitude": "54.9907105",
    "longitude": "57.2783704"
  },
  {
    "label": "Бакал",
    "latitude": "54.9406759",
    "longitude": "58.8051085"
  },
  {
    "label": "Верхнеуральск",
    "latitude": "53.8760587",
    "longitude": "59.2169071"
  },
  {
    "label": "Верхний Уфалей",
    "latitude": "56.0487252",
    "longitude": "60.231963"
  },
  {
    "label": "Еманжелинск",
    "latitude": "54.7554084",
    "longitude": "61.3243985"
  },
  {
    "label": "Златоуст",
    "latitude": "55.1715695",
    "longitude": "59.6726264"
  },
  {
    "label": "Карабаш",
    "latitude": "55.4852076",
    "longitude": "60.2358959"
  },
  {
    "label": "Карталы",
    "latitude": "53.0536101",
    "longitude": "60.647712"
  },
  {
    "label": "Касли",
    "latitude": "55.8868045",
    "longitude": "60.7422529"
  },
  {
    "label": "Катав-Ивановск",
    "latitude": "54.7520187",
    "longitude": "58.1983706"
  },
  {
    "label": "Копейск",
    "latitude": "55.1167545",
    "longitude": "61.6180809"
  },
  {
    "label": "Коркино",
    "latitude": "54.8903023",
    "longitude": "61.4034541"
  },
  {
    "label": "Куса",
    "latitude": "55.3385156",
    "longitude": "59.4386474"
  },
  {
    "label": "Кыштым",
    "latitude": "55.7060048",
    "longitude": "60.5563271"
  },
  {
    "label": "Магнитогорск",
    "latitude": "53.4071891",
    "longitude": "58.9791432"
  },
  {
    "label": "Миасс",
    "latitude": "55.0455774",
    "longitude": "60.1077757"
  },
  {
    "label": "Миньяр",
    "latitude": "55.0709601",
    "longitude": "57.5484435"
  },
  {
    "label": "Нязепетровск",
    "latitude": "56.0537199",
    "longitude": "59.6096791"
  },
  {
    "label": "Озерск",
    "latitude": "55.7631922",
    "longitude": "60.7076337"
  },
  {
    "label": "Пласт",
    "latitude": "54.3691832",
    "longitude": "60.8152305"
  },
  {
    "label": "Сатка",
    "latitude": "55.0404497",
    "longitude": "59.0288153"
  },
  {
    "label": "Сим",
    "latitude": "54.9906584",
    "longitude": "57.6899045"
  },
  {
    "label": "Снежинск",
    "latitude": "56.085232",
    "longitude": "60.7324989"
  },
  {
    "label": "Трехгорный",
    "latitude": "54.8178174",
    "longitude": "58.4465039"
  },
  {
    "label": "Троицк",
    "latitude": "54.0844132",
    "longitude": "61.5585503"
  },
  {
    "label": "Усть-Катав",
    "latitude": "54.9261323",
    "longitude": "58.1528067"
  },
  {
    "label": "Чебаркуль",
    "latitude": "54.9819329",
    "longitude": "60.3773305"
  },
  {
    "label": "Челябинск",
    "latitude": "55.1603659",
    "longitude": "61.4007858"
  },
  {
    "label": "Южноуральск",
    "latitude": "54.4490124",
    "longitude": "61.2581869"
  },
  {
    "label": "Юрюзань",
    "latitude": "54.8546372",
    "longitude": "58.4227116"
  },
  {
    "label": "Аргун",
    "latitude": "43.2918071",
    "longitude": "45.8724383"
  },
  {
    "label": "Грозный",
    "latitude": "43.3179243",
    "longitude": "45.6981102"
  },
  {
    "label": "Гудермес",
    "latitude": "43.3519164",
    "longitude": "46.1036052"
  },
  {
    "label": "",
    "latitude": "43.1276072",
    "longitude": "45.5406838"
  },
  {
    "label": "Шали",
    "latitude": "43.148776",
    "longitude": "45.9009577"
  },
  {
    "label": "Алатырь",
    "latitude": "54.8398179",
    "longitude": "46.5721423"
  },
  {
    "label": "Канаш",
    "latitude": "55.5069543",
    "longitude": "47.4917734"
  },
  {
    "label": "Козловка",
    "latitude": "55.8406526",
    "longitude": "48.2579372"
  },
  {
    "label": "Мариинский Посад",
    "latitude": "56.111968",
    "longitude": "47.7142676"
  },
  {
    "label": "Новочебоксарск",
    "latitude": "56.109486",
    "longitude": "47.4791429"
  },
  {
    "label": "Цивильск",
    "latitude": "55.8650132",
    "longitude": "47.472967"
  },
  {
    "label": "Чебоксары",
    "latitude": "56.1439378",
    "longitude": "47.2488718"
  },
  {
    "label": "Шумерля",
    "latitude": "55.4961795",
    "longitude": "46.4183534"
  },
  {
    "label": "Ядрин",
    "latitude": "55.9406826",
    "longitude": "46.2020765"
  },
  {
    "label": "Анадырь",
    "latitude": "64.7314347",
    "longitude": "177.5015752"
  },
  {
    "label": "Билибино",
    "latitude": "68.0585533",
    "longitude": "166.4388451"
  },
  {
    "label": "Певек",
    "latitude": "69.7018051",
    "longitude": "170.2999194"
  },
  {
    "label": "Алдан",
    "latitude": "58.6094885",
    "longitude": "125.3816689"
  },
  {
    "label": "Верхоянск",
    "latitude": "67.5500865",
    "longitude": "133.3907829"
  },
  {
    "label": "Вилюйск",
    "latitude": "63.7517314",
    "longitude": "121.6272754"
  },
  {
    "label": "Ленск",
    "latitude": "60.7276036",
    "longitude": "114.9549103"
  },
  {
    "label": "Мирный",
    "latitude": "62.5362511",
    "longitude": "113.9668146"
  },
  {
    "label": "Нерюнгри",
    "latitude": "56.6600322",
    "longitude": "124.72031"
  },
  {
    "label": "Нюрба",
    "latitude": "63.2828775",
    "longitude": "118.324325"
  },
  {
    "label": "Олекминск",
    "latitude": "60.3758203",
    "longitude": "120.406013"
  },
  {
    "label": "Покровск",
    "latitude": "61.4843538",
    "longitude": "129.1482195"
  },
  {
    "label": "Среднеколымск",
    "latitude": "67.4581664",
    "longitude": "153.7069511"
  },
  {
    "label": "Томмот",
    "latitude": "58.9586939",
    "longitude": "126.2875375"
  },
  {
    "label": "Удачный",
    "latitude": "66.4072367",
    "longitude": "112.3061653"
  },
  {
    "label": "Якутск",
    "latitude": "62.0280273",
    "longitude": "129.7325717"
  },
  {
    "label": "Губкинский",
    "latitude": "64.4456575",
    "longitude": "76.4714559"
  },
  {
    "label": "Лабытнанги",
    "latitude": "66.6592376",
    "longitude": "66.3882628"
  },
  {
    "label": "Муравленко",
    "latitude": "63.794188",
    "longitude": "74.494913"
  },
  {
    "label": "Надым",
    "latitude": "65.5377514",
    "longitude": "72.5182746"
  },
  {
    "label": "Новый Уренгой",
    "latitude": "66.0840036",
    "longitude": "76.6810032"
  },
  {
    "label": "Ноябрьск",
    "latitude": "63.201846",
    "longitude": "75.4509665"
  },
  {
    "label": "Салехард",
    "latitude": "66.5493568",
    "longitude": "66.6083994"
  },
  {
    "label": "Тарко-Сале",
    "latitude": "64.9117649",
    "longitude": "77.7610204"
  },
  {
    "label": "Гаврилов-Ям",
    "latitude": "57.3091552",
    "longitude": "39.8545157"
  },
  {
    "label": "Данилов",
    "latitude": "58.1859542",
    "longitude": "40.1796765"
  },
  {
    "label": "Любим",
    "latitude": "58.3619868",
    "longitude": "40.6869581"
  },
  {
    "label": "Мышкин",
    "latitude": "57.7881664",
    "longitude": "38.4542816"
  },
  {
    "label": "Переславль-Залесский",
    "latitude": "56.7360435",
    "longitude": "38.8543064"
  },
  {
    "label": "Пошехонье",
    "latitude": "58.506328",
    "longitude": "39.1210034"
  },
  {
    "label": "Ростов",
    "latitude": "57.2050177",
    "longitude": "39.4378357"
  },
  {
    "label": "Рыбинск",
    "latitude": "58.0483802",
    "longitude": "38.858338"
  },
  {
    "label": "Тутаев",
    "latitude": "57.8674237",
    "longitude": "39.5368234"
  },
  {
    "label": "Углич",
    "latitude": "57.5223866",
    "longitude": "38.3019793"
  },
  {
    "label": "Ярославль",
    "latitude": "57.6216145",
    "longitude": "39.897878"
  }
]