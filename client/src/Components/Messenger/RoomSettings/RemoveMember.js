import react, { useState } from "react";
import removeMember from "../../API/removeMember";

import {selectUser} from "../../ReduxStore/appSlice"
import {  useSelector } from 'react-redux'
import { IconButton, Tooltip } from "@material-ui/core";
import { ExitToAppRounded } from "@material-ui/icons";
import { useDispatch } from "react-redux";

const RemoveMember = ({roomId}) => {

    const user = useSelector(selectUser)
    const handleSubmit = async (e) =>{
        // console.log(user);
        e.preventDefault();
        await removeMember(user.userId, roomId)
    }

	return (
		<IconButton onClick={handleSubmit}>
			<ExitToAppRounded />
		</IconButton>
	);
};

export default RemoveMember;
