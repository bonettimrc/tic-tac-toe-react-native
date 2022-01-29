import React from "react";
import { Button, StyleSheet, Text, View } from 'react-native';
import Board from "./Board";
export default class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.getInitialState()
        this.onTileClicked = this.onTileClicked.bind(this);
    }
    getInitialState() {
        return {
            tiles: Array(9).fill(null),
            currentPlayerIsX: true,
            winningLine: null,
            currentTurn: 0,
            lines: this.calculateLines(3)
        }
    }
    onTileClicked(i) {
        const tiles = [...this.state.tiles]
        const currentPlayerIsX = this.state.currentPlayerIsX
        if (this.calculateWinningLine(tiles) || tiles[i]) return
        tiles[i] = currentPlayerIsX ? 'X' : 'O'
        const currentTurn = this.state.currentTurn
        this.setState({
            tiles: tiles,
            currentPlayerIsX: !currentPlayerIsX,
            winningLine: this.calculateWinningLine(tiles),
            currentTurn: currentTurn + 1
        })
    }
    calculateLines(size) {
        const lines = [];
        this.calculateHorizontalLines(size, lines);
        this.calculateVerticalLines(size, lines);
        this.calculateDiagonalLines(size, lines);
        return lines;
    }
    calculateDiagonalLines(size, lines) {
        for (let index = 0; index < 2; index++) {
            const line = [];
            for (let jndex = 0; jndex < size; jndex++) {
                line.push((index + jndex) * (size + ((-1) ** index)));
            }
            lines.push(line);
        }
    }

    calculateHorizontalLines(size, lines) {
        for (let index = 0; index < size; index++) {
            const line = [];
            for (let jndex = 0; jndex < size; jndex++) {
                line.push(index * size + jndex);
            }
            lines.push(line);
        }
    }

    calculateVerticalLines(size, lines) {
        for (let index = 0; index < size; index++) {
            const line = [];
            for (let jndex = 0; jndex < size; jndex++) {
                line.push(jndex * size + index);
            }
            lines.push(line);
        }
    }
    calculateWinningLine(tiles) {
        const lines = this.state.lines;
        for (const line of lines) {
            const values = line.map(i => tiles[i])
            const winner = values.reduce((previousValue, currentValue) => previousValue === currentValue ? currentValue : null);
            if (winner) {
                return line
            }
        }
        return null;
    }
    onPlayAgain() {
        this.setState(this.getInitialState())
    }
    render() {
        const winningLine = this.state.winningLine;
        const currentPlayerIsX = this.state.currentPlayerIsX;
        let status;
        let resetGameText;
        if (winningLine) {
            status = `The winner is ${currentPlayerIsX ? 'O' : 'X'}`
            resetGameText = "Play Again"
        }
        else {
            if (this.state.currentTurn < 9) {
                status = `It's ${currentPlayerIsX ? 'X' : 'O'} turn`
            } else {
                status = "It's a draw"
            }
            resetGameText = "Reset Game"
        }
        return (
            <View style={styles.container}>
                <Text style={styles.statusText}>{status}</Text>
                <Board tiles={this.state.tiles} onTileClicked={this.onTileClicked} winningLine={winningLine}></Board>
                <Button onPress={() => { this.onPlayAgain() }} title={resetGameText}></Button>
            </View>);
    }


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusText: {
        fontSize: 30,
        fontWeight: "bold"
    }
});
