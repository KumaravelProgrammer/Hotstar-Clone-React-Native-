import React from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import styled from 'styled-components';
import { Video } from 'expo-av';
import MedCard from '../components/MedCard';
import MovieCard from '../components/MovieCard';



class VideoScreen extends React.Component {

    render() {

        const data = this.props.route.params.video;
        const MedCardData = this.props.route.params.datas;
        const MovieCardData = this.props.route.params.movieData;

        return (
            <Container>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <VideoContainer>

                        <Video source={{
                            uri: data.video
                        }}
                            shouldPlay
                            resizeMode="cover"
                            useNativeControls={true}
                            style={{
                                width: "100%",
                                height: "100%"
                            }}
                        />

                    </VideoContainer>
                    <VideoTitle> {data.title} </VideoTitle>
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
                    <LikeText> You May Also Like </LikeText>
                    <MovieCardContainer>

                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}>
                            {
                                MovieCardData.map((data, index) => (
                                    <TouchableOpacity key={index}
                                        onPress={() => {
                                            this.props.navigation.push("Video", {
                                                video: data,
                                                datas: MedCardData,
                                                movieData: MovieCardData
                                            });
                                        }}>
                                        <MovieCard image={data.image} />
                                    </TouchableOpacity>
                                ))
                            }

                        </ScrollView>
                    </MovieCardContainer>
                </ScrollView>
            </Container>
        );
    }
}


export default VideoScreen;

const Container = styled.View`
 flex: 1;
 background: #eaeaea
  
`;

const VideoContainer = styled.View` 
 width: 100%;
 height: 201px;
 background:black;
`;

const VideoTitle = styled.Text`
 margin-top: 10px;
 margin-bottom: 10px;
 margin-left:10px;
 color: black;
 font-family:Roboto;
 font-size:20px;
 font-weight:600;
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

const LikeText = styled.Text`
 margin-top: 20px;
 color: #b4b4b4;
 font-size: 15px;
 font-weight: 600;
 text-transform: uppercase;
`;
const MovieCardContainer = styled.View`
 margin-top: 20px;
 margin-bottom: 20px;
 margin-left: 5px;

`;