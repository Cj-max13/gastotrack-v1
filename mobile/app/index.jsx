import { Redirect } from 'expo-router';

export default function Index() {
  // Root redirect - handled by _layout
  return <Redirect href="/auth/login" />;
}
