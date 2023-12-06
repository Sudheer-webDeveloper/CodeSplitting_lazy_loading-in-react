import React, { lazy, useState, Suspense, useTransition } from "react";
// import AdminData from './AdminData'
// import  {Sum} from '../utils'

const AdminData = lazy(() =>
  wait(1000).then(() =>
    import("./AdminData").then((module) => {
      return { default: module.AdminData };
    })
  )
);

function wait(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

const Home = () => {
  const [isAdmin, setIsAdmin] = useState(false);
 
  const [isPending,startTransition] = useTransition()
  
  console.log("startTransition",startTransition)

  return (
    <div className="home">
      <h1>Home</h1>
      <button
        onClick={() => {
          import("../utils").then((module) => {
            console.log("module", module); //Object { Sum: Sum(a, b), … }
            console.log(module.Sum);
            return alert(module.Sum(2, 4)); // Sum is named export right that's why we have to write like this module.Sum otherwise module.defaultif not named export
          });
        }}
      >
        Add 2+2
      </button>

      
      <button onClick={() =>{


        startTransition(()=>{   
            setIsAdmin(!isAdmin)  // until unless the adminData fetched aync operation then only this  setIsAdmin(!isAdmin) works because we are setting this as a low priority
        })
     

        // Yes, that's correct. Until the startTransition finishes, or the asynchronous operation wrapped within it completes, the UI won't update to reflect changes made by setIsAdmin(!isAdmin), so fallback also won't work now , we can use isPending to show some loaders
        

      }}
         
         >Toggle Admin</button>


      <h2>{isPending&& <h3>Loading...</h3> }</h2>
     <Suspense fallback={<h2>..Admin Loading</h2>}>
      <h2>{isAdmin ? <AdminData /> : "Not Admin"}</h2>
    </Suspense>



    </div>
  );
};

export default Home;
