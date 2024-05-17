import React from "react";
import './App.css';
import d from './data.json';

const Row = (props) => {
    const itemData = props.data;
    const enter = (e) => {e.preventDefault(); localStorage.setItem(itemData.name, e.target.children[0].value);}
    const out = (e) => {e.preventDefault();   localStorage.setItem(itemData.name, e.target.value);}
    const def = (localStorage.getItem(itemData.name) === "0") ? "" : localStorage.getItem(itemData.name);
    return(
        <tr>
            <td>
                <form onSubmit = {enter} onBlur = {out}>
                    <input type = "text" id = {itemData.id + "_textinput"} name = {itemData.name + " needed"} placeholder = "0" defaultValue = {def}/>
                </form>
            </td>
            <td>
                <button value = {itemData.id} onClick={props.setDisplay}>
                    <img value = {itemData.id} src={require(`./images/${itemData.filename}`)} className="itemimgs" alt = {itemData.name}/><br/>
                    {itemData.name}
                </button>
            </td>
            <td>{itemData.location}</td>
            <td>{itemData.method}</td>
            <td>{itemData.uses}</td>
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
    //name, uses, locaiton, method, needed
    const [sort, setSort] = React.useState("name");
    React.useEffect(() => {
        setData(d);
    }, []);
    const changeDisplay = (e) => {
        e.preventDefault();
        console.log(e.currentTarget);
        const disp = (display[1] === -1) ? e.currentTarget.value : -1;
        setDisplay([display[2], disp, display[0]]);
    }
    const clear = () => {
        localStorage.clear();
        window.location.reload();
    }

    // const s = (e) => {
    //     setSort();
    // }
    // data.sort();
    return (
        <div className = "App">
            <div style = {{display: display[0]}}>
            <button id = "clearsaves" onClick = {clear}>clear saves</button>
                <table style = {{width:"80%"}}>
                    <thead>
                        <tr>
                            <th style = {{width:"5%"}}>num needed</th>
                            <th style = {{width:"10%"}}>item</th>
                            <th style = {{width:"20%"}}>location</th>
                            <th style = {{width:"20%"}}>method</th>
                            <th style = {{width:"20%"}}>uses</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, i) => {return(<Row data = {item} setDisplay = {changeDisplay} disp = {display[0]}/>)})}
                    </tbody>
                </table>
            </div>
            <Item disp = {display[1]} data = {data} setDisplay = {changeDisplay}/>
        </div>
    );
}

export default App;

