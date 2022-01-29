import React from "react";
import { StyleSheet, Text, View } from 'react-native';

export default class Board extends React.Component {
    renderRows(winningLine) {
        const rows = [];
        for (let index = 0; index < 3; index++) {
            const row = this.renderRow(index, winningLine);
            rows.push(<View key={index} style={styles.row}>{row}</View>);
        }
        return rows;
    }

    renderRow(index, winningLine) {
        const row = [];
        for (let jndex = 0; jndex < 3; jndex++) {
            this.renderTile(index, jndex, winningLine, row);
        }
        return row;
    }

    renderTile(index, jndex, winningLine, row) {
        const i = index * 3 + jndex;
        const style = [styles.tile];
        if (jndex == 2) {
            style.push(styles.rightTile);
        }
        if (index == 2) {
            style.push(styles.bottomTile);
        }
        if (winningLine) {
            if (winningLine.includes(i)) {
                style.push(styles.winningTile);
            }
        }
        row.push(
            <Text key={jndex} onPress={() => { this.props.onTileClicked(i); }} style={style}>{this.props.tiles[i]}</Text>
        );
    }
    render() {
        const winningLine = this.props.winningLine;
        const rows = this.renderRows(winningLine);
        return (
            <View style={styles.board}>{rows}</View>);
    }
}
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row'
    },
    tile: {
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 1,
        borderTopWidth: 1,
        width: 100,
        height: 100,
        fontSize: 70,
        textAlign: "center",
    },
    bottomTile: {
        borderBottomWidth: 1
    },
    rightTile: {
        borderRightWidth: 1
    },
    winningTile: {
        backgroundColor: '#1e90ff'
    },
    board: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50
    }
});
