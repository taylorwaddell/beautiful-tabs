import "./App.css";

import { TabEnum } from "./TabsEnum";
import Tabs from "./Tabs";
import { useState } from "react";

const App = () => {
  const [selectedTab, setSelectedTab] = useState(TabEnum.HOME);
  return (
    <div className="main">
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
    </div>
  );
};

export default App;
