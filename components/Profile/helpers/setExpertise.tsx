// Takes an event where evt.target.name === {expertise}
// sets new values for the corresponding expertise in an array
// (e.g. functionalExpertise = [ex1, newValue, ""] or industryExpertise = [newValue, ex2, ""])

export function setExpertise(
  expertise,
  evt,
  setValues,
  values,
  setIdentity,
  identity
) {
  let strippedExpertise;
  let expertiseIndex;
  if (
    evt.target.name[evt.target.name.length - 1] === "2" ||
    evt.target.name[evt.target.name.length - 1] === "3"
  ) {
    strippedExpertise = expertise.substring(0, expertise.length - 1);
    expertiseIndex = Number(evt.target.name[evt.target.name.length - 1]);
  } else {
    strippedExpertise = expertise;
    expertiseIndex = 1;
  }

  let expertiseArray = [];

  const expertiseValues =
    strippedExpertise === "functionalExpertise"
      ? values.functionalExpertise
      : values.industryExpertise;

  for (let i = 0; i <= 2; i++) {
    if (i === expertiseIndex - 1) {
      expertiseArray.push(evt.target.value);
    } else {
      expertiseArray.push(expertiseValues[i]);
    }
  }
  setValues((values) => ({
    ...values,
    [strippedExpertise]: expertiseArray,
  }));
  setIdentity({
    ...identity,
    [strippedExpertise]: expertiseArray,
  });
}
