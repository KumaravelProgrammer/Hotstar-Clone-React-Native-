import React from 'react';
import styled from 'styled-components';
import Carousel from 'react-native-snap-carousel';
import { View, Image, Dimensions, Text, StatusBar, TouchableWithoutFeedback, TouchableWithoutFeedbackComponent } from 'react-native';
import firebaseApp from '../FirebaseConfig';



const screenWidth = Dimensions.get('window').width;

class CourseScreen extends React.Component {

    state = {
        MovieCardData: [],
        MedCardData: [],

    }

    componentDidMount() {
        console.disableYellowBox = true;
        this.Moviedatabase = firebaseApp
            .database()
            .ref()
            .child("MovieCardData");
        this.getMovieCardData(this.Moviedatabase);

        this.Meddatabase = firebaseApp
            .database()
            .ref()
            .child("MedCardData");
        this.getMedCardData(this.Meddatabase);

    }

    getMovieCardData = database => {

        database.on("value", snap => {
            let items = [];
            snap.forEach(child => {
                items.push({
                    title: child.val().title,
                    image: child.val().image,
                    episodeImage: child.val().episodeImage,
                    // video: child.val().video,
                })
            });
            this.setState({
                MovieCardData: items,
            })
            console.log(items);
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
            console.log(MedCardFData);
        })
    }

    _renderItem = ({ item, index }) => {
        return (
            <TouchableWithoutFeedback onPress={() => {
                this.props.navigation.push("Episode", {
                    episode: item,
                    datas: this.state.MedCardData,
                    movieData: this.state.MovieCardData
                });
            }}>
                <View style={{
                    borderRadius: 10,
                    overflow: 'hidden',
                }}>
                    <Image source={{ uri: item.image }}
                        style={{ width: "100%", height: 350 }} />

                </View>
            </TouchableWithoutFeedback>
        )
    }

    render() {
        return (

            <Container>
                <StatusBar hidden />
                <Circle1 />
                <Circle2 />
                <Circle3 />
                <Latest >
                    <Text style={{
                        fontSize: 20
                    }}> Latest </Text>
                </Latest>
                <SliderContainer>
                    <Carousel
                        ref={c => this.carousel = c}
                        data={this.state.MovieCardData}
                        renderItem={this._renderItem}
                        sliderWidth={screenWidth}
                        itemWidth={240}
                        inactiveSlideScale={0.85}
                        inactiveSlideOpacity={1}
                        inactiveSlideShift={20}
                        enableMomentum={true}
                        activeSlideAlignment={"start"}
                        activeAnimationType={"spring"}
                        activeAnimationOptions={{
                            friction: 4,
                            tension: 40
                        }}
                        loop={true}
                        autoplay={true}
                        autoplayDelay={4000}
                        autoplayInterval={3000}
                        contentContainerCustomStyle={{
                            height: 500,
                            marginLeft: 80
                        }}
                    // layout={'tinder'}
                    // layoutCardOffset={18}


                    />
                </SliderContainer>
            </Container>

        );
    }
};


export default CourseScreen;

const Container = styled.View`
   flex: 1;
   justify-content: center;
   align-items:center;
   background: #e2e5ef;

`;

const Circle1 = styled.View`
  position:absolute;
  width: 682px;
  height:682px;
  left: -135px;
  top: -119px;
  background: #eff1f7;
  border-radius: 341px;
`;
const Circle2 = styled.View`
  position:absolute;
  width: 606px;
  height:606px;
  left: -18px;
  top: -221px;
  background: #EBEBF6;
  border-radius: 346px;
`;

const Circle3 = styled.View`
  position:absolute;
  width: 606px;
  height:606px;
  left: -18px;
  top: -221px;
  background: #EBEBF6;
  border-radius: 346px;
`;

const Latest = styled.View`
  position:absolute;
  width: 150px;
  height: 42px;
  left: 131px;
  top:  28px;
  background: #ffffff;
  border-radius: 8px;
  justify-content: center;
  align-items : center;
`;

const SliderContainer = styled.View`
    margin-top: 550px;
    width: ${screenWidth}px;
    height: 900px;

`;

// const Text = styled.Text``;


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
