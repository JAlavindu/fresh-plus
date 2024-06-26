const addDays = (isoString, days) => {
    const dateObject = new Date(isoString);
    dateObject.setDate(dateObject.getDate() + days);
    const date = dateObject.toISOString().split('T')[0];
    return date;
  };
  
  export default addDays;
  