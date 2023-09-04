const batches = [
  {
    label: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
    value: `${String(new Date().getFullYear()).slice(2)}${String(
      new Date().getFullYear() + 1
    ).slice(2)}`,
  },
  {
    label: `${new Date().getFullYear() - 1}-${new Date().getFullYear()}`,
    value: `${String(new Date().getFullYear() - 1).slice(2)}${String(
      new Date().getFullYear()
    ).slice(2)}`,
  },
  {
    label: `${new Date().getFullYear() - 2}-${new Date().getFullYear() - 1}`,
    value: `${String(new Date().getFullYear() - 2).slice(2)}${String(
      new Date().getFullYear() - 1
    ).slice(2)}`,
  },
  {
    label: `${new Date().getFullYear() - 3}-${new Date().getFullYear() - 2}`,
    value: `${String(new Date().getFullYear() - 3).slice(2)}${String(
      new Date().getFullYear() - 2
    ).slice(2)}`,
  },
  {
    label: `${new Date().getFullYear() - 4}-${new Date().getFullYear() - 3}`,
    value: `${String(new Date().getFullYear() - 4).slice(2)}${String(
      new Date().getFullYear() - 3
    ).slice(2)}`,
  },
  {
    label: `${new Date().getFullYear() - 5}-${new Date().getFullYear() - 4}`,
    value: `${String(new Date().getFullYear() - 5).slice(2)}${String(
      new Date().getFullYear() - 4
    ).slice(2)}`,
  },
];

export default batches;
