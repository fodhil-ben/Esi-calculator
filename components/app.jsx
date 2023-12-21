import Calculator from "./calculator"
import Header from "./header"
import Select from "./selectBox"
import { useState, useEffect } from "react"
import data from './data.json'
function App() {
    // const saved = JSON.parse(localStorage.getItem('level')) || ''
    const saved = localStorage.getItem('level') || ''
    const [selected, setSelected] = useState(saved || 'CP1S1')
    useEffect(() => {
        localStorage.setItem('level', selected)
    }, [selected])

    return (
        <>
            <Header />
            <Select selected={selected} setSelected={setSelected} />
            <Calculator level={selected} data={data} />
            <div id="tag">made with <i className="fa fa-heart"></i> By F0DH1L</div>
        </>
    )
}

export default App