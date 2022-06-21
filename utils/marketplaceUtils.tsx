export const convertDateToUnix = (myDate) => {
    return Math.floor(myDate.getTime() / 1000)
  };

export const truncate = (str) => {
    if (str) {
      return str.length > 42 ? str.substring(0, 42) + "..." : str;
    }
  }