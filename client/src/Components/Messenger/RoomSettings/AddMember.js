import React, { useState } from "react";
import "./AddMember.css";

import addMember from "../../API/addMember"
import { IconButton } from "@material-ui/core";
import { AddRounded } from "@material-ui/icons";
import { useDispatch } from "react-redux";

const AddMember = ({ roomId }) => {

	const dispatch = useDispatch()

	const [newMember, setNewMember] = useState("")
	const handleSubmit = async (e) => {
		e.preventDefault();
		await addMember(dispatch, newMember, roomId)
		setNewMember("");
	}
	return (
		<div className="addMember__dialog">
			<div className="addMember__dialogInput">

				<form>

					<IconButton type="submit" onClick={handleSubmit}>
						<AddRounded />
					</IconButton>

					<input
						placeholder="Add Member Email"
						value={newMember}
						onChange={(e) => setNewMember(e.target.value)}
					/>

				</form>

			</div>
		</div>
	);
};

export default AddMember;
