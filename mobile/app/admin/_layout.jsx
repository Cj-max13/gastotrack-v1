import { Stack } from 'expo-router';

export default function AdminLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2c3e50',
        },
        headerTintColor: '#fff',
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
      <Stack.Screen 
        name="admin-users" 
        options={{ 
          title: 'Manage Users',
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="admin-categories" 
        options={{ 
          title: 'Manage Categories',
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="admin-settings" 
        options={{ 
          title: 'System Settings',
          headerShown: true,
        }} 
      />
    </Stack>
  );
}
