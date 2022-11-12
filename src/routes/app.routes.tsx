import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NewPool } from "../screens/NewPool";
import { Pools } from "../screens/Pools";
import { PlusCircle, SoccerBall } from "phosphor-react-native";
import { useTheme } from "native-base";
import { FindPool } from "../screens/FindPool";
import { Details } from "../screens/Details";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const theme = useTheme();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: "beside-icon",
        tabBarActiveTintColor: theme.colors.yellow[500],
        tabBarInactiveTintColor: theme.colors.gray[300],
        tabBarStyle: {
          position: "absolute",
          height: theme.sizes[22],
          borderTopWidth: 0,
          backgroundColor: theme.colors.gray[800],
        },
        tabBarLabelStyle: {
          fontWeight: "700",
        },
      }}
    >
      <Screen
        name="new"
        component={NewPool}
        options={{
          tabBarIcon: ({ color }) => (
            <PlusCircle color={color} size={theme.sizes[6]} />
          ),
          tabBarLabel: "Novo bolão",
        }}
      />
      <Screen
        name="pools"
        component={Pools}
        options={{
          tabBarIcon: ({ color }) => (
            <SoccerBall color={color} size={theme.sizes[6]} />
          ),
          tabBarLabel: "Meus bolões",
        }}
      />

      <Screen
        name="find"
        component={FindPool}
        options={{
          tabBarButton: () => null,
        }}
      />

      <Screen
        name="details"
        component={Details}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Navigator>
  );
}
