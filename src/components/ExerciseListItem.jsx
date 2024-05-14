import { StyleSheet, Text, View } from 'react-native';


export default function ExerciseListIem({ item }) {
    return (
        <View style={styles.exerciseContainer}>
            <Text style={styles.exerciseName}>{item.name}</Text>
            <Text style={styles.itemSubtitle}>
                {item.muscle.toUpperCase()} | {item.equipment.toUpperCase()}
            </Text>
        </View>)
}

const styles = StyleSheet.create({
    exerciseContainer: {
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 10,
      gap: 5,
    },
    exerciseName: {
      fontSize: 19,
      fontWeight: '500'
    },
    exerciseSubtitle: {
      color: 'dimgray'
    }
  });
  