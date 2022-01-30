import React from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { io } from 'socket.io-client';
import Board from './Board';
// fuck hooks 😠
export default class MultiPlayerGame extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            socket: null,
            roomId: null,
            tiles: Array(9).fill(null),
            imX: null,
            currentTurn: 0,
            secondPlayerJoined: false
        }
        this.onTileClicked = this.onTileClicked.bind(this)
        this.onRoomEntered = this.onRoomEntered.bind(this)
        this.onRoomCreated = this.onRoomCreated.bind(this)
    }
    componentDidMount() {
        const newSocket = io(`http://bonettimrc.ddns.net:5000`);
        newSocket.connect()
        newSocket.on("gameMove", ({ i }) => {
            const tiles = [...this.state.tiles]
            tiles[i] = !this.state.imX ? 'X' : 'O'
            this.setState({
                tiles,
                currentTurn: this.state.currentTurn + 1
            })
        })
        newSocket.on("secondPlayerJoined", () => {
            this.setState({
                secondPlayerJoined: true
            })
        })
        this.setState({
            socket: newSocket
        })
    }
    componentWillUnmount() {
        this.state.socket.close()
    }
    onRoomEntered({ nativeEvent: { text, eventCount, target } }) {
        this.state.socket.emit("joinRoom", text)
        this.setState({
            roomId: text,
            imX: false
        })
        this.setState({ secondPlayerJoined: true })
    }
    onRoomCreated({ nativeEvent: { text, eventCount, target } }) {
        this.state.socket.emit("createRoom", text)
        this.state.socket.emit("joinRoom", text)
        this.setState({
            roomId: text,
            imX: true
        })
    }
    onTileClicked(i) {
        const currentTurnIsX = (this.state.currentTurn % 2) == 0
        if (this.state.imX != currentTurnIsX) return
        const tiles = [...this.state.tiles]
        if (calculateWinningLine(tiles) || tiles[i]) return
        tiles[i] = this.state.imX ? 'X' : 'O'
        this.state.socket.emit("gameMove", { i })
        this.setState({
            tiles,
            currentTurn: this.state.currentTurn + 1
        })

    }
    render() {
        const winningLine = calculateWinningLine(this.state.tiles)
        const currentTurnIsX = (this.state.currentTurn % 2) == 0
        let status;
        if (winningLine) {
            status = `The winner is ${currentTurnIsX ? 'O' : 'X'}`
        }
        else {
            if (this.state.currentTurn < 9) {
                status = `It's ${currentTurnIsX ? 'X' : 'O'} turn`
            } else {
                status = "It's a draw"
            }
        }
        return (

            <View style={styles.container}>
                {this.state.roomId ? <>
                    <Text style={styles.statusText}>{`room:${this.state.roomId}`}</Text>
                    {this.state.secondPlayerJoined ? <>
                        <Text style={styles.statusText}>{`you are ${this.state.imX ? "X" : "O"}`}</Text>
                        <Text style={styles.statusText}>{status}</Text>
                        <Board tiles={this.state.tiles} onTileClicked={this.onTileClicked} winningLine={winningLine}></Board>
                        {winningLine ? <>
                            <Button title='Replay' />
                            <Button title='Quit' color="#BB2D3B" />
                        </> : <></>}
                    </> : <>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </>}
                </> : <>
                    <TextInput onSubmitEditing={this.onRoomCreated} placeholder='Create Room' style={styles.input} />
                    <TextInput onSubmitEditing={this.onRoomEntered} placeholder='Enter Room' style={styles.input} /></>}
            </View>

        );
    }

}
function calculateWinningLine(tiles) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],];
    for (const line of lines) {
        const values = line.map(i => tiles[i])
        const winner = values.reduce((previousValue, currentValue) => previousValue === currentValue ? currentValue : null);
        if (winner) {
            return line
        }
    }
    return null;
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
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});
