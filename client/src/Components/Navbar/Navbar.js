import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import "./Navbar.css";

import { auth } from "../../firebase";
import Badge from "@material-ui/core/Badge";
import { selectUser } from '../ReduxStore/appSlice'
import { Avatar, Tooltip, IconButton } from "@material-ui/core";
import {
	Search,
	Home,
	Telegram,
	ExitToAppRounded,
	InfoOutlined,
} from "@material-ui/icons";

const Navbar = () => {

	const user = useSelector(selectUser)
	let history = useHistory();
	let location = useLocation();

	useEffect(() => {
		const id = (location.pathname).split('/')[1]
		document.getElementById('home').classList.remove("navbar__option--active");
		document.getElementById('profile').classList.remove("navbar__option--active");
		document.getElementById('messenger').classList.remove("navbar__option--active");
		document.getElementById(id).classList.toggle("navbar__option--active");
		document.getElementById('profile').classList.remove("navbar__option--active");

	}, [location])

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

					<Tooltip
						title="About Us"
						enterDelay={1000}
					>
						<div
							className="navbar__settingsOption"
							onClick={() => history.replace('/profile')}
						>

							<IconButton>
								<InfoOutlined style={{ height: "20px", width: "20px" }} />
							</IconButton>

						</div>
					</Tooltip>

					<Tooltip
						title="Logout"
						enterDelay={1000}
					>
						<div
							className="navbar__settingsOption"
							onClick={() => auth.signOut()}
						>

							<IconButton>
								<ExitToAppRounded style={{ height: "20px", width: "20px" }} />
							</IconButton>

						</div>
					</Tooltip>

				</div>
			
			</div>
		
		</div>
	);
};

export default Navbar;
