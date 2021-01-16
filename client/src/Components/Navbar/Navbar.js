import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import "./Navbar.css";

import Badge from "@material-ui/core/Badge";
import OutsideAlerter from "../Misc/OutsideAlerter";
import NotificationList from "./NotificationList";
import SettingsList from "./SettingsList";
import { selectUser } from '../ReduxStore/appSlice'
import { Avatar, Tooltip, IconButton } from "@material-ui/core";
import fetchPosts from '../API/fetchPosts'
import socketIOClient from 'socket.io-client'
import {
	Search,
	Home,
	People,
	Telegram,
	NotificationsActive,
	ExpandMoreOutlined,
} from "@material-ui/icons";

const Navbar = () => {

	const dispatch = useDispatch()
	const user = useSelector(selectUser)
	let history = useHistory();
	let location = useLocation();

	useEffect(() => {
		const path = (location.pathname).split('/')
		const id = (path[1] === 'login') ? ('home') : (path[1])

		document.getElementById('home').classList.remove("navbar__option--active");
		document.getElementById('profile').classList.remove("navbar__option--active");
		document.getElementById('messenger').classList.remove("navbar__option--active");
		document.getElementById(id).classList.toggle("navbar__option--active");
		document.getElementById('profile').classList.remove("navbar__option--active");

		// Setting up Sockets

		const socket = socketIOClient('http://localhost:8000')
		socket.on('refresh', data => fetchPosts(dispatch))

		return () => {
			socket.disconnect()
		}

	}, [location])

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
		setSettingsDropdown(false);
		document
			.getElementsByClassName("navbar__settingsSetting")[0]
			.classList.add("navbar__settingsSetting--disable");
	};

	return (
		<div className="navbar">
			<div className="navbar__left">
				<div className="navbar__logo">
					<Avatar src="https://upload.wikimedia.org/wikipedia/commons/a/aa/V-logo.svg" />
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
						className="navbar__option"
						onClick={() => history.push("/home")}
					>
						<Home />
					</div>
				</Tooltip>

				{/* <Tooltip title="Teams" enterDelay={1000}>
					<div
						id="teams"
						className="navbar__option "
						onClick={() => history.push("/teams")}
					>
						<People />
					</div>
				</Tooltip> */}

				<Tooltip title="Messenger" enterDelay={1000}>
					<div
						id="messenger"
						className="navbar__option"
						onClick={() => history.push("/messenger")}
					>
						<Telegram />
					</div>
				</Tooltip>
			</div>

			<div className="navbar__right">
				<div id='profile' className="navbar__info" onClick={() => history.push("/profile")}>
					<Avatar
						src={user.avatarSrc}
						style={{ height: "25px", width: "25px" }}
					/>
					<p> {user.username} </p>
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
									component={
										<SettingsList
											outsideHandler={handleSettingSelection}
										/>
									}
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
