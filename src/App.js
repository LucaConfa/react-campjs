import React from 'react';
import logo from './logo.svg';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Hello Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Index() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function AppRouter() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about/">About</Link>
            </li>
            <li>
              <Link to="/users/">Users</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Index} />
        <Route path="/about/" component={About} />
        <Route path="/users/" component={Users} />
      </div>
    </Router>
  );
}

export default AppRouter;


// curl -X GET "https://favro.com/api/v1/users" \
//     -H "organizationId: 8457ff8421e7f3b86eff0f42" \
//     -u "luca.confalonieri@playgroundxyz.com":"AXpCkQh16npHs4_C0ZXJqkCnRYKKQmxRAES56Cila-B"


//     curl -X GET "https://favro.com/api/v1/collections" \
//     -H "organizationId: 8457ff8421e7f3b86eff0f42" \
//     -u "user@example.com":"AXpCkQh16npHs4_C0ZXJqkCnRYKKQmxRAES56Cila-B"


//     curl -X GET "https://favro.com/api/v1/widgets" \
//     -H "organizationId: 8457ff8421e7f3b86eff0f42" \
//     -u "luca.confalonieri@playgroundxyz.com":"AXpCkQh16npHs4_C0ZXJqkCnRYKKQmxRAES56Cila-B"


//     curl -X GET "https://favro.com/api/v1/widgets/2c62b26a7aac5cc8489c1b67" \
//     -H "organizationId: 8457ff8421e7f3b86eff0f42" \
//     -u "luca.confalonieri@playgroundxyz.com":"AXpCkQh16npHs4_C0ZXJqkCnRYKKQmxRAES56Cila-B"

//     curl -X GET "https://favro.com/api/v1/columns?widgetCommonId=d75f64e0ddd01c1ccd2823ae" \
//     -H "organizationId: 8457ff8421e7f3b86eff0f42" \
//     -u "luca.confalonieri@playgroundxyz.com":"AXpCkQh16npHs4_C0ZXJqkCnRYKKQmxRAES56Cila-B"

//     curl -X GET "https://favro.com/api/v1/cards?widgetCommonId=d75f64e0ddd01c1ccd2823ae&archived=false" \
//     -H "organizationId: 8457ff8421e7f3b86eff0f42" \
//     -u "luca.confalonieri@playgroundxyz.com":"AXpCkQh16npHs4_C0ZXJqkCnRYKKQmxRAES56Cila-B"


//     curl -X GET "https://favro.com/api/v1/tags" \
//     -H "organizationId: 8457ff8421e7f3b86eff0f42" \
//     -u "luca.confalonieri@playgroundxyz.com":"AXpCkQh16npHs4_C0ZXJqkCnRYKKQmxRAES56Cila-B"

//     curl -X GET "https://favro.com/api/v1/customfields" \
//     -H "organizationId: 8457ff8421e7f3b86eff0f42" \
//     -u "luca.confalonieri@playgroundxyz.com":"AXpCkQh16npHs4_C0ZXJqkCnRYKKQmxRAES56Cila-B"