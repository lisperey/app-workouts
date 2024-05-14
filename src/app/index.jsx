import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import exercises from '../../assets/data/exercises.json';
import ExerciseListIem from '../../src/components/ExerciseListItem';
import { useQuery } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import client  from '../graphqlClient'

const exercisesQuery = gql`
  query exercises($muscle: String, $name: String, $offset: Int) {
    exercises(muscle: $muscle, name: $name, offset: $offset) {
      name
      muscle
      equipment
    }
  }
`;

export default function App() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['exercises'],
        queryFn: async () => {
            return client.request(exercisesQuery);
        }
    });
    if (isLoading) {
        return <ActivityIndicator />
    }
    if(error){
        return <Text>Erro ao buscar exercícios</Text>
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={data?.exercises}
                contentContainerStyle={{ gap: 5 }}
                keyExtractor={(item, index) => item.name + index}
                renderItem={({ item, index }) => <ExerciseListIem item={item} />}
            />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'ghostwhite',
        justifyContent: 'center',
        padding: 10,
    },
});
