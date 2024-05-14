import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { useState } from 'react';
import { gql } from 'graphql-request';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import graphqlClient from '../graphqlClient';
import { useAuth } from '../providers/AuthContext';

const mutationDocument = gql`
  mutation MyMutation($newSet: NewSet!) {
    insertSet(
      document: $newSet
      dataSource: "Cluster1"
      database: "workouts"
      collection: "sets"
    ) {
      insertedId
    }
  }
`;

const NewSetInput = () => {
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');

    const { username } = useAuth();
    const queryClient = useQueryClient();

    const { mutate, error, isError, isPending } = useMutation({
        mutationFn: (newSet) => graphqlClient.request(mutationDocument, { newSet }),
        onSuccess: () => {
            setReps('');
            setWeight('');
            queryClient.invalidateQueries({ queryKey: ['sets', exerciseName] });
        },
    });

    const addSet = () => {
        console.warn('Add set');
    }
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <TextInput
                    value={reps}
                    onChangeText={setReps}
                    placeholder="Reps"
                    keyboardType="numeric"
                    style={styles.input}></TextInput>
                <TextInput
                    value={weight}
                    onChangeText={setWeight}
                    keyboardType="numeric"
                    placeholder="Weight" 
                    style={styles.input}></TextInput>
                <Button title={isPending ? 'Adding...' : 'Add'} onPress={addSet}></Button>
            </View>
            {isError && <Text style={{ color: 'red' }}>Failed to add the set</Text>}
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 5,
      gap: 5,
    },
    row: {
      flexDirection: 'row',
      gap: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: 'gainsboro',
      padding: 10,
      flex: 1,
      borderRadius: 5,
    },
  });

export default NewSetInput;