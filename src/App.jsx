import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '@/pages/Home'

export default () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  )
}
