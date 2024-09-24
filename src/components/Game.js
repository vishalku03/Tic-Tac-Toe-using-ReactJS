import React from "react"

import Board from "./Board"


class Game extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            winningHistory: {
                X: 0,
                O: 0
            },
            squares: Array(9).fill(null),
            isXNext: true,
        };
        this.resetGame = this.resetGame.bind(this)
    }

    handleClick(i) {
        const squares = this.state.squares.slice();

        if (calculateWinnerorDraw(squares).winner || squares[i]) {
            return;
        }

        squares[i] = this.state.isXNext ? "X" : "O";
        this.setState({
            squares: squares,
            isXNext: !this.state.isXNext,
        });
    }

    resetGame(win) {
        if (win) {
            this.setState((prevState, props) => (
                {
                    squares: Array(9).fill(null),
                    isXNext: true,
                    winningHistory: {
                        X: (win === "X" ? prevState.winningHistory.X + 1 : prevState.winningHistory.X),
                        O: (win === "O" ? prevState.winningHistory.O + 1 : prevState.winningHistory.O)
                    }
                }
            ));
        }
        else {
            this.setState((prevState, props) => (
                {
                    squares: Array(9).fill(null),
                    isXNext: true,
                    winningHistory: prevState.winningHistory
                }
            ));

        }
    }

    render() {

        const { draw, winner, winnerLine } = calculateWinnerorDraw(this.state.squares);

        let status;

        if (draw) {
            status = "It's a Draw";
        }

        else if (winner) {
            status = "Winner: " + winner;
        }
        else {
            status = "Next player:  " + (this.state.isXNext ? "X" : "O");
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={this.state.squares}
                        onClick={(i) => this.handleClick(i)}
                        winnerLine={winnerLine ? winnerLine : undefined}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <table>
                        <th>Score</th>
                        <tr>X: {this.state.winningHistory.X}</tr>
                        <tr>O: {this.state.winningHistory.O}</tr>
                    </table>
                    {draw ? <button onClick={() => this.resetGame(undefined)}>Retry</button> : null}
                    {winner ? <button onClick={() => this.resetGame(winner)}>Next Game ></button> : null}
                </div>

            </div >
        );
    }
}

function calculateWinnerorDraw(squares) {

    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winner: squares[a], winnerLine: lines[i], draw: null };
        }
    }

    if (!squares.some(element => element === null)) {
        return { winner: null, draw: true }
    }

    return { winner: null, draw: null };
}




export default Game