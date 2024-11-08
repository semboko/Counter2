import './App.css';

import { memo, useDeferredValue, useEffect, useState, useTransition } from 'react';

const Tab = memo((props: {content: string, slow: boolean}) => {
  
  if (props.slow) {
    const now = performance.now()
    while (performance.now() - now < 300){}
  }
  return (
    <div className="Tab">
      {props.content}
    </div>
  )
})

const TabPromise = (props: {content: string}) => {

  const [value, setValue] = useState<number>(0)

  useEffect(() => {
    setTimeout(() => {
      setValue(30)
    }, 1000)
  })

  return (
    <div className="Tab">
      {props.content} {value}
    </div>
  )
}

const tabNames = ["Tab 1", "Tab 2", "Tab 3"]


function App() {

  const [activeTab, setActiveTab] = useState(0)
  const [inputValue, setInputValue] = useState("")
  const [isPending, startTransition] = useTransition()

  const getTabHandler = (tabIdx: number) => {
    return () => {
      startTransition(() => {
        setActiveTab(tabIdx)
      })
    }
  }

  return (
    <div className="App">
      <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <p>Value is: {inputValue}</p>
      <div className='tab-selector-set'>
        {tabNames.map((tab, i) => (
          <button disabled={activeTab === i || isPending} onClick={getTabHandler(i)}>{tab} {i === 2 && "(slow)"}</button>
        ))}
        <button disabled={activeTab === 3 || isPending} onClick={getTabHandler(3)}>Tab (Queue)</button>
      </div>

      <div className='tabs-set'>
        {tabNames.map((tab, i) => (
          activeTab === i && <Tab content={tab} slow={i === 2} />
        ))}
        {activeTab === 3 && <TabPromise content='Hello world' />}
      </div>
    </div>
  );
}

export default App;
