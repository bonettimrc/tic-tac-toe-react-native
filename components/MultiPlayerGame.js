import React from "react";
import { Button, StyleSheet, Text, View } from 'react-native';
import Board from "./Board";
export default class MultiPlayerGame extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.getInitialState()
        this.onTileClicked = this.onTileClicked.bind(this);
    }
    createRoom(id) {
        fetch(`bonettimrc.ddns.net:5000/room/${id}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(res => { this.setState(res) });
    }
    getRoom(id) {
        fetch(`bonettimrc.ddns.net:5000/room/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(res => { this.setState(res) });
    }
    co
    onTileClicked(i) {
        // TODO
    }
    onPlayAgain() {
        // TODO
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
