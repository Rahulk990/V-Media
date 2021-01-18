import react, { useState } from "react";
import "./AddMember.css";

import addMember from "../../API/addMember"
import { IconButton, Tooltip } from "@material-ui/core";
import {
	AddRounded,
	ExitToAppRounded,
	PermIdentityRounded,
} from "@material-ui/icons";
import { useDispatch } from "react-redux";

const AddMember = ({roomId}) => {
    const dispatch = useDispatch()
    const [newMember, setNewMember] = useState("")
    const handleSubmit = async (e) =>{
        e.preventDefault();
        await addMember(dispatch, newMember, roomId)
        setNewMember("");
    }
	return (
		<div className="add__dialog">
			<div className="add__dialog__inputbox">
				<form>
					<IconButton type="submit" onClick={handleSubmit}>
						<AddRounded />
					</IconButton>
				<input value = {newMember} onChange={ (e)=> setNewMember(e.target.value)} placeholder="Add member Email" />
                </form>
			</div>
		</div>
	);
};

export default AddMember;
