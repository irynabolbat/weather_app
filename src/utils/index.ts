const PRESSURE_UNITS = 0.750062;

export const capitalizeFirstLetter = (str: string) => {
  if (!str) {
    return '';
  }

  return str.charAt(0).toUpperCase() + str.slice(1); 
};

export const getTime = (seconds: number) => {
  return new Date(seconds * 1000).toLocaleTimeString('en-EN', { timeZone: 'Atlantic/Reykjavik' })
};

export const getPressureMm = (hpa: number) => {
  return Math.round(hpa * PRESSURE_UNITS)
}

export const convertName = (str: string) => {
  return str.replace(/ /g, '_');
}