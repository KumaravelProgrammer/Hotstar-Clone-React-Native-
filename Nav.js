import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import VideoScreen from './screens/VideoScreen';
import CourseScreen from './screens/CourseScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EpisodeScreen from './screens/EpisodeScreen';



const HomeStack = createStackNavigator();

function HomeStackScreen() {
    return (

        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, }} />
            <HomeStack.Screen name="Video" component={VideoScreen} options={{ headerShown: false }} />
            <HomeStack.Screen name="Episode" component={EpisodeScreen} options={{ headerShown: false }} />

        </HomeStack.Navigator>

    );
}



const CourseStack = createStackNavigator();

function CourseStackScreen() {
    return (

        <CourseStack.Navigator>
            <CourseStack.Screen name="Course" component={CourseScreen} options={{ headerShown: false }} />
            <CourseStack.Screen name="Episode" component={EpisodeScreen} options={{ headerShown: false }} />

        </CourseStack.Navigator>

    );
}

// const VideoStack = createStackNavigator();

// function VideoStackScreen() {
//     return (

//         <VideoStack.Navigator>
//             <VideoStack.Screen name="VideoScreen" component={CourseScreen} options={{ headerShown: false }} />

//         </VideoStack.Navigator>

//     );

// }

// const EpisodeStack = createStackNavigator();

// function EpisodeStackScreen() {
//     return (

//         <EpisodeStack.Navigator>
//             <Episode.Screen name="Episode" component={EpisodeScreen} options={{ headerShown: false }} />

//         </EpisodeStack.Navigator>

//     );
// }




const Tab = createBottomTabNavigator();

const MaterialBottomTab = createMaterialBottomTabNavigator();

export default function MaterialTab() {
    return (
        <NavigationContainer>
            <MaterialBottomTab.Navigator
                initialRouteName="Home"
                activeColor="#5FAB2F"
                inactiveColor="#9D9D9D"
                barStyle={{ backgroundColor: '#EEEEEE' }}
                shifting={true}
                tabBarBadge={true}
            >


                <Tab.Screen name="HomeScreen" component={HomeStackScreen} options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ focused }) => (
                        <Icon name="home" size={25}
                            color={focused ? "#5FAB2F" : "#9D9D9D"}


                        />
                    )
                }} />
                <Tab.Screen name="CourseScreen" component={CourseStackScreen} options={{
                    tabBarLabel: "Course",
                    tabBarIcon: ({ focused }) => (
                        <Icon name="book-open-variant" size={25}
                            color={focused ? "#5FAB2F" : "#9D9D9D"} />
                    )
                }} />
                {/* <Tab.Screen name="VideoScreen" component={VideoStackScreen} options={{
                    tabBarLabel: "Videos",
                    tabBarIcon: ({ focused }) => (
                        <Icon name="video" size={25}
                            color={focused ? "#5FAB2F" : "#9D9D9D"} />
                    )
                }} /> */}

            </MaterialBottomTab.Navigator>
        </NavigationContainer>
    );
}