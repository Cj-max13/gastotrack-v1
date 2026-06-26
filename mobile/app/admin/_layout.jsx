import { Stack } from 'expo-router';

export default function AdminLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f5f5f5',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="admin-dashboard" 
        options={{ 
          title: 'Admin Dashboard',
          headerShown: true,
        }} 
      />
    </Stack>
  );
}
