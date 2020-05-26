import React, { Component } from 'react';
import { View } from 'react-native';
import { Audio } from 'expo-av';

export default class AudioPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = { isPlaying: true };
    }

    async startAudio() {
        this.sound = null;
        //console.log(this.props.audioLink);

        const { sound } = await Audio.Sound.createAsync(
            { uri: this.props.audioLink },
            {
                shouldPlay: true,
                // isLooping: true,
            },
        );
        this.sound = sound;
        this.state.isPlaying = true;
        this.props.setAudioStatus(true);
        this.sound.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
    }

    _onPlaybackStatusUpdate = playbackStatus => {
        if (playbackStatus.didJustFinish) {
            // The player has just finished playing and will stop
            this.props.setAudioStatus(false);
            this.state.isPlaying = false;
        }
    };

    async pauseAudio() {
        await this.sound.pauseAsync();
        this.state.isPlaying = false;
        this.props.setAudioStatus(false);
    }

    async playAudio() {
        await this.sound.playAsync();
        this.state.isPlaying = true;
    }

    async audioPosition() {
        let { isLoaded, isPlaying, positionMillis, durationMillis } = await this.sound.getStatusAsync();
        this.props.setAudioLength(durationMillis);
        this.props.setTimer(positionMillis);
    }

    updateTimer = () => {
        this.ftTimer = setInterval(() => { (this.sound != null) ? this.audioPosition() : null }, 700);
    }

    reset = () => {
        this.state.isPlaying = true;
        this.startAudio();
    }

    componentDidMount = () => {
        this.startAudio();
        this.updateTimer();
    }

    componentDidUpdate() {
        if (this.sound != null) {
            if (this.props.audioStatus) {
                if (!this.state.isPlaying) {
                    this.playAudio();
                    this.state.isPlaying = true;
                    this.updateTimer();
                }
                if (this.props.shouldUpdate) {
                    // next and previous
                    if (this.props.shouldUpdate === 2) {
                        this.pauseAudio();
                        this.reset();
                        this.props.setShouldUpdate(false);
                    } else {
                        this.sound.playFromPositionAsync(this.props.setPosition * 1000);
                        this.props.setShouldUpdate(false);
                    }
                }
            }
            else
                this.pauseAudio();
        }
    }

    componentWillUnmount() {
        this.state.isPlaying = false;
        this.pauseAudio();
        clearInterval(this.ftTimer);
    }

    render() {
        return (
            <View>
            </View>
        );
    }
}
