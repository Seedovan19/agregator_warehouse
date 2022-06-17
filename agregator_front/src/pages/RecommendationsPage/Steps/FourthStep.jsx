import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import { Form } from '../../../components/UseForm/UseForm';
import Controls from '../../../components/controls/Controls';
import { postSurveyResults, getRecommendations, RetrieveTopNRecs } from '../../../api/recommendations'
import { getWarehouseImagesData } from '../../../api'
import { styled } from '@mui/material/styles';


export default function FourthStep({ values, handleChange, handleWH, handleNext, isLoading, handleIsLoading, activeStep, submitSignal }) {
    // сейчас происходит так: как только я захожу на этот шаг, у меня уже отправляется запрос на сервак за рекомендациями
    // когда я возвращаюсь на этот шаг, запрос отправляется снова (это не очень, лишний запрос), но могу изменить любые данные и изменятся рекомендации
    
    useEffect(() => {
        getRecommendations(values)
        .then((data) => {
            var data_object = JSON.parse(data['Indexes'])
            var ratings = JSON.parse(data["Top_recs"])
            RetrieveTopNRecs(data_object[0])
            .then((firstWH) => {
                if (firstWH.data[0].features.condition === "Regulated") {
                    handleWH('firstConditionValue', 'Регулируемый температурный режим')
                } else if (firstWH.data[0].features.condition === "Heated") {
                    handleWH('firstConditionValue', 'Отапливаемый')
                } else if (firstWH.data[0].features.condition === "Warmed") {
                    handleWH('firstConditionValue', 'Утепленный')
                } else if (firstWH.data[0].features.condition === "Non-heated") {
                    handleWH('firstConditionValue', 'Неотапливаемый')
                } else if (firstWH.data[0].features.condition === "Freezer-WH") {
                    handleWH('firstConditionValue', 'Морозильный')
                } else if (firstWH.data[0].features.condition === "Cold-WH") {
                    handleWH('firstConditionValue', 'Холодильный')
                }
    
                if (firstWH.data[0].security.fire_system_type === "Alarm") {
                    handleWH('firstFireSysTypeValue', 'Сигнализация')
                } else if (firstWH.data[0].security.fire_system_type === "Sprinkler") {
                    handleWH('firstFireSysTypeValue', 'Спринклерная')
                } else if (firstWH.data[0].security.fire_system_type === "Powder") {
                    handleWH('firstFireSysTypeValue', 'Порошковая')
                } else if (firstWH.data[0].security.fire_system_type === "Gaz") {
                    handleWH('firstFireSysTypeValue', 'Газовая')
                } else if (firstWH.data[0].security.fire_system_type === "Hydrant") {
                    handleWH('firstFireSysTypeValue', 'Гидрантная')
                } else if (firstWH.data[0].security.fire_system_type === "None") {
                    handleWH('firstFireSysTypeValue', 'Нет')
                }

                if (firstWH.data[0].storage_conditions.pallet_storage_capacity === 1) {
                    handleWH('firstPalletStorage', '50')
                } else if (firstWH.data[0].storage_conditions.pallet_storage_capacity === 2) {
                    handleWH('firstPalletStorage', '50-250')
                } else if (firstWH.data[0].storage_conditions.pallet_storage_capacity === 3) {
                    handleWH('firstPalletStorage', '250-500')
                } else if (firstWH.data[0].storage_conditions.pallet_storage_capacity === 4) {
                    handleWH('firstPalletStorage', '500-1000')
                } else if (firstWH.data[0].storage_conditions.pallet_storage_capacity === 5) {
                    handleWH('firstPalletStorage', '1000+')
                }

                handleWH('firstWH', firstWH.data[0])
            })
            getWarehouseImagesData(data_object[0])
            .then((data) => { 
                handleWH('firstWhImages',data)
            })
            handleWH('firstWhRating', ratings[0])
            
            
            RetrieveTopNRecs(data_object[1])
            .then((secondWH) => {
                if (secondWH.data[0].features.condition === "Regulated") {
                    handleWH('secondConditionValue', 'Регулируемый температурный режим')
                } else if (secondWH.data[0].features.condition === "Heated") {
                    handleWH('secondConditionValue', 'Отапливаемый')
                } else if (secondWH.data[0].features.condition === "Warmed") {
                    handleWH('secondConditionValue', 'Утепленный')
                } else if (secondWH.data[0].features.condition === "Non-heated") {
                    handleWH('secondConditionValue', 'Неотапливаемый')
                } else if (secondWH.data[0].features.condition === "Freezer-WH") {
                    handleWH('secondConditionValue', 'Морозильный')
                } else if (secondWH.data[0].features.condition === "Cold-WH") {
                    handleWH('secondConditionValue', 'Холодильный')
                }
    
                if (secondWH.data[0].security.fire_system_type === "Alarm") {
                    handleWH('secondFireSysTypeValue', 'Сигнализация')
                } else if (secondWH.data[0].security.fire_system_type === "Sprinkler") {
                    handleWH('secondFireSysTypeValue', 'Спринклерная')
                } else if (secondWH.data[0].security.fire_system_type === "Powder") {
                    handleWH('secondFireSysTypeValue', 'Порошковая')
                } else if (secondWH.data[0].security.fire_system_type === "Gaz") {
                    handleWH('secondFireSysTypeValue', 'Газовая')
                } else if (secondWH.data[0].security.fire_system_type === "Hydrant") {
                    handleWH('secondFireSysTypeValue', 'Гидрантная')
                } else if (secondWH.data[0].security.fire_system_type === "None") {
                    handleWH('secondFireSysTypeValue', 'Нет')
                }

                if (secondWH.data[0].storage_conditions.pallet_storage_capacity === 1) {
                    handleWH('secondPalletStorage', '50')
                } else if (secondWH.data[0].storage_conditions.pallet_storage_capacity === 2) {
                    handleWH('secondPalletStorage', '50-250')
                } else if (secondWH.data[0].storage_conditions.pallet_storage_capacity === 3) {
                    handleWH('secondPalletStorage', '250-500')
                } else if (secondWH.data[0].storage_conditions.pallet_storage_capacity === 4) {
                    handleWH('secondPalletStorage', '500-1000')
                } else if (secondWH.data[0].storage_conditions.pallet_storage_capacity === 5) {
                    handleWH('secondPalletStorage', '1000+')
                }

                handleWH('secondWH', secondWH.data[0])
            })
            getWarehouseImagesData(data_object[1])
            .then((data) => { 
                handleWH('secondWhImages',data)
            })

            handleWH('secondWhRating', ratings[1])
            
            
            RetrieveTopNRecs(data_object[2])
            .then((thirdWH) => {
                if (thirdWH.data[0].features.condition === "Regulated") {
                    handleWH('thirdConditionValue', 'Регулируемый температурный режим')
                } else if (thirdWH.data[0].features.condition === "Heated") {
                    handleWH('thirdConditionValue', 'Отапливаемый')
                } else if (thirdWH.data[0].features.condition === "Warmed") {
                    handleWH('thirdConditionValue', 'Утепленный')
                } else if (thirdWH.data[0].features.condition === "Non-heated") {
                    handleWH('thirdConditionValue', 'Неотапливаемый')
                } else if (thirdWH.data[0].features.condition === "Freezer-WH") {
                    handleWH('thirdConditionValue', 'Морозильный')
                } else if (thirdWH.data[0].features.condition === "Cold-WH") {
                    handleWH('thirdConditionValue', 'Холодильный')
                }
    
                if (thirdWH.data[0].security.fire_system_type === "Alarm") {
                    handleWH('thirdFireSysTypeValue', 'Сигнализация')
                } else if (thirdWH.data[0].security.fire_system_type === "Sprinkler") {
                    handleWH('thirdFireSysTypeValue', 'Спринклерная')
                } else if (thirdWH.data[0].security.fire_system_type === "Powder") {
                    handleWH('thirdFireSysTypeValue', 'Порошковая')
                } else if (thirdWH.data[0].security.fire_system_type === "Gaz") {
                    handleWH('thirdFireSysTypeValue', 'Газовая')
                } else if (thirdWH.data[0].security.fire_system_type === "Hydrant") {
                    handleWH('thirdFireSysTypeValue', 'Гидрантная')
                } else if (thirdWH.data[0].security.fire_system_type === "None") {
                    handleWH('thirdFireSysTypeValue', 'Нет')
                }

                if (thirdWH.data[0].storage_conditions.pallet_storage_capacity === 1) {
                    handleWH('thirdPalletStorage', '50')
                } else if (thirdWH.data[0].storage_conditions.pallet_storage_capacity === 2) {
                    handleWH('thirdPalletStorage', '50-250')
                } else if (thirdWH.data[0].storage_conditions.pallet_storage_capacity === 3) {
                    handleWH('thirdPalletStorage', '250-500')
                } else if (thirdWH.data[0].storage_conditions.pallet_storage_capacity === 4) {
                    handleWH('thirdPalletStorage', '500-1000')
                } else if (thirdWH.data[0].storage_conditions.pallet_storage_capacity === 5) {
                    handleWH('thirdPalletStorage', '1000+')
                }

                handleWH('thirdWH', thirdWH.data[0])
            })
            getWarehouseImagesData(data_object[2])
            .then((data) => { 
                handleWH('thirdWhImages',data)
            })
            handleWH('thirdWhRating', ratings[2])
            

            RetrieveTopNRecs(data_object[3])
            .then((fourthWH) => {
                if (fourthWH.data[0].features.condition === "Regulated") {
                    handleWH('fourthConditionValue', 'Регулируемый температурный режим')
                } else if (fourthWH.data[0].features.condition === "Heated") {
                    handleWH('fourthConditionValue', 'Отапливаемый')
                } else if (fourthWH.data[0].features.condition === "Warmed") {
                    handleWH('fourthCondififthConditionValuetionValue', 'Утепленный')
                } else if (fourthWH.data[0].features.condition === "Non-heated") {
                    handleWH('fourthConditionValue', 'Неотапливаемый')
                } else if (fourthWH.data[0].features.condition === "Freezer-WH") {
                    handleWH('fourthConditionValue', 'Морозильный')
                } else if (fourthWH.data[0].features.condition === "Cold-WH") {
                    handleWH('fourthConditionValue', 'Холодильный')
                }
    
                if (fourthWH.data[0].security.fire_system_type === "Alarm") {
                    handleWH('fourthFireSysTypeValue', 'Сигнализация')
                } else if (fourthWH.data[0].security.fire_system_type === "Sprinkler") {
                    handleWH('fourthFireSysTypeValue', 'Спринклерная')
                } else if (fourthWH.data[0].security.fire_system_type === "Powder") {
                    handleWH('fourthFireSysTypeValue', 'Порошковая')
                } else if (fourthWH.data[0].security.fire_system_type === "Gaz") {
                    handleWH('fourthFireSysTypeValue', 'Газовая')
                } else if (fourthWH.data[0].security.fire_system_type === "Hydrant") {
                    handleWH('fourthFireSysTypeValue', 'Гидрантная')
                } else if (fourthWH.data[0].security.fire_system_type === "None") {
                    handleWH('fourthFireSysTypeValue', 'Нет')
                }

                if (fourthWH.data[0].storage_conditions.pallet_storage_capacity === 1) {
                    handleWH('fourthPalletStorage', '50')
                } else if (fourthWH.data[0].storage_conditions.pallet_storage_capacity === 2) {
                    handleWH('fourthPalletStorage', '50-250')
                } else if (fourthWH.data[0].storage_conditions.pallet_storage_capacity === 3) {
                    handleWH('fourthPalletStorage', '250-500')
                } else if (fourthWH.data[0].storage_conditions.pallet_storage_capacity === 4) {
                    handleWH('fourthPalletStorage', '500-1000')
                } else if (fourthWH.data[0].storage_conditions.pallet_storage_capacity === 5) {
                    handleWH('fourthPalletStorage', '1000+')
                }

                handleWH('fourthWH', fourthWH.data[0])
            })
            getWarehouseImagesData(data_object[3])
            .then((data) => { 
                handleWH('fourthWhImages',data)
            })
            handleWH('fourthWhRating', ratings[3])
            

            RetrieveTopNRecs(data_object[4])
            .then((fifthWH) => {
                if (fifthWH.data[0].features.condition === "Regulated") {
                    handleWH('fifthConditionValue', 'Регулируемый температурный режим')
                } else if (fifthWH.data[0].features.condition === "Heated") {
                    handleWH('fifthConditionValue', 'Отапливаемый')
                } else if (fifthWH.data[0].features.condition === "Warmed") {
                    handleWH('fifthConditionValue', 'Утепленный')
                } else if (fifthWH.data[0].features.condition === "Non-heated") {
                    handleWH('fifthConditionValue', 'Неотапливаемый')
                } else if (fifthWH.data[0].features.condition === "Freezer-WH") {
                    handleWH('fifthConditionValue', 'Морозильный')
                } else if (fifthWH.data[0].features.condition === "Cold-WH") {
                    handleWH('fifthConditionValue', 'Холодильный')
                }
    
                if (fifthWH.data[0].security.fire_system_type === "Alarm") {
                    handleWH('fifthFireSysTypeValue', 'Сигнализация')
                } else if (fifthWH.data[0].security.fire_system_type === "Sprinkler") {
                    handleWH('fifthFireSysTypeValue', 'Спринклерная')
                } else if (fifthWH.data[0].security.fire_system_type === "Powder") {
                    handleWH('fifthFireSysTypeValue', 'Порошковая')
                } else if (fifthWH.data[0].security.fire_system_type === "Gaz") {
                    handleWH('fifthFireSysTypeValue', 'Газовая')
                } else if (fifthWH.data[0].security.fire_system_type === "Hydrant") {
                    handleWH('fifthFireSysTypeValue', 'Гидрантная')
                } else if (fifthWH.data[0].security.fire_system_type === "None") {
                    handleWH('fifthFireSysTypeValue', 'Нет')
                }

                if (fifthWH.data[0].storage_conditions.pallet_storage_capacity === 1) {
                    handleWH('fifthPalletStorage', '50')
                } else if (fifthWH.data[0].storage_conditions.pallet_storage_capacity === 2) {
                    handleWH('fifthPalletStorage', '50-250')
                } else if (fifthWH.data[0].storage_conditions.pallet_storage_capacity === 3) {
                    handleWH('fifthPalletStorage', '250-500')
                } else if (fifthWH.data[0].storage_conditions.pallet_storage_capacity === 4) {
                    handleWH('fifthPalletStorage', '500-1000')
                } else if (fifthWH.data[0].storage_conditions.pallet_storage_capacity === 5) {
                    handleWH('fifthPalletStorage', '1000+')
                }

                handleWH('fifthWH', fifthWH.data[0])
                handleIsLoading(isLoading)
            })
            getWarehouseImagesData(data_object[4])
            .then((data) => { 
                handleWH('fifthWhImages',data)
            })
            handleWH('fifthWhRating', ratings[4])
            
        })
    }, [submitSignal]);

    return (
        <div>  
        <Box sx = {{
            width: '30rem',
            margin: "0 auto",
            marginBottom: "15px",
            textAlign: "center",
        }}>
        <Form >
            
                <Controls.Input
                    name = 'fullName'
                    label = 'Введите имя'
                    value={values.fullName}
                />
                <Controls.Input
                    label = 'Введите email'
                    name = 'email'
                    value = {values.email}
                />
                <Controls.Input
                    label = 'Введите номер телефона'
                    name = 'mobile'
                    value = {values.mobile}
                />
                <Controls.Input
                    label = 'Введите компанию'
                    name = 'company'
                    value = {values.company}
                />
                <Box sx = {{
                    marginTop: "1rem",
                }}>
                <Controls.Button
                    variant = 'contained'
                    color = 'primary'
                    size = 'large'
                    text = 'Опубликовать'
                    onClick = {() => {
                        postSurveyResults(values)
                        .then((data) => {
                            console.log(data)
                        })
                        handleNext();
                        submitSignal = 1;
                        submitSignal = 0;
                    }}
                />
                </Box>
        </Form>
        </Box>
        </div>
    )
}
