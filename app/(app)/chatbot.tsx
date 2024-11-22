import { View } from "react-native";

import { H1, Muted } from "@/components/ui/typography";

export default function Chatbot() {
	return (
		<View className="flex flex-1 items-center justify-center bg-background p-4 gap-y-4">
			<H1 className="text-center">Chatbot</H1>
			<Muted className="text-center">This is a modal screen.</Muted>
		</View>
	);
}
