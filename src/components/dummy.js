import React, { useEffect, useState } from "react";
const Dummy = () => {
  const [data, setData] = useState(null);

  //   this will fetch the data----------------------------------------------------------------
  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/exchange_rates")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        convertObjectInArray(res);
      });
  }, []);
  //   this will convert object in array--------------------------------------------------------
  const convertObjectInArray = (objectData) => {
    let objectArray = [];
    for (let property in objectData.rates) {
      objectArray.push({ ...objectData.rates[property], shortName: property });
    }
    // console.log(objectArray);
    setData(objectArray);
  };
  //   component -------------------------------------------------------------------------------------
  return data ? (
    <>
      {
        <div>
          {data.map((val) => {
            return <h3>{val.name}</h3>;
          })}
        </div>
      }
    </>
  ) : null;
};

export default Dummy;
