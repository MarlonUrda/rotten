import { PlaylistController } from "@/api/controllers/PlaylistController";
import myToast from "@/components/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { userAtom } from "@/utils/atoms/userAtom";
import { Playlist, SimplePlaylist } from "@/types/Playlist";

export function useMutatePlaylist() {
  const queryClient = useQueryClient();
  const user = useAtomValue(userAtom);
  const addToPlaylistMutation = useMutation({
    mutationFn: async (gameId: string) =>
      await PlaylistController.addToPlaylist({ gameId: gameId }),

    onSuccess: () => {
      myToast({ type: "success", message: "Game added successfully!" });
      
    },
    onMutate: async (gameId: string) => {
      queryClient.cancelQueries({queryKey: ["playlist", "simple"]});
      const previousSimplePlaylist = queryClient.getQueryData<SimplePlaylist>(["playlist", "simple"]);

      if (previousSimplePlaylist) {
        queryClient.setQueryData<SimplePlaylist>(["playlist", "simple"], {
          ...previousSimplePlaylist,
          gameIds: [...previousSimplePlaylist.gameIds, gameId],
        });
      }

      return { previousSimplePlaylist };
    },

    onError: (error, variables, context) => {
      if (context) {
        queryClient.setQueryData<SimplePlaylist>(["playlist", "simple"], context.previousSimplePlaylist);
      }
      myToast({ type: "error", message: error.message });
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["playlist"],
      });
    },
  });

  const removeFromPlaylistMutation = useMutation({
    mutationFn: async (gameId: string) => {
      if (!user?._id) {
        throw new Error("User ID is undefined");
      }
      await PlaylistController.removeFromPlaylist(user._id, gameId);
    },
    onSuccess: () => {
      myToast({ type: "success", message: "Juego eliminado de la lista!" });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["playlist"],
      });
    },
    onMutate: async (gameId: string) => {
      queryClient.cancelQueries({queryKey: ["playlist"]});
      const previousSimplePlaylist = queryClient.getQueryData<SimplePlaylist>(["playlist", "simple"]);
      const previousPlaylist = queryClient.getQueryData<Playlist>(["playlist", user?._id]);

      if (previousSimplePlaylist) {
        queryClient.setQueryData<SimplePlaylist>(["playlist", "simple"], {
          ...previousSimplePlaylist,
          gameIds: previousSimplePlaylist.gameIds.filter((id) => id !== gameId),
        });
      }

      if (previousPlaylist) {
        queryClient.setQueryData<Playlist>(["playlist", user?._id], {
          ...previousPlaylist,
          gameIds: previousPlaylist.gameIds.filter((game) => game._id !== gameId),
        });
      }

      return { previousSimplePlaylist, previousPlaylist };
      
    },
    onError: (error, variables, context) => {
      if (context) {
        queryClient.setQueryData<SimplePlaylist>(["playlist", "simple"], context.previousSimplePlaylist);
        queryClient.setQueryData<Playlist>(["playlist", user?._id], context.previousPlaylist);
      }
      myToast({ type: "error", message: error.message });
    }


  });

  return { addToPlaylistMutation, removeFromPlaylistMutation };
}
