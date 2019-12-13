import { Fade, Grid, Grow } from '@material-ui/core';
import React from 'react';
import { DataTextField, isBlank, PasswordField } from './FormComponents';
import DATA from './data';
import { RegistrationContext } from './Registration';

// add an errorcount from parent
export function AccountForm(props) {
    const { data } = React.useContext(RegistrationContext);
    const { hasError, hasErrorText, setErrorAndText } = props;
    return (<Grid container spacing={1} justify="space-between">
        <Grid item xs={6}>
            {/* TODO: check if username exists */}
            <DataTextField fieldId="username" fieldLabel="Username"
                error={hasError("username")}
                helperText={hasErrorText("username")}
                onChange={value =>
                    setErrorAndText("username",
                        value.match(/^[A-Za-z0-9_]+$/),
                        "Username can only contain letters, numbers, and underscores.")
                }
            />
        </Grid>
        <Grid item xs={12} container spacing={1}>
            <Grid item xs={6}>
                <PasswordField fieldId="password1" fieldLabel="Password"
                    error={hasError("password1")}
                    helperText={hasErrorText("password1")}
                    onChange={value =>
                        setErrorAndText("password1",
                            value.match(/(?=.*\d.*)(?=.*[a-z].*)(?=.*[A-Z].*)(?=.*\W.*)^.{12,36}$/),
                            "Password must be 12-36 characters with at least 1 lowercase, uppercase, number, and special character.")
                    }
                />
            </Grid>
            {!isBlank(data.password1) && !hasError("password1") ?
                <Grow in={true} timeout={1000}>
                    <Grid item xs={6}>
                        <PasswordField fieldId="password2" fieldLabel="Re-enter Password"
                            error={hasError("password2")}
                            helperText={hasErrorText("password2")}
                            onChange={value =>
                                setErrorAndText("password2",
                                    value === data.password1,
                                    "Passwords do not match.")
                            }
                        />
                    </Grid>
                </Grow> : null}
        </Grid>
        <SecurityQuestion
            number={1}
            questionText={data['question1']}
            error={hasError('question1')}
            helperText={hasErrorText('question1')}
            onChange={value =>
                setErrorAndText('question1',
                    value.match(/^.+$/),
                    "Must select a question.")
            }
        />
        <SecurityQuestion
            number={2}
            questionText={data['question2']}
            error={hasError('question2')}
            helperText={hasErrorText('question2')}
            onChange={value => {
                let notBlank = !isBlank(value);
                let isUnique = value !== data['question1'];
                setErrorAndText('question2',
                    notBlank && isUnique,
                    !notBlank ? "Must Select a question" : !isUnique ? "Must select different questions." : "")
            }}
        />
    </Grid>);
}

function SecurityQuestion(props) {
    const { number, questionText, ...rest } = props;
    return <React.Fragment>
        <Grid item xs={12}>
            <DataTextField fieldId={`question${number}`} fieldLabel={`Question ${number}`}
                select SelectProps={{ native: true }}
                {...rest}
            >
                {DATA.securityQuestions.map(question => <option key={question}>{question}</option>)}
            </DataTextField>
        </Grid>
        {!isBlank(questionText) ?
            <Grid item xs={12}>
                <Fade in={true}>
                    <DataTextField fieldId={`answer${number}`} fieldLabel={`Answer to Question ${number}`} />
                </Fade>
            </Grid> : null}
    </React.Fragment>;
}