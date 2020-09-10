import React, { useState } from 'react';
import { View, Text, TextInput, Picker, ScrollView} from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import api from '../../services/api';

import styles from './styles';


function TeacherList() {
    const [ isFiltersVisible, setIsFiltersVisible] = useState(false);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    function loadFavorites() {
        AsyncStorage.getItem('favorite').then(response => {
            if (response) {
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                })
                setFavorites(JSON.parse(favoritedTeachersIds));
            }
        });
    }




    function handleToggleFiltersVisible(){
        setIsFiltersVisible(!isFiltersVisible);
    }

    async function handleFiltersSubmit(){
        loadFavorites();

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,                
            }
        });


        setTeachers(response.data);
        setIsFiltersVisible(false);
    }


    return(
        <View style={styles.container}>
            <PageHeader 
                title="Proffys disponíveis" 
                headerRight={(
                    <BorderlessButton
                        onPress={handleToggleFiltersVisible}
                    >   
                        <View style={styles.groupFilter}>
                            <Text style={styles.textFilter}>Filtrar</Text>
                            <Feather name="filter" size={20} color="#fff" />
                        </View>
                        
                    </BorderlessButton>
                )}
            >
                
                { isFiltersVisible && 
                    (
                        <View style={styles.searchForm}>
                            <Text style={styles.label}>Matéria</Text>
                            <Picker
                                selectedValue={subject}
                                style={styles.input} 
                                onValueChange={(itemValue, itemIdenx) => setSubject(itemValue)}
                            >
                                <Picker.Item label="QualquerCoisa" value="" />
                                <Picker.Item label="Matemática" value="Matemática" />
                                <Picker.Item label="Portugês" value="Portugês" />
                                <Picker.Item label="Física" value="Física" />
                            </Picker>

                            {/*
                            <TextInput
                            style={styles.input} 
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholder="Qual a matéria:"
                            placeholderTextColor="#c1bccc"
                            />
                            */ }

                            <View style={styles.inputGroup}>
                                <View style={styles.inputBlock}>
                                    <Text style={styles.label}>
                                        Dia da semana
                                    </Text>
                                    <Picker
                                        selectedValue={week_day}
                                        style={styles.input} 
                                        onValueChange={(itemValue, itemIdenx) => setWeekDay(itemValue)}
                                    >
                                        <Picker.Item label="Dia..." value="" />
                                        <Picker.Item label="Domingo" value={0} />
                                        <Picker.Item label="Segunda-feira" value={1} />
                                        <Picker.Item label="Terça-feira" value={2} />
                                        <Picker.Item label="Quarta-feira" value={3} />
                                        <Picker.Item label="Quinta-feira" value={4} />
                                        <Picker.Item label="Sexta-feira" value={5} />
                                        <Picker.Item label="Sabado" value={6} />
                                    </Picker>
                                    {/* <TextInput
                                    style={styles.input} 
                                    value={week_day}
                                    onChangeText={text => setWeekDay(text)}
                                    placeholder="Qual o dia?"
                                    placeholderTextColor="#c1bccc"
                                    />*/}
                                   
                                </View>
                                <View style={styles.inputBlock}>
                                    <Text style={styles.label}>
                                        Horário
                                    </Text>
                                    <TextInput
                                    style={styles.input} 
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                    placeholder="Qual horário?"
                                    placeholderTextColor="#c1bccc"
                                    />
                                </View>
                            </View>
                            <RectButton  onPress={handleFiltersSubmit} style={styles.submitButton}> 
                                <Text style={styles.submitButtonText}>Filtrar</Text>
                            </RectButton>
                        </View>
                    )}
            </PageHeader>
            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >
                {teachers.map((teacher: Teacher) => {
                    return( 
                        <TeacherItem 
                            key={teacher.id} 
                            teacher={teacher}
                            favorited={favorites.includes(teacher.id)}
                        />
                    );
                })}

            </ScrollView>
        </View>
    );
}

export default TeacherList;