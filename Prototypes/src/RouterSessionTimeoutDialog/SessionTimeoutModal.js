import { Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { AppContext } from './AppProvider';

class Timeout extends React.Component {
    static contextType = AppContext;

    constructor() {
        super();
        this.handleClose = () => {
            console.log("modal closed")
        };
    }
    render() {
        return <AppContext.Consumer>
            {context => <Dialog onClose={this.handleClose} aria-labelledby="alert-dialog-title" open={context.state.display < 55}>
                <DialogTitle id="alert-dialog-title">Your session is about to expire due to inactivity.</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Would you like to remain logged in?
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => context.logout()} color="secondary" variant="contained">
                        Log Me Out
          </Button>
                    <Button onClick={() => context.setField('display', 60)} color="primary" variant="contained" autoFocus>
                        Stay Logged In
          </Button>
                </DialogActions>
            </Dialog>}
        </AppContext.Consumer>;
    }
}

export default Timeout;