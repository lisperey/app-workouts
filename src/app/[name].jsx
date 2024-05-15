import { View, Text, StyleSheet, ScrollView, Button, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Stack } from 'expo-router';
import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import client  from '../graphqlClient';
import NewSetInput from '../components/NewSetInput';
import SetsList from '../components/SetsList';
import ProgressGraph from '../components/ProgressGraph';

const exerciseQuery = gql`
query exercises($name: String) {
    exercises(name: $name) {
      name
      muscle
      instructions
      equipment
    }
  }

`;

export default function ExerciseDetailsScreen(){
    const { name } = useLocalSearchParams();
    const [isInstructionExpanded, setIsInstructionExpanded] = useState(false);
    const { data, isLoading, error } = useQuery({
        queryKey: ['exercises', name],
        queryFn: async () => {
            return client.request(exerciseQuery, { name });
        }
    });
    if (isLoading) {
        return <ActivityIndicator />
    }
    if(error){
        return <Text>Erro ao buscar exercício</Text>
    }
    const exercise = data.exercises[0];
    return (
        <View style={styles.container}>
      <Stack.Screen options={{ title: exercise.name }} />

      <SetsList
        exerciseName={exercise.name}
        ListHeaderComponent={() => (
          <View style={{ gap: 5 }}>
            <View style={styles.panel}>
              <Text style={styles.exerciseName}>{exercise.name}</Text>

              <Text style={styles.exerciseSubtitle}>
                <Text style={styles.subValue}>{exercise.muscle}</Text> |{' '}
                <Text style={styles.subValue}>{exercise.equipment}</Text>
              </Text>
            </View>

            <View style={styles.panel}>
              <Text
                style={styles.instructions}
                numberOfLines={isInstructionExpanded ? 0 : 3}
              >
                {exercise.instructions}
              </Text>
              <Text
                onPress={() => setIsInstructionExpanded(!isInstructionExpanded)}
                style={styles.seemore}
              >
                {isInstructionExpanded ? 'See less' : 'See more'}
              </Text>
            </View>

            <NewSetInput exerciseName={exercise.name} />
          </View>
        )}
      />
    </View>
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