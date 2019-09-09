import React, { useState, useEffect } from 'react';
import request from 'request';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './App.css';

const baseUrl = 'http://192.168.1.97:3003';

const mockPlayers = [
  {
    name: 'justin',
    id: '1',
  },
  {
    name: 'luca',
    id: '2',
  },
  {
    name: 'pura',
    id: '3',
  },
  {
    name: 'xtian',
    id: '4',
  }
];

const makePlayerSelectList = ({title, name, players, input, eventHandlers, score}) => {
  const playerOptions = players.map(player => 
    <option
      key={player.id}
      value={player.name}
    >
      {toSentenceCase(player.name)}
    </option>
  );

  return <>
    <h2>{title}</h2>
    <button
      name={name}
      onClick={eventHandlers.decrement}
    >
      -
    </button>
    {score}
    <button
      name={name}
      onClick={eventHandlers.increment}
    >
      +
    </button>
    <select
      name={name}
      multiple
      onChange={eventHandlers.handlePlayerSelect}
    >
      {playerOptions}
    </select>
    <input
      type='text'
      name={name}
      label='Name'
      onChange={eventHandlers.handleInput}
      value={input}
    />
    <button
      name={name}
      onClick={eventHandlers.createPlayer}
    >
      +
    </button>
  </>
}

const toSentenceCase = string =>
  string.length > 0
    ? string.replace(string[0], string[0].toUpperCase())
    : '';

// Some folks find value in a centralized route config.
// A route config is just data. React is great at mapping
// data into components, and <Route> is a component.

////////////////////////////////////////////////////////////
// first our route components
function Match() {
  const [values, setValues] = useState({
    // allPlayers: [],
    allPlayers: mockPlayers,
    inputPlayer1: '',
    inputPlayer2: '',
    matchHistory: [],
    player1: '',
    player2: '',
    scorePlayer1: 0,
    scorePlayer2: 0,
  });

  // useEffect(() => {
  //   request.get(`${baseUrl}/player`, {json: true}, (err, res, body) => {
  //     setValues({...values, allPlayers: body});
  //   });
  // }, []);

  const createPlayer = e => {
    const { name } = e.target;
    const player = values[`input${toSentenceCase(name)}`]

    const params = {
      method: 'POST',
      uri: `${baseUrl}/player`,
      json: true,
      body: {
        name: player,
      },
    };

    request(
      params,
      (err, res, body) => {
        if (err) {
          console.log(err);
        }

        console.log(res.status);
        console.log(body); 
      }
    );
    // values.allPlayers.push(values[`input${toSentenceCase(name)}`]);
    // setValues({...values, allPlayers: values.allPlayers});
  };

  const handleInput = e => {
    const {name, value} = e.target
    const updatedValue = `input${toSentenceCase(name)}`;
    setValues({...values, [updatedValue]: value})
  };

  const handleMatchSubmit = () => {
    // setValues({...values, matchHistory: 
  };

  const handlePlayerSelect = e => {
    const { name, value } = e.target;
    setValues({...values, [name]: value });
  };

  const decrement = e => {
    const {name} = e.target;
    const updatedValue = `score${toSentenceCase(name)}`;
    if (values[updatedValue] === 0) { return };
    setValues({...values, [updatedValue]: values[updatedValue] - 1})
  };


  const increment = e => {
    const {name} = e.target
    const updatedValue = `score${toSentenceCase(name)}`;
    setValues({...values, [updatedValue]: values[updatedValue] + 1})
  };

  const eventHandlers = {
    decrement,
    createPlayer,
    handleInput,
    handleMatchSubmit,
    handlePlayerSelect,
    increment,
  };

  const selectListPlayer1 = makePlayerSelectList({
      title: "Player 1",
      name: "player1",
      input: values.inputPlayer1,
      players: values.allPlayers,
      score: values.scorePlayer1,
      eventHandlers,
  })

  const selectListPlayer2 = makePlayerSelectList({
      title: "Player 2",
      name: "player2",
      input: values.inputPlayer2,
      players: values.allPlayers,
      score: values.scorePlayer2,
      eventHandlers,
  })

  const matchSubmit = (
    <button onClick={handleMatchSubmit}>
      Submit Match
    </button>
  )

  return (
    <>
      {selectListPlayer1}
      {selectListPlayer2}
      {matchSubmit}
    </>
  );
}

function Tacos({ routes }) {
  return (
    <div>
      <h2>Tacos</h2>
      <ul>
        <li>
          <Link to="/tacos/bus">Bus</Link>
        </li>
        <li>
          <Link to="/tacos/cart">Cart</Link>
        </li>
      </ul>

      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))}
    </div>
  );
}

function Bus() {
  return <h3>Bus</h3>;
}

function Cart() {
  return <h3>Cart</h3>;
}

////////////////////////////////////////////////////////////
// then our route config
const routes = [
  {
    path: "/match",
    component: Match
  },
  {
    path: "/tacos",
    component: Tacos,
    routes: [
      {
        path: "/tacos/bus",
        component: Bus
      },
      {
        path: "/tacos/cart",
        component: Cart
      }
    ]
  }
];

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

function RouteConfig() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/tacos">Tacos</Link>
          </li>
          <li>
            <Link to="/match">Match</Link>
          </li>
        </ul>

        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </div>
    </Router>
  );
}

export default RouteConfig;


