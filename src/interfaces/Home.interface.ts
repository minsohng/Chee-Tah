export default interface Home {
  setContainerLabel(containerLabel: string): void,
  useAudio(url: string): [boolean, VoidFunction, VoidFunction]
}