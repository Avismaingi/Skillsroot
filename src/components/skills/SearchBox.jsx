import React from "react";

function SearchBox({ text, setText, handleSearch }) {
    const handleClick = (e) => {
        e.preventDefault();

        handleSearch();
    };

    return (
        <>
            <input style={{ width: "120%", paddingLeft: "8px", paddingTop: "6px", paddingBottom: "6px", }} placeholder="Type Content" type="text" name="name" class="question" id="nme" required autocomplete="off" onChange = {(e) => setText(e.target.value)}/>
            <label for="nme"><span></span></label>
            <br></br><br></br>
            <button className="btn btn-warning" style={{ width: "120%", paddingLeft: "8px", paddingTop: "6px",  }} type="submit" onClick = { handleClick }>Search</button>
        </>
    );
}

export default SearchBox;

