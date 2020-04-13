import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    },
    footer: {
        padding: theme.spacing(2, 1),
        marginTop: 'auto',
        textAlign: 'right',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
}));

export default function Copyright() {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <div>
                <Typography variant="body1">
                    {'The source code and the description of the project can be found  '}
                    <Link color="inherit" href="https://github.com/mike-kob/YummyRecipe">
                        here
                    </Link>{'.'}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {'Copyright © '}
                    <Link color="inherit" href="www.linkedin.com/in/michael-kobelev">
                        Michael Kobelev
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </div>
        </footer>
    );
}
