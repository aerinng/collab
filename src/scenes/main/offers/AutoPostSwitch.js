import React, { useState } from "react";
import { Switch } from 'react-native';


export default class AutoPostSwitch extends React.Component {
    render() {
        const [isEnabled, setIsEnabled] = useState(false);
        const toggleSwitch = () => setIsEnabled(previousState => !previousState);
        return (
            <Switch
                trackColor={{ false: "#ff0000", true: "#93D17D" }}
                thumbColor={isEnabled ? "#ffffff" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        );
    }
}
