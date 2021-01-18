import { Tooltip } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axios from "../../Misc/axios";

import "./GroupMember.css";

const GroupMember = ({ userId }) => {
    const [user, setUser] = useState(null);
    
	useEffect(() => {
		axios
			.get("retrieve/user", { params: { userId: userId } })
            .then((res) => setUser(res.data));
            
	}, []);

	return (
        (user && 
            <Tooltip
             title={user.email}
             enterDelay='1000'
             placement="left"
            >
            <div className="groupmember__list">{user.name}</div>
            </Tooltip>
        )
    )
};

export default GroupMember;
