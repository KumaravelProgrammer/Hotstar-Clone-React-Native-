import React from 'react';
import styled from 'styled-components';
import { Text, Image, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Video } from 'expo-av';
import MedCard from '../components/MedCard';
import MovieCard from '../components/MovieCard';

const screenWidth = Dimensions.get("window").width;


class EpisodeScreen extends React.Component {

    _renderItem({ item, index }) {
        return (
            <View style={{ borderRadius: 5, overflow: 'hidden' }}>
                <Image source={{ uri: item.image }}
                    style={{
                        width: "100%",
                        height: 220,
                    }}
                />
            </View>
        );

    }

    render() {
        const data = this.props.route.params.episode;
        const MedCardData = this.props.route.params.datas;
        const MovieCardData = this.props.route.params.movieData;



        return (
            <Container>
                <ScrollView>
                    <CoverImage>
                        <EpisodeImage source={{ uri: data.episodeImage }} />
                    </CoverImage>
                    <Text style={{
                        color: "black",
                        fontSize: 20,
                        marginTop: 10,
                        marginLeft: 10,
                        marginBottom: 10,
                        fontWeight: "bold"
                    }}>
                        {data.title}
                    </Text>

                    <ContinueText> Continue Watching </ContinueText>
                    <MedCardContainer>


                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false} >

                            {
                                MedCardData.map((data, index) => (
                                    <TouchableOpacity key={index}
                                        onPress={() => {
                                            this.props.navigation.push("Video",
                                                {
                                                    video: data,
                                                    datas: MedCardData,
                                                    movieData: MovieCardData
                                                });
                                        }}>
                                        <MedCard image={data.image} />
                                    </TouchableOpacity>
                                ))
                            }
                        </ScrollView>
                    </MedCardContainer>
                    <LatestText> Latest Releases  </LatestText>

                    <Carousel
                        ref={c => this.carousel = c}
                        data={MedCardData}
                        renderItem={this._renderItem}
                        sliderWidth={screenWidth}
                        itemWidth={385}
                        inactiveSlideScale={0.95}
                        inactiveSlideOpacity={1}
                        enableMomentum={true}
                        activeSlideAlignment={"start"}
                        activeAnimationType={"spring"}
                        loop={true}
                        autoplay={true}
                        autoplayDelay={5000}
                        autoplayInterval={3000}
                        contentContainerCustomStyle={{
                            height: 220,
                            marginLeft: 20,
                            marginTop: 10,
                        }}
                        layout={"stack"}
                        layoutCardOffset={15}

                    />

                </ScrollView>
            </Container>

        );
    }

}

export default EpisodeScreen;


const Container = styled.View`
 flex: 1;
  `;

const CoverImage = styled.View`
 width: 100%;
 height: 229px; 
  `;

const EpisodeImage = styled.Image`
 width: 100%;
 height: 100%;
 `;

const MedCardContainer = styled.View`
 margin-top: 10px;
 margin-left: 5px;

`;

const ContinueText = styled.Text`
 margin-top: 20px;
 color: #b4b4b4;
 font-size: 15px;
 font-weight: 600;
 text-transform: uppercase;
`;

const LatestText = styled.Text`
 margin-top: 20px;
 color: #b4b4b4;
 font-size: 15px;
 font-weight: 600;
 text-transform: uppercase;
`;