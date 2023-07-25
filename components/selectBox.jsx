function Select({ selected, setSelected }) {


    const handleSelect = (e) => {
        setSelected(e.target.value)
    }

    return (
        <div className="select">
            <label >
                <h2>Select Your Level</h2>
                <select value={selected} onChange={handleSelect}>
                    <option value="CP1S1" >CP1S1</option>
                    <option value="CP1S2">CP1S2</option>
                    <option value="CP2S1">CP2S1</option>
                    <option value="CP2S2">CP2S2</option>
                </select>
            </label>
        </div>
    )
}

export default Select