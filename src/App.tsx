import './App.css';

import { memo, useDeferredValue, useState } from 'react';

const Tab = memo((props: {content: string}) => {
  const now = performance.now()
  while (performance.now() - now < 300){}
  return (
    <div className="Tab">
      {props.content}
    </div>
  )
})

const tabNames = ["Tab 1", "Tab 2", "Tab 3"]


function App() {

  const [activeTab, setActiveTab] = useState(0)
  const [inputValue, setInputValue] = useState("")
  const defferedActiveTab = useDeferredValue(activeTab)

  const getTabHandler = (tabIdx: number) => {
    return () => {
      setActiveTab(tabIdx)
    }
  }

  console.log(activeTab, defferedActiveTab)

  return (
    <div className="App">
      <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <p>Value is: {inputValue}</p>
      <div className='tab-selector-set'>
        {tabNames.map((tab, i) => (
          <button disabled={defferedActiveTab === i} onClick={getTabHandler(i)}>{tab}</button>
        ))}
      </div>

      <div className='tabs-set'>
        {activeTab !== defferedActiveTab ? "Loading..." : tabNames.map((tab, i) => (
          defferedActiveTab === i && <Tab  content={tab} />
        ))}
      </div>
    </div>
  );
}

export default App;
