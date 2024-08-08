// RidesScreen.js
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { selectAllJobs, selectCurrentJob } from '../../slices/jobSlice';

const RidesScreen = () => {
  const allJobs = useSelector(selectAllJobs);
  const currentJob = useSelector(selectCurrentJob);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
      <Text>Rides Screen</Text>
      
      <Text>All Jobs:</Text>
      <FlatList
        data={allJobs}
        keyExtractor={(item, index) => item.jobid?.toString() || `item-${index}`}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20 }}>
            <Text>Job ID: {item.jobid}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Driver Name: {item.driver?.firstName}</Text>
            <Text>Price: {item.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default RidesScreen;
