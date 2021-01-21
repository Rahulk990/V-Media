import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import "./GroupMember.css";

import axios from "../../Misc/axios";
import { Avatar, Tooltip } from "@material-ui/core";

const GroupMember = ({ userId }) => {

    const history = useHistory()
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get("retrieve/user", { params: { userId: userId } })
            .then((res) => setUser(res.data));

    }, []);

    return (
        (user &&
            <Tooltip
                title={user.email}
                enterDelay={1000}
                placement="left"
            >
                <div
                    className="groupMember__listItem"
                    onClick={() => history.replace('/user/' + user.userId)}
                >
                    <Avatar
                        style={{ height: '25px', width: '25px' }}
                        src={user.avatar}
                    />
                    <p>{user.name}</p>
                </div>

            </Tooltip>
        )
    )
};

export default GroupMember;
