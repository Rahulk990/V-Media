import React, { useState } from "react";
import "./RoomSettings.css";
// import './AddMember'

import OutsideAlerter from "/Users/puneet/Documents/GitHub/FB-Clone/client/src/Components/Misc/OutsideAlerter.js";

import {
	AddRounded,
	ExitToAppRounded,
	PermIdentityRounded,
} from "@material-ui/icons";

import { IconButton, Tooltip } from "@material-ui/core";
import AddMember from "./AddMember";
import GroupMember from "./GroupMember";
import RemoveMember from "./RemoveMember";

const RoomSettings = ({ isGroup, usersArray, roomId }) => {
	const [handleClick_addMember, setHandleClick_addMember] = useState(false);
	const [handleClick_viewMember, setHandleClick_viewMember] = useState(false);

	const btnclick_viewMember = () => {
		setHandleClick_viewMember(!handleClick_viewMember);
	};
	const btnclick_addMember = () => {
		setHandleClick_addMember(!handleClick_addMember);
	};
	const btnclick_exit = () => {};
	// console.log(userArray);
	if (isGroup === "group") {
		return (
			<div className="roomSettings">
				<Tooltip title="Add Member" enterDelay="1000">
					<div className="roomSetting__listOption" onClick={btnclick_addMember}>
						<IconButton>
							<AddRounded />
						</IconButton>
					</div>
				</Tooltip>
				{handleClick_addMember && (
					<OutsideAlerter
						outsideHandler={btnclick_addMember}
						component={<AddMember roomId={roomId} />}
					/>
				)}
				<Tooltip title="Group Members" enterDelay="1000">
					<div
						className="roomSetting__listOption"
						onClick={btnclick_viewMember}
					>
						<IconButton>
							<PermIdentityRounded />
						</IconButton>
					</div>
				</Tooltip>
				{handleClick_viewMember && (
					<OutsideAlerter
						outsideHandler={btnclick_viewMember}
						component={
							<>
								<div className="groupmember__dialog">
									{usersArray.map((userId) => {
										return <GroupMember userId={userId} />;
									})}
								</div>
							</>
						}
					/>
				)}

				<Tooltip title="Exit" enterDelay="1000">
					<div className="roomSetting__listOption">
						<RemoveMember roomId={roomId}/>
					</div>
				</Tooltip>
			</div>
		);
	} else {
		return (
			<div className="roomSettings">
				<Tooltip title="Exit" enterDelay="1000">
					<div className="roomSetting__listOption">
						<RemoveMember roomId={roomId}/>
					</div>
				</Tooltip>
			</div>
		);
	}
};

export default RoomSettings;
