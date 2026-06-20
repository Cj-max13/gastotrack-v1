import { FlatList, View, StyleSheet } from 'react-native';
import ChatBubble from './ChatBubble';
import { colors } from '../../constants/colors';

export default function ChatWindow({ messages, loading }) {
  return (
    <FlatList
      data={messages}
      renderItem={({ item }) => <ChatBubble message={item.text} isUser={item.isUser} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      inverted={false}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingBottom: 8,
    flexGrow: 1,
  },
});
