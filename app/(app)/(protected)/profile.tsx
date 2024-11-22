import React from "react";

import { router } from "expo-router";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Image } from "@/components/image";
import { Text } from "@/components/ui/text";
import { H1, Muted } from "@/components/ui/typography";
import { useSupabase } from "@/context/supabase-provider";
import { AntDesign, MaterialIcons, FontAwesome5, Feather } from "@expo/vector-icons";

export default function Profile() {
	const { signOut } = useSupabase();

	return (
		<View className="flex-1 bg-background mt-10">
			{/* Fixed Profile Header */}
			<View className="items-center justify-center p-6 border-b border-gray-200 bg-white">
				<Image
					source={require("@/assets/Logo.png")}
					className="w-40 h-40 rounded-full mb-2"
				/>
				<H1 style={{ fontSize: 24, fontWeight: 'bold' }}>RentEase User</H1>
				<TouchableOpacity onPress={() => router.push("/(app)/editProfile")}>
					<Text style={{ fontSize: 16, color: "#1E90FF" }}>View and edit profile</Text>
				</TouchableOpacity>

			</View>

			{/* Scrollable Options */}
			<ScrollView contentContainerStyle={{ paddingVertical: 16 }}>
				<View className="w-full bg-white">
					<TouchableOpacity className="flex-row items-center p-5 border-b border-gray-200" onPress={() => router.push("/(app)/favorites")}>
					 <MaterialIcons name="favorite-border" size={24} color="black" />
						<View className="ml-4 flex-1">
							<Text style={{ fontSize: 18, fontWeight: '600' }}>Favorites</Text>
							<Muted style={{ fontSize: 14 }}>All of your favorite listings</Muted>
						</View>
						<AntDesign name="right" size={20} color="gray" />
					</TouchableOpacity>

					<TouchableOpacity className="flex-row items-center p-5 border-b border-gray-200" onPress={() => router.push("/(app)/publicView")}>
						<Feather name="eye" size={24} color="black" />
						<View className="ml-4 flex-1">
							<Text style={{ fontSize: 18, fontWeight: '600' }}>Public View</Text>
							<Muted style={{ fontSize: 14 }}>See how people view your profile</Muted>
						</View>
						<AntDesign name="right" size={20} color="gray" />
					</TouchableOpacity>

					<TouchableOpacity className="flex-row items-center p-5 border-b border-gray-200" onPress={() => router.push("/(app)/trackOrder")}>
						<FontAwesome5 name="search-location" size={24} color="black" />
						<View className="ml-4 flex-1">
							<Text style={{ fontSize: 18, fontWeight: '600' }}>Track Order</Text>
							<Muted style={{ fontSize: 14 }}>Track your buying and selling orders</Muted>
						</View>
						<AntDesign name="right" size={20} color="gray" />
					</TouchableOpacity>
					<TouchableOpacity className="flex-row items-center p-5 border-b border-gray-200" onPress={() => router.push("/(app)/paymentMethod")}>
					<MaterialIcons name="payment" size={24} color="black" />
						<View className="ml-4 flex-1">
							<Text style={{ fontSize: 18, fontWeight: '600' }}>Payment Methods</Text>
							<Muted style={{ fontSize: 14 }}>See your Payment details and billing information </Muted>
						</View>
						<AntDesign name="right" size={20} color="gray" />
					</TouchableOpacity>
					<TouchableOpacity className="flex-row items-center p-5 border-b border-gray-200" onPress={() => router.push("/(app)/settings")}>
						<AntDesign name="setting" size={24} color="black" />
						<View className="ml-4 flex-1">
							<Text style={{ fontSize: 18, fontWeight: '600' }}>Settings</Text>
							<Muted style={{ fontSize: 14 }}>privacy and account management</Muted>
						</View>
						<AntDesign name="right" size={20} color="gray" />
					</TouchableOpacity>
					<TouchableOpacity className="flex-row items-center p-5 border-b border-gray-200" onPress={() => router.push("/(app)/helpSupport")}>
						<FontAwesome5 name="hands-helping" size={24} color="black" />
						<View className="ml-4 flex-1">
							<Text style={{ fontSize: 18, fontWeight: '600' }}>Help & Support</Text>
							<Muted style={{ fontSize: 14 }}>Help center and legal terms</Muted>
						</View>
						<AntDesign name="right" size={20} color="gray" />
					</TouchableOpacity>
					<TouchableOpacity className="flex-row items-center p-5 border-b border-gray-200" onPress={signOut}>
					<MaterialIcons name="exit-to-app" size={24} color="black" />
						<View className="ml-4 flex-1">
							<Text style={{ fontSize: 18, fontWeight: '600' }}>Logout</Text>
						</View>
						<AntDesign name="right" size={20} color="gray" />
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	);
}
