import React from 'react';
import styled from 'styled-components';
import { View, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';


const screenWidth = Dimensions.get('window').width;


export default class BigCard extends React.Component {

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

    componentDidMount() {
        console.log(this.props.data);
    }
    render() {
        return (
            <Container>

                <Carousel
                    ref={c => this.carousel = c}
                    data={this.props.data}
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
                        marginLeft: 10,
                    }} />

            </Container>
        );
    }
}


const Container = styled.View`
width : ${screenWidth}%;
height: 220px;
/* border-radius : 5px ; */
/* background : white;
overflow: hidden;
margin-left : 10px; */
`;




