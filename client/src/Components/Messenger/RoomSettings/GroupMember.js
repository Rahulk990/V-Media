import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import "./GroupMember.css";

import axios from "../../Misc/axios";
import { Avatar, Badge, Tooltip, withStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectActiveUsers } from "../../ReduxStore/appSlice";

const GreenBadge = withStyles(() => ({ badge: { backgroundColor: '#1EE657' } }))(Badge);
const GroupMember = ({ userId }) => {

    const history = useHistory()
    const [user, setUser] = useState(null);
    const activeUsers = useSelector(selectActiveUsers)

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
                    {(activeUsers.includes(user.userId) ? (
                        <GreenBadge variant="dot" overlap="circle">
                            <Avatar
                                style={{ height: '25px', width: '25px' }}
                                src={user.avatar}
                            />
                        </GreenBadge>
                    ) : (
                            <Avatar
                                style={{ height: '25px', width: '25px' }}
                                src={user.avatar}
                            />
                        ))
                    }
                    <p>{user.name}</p>
                </div>

            </Tooltip>
        )
    )
};

export default GroupMember;
