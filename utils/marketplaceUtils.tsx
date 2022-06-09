export const convertDateToUnix = (myDate) => {
    return Math.floor(myDate.getTime() / 1000)
  };