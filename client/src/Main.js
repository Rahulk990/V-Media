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
import { selectRooms, selectUser } from "./Components/ReduxStore/appSlice";
import socketIOClient from "socket.io-client";
import fetchPosts from "./Components/API/fetchPosts";
import AboutUs from "./Components/AboutUs/AboutUs";
import { updateRoomData } from "./Components/ReduxStore/roomSlice";
import fetchRoomData from "./Components/API/fetchRoomData";

const Main = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const userRooms = useSelector(selectRooms);

	const userRoomsRef = useRef(userRooms)
	useEffect(() => {
		userRoomsRef.current = userRooms
	}, [userRooms])

	useEffect(() => {
		if (!user) {
			history.push("/login");
		} else {
			// Fetch All Data
			fetchAllData(dispatch, user.userId);

			// Setup Sockets
			const socket = socketIOClient("http://localhost:8000");
			// const socket = socketIOClient("https://network-backend-server.herokuapp.com/")

			// Setting Triggers
			socket.on("refresh", (data) => fetchPosts(dispatch));
			socket.on("message", (data) => fetchRoomData(dispatch, userRoomsRef.current, data));

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
