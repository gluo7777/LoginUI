import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as Configuration from '../common/Configuration';

// export const DEFAULT_SESSION_TIME = 15 * 60 * 1000;
// export const TIME_LEFT_TO_DISPLAY = 1 * 60 * 1000;

const DEFAULT_SESSION_TIME = 20000;
const TIME_LEFT_TO_DISPLAY = 15000;
const SECOND = 1000;

// @todo: move timeout logic to state
// only read authenticated value from context
class TimeoutModal extends React.Component {
    static contextType = Configuration.GlobalContext;
    constructor() {
        super();
        this.state = {
            remainingTime: DEFAULT_SESSION_TIME,
            interval: null,
            once: false
        }
        this.handleClose = () => {
            console.log("modal closed")
        };
        this.endSession = this.endSession.bind(this);
        this.resetSession = this.resetSession.bind(this);
    }

    componentDidUpdate() {
        if (this.context.app.authenticated && this.state.interval === null && !this.state.once) {
            this.setState({
                interval: setInterval(() => {
                    this.setState(state => {
                        console.log(state.remainingTime);
                        if (state.remainingTime <= 0) {
                            if (state.interval) {
                                clearTimeout(state.interval);
                                state.interval = null;
                            }
                            state.once = true;
                            state.remainingTime = DEFAULT_SESSION_TIME;
                            this.context.logout();
                        } else {
                            state.remainingTime -= SECOND;
                        }
                        return state;
                    });
                }, SECOND)
            })
        }
    }

    componentWillUnmount() {
        if (this.state.interval) {
            clearTimeout(this.state.interval);
        }
    }

    endSession() {
        this.setState(state => {
            if (state.interval) {
                clearTimeout(state.interval);
                state.interval = null;
            }
            state.remainingTime = DEFAULT_SESSION_TIME;
            return state;
        });
        this.context.logout();
    }

    resetSession() {
        this.setState(state => {
            state.remainingTime = DEFAULT_SESSION_TIME;
        });
    }

    render() {
        return <Dialog onClose={this.handleClose} aria-labelledby="alert-dialog-title" open={this.context.app.authenticated && this.state.remainingTime <= TIME_LEFT_TO_DISPLAY}>
            <DialogTitle id="alert-dialog-title">Your session is about to expire due to inactivity.</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Would you like to remain logged in?
          </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.endSession} color="secondary" variant="contained">
                    Log Me Out
          </Button>
                <Button onClick={this.resetSession} color="primary" variant="contained" autoFocus>
                    Stay Logged In
          </Button>
            </DialogActions>
        </Dialog>
            ;
    }
}

export default TimeoutModal;