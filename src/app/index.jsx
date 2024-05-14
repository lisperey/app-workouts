import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import exercises from '../../assets/data/exercises.json';
import ExerciseListIem from '../../src/components/ExerciseListItem';
import { useQuery } from '@tanstack/react-query';
import { gql, request } from 'graphql-request';

const url = `https://kararval.us-east-a.ibm.stepzen.net/api/wiggly-labradoodle/graphql`;
const exercisesQuery = gql`
    query Exercise($muscle: String , $name: String) {
        exercises(muscle: $muscle, name: $name) {
        name
        muscle
        }
    }
`;


export default function App() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['exercises'],
        queryFn: () => {
            return request(url, exercisesQuery);
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
                data={data}
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
