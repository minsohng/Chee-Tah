export default interface Home {
  socket: any
  setContainerLabel(containerLabel: string): void,
  setMuteToggles?(newObj :Object): void,
  muteToggles? : Object
}