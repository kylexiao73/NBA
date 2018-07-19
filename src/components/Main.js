import React, { Component } from 'react';
import {Profiles} from './Profiles'
import { DataViewContainer } from './DataViewContainer'
import nba from '../nba';
import {SearchBar} from './SearchBar'
import { DEFAULT_PLAYER_INFO } from '../tests/constants';


export class Main extends Component{
    state = {
        playerInfo: DEFAULT_PLAYER_INFO,
    }

    componentDidMount(){
        this.loadPlayerInfo(this.state.playerInfo.fullName);

    }
    loadPlayerInfo = (playerName) => {
        nba.stats.playerInfo({ PlayerID: nba.findPlayer(playerName).playerId }).then((info) => {
            const playerInfo = Object.assign(info.commonPlayerInfo[0], info.playerHeadlineStats[0]);
            this.setState({ playerInfo });
        });
    }

    render() {
        return(
            <div className="main">
                <SearchBar onSelect={this.loadPlayerInfo}/>
                <div className="player">
                    <Profiles playerInfo={this.state.playerInfo}/>
                    <DataViewContainer playerId={this.state.playerInfo.playerId}/>
                </div>
            </div>

        );
    }
}
