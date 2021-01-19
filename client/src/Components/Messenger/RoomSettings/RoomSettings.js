import React, { useState } from "react";
import "./RoomSettings.css";

import { selectUser } from "../../ReduxStore/appSlice";
import { useSelector } from "react-redux";
import AddMember from "./AddMember";
import GroupMember from "./GroupMember";
import OutsideAlerter from "../../Misc/OutsideAlerter";
import {
	AddRounded,
	ExitToAppRounded,
	PermIdentityRounded,
} from "@material-ui/icons";
import { IconButton, Tooltip } from "@material-ui/core";
import removeMember from "../../API/removeMember";
import removeDirectRoom from "../../API/removeDirectRoom";


const RoomSettings = ({ roomId, isGroup, usersArray }) => {
	const [addMemberDialog, setAddMemberDialog] = useState(false);
	const [viewMembersDialog, setViewMembersDialog] = useState(false);

	const user = useSelector(selectUser);

	const exitFromGroup = async (e) => {
		e.preventDefault();
		console.log("group room remove");
		await removeMember(user.userId, roomId);
	};

	const deleteRoom = async (e) => {
		// e.preventDefault();
		console.log("direct room remove");
		await removeDirectRoom(user.userId, roomId);
	};

	return (
		<>
			{(isGroup === "group") ? (
				<div className="roomSettings">
					<Tooltip title="Add Member" enterDelay={1000}>
						<div
							className="roomSetting__listOption"
							onClick={() => setAddMemberDialog(!addMemberDialog)}
						>
							<IconButton>
								<AddRounded />
							</IconButton>
						</div>
					</Tooltip>

					{addMemberDialog && (
						<OutsideAlerter
							outsideHandler={() => setAddMemberDialog(!addMemberDialog)}
							component={<AddMember roomId={roomId} />}
						/>
					)}

					<Tooltip title="Group Members" enterDelay={1000}>
						<div
							className="roomSetting__listOption"
							onClick={() => setViewMembersDialog(!viewMembersDialog)}
						>
							<IconButton>
								<PermIdentityRounded />
							</IconButton>
						</div>
					</Tooltip>

					{viewMembersDialog && (
						<OutsideAlerter
							outsideHandler={() => setViewMembersDialog(!viewMembersDialog)}
							component={
								<>
									<div className="groupMember__dialog">
										{usersArray.map((userId) => (
											<GroupMember userId={userId} />
										))}
									</div>
								</>
							}
						/>
					)}

					<Tooltip title="Exit" enterDelay={1000}>
						<div className="roomSetting__listOption">
							<IconButton onClick={exitFromGroup}>
								<ExitToAppRounded />
							</IconButton>
						</div>
					</Tooltip>
				</div>
			) : (
				<div className="roomSettings">
					<Tooltip title="Exit" enterDelay={1000}>
						<div className="roomSetting__listOption">
							<IconButton onClick={deleteRoom}>
								<ExitToAppRounded />
							</IconButton>
						</div>
					</Tooltip>
				</div>
			)}
		</>
	);
};

export default RoomSettings;
