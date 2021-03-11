import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useHistory,
} from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Messenger from "./Components/Messenger/Messenger";
import Profile from "./Components/Profile/Profile";
import fetchAllData from "./Components/API/fetchAllData";
import { appendUser, popUser, selectRooms, selectUser, setSocket } from "./Components/ReduxStore/appSlice";
import socketIOClient from "socket.io-client";
import fetchPosts from "./Components/API/fetchPosts";
import AboutUs from "./Components/AboutUs/AboutUs";
import fetchRoomData from "./Components/API/fetchRoomData";
import addRoom from "./Components/API/addRoom";
import deleteRoom from "./Components/API/deleteRoom";
import updateRooms from "./Components/API/updateRooms";
import setUsers from "./Components/API/setUsers";

const Main = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const userRooms = useSelector(selectRooms);

	const userRoomsRef = useRef(userRooms);
	useEffect(() => {
		userRoomsRef.current = userRooms;
	}, [userRooms]);

	useEffect(() => {
		if (!user) {
			history.replace("/login");
		} else {
			// Fetch All Data
			fetchAllData(dispatch, user.userId);

			// Setup Sockets
			// const socket = socketIOClient("http://localhost:8000");
			const socket = socketIOClient(
				"https://network-backend-server.herokuapp.com/"
			);

			// Setting Triggers
			socket.on("refresh", () => fetchPosts(dispatch));
			socket.on("New Room Created", (data) =>
				addRoom(dispatch, data, user.userId)
			);
			socket.on("message", (data) =>
				fetchRoomData(dispatch, userRoomsRef.current, data)
			);
			socket.on("users", (data) =>
				updateRooms(dispatch, userRoomsRef.current, data, user.userId)
			);
			socket.on("Room Deleted", (data) => deleteRoom(dispatch, data));

			socket.emit("Joined", user.userId)
			socket.on("Welcome", (data) => setUsers(dispatch, data))
			socket.on("Someone Connected", (data) => dispatch(appendUser(data)))
			socket.on("Someone Disconnected", (data) => dispatch(popUser(data)))

			return () => {
				socket.disconnect();
			};
		}
	}, []);

	return (
		<Router>
			{user && (
				<>
					<Navbar />
					<div className="app__body">
						<Switch>
							<Route exact path="/about">
								<AboutUs />
							</Route>

							<Route exact path="/home">
								<Home />
							</Route>

							<Route path="/user">
								<Profile />
							</Route>

							<Route path="/messenger">
								<Messenger />
							</Route>
						</Switch>
					</div>
				</>
			)}
		</Router>
	);
};

export default Main;
