import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Image,
  FlatList,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { supabase } from "@/config/supabase";

interface ChatUser {
  userId: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  profilePicture: string | null;
}

export default function Chats() {
  const router = useRouter();
  const [chatUsers, setChatUsers] = useState<ChatUser[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchChatUsers();
  }, []);

  const fetchChatUsers = async () => {
    try {
      setLoading(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        Alert.alert("Error", userError.message);
        return;
      }

      // Fetch the latest message for each user conversation
      const { data, error } = await supabase.rpc("get_latest_messages", {
        current_user_id: user.id,
      });

      if (error) throw error;

      const transformedData = data.map((item: any) => ({
        userId: item.other_user_id,
        name: item.name || "Unknown",
        lastMessage: item.content,
        timestamp: item.timestamp,
        profilePicture: item.profile_picture || null,
      }));

      setChatUsers(transformedData);
    } catch (error: any) {
      Alert.alert("Error fetching chats", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChatPress = (userId: string, name: string) => {
    router.push({
      pathname: "/(app)/chat",
      params: { userId, name },
    });
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9455f4" />
        <Text>Loading chats...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
			{/* Header */}
			<View className="flex-row items-center justify-between p-4 border-b border-gray-200 bg-white mt-8">
			<Text className="text-lg font-semibold" style={{ fontSize: 25}}>Chats</Text>
			<TouchableOpacity
            style={styles.exploreButton}
            onPress={() => router.push("/(app)/users")}
            >
            <Text style={styles.exploreButtonText}>Explore people</Text>
          	</TouchableOpacity>
			</View>

      {/* Chat List */}
      {chatUsers.length > 0 ? (
        <FlatList
          data={chatUsers}
          keyExtractor={(item) => item.userId}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.chatItem}
              onPress={() => handleChatPress(item.userId, item.name)}
            >
              <Image
                source={
                  item.profilePicture
                    ? { uri: item.profilePicture }
                    : require("@/assets/Logo.png")
                }
                style={styles.profilePicture}
              />
              <View style={styles.chatInfo}>
                <Text style={styles.chatName}>{item.name}</Text>
                <Text style={styles.chatMessage} numberOfLines={1}>
                  {item.lastMessage}
                </Text>
              </View>
              <Text style={styles.chatTimestamp}>
                {new Date(item.timestamp).toLocaleTimeString()}
              </Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        // No Chats Section
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialIcons name="message" size={80} color="lightgray" />
          <Text style={styles.noChatsTitle}>No messages yet?</Text>
          <Text style={styles.noChatsDescription}>
            Find something you like and start a conversation!
          </Text>
          <TouchableOpacity
            style={styles.exploreButton}
            onPress={() => router.push("/(app)/users")}
          >
            <Text style={styles.exploreButtonText}>Explore people</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    marginTop: 40,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "600",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  chatInfo: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "600",
  },
  chatMessage: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  chatTimestamp: {
    fontSize: 12,
    color: "#888",
  },
  noChatsTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 16,
  },
  noChatsDescription: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    marginTop: 8,
    marginHorizontal: 20,
  },
  exploreButton: {
    backgroundColor: "#9455f4",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginTop: 24,
  },
  exploreButtonText: {
    color: "white",
    fontWeight: "600",
  },
});
