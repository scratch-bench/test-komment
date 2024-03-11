type F = (): void;
const x: F = (): void => {
  const y: F = (): void => {
  };
  y();
};


// we definitely made a change