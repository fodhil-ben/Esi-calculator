import Calculator from "./calculator"
import Header from "./header"
import Select from "./selectBox"
import { useState, useEffect } from "react"

function App() {
    const data = {
        "CP1S1": {
            "module": [
                "ALSDS",
                "ANA1",
                "ARCHI1",
                "SYS1",
                "ALG1",
                "ELECT",
                "TEE",
                "B&W"
            ],
            "coef": [
                5,
                5,
                4,
                3,
                3,
                3,
                2,
                1
            ],
            "td": [
                true,
                true,
                true,
                false,
                true,
                true,
                true,
                false
            ],
            "tp": [
                true,
                false,
                false,
                true,
                false,
                false,
                false,
                true
            ],
            "method": [
                "33_33_2td_tp",
                "33",
                "20_30_50",
                "20_30_50",
                "33",
                "33",
                "33",
                "33"
            ]
        },
        "CP1S2": {
            "module": [
                "ALSDD",
                "ANA2",
                "ELECF1",
                "SYS2",
                "ALG2",
                "MECA",
                "TEO",
                "ANG1"
            ],
            "coef": [
                5,
                5,
                4,
                3,
                3,
                3,
                2,
                2
            ],
            "td": [
                true,
                true,
                true,
                false,
                true,
                true,
                true,
                true
            ],
            "tp": [
                true,
                false,
                false,
                true,
                false,
                false,
                false,
                false
            ],
            "method": [
                "33_33_2td_tp",
                "33",
                "33",
                "33",
                "33",
                "33",
                "33",
                "33"
            ]
        },
        "CP2S1": {
            "module": [
                "SFSD",
                "ANA3",
                "ARCHI2",
                "ELECF2",
                "PROBA1",
                "ALG3",
                "ECON",
                "ANG2"
            ],
            "coef": [
                4,
                5,
                4,
                4,
                4,
                3,
                2,
                2
            ],
            "td": [
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true
            ],
            "tp": [
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false
            ],
            "method": [
                "33",
                "33",
                "33",
                "33",
                "33",
                "33",
                "33",
                "33"
            ]
        },
        "CP2S2": {
            "module": [
                "POO",
                "ANA4",
                "PROJECT",
                "PROBA2",
                "ISI",
                "LOGM",
                "OPT",
                "ANG3"
            ],
            "coef": [
                4,
                5,
                4,
                4,
                3,
                4,
                3,
                2
            ],
            "td": [
                false,
                true,
                false,
                true,
                true,
                true,
                true,
                true
            ],
            "tp": [
                true,
                false,
                false,
                false,
                false,
                false,
                false,
                false
            ],
            "method": [
                "33",
                "33",
                "project",
                "33",
                "33",
                "33",
                "33",
                "33"
            ]
        }
    }
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