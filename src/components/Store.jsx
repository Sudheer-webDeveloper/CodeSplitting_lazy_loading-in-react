import React, { useState, useTransition } from 'react';

const Store = () => {
  const [isLoading1, startTransition1] = useTransition();
  const [isLoading2, startTransition2] = useTransition();
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);

  const fetchData1 = async () => {

    
    startTransition1(() => {
      fetch('https://api.example.com/data1')
        .then(response => response.json())
        .then(result => {
          setData1(result);
        });
    });
  };

  const fetchData2 = async () => {
    startTransition2(() => {
      fetch('https://api.example.com/data2')
        .then(response => response.json())
        .then(result => {
          setData2(result);
        });
    });
  };

  return (
    <div>
      {isLoading1 || isLoading2 ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <button onClick={fetchData1}>Fetch Data 1</button>
          <button onClick={fetchData2}>Fetch Data 2</button>
          <div>
            {data1 || <p>Data 1: data1</p>}
            {data2 || <p>Data 2: data2</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Store;


function wait(time){
    return new Promise((resolve) => {
        setTimeout(resolve,time)
    })
}
