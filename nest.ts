type F = (): void;
const x: F = (): void => {
  const y: F = (): void => {
  };
  y();
};
