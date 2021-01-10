import React from 'react'

import { Dialog, makeStyles } from '@material-ui/core'
const useStyles = makeStyles({
    Paper: {
        borderRadius: 20,
    },
})

const StyledDialog = ({ open, onClose, component }) => {
    const classes = useStyles();
    return (
        <Dialog
            open={open}
            onClose={onClose}
            className={{
                paper: classes.Paper
            }}
        >
            {component}
        </Dialog>
    )
}

export default StyledDialog
