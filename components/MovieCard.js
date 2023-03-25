import React from 'react';
import styled from 'styled-components';


class MovieCard extends React.Component {
    render() {
        return (
            <Container>

                <Image source={{ uri: this.props.image }} />


            </Container>
        );
    }
}

export default MovieCard;

const Container = styled.View`
width: 130px;
height:172px ;
background: white;
border-radius:4px ;
overflow: hidden;
margin-left: 5px;
`;

const Image = styled.Image`
width:100%;
height:100%;
`;

// const Text = styled.Text`
// font-size:15px;
// font-weight:500;
// color: white;
// padding-left: 10px;
// `;

// const TextContainer = styled.View`
// position: absolute;
// top: 80px;
// left:10px;
// flex-direction:row;
// align-items: center;
// `;