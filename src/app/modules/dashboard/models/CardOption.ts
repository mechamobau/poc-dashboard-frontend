interface ICardOption {
  label: string;
  action: (cardId: number) => void;
}

export default ICardOption;
