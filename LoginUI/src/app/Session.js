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
    constructor() {
        super();
        this.state = {
            remainingTime: DEFAULT_SESSION_TIME,
            interval: null
        }
        this.handleClose = () => {
            console.log("modal closed")
        };
        this.endSession = this.endSession.bind(this);
        this.resetSession = this.resetSession.bind(this);
    }

    componentDidUpdate(prevProps) {
        const curAuth = this.props.context.app.authenticated;
        const prevAuth = prevProps.context.app.authenticated;

        console.log(`PrevAuth=${prevAuth}. CurAuth=${curAuth}`);

        // user was recently authenticated
        if (prevAuth === false && curAuth === true) {
            this.setState({
                interval: setInterval(() => {
                    this.setState(state => {
                        console.log(state.remainingTime);
                        if (state.remainingTime <= 0) {
                            if (state.interval) {
                                clearTimeout(state.interval);
                                state.interval = null;
                            }
                            state.remainingTime = DEFAULT_SESSION_TIME;
                            this.props.context.logout();
                        } else {
                            state.remainingTime -= SECOND;
                        }
                        return state;
                    });
                }, SECOND)
            })
        }
        // user was recently un-authenticated
        else if (prevAuth === true && curAuth === false) {
            this.setState(state => {
                clearInterval(state.interval);
                state.interval = null;
                state.remainingTime = DEFAULT_SESSION_TIME;
                return state;
            });
        }
        // no change in auth
        else {
            return;
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
        this.props.context.logout();
    }

    resetSession() {
        this.setState(state => {
            state.remainingTime = DEFAULT_SESSION_TIME;
        });
    }

    render() {
        const isAuth = this.props.context.app.authenticated;
        const isTimeAlmostUp = this.state.remainingTime <= TIME_LEFT_TO_DISPLAY;
        return <div>
            <Dialog onClose={this.handleClose} aria-labelledby="alert-dialog-title" open={isAuth && isTimeAlmostUp}>
                <DialogTitle id="alert-dialog-title">Your session is about to expire due to inactivity.</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">Would you like to remain logged in?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.endSession} color="secondary" variant="contained">Log Me Out</Button>
                    <Button onClick={this.resetSession} color="primary" variant="contained" autoFocus>Stay Logged In</Button>
                </DialogActions>
            </Dialog>
            {this.props.children}
        </div>;
    }
}

const SessionProvider = props => <Configuration.GlobalContext.Consumer>
    {
        context =>
            <TimeoutModal context={context}>
                {props.children}
            </TimeoutModal>
    }
</Configuration.GlobalContext.Consumer>;

export default SessionProvider;