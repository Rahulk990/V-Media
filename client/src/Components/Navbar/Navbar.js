import React, { useEffect, useState } from "react";
import "./Navbar.css";

import Badge from "@material-ui/core/Badge";
import { centerOptionHandler } from "./TabHandler";
import OutsideAlerter from "../Misc/OutsideAlerter";
import NotificationList from "./NotificationList";
import SettingsList from "./SettingsList";
import { Avatar, Tooltip, IconButton } from "@material-ui/core";
import {
	Search,
	Home,
	People,
	Telegram,
	NotificationsActive,
	ExpandMoreOutlined,
} from "@material-ui/icons";

const Navbar = ({ setPath }) => {

	const centerOnClickHandler = (id) => {
		setPath(id);
		centerOptionHandler(id);
	};

	useEffect(() => {
		centerOnClickHandler('home')
	}, [])

	const [notificationDropdown, setNotificationDropdown] = useState(false);
	const showNotificationList = () => {
		setNotificationDropdown(true);
		document
			.getElementsByClassName("navbar__settingsNotification")[0]
			.classList.remove("navbar__settingsNotification--disable");
	};
	const handleNotificationSelection = (id) => {
		if (id) {
			// Do related work
		}
		setNotificationDropdown(false);
		document
			.getElementsByClassName("navbar__settingsNotification")[0]
			.classList.add("navbar__settingsNotification--disable");
	};

	const [settingsDropdown, setSettingsDropdown] = useState(false);
	const showSettingList = () => {
		setSettingsDropdown(true);
		document
			.getElementsByClassName("navbar__settingsSetting")[0]
			.classList.remove("navbar__settingsSetting--disable");
	};
	const handleSettingSelection = (id) => {
		if (id) {
			// Do related work
		}
		setSettingsDropdown(false);
		document
			.getElementsByClassName("navbar__settingsSetting")[0]
			.classList.add("navbar__settingsSetting--disable");
	};

	return (
		<div className="navbar">
			<div className="navbar__left">
				<div className="navbar__logo">
					<Avatar src="https://1000logos.net/wp-content/uploads/2016/11/Facebook-logo-500x350.png" />
				</div>

				<div className="navbar__input">
					<Search />
					<input placeholder="Type here" />
				</div>
			</div>

			<div className="navbar__center">
				<Tooltip title="Home" enterDelay={1000}>
					<div
						id="home"
						className="navbar__option navbar__option--active"
						onClick={() => centerOnClickHandler("home")}
					>
						<Home />
					</div>
				</Tooltip>

				<Tooltip title="Teams" enterDelay={1000}>
					<div
						id="teams"
						className="navbar__option "
						onClick={() => centerOnClickHandler("teams")}
					>
						<People />
					</div>
				</Tooltip>

				<Tooltip title="Messenger" enterDelay={1000}>
					<div
						id="messenger"
						className="navbar__option"
						onClick={() => centerOnClickHandler("messenger")}
					>
						<Telegram />
					</div>
				</Tooltip>
			</div>

			<div className="navbar__right">
				<div className="navbar__info">
					<Avatar style={{ height: "25px", width: "25px" }} />
					<p> Username </p>
				</div>

				<div className="navbar__settings">
					<Tooltip title="Notifications" enterDelay={1000}>
						<div
							className="navbar__settingsNotification navbar__settingsNotification--disable"
							onClick={() => showNotificationList()}
						>
							<IconButton>
								{/* <Badge badgeContent={4} color="primary"> */}
									<NotificationsActive
										style={{ height: "20px", width: "20px" }}
									/>
								{/* </Badge> */}
							</IconButton>

							{notificationDropdown && (
								<OutsideAlerter
									outsideHandler={handleNotificationSelection}
									component={<NotificationList />}
								/>
							)}
						</div>
					</Tooltip>

					<Tooltip title="Account" enterDelay={1000}>
						<div
							className="navbar__settingsSetting navbar__settingsSetting--disable"
							onClick={() => showSettingList()}
						>
							<IconButton>
								<ExpandMoreOutlined style={{ height: "20px", width: "20px" }} />
							</IconButton>

							{settingsDropdown && (
								<OutsideAlerter
									outsideHandler={handleSettingSelection}
									component={<SettingsList />}
								/>
							)}
						</div>
					</Tooltip>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
