import './App.css'
import React from 'react'
import { BrowserRouter,Routes,Route, Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
// import Home from './components/Home'
// import Store from './components/Store'
// import { About } from './components/About'
import { lazy ,Suspense} from 'react'

const Home = lazy(()=>wait(100).then(()=>import("./components/Home")))
const Store = lazy(()=>wait(100).then(()=>import("./components/Store")))  //Object { default: Store(), … }
const About = lazy(()=>import("./components/About").then((module)=>{
  console.log(module)
  return {default:module.About}
}))  // for named exports we need to do like this   // Object { About: About(), … }

const App = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<ContentWrapper />}>
       <Route path="/" element={<Home />} />
       <Route path= "/store" element={<Store />} />
       <Route path="/about" element={<About/>} />
    </Route>
   </Routes>
   </BrowserRouter>
  )
}

export default App





const ContentWrapper = () => {
  return (
    <>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/store">Store</Link>
      <Link to="/about">About</Link>
    </nav>
    <Suspense fallback={<h1>...loading</h1>}>
      <Outlet />
    </Suspense>
    </>
  )
}


function wait(time){
    return new Promise((resolve)=>{
      setTimeout((resolve),time)
    })
}





//In React Router, <Suspense> is a component used with lazy loaded components to provide a fallback UI while the lazy-loaded content is being loaded. <Suspense> enables a smoother user experience by showing a loading indicator or fallback content until the lazy-loaded content is ready to be displayed.





/*

In React, lazy loading and code splitting are techniques used to optimize performance by loading resources only when they are needed. They help improve initial load times and reduce the overall size of the initial JavaScript bundle sent to the user's browser.

1. **Lazy Loading:**
   - `lazy()` is a function provided by React that allows components to be loaded lazily, meaning they are only fetched and rendered when they are needed, typically at the moment they are about to be displayed.
   - Lazy loading helps in splitting the code into smaller chunks and loading components asynchronously, which improves the initial loading speed of the application.
   - It's especially useful for larger applications with many components, as it avoids loading unnecessary components upfront, resulting in a faster initial load time.

   **Example:**
   ```javascript
   const Home = lazy(() => import("./components/Home"));
   ```
   Here, the `Home` component will be lazily loaded when it's required (e.g., when the user navigates to a route that requires the `Home` component).

2. **Code Splitting:**
   - Code splitting is a technique used to split the codebase into smaller chunks (bundles) and load them on demand, instead of sending the entire application code in a single bundle.
   - It helps in optimizing performance by reducing the initial download size, especially for larger applications. Users only download the code necessary for the current view, and additional parts are fetched as needed.
   - It's particularly beneficial for large-scale applications where loading all code upfront would result in slower initial load times and poorer user experience.

   **Advantages:**
   - **Faster Initial Load Times:** By loading only essential code upfront, the initial load time is significantly reduced.
   - **Better Performance:** Smaller bundles and loading components as needed lead to better performance and user experience, especially on slower networks or devices.
   - **Improved User Perception:** Users perceive faster load times, as only the required parts of the application are loaded initially.

   **Usage in React:**
   - React's `lazy()` function, along with dynamic imports (e.g., `import()`), facilitates code splitting and lazy loading by allowing components or other modules to be loaded asynchronously when required, rather than upfront.

   **Example:**
   ```javascript
   const Home = lazy(() => import("./components/Home"));
   ```
   Here, the `import()` function, used within `lazy()`, dynamically imports the `Home` component. When the `Home` component is needed, React will load it asynchronously.

In summary, lazy loading and code splitting are techniques used to optimize performance by loading resources on demand, resulting in faster initial load times, better user experience, and improved performance, especially for larger React applications. They are utilized to enhance the efficiency of web applications by loading only the necessary code when it's needed.

*/


