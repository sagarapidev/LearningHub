import React from 'react';
import Layout from "antd/lib/layout/layout";
import AppHeader from "./component/Header/AppHeader";

function App() {
  return <div className="App">
    <Layout>
      <AppHeader/>
      <AppHeader/>
      <AppHeader/>
    </Layout>
  </div>;
}
export default App;
