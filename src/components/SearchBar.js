import React, { Component } from 'react';
import AutoComplete from 'antd/es/auto-complete/index'
import nba from '../nba';
import Input from 'antd/es/input/Input'
import Icon from 'antd/es/icon/index'
import {PROFILE_PIC_URL_PREFIX} from '../tests/constants'


const Option = AutoComplete.Option;


export class SearchBar extends React.Component {
    state = {
        dataSource: []
    }
    onSelect = (value) => {
        this.props.onSelect(value);
    }

    onSearch = (value) => {

        nba.searchPlayers('onSearch' + nba)
        const dataSource = nba.searchPlayers(value).map(({fullName,playerId}) =>
            <Option key={playerId} value={fullName}>
                <img className="player-option-image"
                     alt={`${fullName}`}
                     src={`${PROFILE_PIC_URL_PREFIX}/${playerId}.png`}/>
                <span className="player-option-label">{fullName}</span>
            </Option>

        );
        this.setState({
            dataSource
        });
    }

    render() {
        return (
            <AutoComplete
                className="search-bar"
                size="large"
                dataSource={this.state.dataSource}
                onSelect={this.onSelect}
                onSearch={this.onSearch}
                placeholder="Search NBA Player"
                optionLabelProp = "value"
            >
                <Input suffix={<Icon type="search"/>}/>

            </AutoComplete>
        )
    };
}
