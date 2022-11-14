import { Box, FlatList, useToast } from "native-base";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Game, GameProps } from "./Game";
import { Loading } from "./Loading";

interface Props {
  poolId: string;
}

export function Guesses({ poolId }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState<GameProps[]>([]);
  const [firstTeamPoints, setFirstTeamPoints] = useState("");
  const [secondTeamPoints, setSecondTeamPoints] = useState("");
  const toast = useToast();

  async function getGames() {
    try {
      setIsLoading(true);
      const response = await api.get(`/pools/${poolId}/games`);
      setGames(response.data.games);
    } catch (error) {
      console.log(error);
      toast.show({
        title: "Não foi possível carregar os jogos!",
        placement: "bottom",
        bg: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGuessConfirm(gameId: string) {
    try {
      if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        return toast.show({
          title: "Informe o seu palpite para ambos os times!",
          placement: "bottom",
          bg: "red.500",
        });
      }

      await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints),
      });

      toast.show({
        title: "Palpite enviado com sucesso!",
        placement: "bottom",
        bg: "green.500",
      });
      getGames();
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.show({
        title: "Não foi possível enviar o palpite!",
        placement: "bottom",
        bg: "red.500",
      });
    }
  }

  useEffect(() => {
    getGames();
  }, [poolId]);

  return (
    <>
      {!games.length && isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 10 }}
          renderItem={({ item }) => (
            <Game
              data={item}
              setFirstTeamPoints={setFirstTeamPoints}
              setSecondTeamPoints={setSecondTeamPoints}
              onGuessConfirm={() => handleGuessConfirm(item.id)}
            />
          )}
        />
      )}
    </>
  );
}
