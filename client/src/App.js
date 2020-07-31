import React, { Suspense, useEffect, useState } from "react"
import "./App.css"
import { Button } from "reactstrap"
import "bootstrap/dist/css/bootstrap.css"
import "react-redux-toastr/lib/css/react-redux-toastr.min.css"
import { createStore, combineReducers } from "redux"
import { reducer as toastrReducer } from "react-redux-toastr"
import { Provider } from "react-redux"
import ReduxToastr from "react-redux-toastr"
import Loadable from "react-loadable"
import Spinner from "react-spinkit"
import FormData from "./FormData"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import axios from "axios"

const reducers = { toastr: toastrReducer }
const reducer = combineReducers(reducers)
const store = createStore(reducer)

const Loading = () => <div>Loading</div>
const CheckToastr = Loadable({
  loader: () => import("./CheckToastr"),
  loading: Loading,
})

const Layout = Loadable({
  loader: () => import("./FrontendLayout"),
  loading: Loading,
})

const Dashboard = Loadable({
  loader: () => import("./Dashboard"),
  loading: Loading,
})
const FormHousing = Loadable({
  loader: () => import("./FormEzHousing"),
  loading: Loading,
})

const ImageUpload = Loadable({
  loader: () => import("./imageupload/Image"),
  loading: Loading,
})

const LazyComponent = React.lazy(() => import("./LazyComponent"))
const App = () => {
  useEffect(() => {
    const backend = async () => {
      const res = await axios.get("/dbimg")
      console.log(res.data)
    }

    backend()
  }, [])

  return (
    <Provider store={store}>
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position='top-center'
        getState={(state) => state.toastr} // This is the default
        transitionIn='fadeIn'
        transitionOut='fadeOut'
        removeHoverTimeOut='100'
      />

      {/* <Suspense fallback={<div>'loading'</div>}>
        <LazyComponent />
      </Suspense>
      */}

      <Router>
        <Switch>
          <Route exact path='/' component={FormData}></Route>
          <Route
            exact
            path='/dashboard'
            render={(props) => <Dashboard {...props} username='venky' />}
          />
          <Route
            exact
            path='/toastr'
            render={(props) => <CheckToastr {...props} username='venky' />}
          />

          <Route
            exact
            path='/layout'
            render={(props) => <Layout {...props} />}
          />

          <Route
            exact
            path='/form'
            render={(props) => <FormHousing {...props} />}
          />

          <Route
            exact
            path='/image'
            render={(props) => <ImageUpload {...props} />}
          />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
