import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import HomeScreen from "./screens/homeScreen/HomeScreen"
import LoginScreen from "./screens/loginScreen/LoginScreen";
import {  Switch, Route, Redirect, useHistory } from "react-router-dom";
import "./_app.scss"
import { useSelector } from "react-redux";
import WatchScreen from "./screens/watchScreen/WatchScreen";
import SearchScreen from "./screens/SearchScreen";
import SubscriptionScreen from "./screens/subscriptionScreen/SubscriptionScreen";
import ChannelScreen from "./screens/ChannelScreen/ChannelScreen";


const Layout = ({children}) => {

  const [sidebar, toggleSidebar] = useState(false);

  const handelToggleSidebar = () => toggleSidebar(value => !value);

  return (
  <>
    <Header handelToggleSidebar={handelToggleSidebar} />
    <div className="app__container">
      <Sidebar sidebar={sidebar} handelToggleSidebar={handelToggleSidebar} />
      <Container fluid className="app_main">
        {children}
      </Container>
    </div>
    </>
  )
}

function App() {

  const {accessToken, loading} = useSelector(state => state.auth)
  const history = useHistory()
  useEffect(()=> {
    if(!loading && !accessToken) {
      history.push("/auth")
    }

  }, [accessToken, loading, history])

  return (
  
    <Switch>
    <Route path="/" exact>
      <Layout>
        <HomeScreen/>
      </Layout>
    </Route>
    <Route path="/auth">
    <LoginScreen/>
    </Route>
    <Route path="/search/:query">
      <Layout>
       <SearchScreen />
      </Layout>
    </Route>
    <Route path="/watch/:id">
      <Layout>
      <WatchScreen/>
      </Layout>
    </Route>
    <Route path="/feed/subscription">
      <Layout>
      <SubscriptionScreen/>
      </Layout>
    </Route>
    <Route path="/channel/:channelId">
      <Layout>
      <ChannelScreen/>
      </Layout>
    </Route>
    <Route>
      <Redirect to="/"/>
    </Route>
    </Switch>
  
    
  );
}

export default App;
