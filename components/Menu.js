import React from 'react';
import styled from 'styled-components';
import { LinearGradient } from 'expo-linear-gradient';
import { Animated, TouchableOpacity, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import MenuCard from './MenuCard';

const screenHeight = Dimensions.get("window").height;

function mapStateToProps(state) {
    return { menu: state.menu }
}

function mapDispatchToProps(dispatch) {
    return {
        closeMenu: () => dispatch({
            type: "CLOSEMENU"
        }),

        Login: (email) =>
            dispatch({
                type: "LOG",
                email: email
            }),
    }
}



class Menu extends React.Component {

    state = {
        top: new Animated.Value(screenHeight)
    };

    componentDidMount() {
        this.menu();
    }

    componentDidUpdate() {
        this.menu();
    }

    menu = () => {
        if (this.props.menu == "openMenu") {
            Animated.spring(this.state.top, { toValue: 150, useNativeDriver: false }).start();

        }

        if (this.props.menu == "closeMenu") {
            Animated.spring(this.state.top, { toValue: screenHeight, useNativeDriver: false }).start();
        }
    };

    logout = () => {
        this.props.Login();
        this.props.closeMenu();
        AsyncStorage.clear();
    }

    render() {
        return (
            <AnimatedContainer style={{ position: "absolute", top: this.state.top, zIndex: 100 }}>
                <Cover >
                    <LinearGradient
                        colors={["rgba(255, 148,155,1)", "rgba(255,120,123,1)"]}
                        style={{
                            width: '100%',
                            height: '100%',
                        }} />
                    <MenuText> Menu </MenuText>
                </Cover>
                <TouchableOpacity style={{
                    position: 'absolute',
                    top: 120,
                    left: '50%',
                    marginLeft: -22,
                }}
                    onPress={this.props.closeMenu}
                >
                    <CloseView>
                        <Ionicons name='ios-close' size={35} color='blue' />
                    </CloseView>
                </TouchableOpacity>
                <Content >

                    <MenuCard text='Account' icon='ios-cog' caption='Profile' />
                    <TouchableOpacity onPress={() => {
                        this.logout();
                    }}>
                        <MenuCard text='Log Out' icon='ios-log-out-outline' caption='See You Soon' />
                    </TouchableOpacity>

                </Content>

            </AnimatedContainer>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Menu);

const Container = styled.View`
 width: 100%;
 height:100%;
 background: #f0f3F5;
 border-radius:26px;
 overflow:hidden;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);



const Cover = styled.View`
 width: 100%;
 height:142px;
`;
const Content = styled.View`
 width:100%;
 height:100%;
 padding: 30px;
`;

const CloseView = styled.View`
 width :44px ;
 height:44px;
 border-radius:22px;
 background: white;  
 justify-content: center;
 align-items: center;
`;

const MenuText = styled.Text`
  position: absolute;
  font-size:25px;
  font-weight: 600;
  color:white;
  top:55px; 
  left:42%;
`;

