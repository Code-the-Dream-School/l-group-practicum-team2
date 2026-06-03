export const formatAnimalAge = (ageYears) => {
  const flooredAge = Math.floor(Number(ageYears));

  return flooredAge === 1 ? "1 yr" : `${flooredAge} yrs`;
};
