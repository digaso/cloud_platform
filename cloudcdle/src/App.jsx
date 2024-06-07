import { useState } from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import HomePage from './HomePage'
import './App.css'



function App() {
  const [count, setCount] = useState(0)

  return (
<Router>
  <Switch>
    <Route path="/">
        <HomePage />
    </Route>
  </Switch>
</Router>
  )
}

export default App
