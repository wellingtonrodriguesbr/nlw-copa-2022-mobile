import { FlatList, Icon, VStack } from "native-base";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Octicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { PoolCard, PoolProps } from "../components/PoolCard";
import { EmptyPoolList } from "../components/EmptyPoolList";
import { api } from "../services/api";
import { Loading } from "../components/Loading";

export function Pools() {
  const { navigate } = useNavigation();
  const [pools, setPools] = useState<PoolProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getPools() {
    try {
      setIsLoading(true);
      const response = await api.get("/pools");
      setPools(response.data.pools);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getPools();
    }, [])
  );

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus bolões" />
      <VStack
        mt={6}
        mx={6}
        borderBottomWidth={1}
        borderBottomColor="gray.600"
        pb={4}
        mb={4}
      >
        <Button
          onPress={() => navigate("find")}
          title="Buscar bolão por código"
          leftIcon={
            <Icon as={Octicons} name="search" color="black" size="md" />
          }
        />
      </VStack>
      {!pools.length && isLoading ? (
        <Loading />
      ) : (
        <FlatList
          px={6}
          data={pools}
          keyExtractor={(pool) => pool.id}
          renderItem={({ item }) => (
            <PoolCard
              data={item}
              onPress={() => navigate("details", { id: item.id })}
            />
          )}
          ListEmptyComponent={() => <EmptyPoolList />}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 10 }}
        />
      )}
    </VStack>
  );
}
