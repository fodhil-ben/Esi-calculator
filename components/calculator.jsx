import { useEffect, useState } from "react"

function Calculator({ level }) {

    const [data, setData] = useState({})
    const [results, setResults] = useState([...Array(6).fill(0)])

    const [avg, setAvg] = useState(Array(8).fill(0))
    const [emd1, setEmd1] = useState(Array(8).fill(0))
    const [emd2, setEmd2] = useState(Array(8).fill(0))
    const [td, setTd] = useState(Array(8).fill(0))
    const [tp, setTp] = useState(Array(8).fill(0))
    useEffect(() => {
        setEmd1([])
        setEmd2([])
        setTd([])
        setTp([])
        setAvg([...Array(8).fill(0)])
        setResults([...Array(6).fill(0)])
        localStorage.setItem('emd1', JSON.stringify([]))
        localStorage.setItem('emd2', JSON.stringify([]))
        localStorage.setItem('td', JSON.stringify([]))
        localStorage.setItem('tp', JSON.stringify([]))
    }, [level])

    useEffect(() => {
        // fetch("../api/api.json").then(
        fetch("https://github.com/fodhil-ben/Esi-calculator/blob/master/api/api.json").then(
            res => res.json()
        ).then((jsonData) => {
            setData(jsonData)
        }
        ).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        let saved = JSON.parse(localStorage.getItem('emd1')) || []
        setEmd1(saved)
        saved = JSON.parse(localStorage.getItem('emd2')) || []
        setEmd2(saved)
        saved = JSON.parse(localStorage.getItem('td')) || []
        setTd(saved)
        saved = JSON.parse(localStorage.getItem('tp')) || []
        setTp(saved)
    }, [])

    const updateValues = (index, field, e) => {
        if (field == "emd1") {
            const updatedValues = [...emd1]
            updatedValues[index] = isNaN(parseInt(e.target.value)) ? 0 : parseFloat(e.target.value)
            setEmd1(updatedValues)
            localStorage.setItem('emd1', JSON.stringify(updatedValues))
        }
        else if (field == "emd2") {
            const updatedValues = [...emd2]
            updatedValues[index] = isNaN(parseInt(e.target.value)) ? 0 : parseFloat(e.target.value)
            setEmd2(updatedValues)
            localStorage.setItem('emd2', JSON.stringify(updatedValues))
        }
        else if (field == "td") {
            const updatedValues = [...td]
            updatedValues[index] = isNaN(parseInt(e.target.value)) ? 0 : parseFloat(e.target.value)
            setTd(updatedValues)
            localStorage.setItem('td', JSON.stringify(updatedValues))
        }
        else if (field == "tp") {
            const updatedValues = [...tp]
            updatedValues[index] = isNaN(parseInt(e.target.value)) ? 0 : parseFloat(e.target.value)
            setTp(updatedValues)
            localStorage.setItem('tp', JSON.stringify(updatedValues))
        }

    }



    const display = (type) => {
        let inputs = []
        for (let i = 0; i < data[level]["module"].length; i++) {
            type == 'emd1'
                ? inputs.push(<div key={i}><input className={type} type="number" value={`${emd1[i] == null ? '' : emd1[i]}`} onChange={(e) => updateValues(i, type, e)} /></div>)
                : inputs.push(<div key={i}><input className={type} type="number" value={`${emd2[i] == null ? '' : emd2[i]}`} onChange={(e) => updateValues(i, type, e)} /></div>)
        }
        return inputs
    }
    const displayt = (type) => {

        let inputs = []
        for (let i = 0; i < data[level]["module"].length; i++) {
            data[level][type][i]
                ? type == 'td'
                    ? inputs.push(<div key={i}><input className={type} type="number" value={`${td[i] == null ? '' : td[i]}`} onChange={(e) => updateValues(i, type, e)} /></div>)
                    : inputs.push(<div key={i}><input className={type} type="number" value={`${tp[i] == null ? '' : tp[i]}`} onChange={(e) => updateValues(i, type, e)} /></div>)
                : inputs.push(<div key={i} className="readonly"><input className={type} readOnly type="number" onChange={(e) => updateValues(i, type, e)} /></div>)
        }
        return inputs
    }


    const calculateUnit = (e1, e2, td, tp, method) => {
        switch (method) {
            case "33":
                return isNaN(parseInt(td)) ? parseFloat((((e1 + e2 + tp) / 3).toFixed(2))) : parseFloat((((e1 + e2 + td) / 3).toFixed(2)))
            case "20_30_50":
                return isNaN(parseInt(td)) ? parseFloat((e1 * .2 + e2 * .3 + tp * .5).toFixed(2)) : parseFloat((e1 * .2 + e2 * .3 + td * .5).toFixed(2))
            case "25_25_50":
                return isNaN(parseInt(td)) ? parseFloat((e1 * .25 + e2 * .25 + tp * .5).toFixed(2)) : parseFloat((e1 * .25 + e2 * .25 + td * .5).toFixed(2))
            case "33_33_2td_tp":
                return parseFloat(((e1 + e2 + ((td * 2 + tp) / 3)) / 3).toFixed(2))
            case "project":
                return parseFloat(((e1).toFixed(2)))

            default: 'wrong'
        }

    }

    const updateAvg = () => {
        const updatedAvg = []
        data[level]["module"].map((e, i) => {
            const result = calculateUnit(emd1[i], emd2[i], td[i], tp[i], data[level]["method"][i])
            updatedAvg[i] = result === "NaN" ? 0 : result
        })
        return updatedAvg

    }

    const updateResult = () => {
        const coefs = data[level]["coef"]
        const updatedResults = [...results]
        let tmp = updateAvg()
        setAvg(tmp)

        let coef_total = 0
        coefs.map(e => {
            !isNaN(parseInt(e)) ? coef_total += parseFloat(e) : coef_total += 0
        })

        let emd1_total = 0
        emd1.map((e, i) => {
            !isNaN(parseInt(e)) ? emd1_total += parseFloat(e) * coefs[i] : emd1_total += 0
        })

        let emd2_total = 0
        emd2.map((e, i) => {
            !isNaN(parseInt(e)) ? emd2_total += parseFloat(e) * coefs[i] : emd2_total += 0
        })
        let td_total = 0
        let coef_total_td = 0
        td.map((e, i) => {
            !isNaN(parseInt(e)) ? td_total += parseFloat(e) * coefs[i] : td_total += 0
            coef_total_td += data[level]['td'][i] ? coefs[i] : 0
        })

        let tp_total = 0
        let coef_total_tp = 0
        tp.map((e, i) => {
            !isNaN(parseInt(e)) ? tp_total += parseFloat(e) * coefs[i] : tp_total += 0
            coef_total_tp += data[level]['tp'][i] ? coefs[i] : 0
        })

        let avg_total = 0
        tmp.map((e, i) => {
            !isNaN(parseInt(e)) ? avg_total += parseFloat(e) * coefs[i] : avg_total += 0
        })
        updatedResults[0] = coef_total
        updatedResults[1] = parseFloat((emd1_total / coef_total).toFixed(2))
        updatedResults[2] = parseFloat((emd2_total / coef_total).toFixed(2))
        updatedResults[3] = coef_total_td > 0 ? parseFloat((td_total / coef_total_td).toFixed(2)) : 0
        updatedResults[4] = coef_total_tp > 0 ? parseFloat((tp_total / coef_total_tp).toFixed(2)) : 0
        updatedResults[5] = parseFloat((avg_total / coef_total).toFixed(2))
        setResults(updatedResults)
    }

    const handleCalculate = () => {
        updateResult()
    }

    return (
        <>
            <div className="container">
                <div id="module">
                    <div>Modules</div>
                    {Object.keys(data).length > 0 && data[level]["module"].map((e, i) => {
                        return <div key={i} className="mod">{e}</div>
                    })}
                    <div>Result</div>
                </div>
                <div id="coef">
                    <div>Coef</div>
                    {Object.keys(data).length > 0 && data[level]["coef"].map((e, i) => {
                        return <div key={i} className="coef">{e} </div>
                    })}
                    <div><input id="emd1_result" readOnly type="number" value={results[0] || 0} /></div>
                </div>
                <div id="emd1">
                    <div>EMD1</div>
                    {Object.keys(data).length > 0 && display("emd1")}
                    <div key={121}><input id={`emd1_result`} readOnly type="number" value={results[1] || 0} /></div>

                </div>
                <div id="emd2">
                    <div>EMD2</div>
                    {Object.keys(data).length > 0 && display("emd2")}
                    <div key={121}><input id={`emd2_result`} readOnly type="number" value={results[2] || 0} /></div>

                </div>
                <div id="td">
                    <div>TD</div>
                    {Object.keys(data).length > 0 && displayt("td")}
                    <div key={121}><input id={`td_result`} readOnly type="number" value={results[3] || 0} /></div>

                </div>
                <div id="tp">
                    <div>TP</div>
                    {Object.keys(data).length > 0 && displayt("tp")}
                    <div key={121}><input id={`tp_result`} readOnly type="number" value={results[4] || 0} /></div>

                </div>
                <div id="avg">
                    <div>Average</div>
                    {Object.keys(data).length > 0 && data[level]["module"].map((e, i) => {

                        return <div key={i}><input readOnly className="moy" type="number" value={`${avg[i] || 0}`} /></div>
                    })}
                    <div><input id="moy_result" readOnly type="number" value={results[5] || 0} /></div>
                </div>
            </div>
            <div id="result">
                <div id="average" >{results[5] == 0 ? 'Average' : results[5]}</div>
                <div id="submit" onClick={(e) => handleCalculate(e)}>Calculate</div>
            </div>


        </>
    )
}


export default Calculator