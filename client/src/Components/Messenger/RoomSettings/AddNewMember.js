import React, { useState } from "react";
import "./AddNewMember.css";

import { IconButton } from "@material-ui/core";
import { AddRounded } from "@material-ui/icons";
import { useMutation } from "@apollo/react-hooks";
import { AddMember } from "../../API/roomAPI";

const AddNewMember = ({ roomId }) => {

	const [addMember] = useMutation(AddMember)

	const [newMember, setNewMember] = useState("")
	const handleSubmit = async (e) => {
		e.preventDefault();
		setNewMember("");
		await addMember({ variables: { id: roomId, userEmail: newMember } })
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

export default AddNewMember;
