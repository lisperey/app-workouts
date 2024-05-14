import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import { useLocalSearchParams } from "expo-router";
import exercises from '../../assets/data/exercises.json';
import { Stack } from 'expo-router';
import { useState } from "react";

export default function ExerciseDetailsScreen(){
    const params = useLocalSearchParams();
    const exercise = exercises.find(item => item.name == params.name);
    const [isInstructionExpanded, setIsInstructionExpanded] = useState(false);
    if(!exercise){
        return <Text>Exercício não encontrado</Text>;
    }
    return (
        <ScrollView style={styles.container}>
            <Stack.Screen options={{title: exercise.name}}/>
            <View style={styles.panel}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <Text style={styles.itemSubtitle}>
                    <Text style={styles.subValue}>{exercise.muscle}</Text> |{' '}
                    <Text style={styles.subValue}>{exercise.equipment}</Text>
                </Text>
            </View>
            <View style={styles.panel}>
                <Text style={styles.instructions} numberOfLines={isInstructionExpanded?0:3}>{exercise.instructions}</Text>
                <Text onPress={()=>{setIsInstructionExpanded(!isInstructionExpanded)}} style={styles.seemore}>{isInstructionExpanded? 'see less':'see more'}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        padding: 10,
        gap:10
    },
    panel: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,

    },
    exerciseName: {
        fontSize: 19,
        fontWeight: '500'
    },
    exerciseSubtitle: {
        color: 'dimgray'
    },
    subValue: {
        textTransform: 'capitalize'
    },
    instructions:{
        fontSize: 16,
        lineHeight: 22,
    },
    seemore:{
        alignSelf: 'center',
        padding: 10,
        fontWeight: '600',
        color: '#0530ad'
    }
});