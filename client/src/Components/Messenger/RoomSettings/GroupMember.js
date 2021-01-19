import { Avatar, Tooltip } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axios from "../../Misc/axios";

import "./GroupMember.css";

const GroupMember = ({ userId }) => {
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
                <div className="groupMember__listItem">
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
