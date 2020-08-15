import React from "react";
import { View, Text, StyleSheet } from "react-native";
import style from "../style";
import baseStyle from "../style/base";
import MainConversation from "./component.main.conversation";
import MainPeople from "./component.main.people";
import Icon from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const MainContent = () => {
    return (
        <View style={style.main.content.wrap}>
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: "black",
                    inactiveTintColor: "#999",
                }}
            >
                <Tab.Screen
                    name="chats"
                    component={MainConversation}
                    options={{
                        tabBarIcon: (({ color }) => (
                            <View>
                                <Icon
                                    name="chatbubble"
                                    color={color}
                                    style={style.main.footer.itemIcon}
                                />
                            </View>
                        )),
                        tabBarLabel: (({ color }) => (
                            <Text style={StyleSheet.flatten([style.main.footer.itemTitle, { color }])}>Chats</Text>
                        ))
                    }}
                />
                <Tab.Screen
                    name="people"
                    component={MainPeople}
                    options={{
                        tabBarIcon: (({ color }) => (
                            <View>
                                <Icon
                                    name="md-people-sharp"
                                    color={color}
                                    style={style.main.footer.itemIcon}
                                />
                            </View>
                        )),
                        tabBarLabel: (({ color }) => (
                            <Text style={StyleSheet.flatten([style.main.footer.itemTitle, { color }])}>People</Text>
                        ))
                    }}
                />
            </Tab.Navigator>
        </View>
    )
}

export default MainContent;