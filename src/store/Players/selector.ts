export const selectAllPlayers = (state: any) => {
  return state.player.playerList;
};

export const selectActivePlayers = (state: any) => {
  return state.player.activeList;
};
