import React, {Component} from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Slideshow from '../../../components/Slideshow/Slideshow'
import WarehouseVariant from '../../../components/WarehouseDetails/WarehouseVariant/WarehouseVariant'
import { Costs } from '../../WarehousePage/Costs/Costs'
import { WarehouseInfo } from '../../WarehousePage/WarehouseInfo/WarehouseInfo'
import { ApplicationCard } from '../../WarehousePage/ApplicationCard/ApplicationCard'
import { withStyles } from "@material-ui/core/styles";
import { styled } from '@mui/material/styles';

const AdressTypography = styled(Typography)({
    fontFamily: 'Montserrat-medium',
    color: '#222942',
    fontSize: '17px',
    paddingBottom: '5px',
});

const LatoTypography = styled(Typography)({
    fontFamily: 'Lato-Regular',
    fontSize: '13px',
    color: 'black',
});

const FirstHighlightedCostText = styled('span')({
    fontSize: '150%',
    color: '#02F748',
    paddingRight: '3px',
});
const SecondHighlightedCostText = styled('span')({
    fontSize: '150%',
    color: '#0AE00B',
    paddingRight: '3px',
});
const ThirdHighlightedCostText = styled('span')({
    fontSize: '150%',
    color: '#06A106',
    paddingRight: '3px',
});
const FourthHighlightedCostText = styled('span')({
    fontSize: '150%',
    color: '#E0E000',
    paddingRight: '3px',
});
const FifthHighlightedCostText = styled('span')({
    fontSize: '150%',
    color: '#E0CE01',
    paddingRight: '3px',
});

const IDTypography = styled(Typography)({
    fontFamily: 'Lato-Light',
    fontSize: '13px',
    paddingBottom: '3px',
    color: '#4B4B4B'
});

const StyledCard = styled(Card)({
    cursor: 'grab',
    margin: 'auto',
    width: '13rem',
    borderRadius: '16px',
    boxShadow: 'none',
    border: '1px solid #E2E5EA',
    transition: '0.3s',
    position: 'relative',
    overflow: 'initial',
    background: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    "&:hover": {
        border: '1px solid #284AC2',
        boxShadow: '0px 5px 10px rgba(40, 74, 194, 0.2)',
        "& .MuiCardMedia-root": {
            transform: 'translateY(-5px)',
            transition: '0.3s',
        }
    }
});

const FocusedStyledCard = styled(Card)({
    margin: 'auto',
    width: '13rem',
    borderRadius: '16px',
    position: 'relative',
    overflow: 'initial',
    background: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid #284AC2',
    boxShadow: '0px 5px 10px rgba(40, 74, 194, 0.2)',
    "& .MuiCardMedia-root": {
        transform: 'translateY(-5px)',
    }
});

const StyledMedia = styled(CardMedia)({
    width: '100%',
    height: '7rem',
    borderRadius: '16px 16px 0 0',
    position: 'relative',
});

const StyledCardContent = styled(CardContent)({
    padding: 0,
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    paddingTop: '0.5rem',
    "&.MuiCardContent-root:last-child": {paddingBottom: '0.5rem'}
});

const styles = theme => ({
    apply_card_div :{
        position: '-webkit-sticky',
        position: 'sticky',
        top: '5.5rem',
        left: 0,
    }, 
})
  

class Results extends Component {
    state = {
        resultStepper: 0,
        resultSteps: 5,
    };

    handleNextWH = () => {
        const { resultStepper } = this.state;
        this.setState({
            resultStepper: resultStepper + 1
        });
    };
    
    handleBackWH = () => {
        const { resultStepper } = this.state;
        this.setState({
            resultStepper: resultStepper - 1
        });
    };

    handleCardClick = (e) => {
        console.log('clicked')
        this.setState({resultStepper: e})
    };

    render() {
        const { resultStepper, resultSteps } = this.state;
        const { classes } = this.props;

        switch(resultStepper) {
        case 0:
            return (
                <div>
                    <Typography sx ={{ fontSize: '1.5rem', fontFamily: 'Lato-Regular', marginLeft: '8rem'}}>
                        5 складов подходят вам
                    </Typography>

                    <Grid container sx = {{ 
                        marginTop: '1.5rem',
                        marginBottom: '5rem',
                    }}>
                        <Button 
                        onClick={this.handleBackWH}
                        disabled={resultStepper === 0}
                        >
                            <KeyboardArrowLeft />
                            Назад
                        </Button>

                        <FocusedStyledCard>
                        <StyledMedia
                            image={
                            this.props.firstWH.image ? this.props.firstWH.image : require('../../../components/WarehouseDetails/profile_pic.png')
                            }
                        />
                        <StyledCardContent>
                            <LatoTypography sx = {{paddingBottom: '0.5rem'}}>Рейтинг релевантности запросу:</LatoTypography>
                            <LatoTypography>
                                <FirstHighlightedCostText>
                                    {Math.round(this.props.firstWhRating * 10000)/100} 
                                </FirstHighlightedCostText>
                                из 100
                            </LatoTypography>
                        </StyledCardContent>
                        </FocusedStyledCard>

                        <StyledCard onClick={() => this.handleCardClick(1)}>
                        <StyledMedia
                            image={
                            this.props.secondWH.image ? this.props.secondWH.image : require('../../../components/WarehouseDetails/profile_pic.png')
                            }
                        />
                        <StyledCardContent>
                            <LatoTypography sx = {{paddingBottom: '1rem'}}>Рейтинг релевантности запросу:</LatoTypography>
                            <LatoTypography>
                                <SecondHighlightedCostText>
                                    {Math.round(this.props.secondWhRating * 10000)/100} 
                                </SecondHighlightedCostText>
                                из 100
                            </LatoTypography>
                        </StyledCardContent>
                        </StyledCard>

                        <StyledCard onClick={() => this.handleCardClick(2)}>
                        <StyledMedia
                            image={
                            this.props.thirdWH.image ? this.props.thirdWH.image : require('../../../components/WarehouseDetails/profile_pic.png')
                            }
                        />
                        <StyledCardContent>
                            <LatoTypography sx = {{paddingBottom: '1rem'}}>Рейтинг релевантности запросу:</LatoTypography>
                            <LatoTypography>
                                <ThirdHighlightedCostText>
                                    {Math.round(this.props.thirdWhRating * 10000)/100} 
                                </ThirdHighlightedCostText>
                                из 100
                            </LatoTypography>
                        </StyledCardContent>
                        </StyledCard>

                        <StyledCard onClick={() => this.handleCardClick(3)}>
                        <StyledMedia
                            image={
                            this.props.fourthWH.image ? this.props.fourthWH.image : require('../../../components/WarehouseDetails/profile_pic.png')
                            }
                        />
                        <StyledCardContent>
                            <LatoTypography sx = {{paddingBottom: '1rem'}}>Рейтинг релевантности запросу:</LatoTypography>
                            <LatoTypography>
                                <FourthHighlightedCostText>
                                    {Math.round(this.props.fourthWhRating * 10000)/100} 
                                </FourthHighlightedCostText>
                                из 100
                            </LatoTypography>
                        </StyledCardContent>
                        </StyledCard>

                        <StyledCard onClick={() => this.handleCardClick(4)}>
                        <StyledMedia
                            image={
                            this.props.fifthWH.image ? this.props.fifthWH.image : require('../../../components/WarehouseDetails/profile_pic.png')
                            }
                        />
                        <StyledCardContent>
                            <LatoTypography sx = {{paddingBottom: '1rem'}}>Рейтинг релевантности запросу:</LatoTypography>
                            <LatoTypography>
                                <FifthHighlightedCostText>
                                    {Math.round(this.props.fifthWhRating * 10000)/100} 
                                </FifthHighlightedCostText>
                                из 100
                            </LatoTypography>
                        </StyledCardContent>
                        </StyledCard>

                        <Button 
                        onClick={this.handleNextWH}
                        disabled={resultStepper === resultSteps-1}
                        >
                        Вперед
                        <KeyboardArrowRight />
                        </Button>
                    </Grid>
                    <Grid container sx = {{justifyContent: 'center'}}>
                        <Grid item md = {7}>
                            <Stack sx ={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}>
                                <AdressTypography>{this.props.firstWH.adress}</AdressTypography>
                                <IDTypography>ID склада: {this.props.firstWH.id}</IDTypography>
                            </Stack>
                            <Slideshow
                                warehouseImages={this.props.firstWhImages}
                            />
                            <Box sx = {{
                                paddingTop: '7px',
                                paddingBottom: '11px',
                            }}>
                                <WarehouseVariant 
                                    warehouse_variant = {this.props.firstWH.warehouse_variant}
                                    is_long_term = {this.props.firstWH.long_term_commitment}
                                />
                            </Box>
                            <Costs warehouse = {this.props.firstWH} palletStorage = {this.props.firstPalletStorage}/>
                            <WarehouseInfo
                                warehouse = {this.props.firstWH}
                                conditionValue = {this.props.firstConditionValue}
                                fireSysTypeValue = {this.props.firstFireSysTypeValue}
                            />
                        </Grid>
                        <Grid item>
                            <div className={classes.apply_card_div}>
                                <ApplicationCard/>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            )
        case 1:
            return (
                <div>
                    <Typography sx ={{ fontSize: '1.5rem', fontFamily: 'Lato-Regular', marginLeft: '8rem'}}>
                        5 складов подходят вам
                    </Typography>

                    <Grid container sx = {{ 
                        marginTop: '1.5rem',
                        marginBottom: '5rem',
                    }}>
                        <Button 
                        onClick={this.handleBackWH}
                        disabled={resultStepper === 0}
                        >
                            <KeyboardArrowLeft />
                            Назад
                        </Button>

                        <StyledCard onClick={() => this.handleCardClick(0)}>
                        <StyledMedia
                            image={
                            this.props.firstWH.image ? this.props.firstWH.image : require('../../../components/WarehouseDetails/profile_pic.png')
                            }
                        />
                        <StyledCardContent>
                            <LatoTypography sx = {{paddingBottom: '0.5rem'}}>Рейтинг релевантности запросу:</LatoTypography>
                            <LatoTypography>
                                <FirstHighlightedCostText>
                                    {Math.round(this.props.firstWhRating * 10000)/100} 
                                </FirstHighlightedCostText>
                                из 100
                            </LatoTypography>
                        </StyledCardContent>
                        </StyledCard>

                        <FocusedStyledCard>
                        <StyledMedia
                            image={
                            this.props.secondWH.image ? this.props.secondWH.image : require('../../../components/WarehouseDetails/profile_pic.png')
                            }
                        />
                        <StyledCardContent>
                            <LatoTypography sx = {{paddingBottom: '1rem'}}>Рейтинг релевантности запросу:</LatoTypography>
                            <LatoTypography>
                                <SecondHighlightedCostText>
                                    {Math.round(this.props.secondWhRating * 10000)/100} 
                                </SecondHighlightedCostText>
                                из 100
                            </LatoTypography>
                        </StyledCardContent>
                        </FocusedStyledCard>

                        <StyledCard onClick={() => this.handleCardClick(2)}>
                        <StyledMedia
                            image={
                            this.props.thirdWH.image ? this.props.thirdWH.image : require('../../../components/WarehouseDetails/profile_pic.png')
                            }
                        />
                        <StyledCardContent>
                            <LatoTypography sx = {{paddingBottom: '1rem'}}>Рейтинг релевантности запросу:</LatoTypography>
                            <LatoTypography>
                                <ThirdHighlightedCostText>
                                    {Math.round(this.props.thirdWhRating * 10000)/100} 
                                </ThirdHighlightedCostText>
                                из 100
                            </LatoTypography>
                        </StyledCardContent>
                        </StyledCard>

                        <StyledCard onClick={() => this.handleCardClick(3)}>
                        <StyledMedia
                            image={
                            this.props.fourthWH.image ? this.props.fourthWH.image : require('../../../components/WarehouseDetails/profile_pic.png')
                            }
                        />
                        <StyledCardContent>
                            <LatoTypography sx = {{paddingBottom: '1rem'}}>Рейтинг релевантности запросу:</LatoTypography>
                            <LatoTypography>
                                <FourthHighlightedCostText>
                                    {Math.round(this.props.fourthWhRating * 10000)/100} 
                                </FourthHighlightedCostText>
                                из 100
                            </LatoTypography>
                        </StyledCardContent>
                        </StyledCard>

                        <StyledCard onClick={() => this.handleCardClick(4)}>
                        <StyledMedia
                            image={
                            this.props.fifthWH.image ? this.props.fifthWH.image : require('../../../components/WarehouseDetails/profile_pic.png')
                            }
                        />
                        <StyledCardContent>
                            <LatoTypography sx = {{paddingBottom: '1rem'}}>Рейтинг релевантности запросу:</LatoTypography>
                            <LatoTypography>
                                <FifthHighlightedCostText>
                                    {Math.round(this.props.fifthWhRating * 10000)/100} 
                                </FifthHighlightedCostText>
                                из 100
                            </LatoTypography>
                        </StyledCardContent>
                        </StyledCard>

                        <Button 
                            onClick={this.handleNextWH}
                            disabled={resultStepper === resultSteps-1}
                        >
                            Вперед
                            <KeyboardArrowRight />
                        </Button>
                    </Grid>
                    <Grid container sx = {{justifyContent: 'center'}}>
                        <Grid item md = {7}>
                            <Stack sx ={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}>
                                <AdressTypography>{this.props.secondWH.adress}</AdressTypography>
                                <IDTypography>ID склада: {this.props.secondWH.id}</IDTypography>
                            </Stack>
                            <Slideshow
                                warehouseImages={this.props.secondWhImages}
                            />
                            <Box sx = {{
                                paddingTop: '7px',
                                paddingBottom: '11px',
                            }}>
                                <WarehouseVariant 
                                    warehouse_variant = {this.props.secondWH.warehouse_variant}
                                    is_long_term = {this.props.secondWH.long_term_commitment}
                                />
                            </Box>
                            <Costs warehouse = {this.props.secondWH} palletStorage = {this.props.secondPalletStorage}/>
                            <WarehouseInfo
                                warehouse = {this.props.secondWH}
                                conditionValue = {this.props.secondConditionValue}
                                fireSysTypeValue = {this.props.secondFireSysTypeValue}
                            />
                        </Grid>
                        <Grid item>
                            <div className={classes.apply_card_div}>
                                <ApplicationCard/>
                            </div>
                        </Grid>
                    </Grid>
                    
                </div>
            )
        case 2:
            return (
                <div>
                    <Typography sx ={{ fontSize: '1.5rem', fontFamily: 'Lato-Regular', marginLeft: '8rem'}}>
                        5 складов подходят вам
                    </Typography>

                    <Grid container sx = {{ 
                        marginTop: '1.5rem',
                        marginBottom: '5rem',
                    }}>
                        <Button 
                        onClick={this.handleBackWH}
                        disabled={resultStepper === 0}
                        >
                            <KeyboardArrowLeft />
                            Назад
                        </Button>

                        <StyledCard onClick={() => this.handleCardClick(0)}>
                        <StyledMedia
                            image={
                            this.props.firstWH.image ? this.props.firstWH.image : require('../../../components/WarehouseDetails/profile_pic.png')
                            }
                        />
                        <StyledCardContent>
                            <LatoTypography sx = {{paddingBottom: '0.5rem'}}>Рейтинг релевантности запросу:</LatoTypography>
                            <LatoTypography>
                                <FirstHighlightedCostText>
                                    {Math.round(this.props.firstWhRating * 10000)/100} 
                                </FirstHighlightedCostText>
                                из 100
                            </LatoTypography>
                        </StyledCardContent>
                        </StyledCard>

                        <StyledCard onClick={() => this.handleCardClick(1)}>
                        <StyledMedia
                            image={
                            this.props.secondWH.image ? this.props.secondWH.image : require('../../../components/WarehouseDetails/profile_pic.png')
                            }
                        />
                        <StyledCardContent>
                            <LatoTypography sx = {{paddingBottom: '1rem'}}>Рейтинг релевантности запросу:</LatoTypography>
                            <LatoTypography>
                                <SecondHighlightedCostText>
                                    {Math.round(this.props.secondWhRating * 10000)/100} 
                                </SecondHighlightedCostText>
                                из 100
                            </LatoTypography>
                        </StyledCardContent>
                        </StyledCard>

                        <FocusedStyledCard>
                        <StyledMedia
                            image={
                            this.props.thirdWH.image ? this.props.thirdWH.image : require('../../../components/WarehouseDetails/profile_pic.png')
                            }
                        />
                        <StyledCardContent>
                            <LatoTypography sx = {{paddingBottom: '1rem'}}>Рейтинг релевантности запросу:</LatoTypography>
                            <LatoTypography>
                                <ThirdHighlightedCostText>
                                    {Math.round(this.props.thirdWhRating * 10000)/100} 
                                </ThirdHighlightedCostText>
                                из 100
                            </LatoTypography>
                        </StyledCardContent>
                        </FocusedStyledCard>

                        <StyledCard onClick={() => this.handleCardClick(3)}>
                        <StyledMedia
                            image={
                            this.props.fourthWH.image ? this.props.fourthWH.image : require('../../../components/WarehouseDetails/profile_pic.png')
                            }
                        />
                        <StyledCardContent>
                            <LatoTypography sx = {{paddingBottom: '1rem'}}>Рейтинг релевантности запросу:</LatoTypography>
                            <LatoTypography>
                                <FourthHighlightedCostText>
                                    {Math.round(this.props.fourthWhRating * 10000)/100} 
                                </FourthHighlightedCostText>
                                из 100
                            </LatoTypography>
                        </StyledCardContent>
                        </StyledCard>

                        <StyledCard onClick={() => this.handleCardClick(4)}>
                        <StyledMedia
                            image={
                            this.props.fifthWH.image ? this.props.fifthWH.image : require('../../../components/WarehouseDetails/profile_pic.png')
                            }
                        />
                        <StyledCardContent>
                            <LatoTypography sx = {{paddingBottom: '1rem'}}>Рейтинг релевантности запросу:</LatoTypography>
                            <LatoTypography>
                                <FifthHighlightedCostText>
                                    {Math.round(this.props.fifthWhRating * 10000)/100} 
                                </FifthHighlightedCostText>
                                из 100
                            </LatoTypography>
                        </StyledCardContent>
                        </StyledCard>

                        <Button 
                        onClick={this.handleNextWH}
                        disabled={resultStepper === resultSteps-1}
                        >
                        Вперед
                        <KeyboardArrowRight />
                        </Button>
                    </Grid>
                    <Grid container sx = {{justifyContent: 'center'}}>
                        <Grid item md = {7}>
                            <Stack sx ={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}>
                                <AdressTypography>{this.props.thirdWH.adress}</AdressTypography>
                                <IDTypography>ID склада: {this.props.thirdWH.id}</IDTypography>
                            </Stack>
                            <Slideshow
                                warehouseImages={this.props.thirdWhImages}
                            />
                            <Box sx = {{
                                paddingTop: '7px',
                                paddingBottom: '11px',
                            }}>
                                <WarehouseVariant 
                                    warehouse_variant = {this.props.thirdWH.warehouse_variant}
                                    is_long_term = {this.props.thirdWH.long_term_commitment}
                                />
                            </Box>
                            <Costs warehouse = {this.props.thirdWH} palletStorage = {this.props.thirdPalletStorage}/>
                            <WarehouseInfo
                                warehouse = {this.props.thirdWH}
                                conditionValue = {this.props.thirdConditionValue}
                                fireSysTypeValue = {this.props.thirdFireSysTypeValue}
                            />
                        </Grid>
                        <Grid item>
                            <div className={classes.apply_card_div}>
                                <ApplicationCard/>
                            </div>
                        </Grid>
                    </Grid>
                    
                </div>
            )
        case 3:
            return (
                <div>
                    <Typography sx ={{ fontSize: '1.5rem', fontFamily: 'Lato-Regular', marginLeft: '8rem'}}>
                        5 складов подходят вам
                    </Typography>

                    <Grid container sx = {{ 
                        marginTop: '1.5rem',
                        marginBottom: '5rem',
                    }}>
                        <Button 
                        onClick={this.handleBackWH}
                        disabled={resultStepper === 0}
                        >
                            <KeyboardArrowLeft />
                            Назад
                        </Button>

                        <StyledCard onClick={() => this.handleCardClick(0)}>
                        <StyledMedia
                            image={
                            this.props.firstWH.image ? this.props.firstWH.image : require('../../../components/WarehouseDetails/profile_pic.png')
                            }
                        />
                        <StyledCardContent>
                            <LatoTypography sx = {{paddingBottom: '0.5rem'}}>Рейтинг релевантности запросу:</LatoTypography>
                            <LatoTypography>
                                <FirstHighlightedCostText>
                                    {Math.round(this.props.firstWhRating * 10000)/100} 
                                </FirstHighlightedCostText>
                                из 100
                            </LatoTypography>
                        </StyledCardContent>
                        </StyledCard>

                        <StyledCard onClick={() => this.handleCardClick(1)}>
                        <StyledMedia
                            image={
                            this.props.secondWH.image ? this.props.secondWH.image : require('../../../components/WarehouseDetails/profile_pic.png')
                            }
                        />
                        <StyledCardContent>
                            <LatoTypography sx = {{paddingBottom: '1rem'}}>Рейтинг релевантности запросу:</LatoTypography>
                            <LatoTypography>
                                <SecondHighlightedCostText>
                                    {Math.round(this.props.secondWhRating * 10000)/100} 
                                </SecondHighlightedCostText>
                                из 100
                            </LatoTypography>
                        </StyledCardContent>
                        </StyledCard>

                        <StyledCard onClick={() => this.handleCardClick(2)}>
                        <StyledMedia
                            image={
                            this.props.thirdWH.image ? this.props.thirdWH.image : require('../../../components/WarehouseDetails/profile_pic.png')
                            }
                        />
                        <StyledCardContent>
                            <LatoTypography sx = {{paddingBottom: '1rem'}}>Рейтинг релевантности запросу:</LatoTypography>
                            <LatoTypography>
                                <ThirdHighlightedCostText>
                                    {Math.round(this.props.thirdWhRating * 10000)/100} 
                                </ThirdHighlightedCostText>
                                из 100
                            </LatoTypography>
                        </StyledCardContent>
                        </StyledCard>

                        <FocusedStyledCard>
                        <StyledMedia
                            image={
                            this.props.fourthWH.image ? this.props.fourthWH.image : require('../../../components/WarehouseDetails/profile_pic.png')
                            }
                        />
                        <StyledCardContent>
                            <LatoTypography sx = {{paddingBottom: '1rem'}}>Рейтинг релевантности запросу:</LatoTypography>
                            <LatoTypography>
                                <FourthHighlightedCostText>
                                    {Math.round(this.props.fourthWhRating * 10000)/100} 
                                </FourthHighlightedCostText>
                                из 100
                            </LatoTypography>
                        </StyledCardContent>
                        </FocusedStyledCard>

                        <StyledCard onClick={() => this.handleCardClick(4)}>
                        <StyledMedia
                            image={
                            this.props.fifthWH.image ? this.props.fifthWH.image : require('../../../components/WarehouseDetails/profile_pic.png')
                            }
                        />
                        <StyledCardContent>
                            <LatoTypography sx = {{paddingBottom: '1rem'}}>Рейтинг релевантности запросу:</LatoTypography>
                            <LatoTypography>
                                <FifthHighlightedCostText>
                                    {Math.round(this.props.fifthWhRating * 10000)/100} 
                                </FifthHighlightedCostText>
                                из 100
                            </LatoTypography>
                        </StyledCardContent>
                        </StyledCard>

                        <Button 
                        onClick={this.handleNextWH}
                        disabled={resultStepper === resultSteps-1}
                        >
                        Вперед
                        <KeyboardArrowRight />
                        </Button>
                    </Grid>
                    <Grid container sx = {{justifyContent: 'center'}}>
                        <Grid item md = {7}>
                        <Stack sx ={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                            <AdressTypography>{this.props.fourthWH.adress}</AdressTypography>
                            <IDTypography>ID склада: {this.props.fourthWH.id}</IDTypography>
                        </Stack>
                        <Slideshow
                            warehouseImages={this.props.fourthWhImages}
                        />
                        <Box sx = {{
                            paddingTop: '7px',
                            paddingBottom: '11px',
                        }}>
                            <WarehouseVariant 
                                warehouse_variant = {this.props.fourthWH.warehouse_variant}
                                is_long_term = {this.props.fourthWH.long_term_commitment}
                            />
                        </Box>
                        <Costs warehouse = {this.props.fourthWH} palletStorage = {this.props.fourthPalletStorage} />
                        <WarehouseInfo
                            warehouse = {this.props.fourthWH}
                            conditionValue = {this.props.fourthConditionValue}
                            fireSysTypeValue = {this.props.fourthFireSysTypeValue}
                        />
                        </Grid>
                        <Grid item>
                            <div className={classes.apply_card_div}>
                                <ApplicationCard/>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            )
        case 4:
            return (
                <div>
                    <Typography sx ={{ fontSize: '1.5rem', fontFamily: 'Lato-Regular', marginLeft: '8rem'}}>
                        5 складов подходят вам
                    </Typography>

                    <Grid container sx = {{ 
                        marginTop: '1.5rem',
                        marginBottom: '5rem',
                    }}>
                        <Button 
                        onClick={this.handleBackWH}
                        disabled={resultStepper === 0}
                        >
                            <KeyboardArrowLeft />
                            Назад
                        </Button>

                        <StyledCard onClick={() => this.handleCardClick(0)}>
                        <StyledMedia
                            image={
                                this.props.firstWH.image ? this.props.firstWH.image : require('../../../components/WarehouseDetails/profile_pic.png')
                            }
                        />
                        <StyledCardContent>
                            <LatoTypography sx = {{paddingBottom: '0.5rem'}}>Рейтинг релевантности запросу:</LatoTypography>
                            <LatoTypography>
                                <FirstHighlightedCostText>
                                    {Math.round(this.props.firstWhRating * 10000)/100} 
                                </FirstHighlightedCostText>
                                из 100
                            </LatoTypography>
                        </StyledCardContent>
                        </StyledCard>

                        <StyledCard onClick={() => this.handleCardClick(1)}>
                        <StyledMedia
                            image={
                            this.props.secondWH.image ? this.props.secondWH.image : require('../../../components/WarehouseDetails/profile_pic.png')
                            }
                        />
                        <StyledCardContent>
                            <LatoTypography sx = {{paddingBottom: '1rem'}}>Рейтинг релевантности запросу:</LatoTypography>
                            <LatoTypography>
                                <SecondHighlightedCostText>
                                    {Math.round(this.props.secondWhRating * 10000)/100} 
                                </SecondHighlightedCostText>
                                из 100
                            </LatoTypography>
                        </StyledCardContent>
                        </StyledCard>

                        <StyledCard onClick={() => this.handleCardClick(2)}>
                        <StyledMedia
                            image={
                            this.props.thirdWH.image ? this.props.thirdWH.image : require('../../../components/WarehouseDetails/profile_pic.png')
                            }
                        />
                        <StyledCardContent>
                            <LatoTypography sx = {{paddingBottom: '1rem'}}>Рейтинг релевантности запросу:</LatoTypography>
                            <LatoTypography>
                                <ThirdHighlightedCostText>
                                    {Math.round(this.props.thirdWhRating * 10000)/100} 
                                </ThirdHighlightedCostText>
                                из 100
                            </LatoTypography>
                        </StyledCardContent>
                        </StyledCard>

                        <StyledCard onClick={() => this.handleCardClick(3)}>
                        <StyledMedia
                            image={
                            this.props.fourthWH.image ? this.props.fourthWH.image : require('../../../components/WarehouseDetails/profile_pic.png')
                            }
                        />
                        <StyledCardContent>
                            <LatoTypography sx = {{paddingBottom: '1rem'}}>Рейтинг релевантности запросу:</LatoTypography>
                            <LatoTypography>
                                <FourthHighlightedCostText>
                                    {Math.round(this.props.fourthWhRating * 10000)/100} 
                                </FourthHighlightedCostText>
                                из 100
                            </LatoTypography>
                        </StyledCardContent>
                        </StyledCard>

                        <FocusedStyledCard>
                        <StyledMedia
                            image={
                            this.props.fifthWH.image ? this.props.fifthWH.image : require('../../../components/WarehouseDetails/profile_pic.png')
                            }
                        />
                        <StyledCardContent>
                            <LatoTypography sx = {{paddingBottom: '1rem'}}>Рейтинг релевантности запросу:</LatoTypography>
                            <LatoTypography>
                                <FifthHighlightedCostText>
                                    {Math.round(this.props.fifthWhRating * 10000)/100} 
                                </FifthHighlightedCostText>
                                из 100
                            </LatoTypography>
                        </StyledCardContent>
                        </FocusedStyledCard>

                        <Button 
                        onClick={this.handleNextWH}
                        disabled={resultStepper === resultSteps-1}
                        >
                        Вперед
                        <KeyboardArrowRight />
                        </Button>
                    </Grid>
                    <Grid container sx = {{justifyContent: 'center'}}>
                        <Grid item md = {7}>
                            <Stack sx ={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}>
                                <AdressTypography>{this.props.fifthWH.adress}</AdressTypography>
                                <IDTypography>ID склада: {this.props.fifthWH.id}</IDTypography>
                            </Stack>
                            <Slideshow
                                warehouseImages={this.props.fifthWhImages}
                            />
                            <Box sx = {{
                                paddingTop: '7px',
                                paddingBottom: '11px',
                            }}>
                                <WarehouseVariant 
                                    warehouse_variant = {this.props.fifthWH.warehouse_variant}
                                    is_long_term = {this.props.fifthWH.long_term_commitment}
                                />
                            </Box>
                            <Costs warehouse = {this.props.fifthWH} palletStorage = {this.props.fifthPalletStorage}/>
                            <WarehouseInfo
                                warehouse = {this.props.fifthWH}
                                conditionValue = {this.props.fifthConditionValue}
                                fireSysTypeValue = {this.props.fifthFireSysTypeValue}
                            />
                        </Grid>
                        <Grid item>
                            <div className={classes.apply_card_div}>
                                <ApplicationCard/>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            )
    }
}
}

export default withStyles(styles, { withTheme: true })(Results);