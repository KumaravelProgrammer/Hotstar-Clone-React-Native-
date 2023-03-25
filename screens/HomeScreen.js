import React from 'react';
import { StatusBar, ScrollView } from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Animated, Dimensions } from 'react-native';
import BigCard from '../components/Bigcard';
import MedCard from '../components/MedCard';
import Menu from '../components/Menu';
import { connect } from 'react-redux';
import MovieCard from '../components/MovieCard';
import firebaseApp from '../FirebaseConfig';
import Login from '../components/Login'

// const firebaseConfig = {
//     apiKey: "AIzaSyC_DERDj4dnbVhCS44XpMlM-Lg5xKV2ca0",
//     authDomain: "react-native-94547.firebaseapp.com",
//     databaseURL: "https://react-native-94547-default-rtdb.firebaseio.com",
//     projectId: "react-native-94547",
//     storageBucket: "",

// };


// const firebaseApp = firebase.initializeApp(firebaseConfig);

const screenHeight = Dimensions.get("window").height;

function mapStateToProps(state) {
    return { menu: state.menu, log: state.log }
}

function mapDispatchToProps(dispatch) {
    return {
        openMenu: () => dispatch({
            type: "OPENMENU"
        }),

        openLogin: () => dispatch({
            type: "OPENLOGIN"
        })
    }
}

class HomeScreen extends React.Component {
    state = {
        left: 10,
        top: new Animated.Value(screenHeight),
        opacity: new Animated.Value(0),
        MedCardData: [],
        BigCardData: [],
        MovieCardData: [],
    };

    componentDidMount() {
        console.disableYellowBox = true;
        this.Bigdatabase = firebaseApp
            .database()
            .ref()
            .child("BigCardData");
        this.getBigCardData(this.Bigdatabase);

        this.Meddatabase = firebaseApp
            .database()
            .ref()
            .child("MedCardData");
        this.getMedCardData(this.Meddatabase);

        this.Moviedatabase = firebaseApp
            .database()
            .ref()
            .child("MovieCardData");
        this.getMovieCardData(this.Moviedatabase);

    }

    getBigCardData = database => {

        database.on("value", snap => {
            let items = [];
            snap.forEach(child => {
                items.push({
                    title: child.val().title,
                    image: child.val().image,
                    video: child.val().video,
                })
            });
            this.setState({
                BigCardData: items,
            })
            // console.log(items);
        })

    }

    getMedCardData = database => {

        database.on("value", snap => {
            let MedCardFData = [];
            snap.forEach(child => {
                MedCardFData.push({
                    title: child.val().title,
                    image: child.val().image,
                    video: child.val().video,
                })
            });
            this.setState({
                MedCardData: MedCardFData,
            })
            // console.log(MedCardFData);
        })
    }


    getMovieCardData = database => {

        database.on("value", snap => {
            let items = [];
            snap.forEach(child => {
                items.push({
                    image: child.val().image,
                    episodeImage: child.val().episodeImage,
                    title: child.val().title,

                    // video: child.val().video,
                })
            });
            this.setState({
                MovieCardData: items,
            })
            // console.log(items);
        })

    }


    componentDidUpdate() {
        this.blackScreen();
    }

    blackScreen() {
        if (this.props.menu == "openMenu") {
            Animated.timing(this.state.top, { toValue: 0, useNativeDriver: false, duration: 10 }).start();
            Animated.timing(this.state.opacity, { toValue: 0.6, useNativeDriver: false, duration: 500 }).start();
        }
        if (this.props.menu == "closeMenu") {
            Animated.timing(this.state.top, { toValue: screenHeight, useNativeDriver: false, duration: 10 }).start();
            Animated.spring(this.state.opacity, { toValue: 0, useNativeDriver: false }).start();
        }
    }

    handleLogin = () => {
        if (this.props.log) {
            this.props.openMenu();
        } else {
            this.props.openLogin();
        }
    }

    render() {
        return (
            <Root>

                <Main>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <StatusBar hidden />
                        <Header>
                            <TouchableOpacity
                                onPress={this.handleLogin}
                                style={{
                                    position: "absolute",
                                    top: 12,
                                    left: this.state.left,
                                    zIndex: 100

                                }}
                            >
                                <Ionicons name="ios-menu-sharp" size={30} color="black" />
                            </TouchableOpacity>
                            <Logo />
                            <Profile />

                        </Header>
                        <BigCardContainer>

                            <BigCard data={this.state.BigCardData} />

                        </BigCardContainer>
                        <ContinueText> Continue Watching </ContinueText>
                        <MedCardContainer>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}>
                                {
                                    this.state.MedCardData.map((data, index) => (
                                        <TouchableOpacity key={index}
                                            onPress={() => {
                                                this.props.navigation.push("Video", {
                                                    video: data,
                                                    datas: this.state.MedCardData,
                                                    movieData: this.state.MovieCardData
                                                });
                                            }}>
                                            <MedCard image={data.image} />
                                        </TouchableOpacity>
                                    ))
                                }

                            </ScrollView>
                        </MedCardContainer>
                        <LikeText> You May Also Like </LikeText>
                        <MovieCardContainer>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}>
                                {
                                    this.state.MovieCardData.map((data, index) => (
                                        <TouchableOpacity key={index}
                                            onPress={() => {
                                                this.props.navigation.push("Episode", {
                                                    episode: data,
                                                    datas: this.state.MedCardData,
                                                    movieData: this.state.MovieCardData
                                                });
                                            }}>
                                            <MovieCard image={data.image} />
                                        </TouchableOpacity>
                                    ))
                                }

                            </ScrollView>
                        </MovieCardContainer>
                    </ScrollView>

                </Main>

                <AnimatedBlack style={{
                    top: this.state.top,
                    opacity: this.state.opacity
                }} />
                <Menu />
                <Login />
            </Root>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);


const Root = styled.View`
 flex: 1;
  
`;

const Main = styled.View`
flex : 1;
background-color : #efefef;
`;

const Black = styled.View`
 position: absolute;
 width: 100%;
 height: 100%;
 background: black;
 opacity:0.6 ;
`;

const AnimatedBlack = Animated.createAnimatedComponent(Black);

const Header = styled.View`
 width: 100%;
 height: 56px;
 background: white;
`;

const Logo = styled.View`
 margin-top: 20px;
 margin-left: 50px;
 width: 85px;
 height: 15px;
 background: lightgreen;
 border-radius: 10px;

`;

const Profile = styled.Image`
position: absolute;
 top: 8px;
 right:5px;
 width: 40px;
 height: 40px;
 background: #c4c4c4;
 border-radius: 22px;

`;

const BigCardContainer = styled.View`
 margin-top : 30px;
`;

const ContinueText = styled.Text`
 margin-top: 20px;
 color: #b4b4b4;
 font-size: 15px;
 font-weight: 600;
 text-transform: uppercase;
`;

const LikeText = styled.Text`
 margin-top: 20px;
 color: #b4b4b4;
 font-size: 15px;
 font-weight: 600;
 text-transform: uppercase;
`;

const MedCardContainer = styled.View`
 margin-top: 10px;
 margin-left: 5px;

`;

const MovieCardContainer = styled.View`
 margin-top: 20px;
 margin-bottom: 20px;
 margin-left: 5px;

`;

const BigCardData = [
    {
        image: 'https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_3x/sources/r1/cms/prod/7598/677598-h',
        title: " Big Boss Season 1"
    },
    {
        image: 'https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_3x/sources/r1/cms/prod/3505/133505-h'

    },
    {
        image: 'https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_3x/sources/r1/cms/prod/8536/568536-h'

    },
    {
        image: 'https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_3x/sources/r1/cms/prod/9725/439725-h'

    }
];


const MedCardData = [
    {
        image: 'https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_3x/sources/r1/cms/prod/7897/977897-h',
        title: " Big Boss Season 3"
    },
    {
        image: 'https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_3x/sources/r1/cms/prod/8366/928366-h',
        title: "2"
    },
    {
        image: 'https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_3x/sources/r1/cms/prod/4675/674675-h',
        title: "3"
    },
    {
        image: 'https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_3x/sources/r1/cms/prod/7598/677598-h',
        title: "4"
    }
];

const MovieCardData = [
    {
        image: 'https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/7846/907846-v',
        title: " Big Boss Season 3"
    },
    {
        image: 'https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/7835/907835-v',
        title: "2"
    },
    {
        image: 'https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/7599/677599-v',
        title: "3"
    },
    {
        image: 'https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/3596/333596-v',
        title: "4"
    }
];