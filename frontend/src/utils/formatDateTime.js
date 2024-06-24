const formatDateTime = (isoString) => {
    const dateObject = new Date(isoString);
    const date = dateObject.toISOString().split('T')[0];
    const time = dateObject.toISOString().split('T')[1].split('.')[0];
    return { date, time };
  };
  
  export default formatDateTime;
  