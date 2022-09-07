import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from "bootstrap";
import { DropdownButton } from "react-bootstrap";

class Userlist extends React.Component{
    UserName={
        users:["ab","shia","raa"]
    }
    render(){
        return(
            <div>
                <select>
                    {this.UserName.users.map(data=>(
                        <option >{data}</option>
                    ))}
                </select>
                <Dropdown>
                    <DropdownButton id="dropdown-basic-button" title="UserName">
                    {this.UserName.users.map(data=>(
                        <Dropdown.Item href="#" title={data}>{data}</Dropdown.Item>
                    ))}
                    

                    </DropdownButton>
                </Dropdown>
            </div>
        )
    }
}
export default Userlist;