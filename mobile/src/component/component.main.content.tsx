import React from "react";
import { View, Text, StyleSheet } from "react-native";
import style from "../style";
import baseStyle from "../style/base";
import MainConversation from "./component.main.conversation";
import MainPeople from "./component.main.people";
import Icon from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { chooseContentTab } from "../action/action.navigation";
import { EContentTap } from "../common/common.type";
import { connect } from "react-redux";
import { IMainContent } from "../interface/interface.component";

const Tab = createBottomTabNavigator();

const MainContent = ({ chooseContentTab }: IMainContent) => {
    return (
        <View style={style.main.content.wrap}>
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: "black",
                    inactiveTintColor: "#999",
                }}
                initialRouteName="chats"
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
                        )),
                    }}
                    listeners={({ navigation, route }) => ({
                        tabPress: e => {
                            // Prevent default action
                            e.preventDefault();
                            // Set navigation
                            chooseContentTab(EContentTap.CONVERSATION);
                            // Do something with the `navigation` object
                            navigation.navigate('chats');
                        },
                    })}
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
                    listeners={({ navigation, route }) => ({
                        tabPress: e => {
                            // Prevent default action
                            e.preventDefault();
                            // Set navigation
                            chooseContentTab(EContentTap.PEOPLE);
                            // Do something with the `navigation` object
                            navigation.navigate('people');
                        },
                    })}
                />
            </Tab.Navigator>
        </View>
    )
}

export default connect(null, { chooseContentTab })(MainContent);