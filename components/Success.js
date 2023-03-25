import React from 'react';
import styled from 'styled-components';
import LottieView from 'lottie-react-native';
import { Animated, Dimensions } from 'react-native';

const screenHeight = Dimensions.get("window").height;

class Success extends React.Component {

    state = {
        top: new Animated.Value(0),
        opacity: new Animated.Value(0),
    }

    componentDidMount() {

    }

    componentDidUpdate() {
        if (this.props.isActive) {
            Animated.timing(this.state.top, { toValue: 0, duration: 0, useNativeDriver: false }).start();

            Animated.timing(this.state.opacity, { toValue: 1, useNativeDriver: false }).start();
            this.animation.play();

        }
        else {
            Animated.timing(this.state.top, { toValue: screenHeight, duration: 0, useNativeDriver: false }).start();

            Animated.timing(this.state.opacity, { toValue: 0, useNativeDriver: false }).start();

        }

    }

    render() {
        return (
            <AnimatedContainer style={{ top: this.state.top, opacity: this.state.opacity }} >

                <LottieView
                    source={require("../assets/58245-sucess-simple.json")}
                    autoPlay={false}
                    Loop={false}
                    ref={animation => {
                        this.animation = animation;
                    }}
                />

            </AnimatedContainer>
        );
    }
}

export default Success;


const Container = styled.View`
 width: 100%;
 height : 100%;
 background : rgba(225,225,255,0.9) ;
 position: absolute;
 top: 0;
 left: 0;
 justify-content: center;
 align-items: center;
`;


const AnimatedContainer = Animated.createAnimatedComponent(Container);