import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useAuthStore } from '../store/authStore';

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  const token = useAuthStore((state) => state.token);
  const loadAuth = useAuthStore((state) => state.loadAuth);
  const isLoading = useAuthStore((state) => state.isLoading);

  const isAuthenticated = !!token;

  useEffect(() => {
    loadAuth();
  }, []);

  useEffect(() => {
    if (isLoading) return; // Wait until auth state is loaded

    const inAuthGroup = segments[0] === 'auth';

    if (!isAuthenticated && !inAuthGroup) {
      router.replace('/auth/login');
    }
    if (isAuthenticated && inAuthGroup) {
      router.replace('/tabs/dashboard');
    }
  }, [isAuthenticated, isLoading, segments]);

  if (isLoading) {
    return null; // Show loading spinner in production
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="tabs" options={{ headerShown: false }} />
      <Stack.Screen name="admin" options={{ headerShown: false }} />
    </Stack>
  );
}
