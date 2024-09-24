import React from "react"


function Square(props) {
    return (
        <button
            className="square"
            onClick={props.onClick}
            style={props.winnerBox?{color:'#FF0000'}:null}
        >
            {props.value}
            
        </button>
    );
}

export default Square
