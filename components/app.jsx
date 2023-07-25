import Calculator from "./calculator"
import Header from "./header"
import Select from "./selectBox"
import { useState } from "react"

function App() {
    const [selected, setSelected] = useState('CP1S1')
    return (
        <>
            <Header />
            <Select selected={selected} setSelected={setSelected} />
            <Calculator level={selected} />
            <div id="tag">made with <i className="fa fa-heart"></i> By F0DH1L</div>
        </>
    )
}

export default App