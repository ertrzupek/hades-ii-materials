import React from "react";
import './App.css';
import d from './data.json';

const Row = (props) => {
    const itemData = props.data;
    const enter = (e) => {e.preventDefault(); localStorage.setItem(itemData.name, e.target.children[0].value);}
    const out = (e) => {e.preventDefault();   localStorage.setItem(itemData.name, e.target.value);}
    return(
        <tr>
            <td><button value = {itemData.id} onClick={props.setDisplay}>{itemData.name}</button></td>
            <td>{itemData.uses}</td>
            <td>{itemData.location}</td>
            <td>{itemData.method}</td>
            <td>
                <form onSubmit = {enter} onBlur = {out}>
                    <input type = "text" id = {itemData.id + "_textinput"} name = {itemData.name + " needed"} placeholder = "0" defaultValue = {localStorage.getItem(itemData.name)}/>
                </form>
            </td>
        </tr>
    );
}

const Item = (props) => {
    if(props.disp === -1) {
        return(<div></div>);
    } else {
        const itemData = props.data[props.disp];
        return(
            <div>
                all about {itemData.name}
                <button value = {-1} onClick = {props.setDisplay}>close</button>
            </div>
        );
    }
}

const App = () => {
    const [data, setData] = React.useState([]);
    const [display, setDisplay] = React.useState(["block", -1, "none"]);
    React.useEffect(() => {
        setData(d);
    }, []);
    const changeDisplay = (e) => {
        e.preventDefault();
        const disp = (display[1] === -1) ? e.target.value : -1;
        setDisplay([display[2], disp, display[0]]);
    }
    return (
        <div className = "App">
            <table style = {{display: display[0]}}>
                <thead>
                    <tr>
                        <th>item</th>
                        <th>location</th>
                        <th>method</th>
                        <th>uses</th>
                        <th>num needed</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, i) => {return(<Row data = {item} setDisplay = {changeDisplay} disp = {display[0]}/>)})}
                </tbody>
            </table>
            <Item disp = {display[1]} data = {data} setDisplay = {changeDisplay}/>
        </div>
    );
}

export default App;

