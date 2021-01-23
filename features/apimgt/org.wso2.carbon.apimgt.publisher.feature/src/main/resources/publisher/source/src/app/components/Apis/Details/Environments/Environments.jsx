/*
 * Copyright (c) 2019, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { useContext, useState, useEffect } from 'react';
import { APIContext } from 'AppComponents/Apis/Details/components/ApiContext';
import { useAppContext } from 'AppComponents/Shared/AppContext';
import 'react-tagsinput/react-tagsinput.css';
import { FormattedMessage, useIntl } from 'react-intl';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import moment from 'moment';
// import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import Switch from '@material-ui/core/Switch';
import clsx from 'clsx';
import TableRow from '@material-ui/core/TableRow';
import Alert from 'AppComponents/Shared/Alert';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
// import { isRestricted } from 'AppData/AuthManager';
import { makeStyles } from '@material-ui/core/styles';
import MicroGateway from 'AppComponents/Apis/Details/Environments/MicroGateway';
import Kubernetes from 'AppComponents/Apis/Details/Environments/Kubernetes';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Configurations from 'Config';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import RestoreIcon from '@material-ui/icons/Restore';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import API from 'AppData/api';
import { ConfirmDialog } from 'AppComponents/Shared/index';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    saveButton: {
        marginTop: theme.spacing(3),
    },
    shapeRec: {
        backgroundColor: 'black',
        alignSelf: 'center',
        width: 150,
        height: 3,
    },
    shapeCircaleBack: {
        backgroundColor: '#E2E2E2',
        width: 63,
        height: 63,
    },
    shapeInnerComplete: {
        backgroundColor: '#095677',
        width: 50,
        height: 50,
        marginTop: 6,
        marginLeft: 6.5,
        placeSelf: 'middle',
    },
    shapeInnerInactive: {
        backgroundColor: '#BFBFBF',
        width: 50,
        height: 50,
        marginTop: 6,
        marginLeft: 6,
        placeSelf: 'middle',
    },
    shapeDottedEnd: {
        backgroundColor: '#BFBFBF',
        border: '1px dashed #707070',
        width: 47,
        height: 47,
        marginTop: 7,
        marginLeft: 7,
        placeSelf: 'middle',
    },
    shapeDottedStart: {
        backgroundColor: '#1CB1BF',
        border: '2px dashed #ffffff',
        width: 47,
        height: 47,
        marginTop: 6,
        marginLeft: 6,
        placeSelf: 'middle',
    },
    shapeDottedStart1: {
        backgroundColor: '#1CB1BF',
        width: 50,
        height: 50,
        marginTop: 6,
        marginLeft: 6.5,
        placeSelf: 'middle',
    },
    textShape: {
        marginTop: 5.5,
        marginLeft: 6.5,
    },
    textShape2: {
        marginTop: 8,
        marginLeft: 140,
        fontFamily: 'sans-serif',
    },
    textDelete: {
        marginTop: 8,
        marginLeft: 120,
        fontFamily: 'sans-serif',
        fontSize: 'small',
    },
    textShapeMiddle: {
        marginTop: 18,
    },
    textShape3: {
        color: '#38536c',
        marginLeft: 110,
    },
    textShape7: {
        color: '#38536c',
    },
    primaryEndpoint: {
        color: '#006E9C',
    },
    secondaryEndpoint: {
        color: '#415A85',
    },
    textShape4: {
        marginTop: 55,
    },
    textShape8: {
        marginTop: 80,
    },
    textShape5: {
        marginTop: 10,
        marginLeft: 110,
        marginBottom: 10,
    },
    textShape6: {
        color: '#1B3A57',
    },
    button1: {
        color: '#1B3A57',
        marginLeft: 7,
    },
    button2: {
        color: '#1B3A57',
        marginLeft: 7,
        marginTop: 10,
    },
    shapeRecBack: {
        backgroundColor: 'black',
        alignSelf: 'center',
        width: 40,
        height: 3,
    },
    shapeCircle: {
        borderRadius: '50%',
    },
    shapeCircleBlack: {
        backgroundColor: '#000000',
        alignSelf: 'center',
        width: 15,
        height: 15,
    },
    changeCard: {
        boxShadow: 15,
        borderRadius: '10px',
        borderWidth: '2px',
        borderColor: 'cyan',
    },
    noChangeCard: {
        boxShadow: 15,
        borderRadius: '10px',
    },
    cardHeight: {
        boxShadow: 1,
        height: '90%',
    },
    cardContentHeight: {
        boxShadow: 1,
        height: '50%',
    },
    cardActionHeight: {
        boxShadow: 1,
        height: '25%',
    },
    dialogContent: {
        overflow: 'auto',
        height: '90%',
    },
    textOverlay: {
        overflow: 'hidden',
        maxHeight: '100%',
        maxWidth: '100%',
        cursor: 'pointer',
        '&:hover': { overflow: 'visible' },
    },
    gridOverflow: {
        overflow: 'scroll',
        width: '100%',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 130,
    },
    dialogPaper: {
        width: '800px',
        height: '600px',
    },
    createRevisionDialogStyle: {
        width: '800px',
    },
    sectionTitle: {
        marginBottom: theme.spacing(2),
    },
    deployNewRevButtonStyle: {
        marginRight: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
        maxWidth: '300px',
    },
    timePaddingStyle: {
        marginTop: theme.spacing(1),
    },
    labelSpace: {
        paddingLeft: theme.spacing(1),
    },
    labelSpacingDown: {
        marginBottom: theme.spacing(2),
    },
}));

/**
 * Renders an Environments list
 * @class Environments
 * @extends {React.Component}
 */
export default function Environments() {
    const classes = useStyles();
    const intl = useIntl();
    const { api, updateAPI } = useContext(APIContext);
    const { settings } = useAppContext();
    let revisionCount;
    if (Configurations.app.revisionCount) {
        revisionCount = Configurations.app.revisionCount;
    } else {
        revisionCount = 5;
    }
    // const [gatewayEnvironments, setGatewayEnvironments] = useState([...api.gatewayEnvironments]);
    const [selectedMgLabel, setSelectedMgLabel] = useState([...api.labels]);
    // const [isUpdating, setUpdating] = useState(false);
    const [selectedDeployments, setSelectedDeployments] = useState([...api.deploymentEnvironments]);

    const restApi = new API();
    // const isdeploy = true;
    const [allDeployments, setAllDeployments] = useState([]);
    const [allRevisions, setRevisions] = useState(null);
    const [allEnvRevision, setEnvRevision] = useState(null);
    const [selectedRevision, setRevision] = useState(null);
    const [extraRevisionToDelete, setExtraRevisionToDelete] = useState(null);
    const [description, setDescription] = useState('');
    const [mgLabels, setMgLabels] = useState([]);
    const [SelectedEnvironment, setSelectedEnvironment] = useState([]);
    const [open, setOpen] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [revisionToDelete, setRevisionToDelete] = useState([]);
    const [confirmRestoreOpen, setConfirmRestoreOpen] = useState(false);
    const [revisionToRestore, setRevisionToRestore] = useState([]);
    const [openDeployPopup, setOpenDeployPopup] = useState(false);
    const [lastRevisionCount, setLastRevisionCount] = useState(0);

    const extractLastRevisionNumber = (list) => {
        if (list[list.length - 1]) {
            const lastRevisionName = list[list.length - 1].displayName;
            const splitList = lastRevisionName.split(' ');
            setLastRevisionCount(splitList[1]);
        } else {
            setLastRevisionCount(0);
        }
    };

    useEffect(() => {
        restApi.getDeployments()
            .then((result) => {
                setAllDeployments(result.body.list);
            });
        restApi.microgatewayLabelsGet()
            .then((result) => {
                setMgLabels(result.body.list);
            });
        restApi.getRevisions(api.id).then((result) => {
            setRevisions(result.body.list);
            setLastRevisionCount(result.body.count);
            extractLastRevisionNumber(result.body.list);
        });

        restApi.getRevisionsWithEnv(api.isRevision ? api.revisionedApiId : api.id).then((result) => {
            setEnvRevision(result.body.list);
        });
        // restApi.getRevisionsEnv(api.id).then((result) => {
        //     setEnvRevision(result.body.list);
        // });
    }, []);

    const toggleOpenConfirmDelete = (revisionName, revisionId) => {
        setRevisionToDelete([revisionName, revisionId]);
        setConfirmDeleteOpen(!confirmDeleteOpen);
    };

    const toggleOpenConfirmRestore = (revisionName, revisionId) => {
        setRevisionToRestore([revisionName, revisionId]);
        setConfirmRestoreOpen(!confirmRestoreOpen);
    };

    const toggleDeployRevisionPopup = () => {
        setOpenDeployPopup(!openDeployPopup);
    };

    const handleCloseDeployPopup = () => {
        setOpenDeployPopup(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDeleteSelect = (event) => {
        setExtraRevisionToDelete(event.target.value);
    };

    const handleSelect = (event) => {
        setRevision(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        if (event.target.checked) {
            setSelectedEnvironment([...SelectedEnvironment, event.target.value]);
        } else {
            setSelectedEnvironment(
                SelectedEnvironment.filter((env) => env !== event.target.value),
            );
        }
        if (event.target.name === 'description') {
            setDescription(event.target.value);
        }
    };

    /**
     * Handles deleting a revision
     * @param {Object} revisionId the revision Id
     * @returns {Object} promised delete
     */
    function deleteRevision(revisionId) {
        const promisedDelete = restApi.deleteRevision(api.id, revisionId)
            .then(() => {
                Alert.info(intl.formatMessage({
                    defaultMessage: 'Revision Deleted Successfully',
                    id: 'Apis.Details.Environments.Environments.revision.delete.success',
                }));
            })
            .catch((error) => {
                if (error.response) {
                    Alert.error(error.response.body.description);
                } else {
                    Alert.error(intl.formatMessage({
                        defaultMessage: 'Something went wrong while deleting the revision',
                        id: 'Apis.Details.Environments.Environments.revision.delete.error',
                    }));
                }
            }).finally(() => {
                restApi.getRevisions(api.id).then((result) => {
                    setRevisions(result.body.list);
                    extractLastRevisionNumber(result.body.list);
                });
            });
        return promisedDelete;
    }

    /**
     * Handles creating a new revision
     * @param {Object} body the request body
     * @returns {Object} promised create
     */
    function createRevision(body) {
        const promisedCreate = restApi.createRevision(api.id, body)
            .then(() => {
                Alert.info('Revision Created Successfully');
            })
            .catch((error) => {
                if (error.response) {
                    Alert.error(error.response.body.description);
                } else {
                    Alert.error('Something went wrong while creating the revision');
                }
                console.error(error);
            }).finally(() => {
                restApi.getRevisions(api.id).then((result) => {
                    setRevisions(result.body.list);
                    extractLastRevisionNumber(result.body.list);
                });
            });
        return promisedCreate;
    }

    /**
      * Handles adding a new revision
      * @memberof Revisions
      */
    function handleClickAddRevision() {
        const body = {
            description,
        };
        if (extraRevisionToDelete) {
            deleteRevision(extraRevisionToDelete)
                .then(() => {
                    createRevision(body);
                }).finally(() => setExtraRevisionToDelete(null));
        } else {
            createRevision(body);
        }
        setOpen(false);
        setDescription('');
    }

    const runActionDelete = (confirm, revisionId) => {
        if (confirm) {
            deleteRevision(revisionId);
        }
        setConfirmDeleteOpen(!confirmDeleteOpen);
        setRevisionToDelete([]);
    };

    /**
      * Handles restore revision
      * @memberof Revisions
      */
    function restoreRevision(revisionId) {
        restApi.restoreRevision(api.id, revisionId)
            .then(() => {
                Alert.info('Revision Restored Successfully');
            })
            .catch((error) => {
                if (error.response) {
                    Alert.error(error.response.body.description);
                } else {
                    Alert.error('Something went wrong while restoring the revision');
                }
                console.error(error);
            }).finally(() => {
                updateAPI();
            });
    }

    const runActionRestore = (confirm, revisionId) => {
        if (confirm) {
            restoreRevision(revisionId);
        }
        setConfirmRestoreOpen(!confirmRestoreOpen);
        setRevisionToRestore([]);
    };

    /**
      * Handles undeploy a revision
      * @memberof Revisions
      */
    function undeployRevision(revisionId, envName) {
        const body = [{
            name: envName,
            displayOnDevportal: false,
        }];
        restApi.undeployRevision(api.id, revisionId, body)
            .then(() => {
                Alert.info('Revision Undeployed Successfully');
            })
            .catch((error) => {
                if (error.response) {
                    Alert.error(error.response.body.description);
                } else {
                    Alert.error('Something went wrong while undeploying the revision');
                }
                console.error(error);
            }).finally(() => {
                updateAPI();
            });
    }

    /**
      * Handles deploy a revision
      * @memberof Revisions
      */
    function deployRevision(revisionId, envName) {
        const body = [{
            name: envName,
            displayOnDevportal: true,
        }];
        restApi.deployRevision(api.id, revisionId, body)
            .then(() => {
                Alert.info('Deploy revision Successfully');
            })
            .catch((error) => {
                if (error.response) {
                    Alert.error(error.response.body.description);
                } else {
                    Alert.error('Something went wrong while deploy the revision');
                }
                console.error(error);
            }).finally(() => {
                updateAPI();
            });
    }

    /**
      * Handles adding a new revision and deploy
      * @memberof Revisions
      */
    function createDeployRevision(envList) {
        const body = {
            description,
        };
        restApi.createRevision(api.id, body)
            .then((response) => {
                Alert.info('Revision Created Successfully');
                const body1 = [];
                for (let i = 0; i < envList.length; i++) {
                    body1.push({
                        name: envList[i],
                        displayOnDevportal: true,
                    });
                }
                restApi.deployRevision(api.id, response.body.id, body1)
                    .then(() => {
                        Alert.info('Revision Deployed Successfully');
                    })
                    .catch((error) => {
                        if (error.response) {
                            Alert.error(error.response.body.description);
                        } else {
                            Alert.error('Something went wrong while deploying the revision');
                        }
                        console.error(error);
                    });
            })
            .catch((error) => {
                if (error.response) {
                    Alert.error(error.response.body.description);
                } else {
                    Alert.error('Something went wrong while creating the revision');
                }
                console.error(error);
            })
            .finally(() => {
                updateAPI();
            });
        setOpen(false);
    }

    /**
     * Handles creating and deploying a new revision
     * @param {Object} envList the environment list
     * @param {Object} length the length of the list
     */
    function handleCreateAndDeployRevision(envList) {
        if (extraRevisionToDelete) {
            deleteRevision(extraRevisionToDelete)
                .then(() => {
                    createDeployRevision(envList);
                }).finally(() => setExtraRevisionToDelete(null));
        } else {
            createDeployRevision(envList);
        }
    }

    const confirmDeleteDialog = (
        <ConfirmDialog
            key='key-dialog'
            labelCancel={(
                <FormattedMessage
                    id='Apis.Details.Environments.Environments.revision.delete.cancel'
                    defaultMessage='Cancel'
                />
            )}
            title={(
                <FormattedMessage
                    id='Apis.Details.Environments.Environments.revision.delete.confirm.title'
                    defaultMessage='Confirm Delete'
                />
            )}
            message={(
                <FormattedMessage
                    id='Apis.Details.Environments.Environments.revision.delete.confirm.message'
                    defaultMessage='Are you sure you want to delete {revision} ?'
                    values={{ revision: revisionToDelete[0] }}
                />
            )}
            labelOk={(
                <FormattedMessage
                    id='Apis.Details.Environments.Environments.revision.delete.confirm.ok'
                    defaultMessage='Yes'
                />
            )}
            callback={(e) => runActionDelete(e, revisionToDelete[1])}
            open={confirmDeleteOpen}
        />
    );

    const confirmRestoreDialog = (
        <ConfirmDialog
            key='key-dialog-restore'
            labelCancel={(
                <FormattedMessage
                    id='Apis.Details.Environments.Environments.revision.restore.cancel'
                    defaultMessage='Cancel'
                />
            )}
            title={(
                <FormattedMessage
                    id='Apis.Details.Environments.Environments.revision.restore.confirm.title'
                    defaultMessage='Confirm Restore'
                />
            )}
            message={(
                <FormattedMessage
                    id='Apis.Details.Environments.Environments.revision.restore.confirm.message'
                    defaultMessage='Are you sure you want to restore {revision} ?'
                    values={{ revision: revisionToRestore[0] }}
                />
            )}
            labelOk={(
                <FormattedMessage
                    id='Apis.Details.Environments.Environments.revision.restore.confirm.ok'
                    defaultMessage='Yes'
                />
            )}
            callback={(e) => runActionRestore(e, revisionToRestore[1])}
            open={confirmRestoreOpen}
        />
    );

    let item1;
    /**
     * Returns modified item1
     * @param {*} revDescription The description of the revision
     * @returns {Object} Returns the item1
     */
    function ReturnItem1({ revDescription, revName, revCreatedTime }) {
        const [anchorEl, setAnchorEl] = useState(null);

        const handlePopoverOpen = (event) => {
            setAnchorEl(event.currentTarget);
        };

        const handlePopoverClose = () => {
            setAnchorEl(null);
        };

        const openPopover = Boolean(anchorEl);
        item1 = (
            <Grid
                container
                direction='container'
            >
                <Grid item className={classes.shapeRec} />
                <Grid item className={clsx(classes.shapeCircaleBack, classes.shapeCircle)}>
                    <Grid
                        className={clsx(classes.shapeInnerComplete, classes.shapeCircle)}
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}
                    />
                    <Popover
                        id='mouse-over-popover'
                        className={classes.popover}
                        classes={{
                            paper: classes.paper,

                        }}
                        open={openPopover}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        onClose={handlePopoverClose}
                        disableRestoreFocus
                    >
                        <div>
                            <Typography variant='body1'>
                                <b>{revName}</b>
                            </Typography>
                            <Typography variant='body2'>
                                {revDescription}
                            </Typography>
                            <div className={classes.timePaddingStyle}>
                                <Typography variant='caption'>
                                    <span>{moment(revCreatedTime).fromNow()}</span>
                                </Typography>
                            </div>
                        </div>
                    </Popover>
                </Grid>
                <Grid item className={classes.shapeRecBack} />
            </Grid>
        );
        return item1;
    }
    const item2 = (
        <Grid
            container
            direction='container'
        >
            <Grid item className={classes.shapeRec} />
            <Grid item className={clsx(classes.shapeCircaleBack, classes.shapeCircle)}>
                <Grid className={clsx(classes.shapeInnerInactive, classes.shapeCircle)} />
            </Grid>
            <Grid item className={classes.shapeRecBack} />
        </Grid>
    );
    const item3 = (
        <Grid
            container
            direction='container'
        >
            <Grid item className={classes.shapeRec} />
            <Grid item className={clsx(classes.shapeCircaleBack, classes.shapeCircle)}>
                <Grid className={clsx(classes.shapeDottedEnd, classes.shapeCircle)} />
            </Grid>
        </Grid>
    );
    const item4 = (
        <Grid
            container
            direction='container'
        >
            <Grid item className={classes.shapeRec} />
            <Grid item className={clsx(classes.shapeCircaleBack, classes.shapeCircle)}>
                <Grid className={clsx(classes.shapeDottedStart, classes.shapeCircle)} />
            </Grid>
            <Grid item className={classes.shapeRecBack} />
        </Grid>
    );
    const item5 = (
        <Grid
            container
            direction='container'
        >
            <Grid item className={classes.shapeRec} />
            <Grid item className={clsx(classes.shapeCircaleBack, classes.shapeCircle)}>
                <Grid className={clsx(classes.shapeDottedStart, classes.shapeCircle)} />
            </Grid>

        </Grid>
    );
    let item6;
    /**
     * Returns modified item6
     * @param {*} revDescription The description of the revision
     * @returns {Object} Returns the item6
     */
    function ReturnItem6({ revDescription, revName, revCreatedTime }) {
        const [anchorEl1, setAnchorEl1] = useState(null);

        const handlePopoverOpen = (event) => {
            setAnchorEl1(event.currentTarget);
        };

        const handlePopoverClose = () => {
            setAnchorEl1(null);
        };

        const openPopover = Boolean(anchorEl1);
        item6 = (
            <Grid
                container
                direction='container'
            >
                <Grid item className={classes.shapeRec} />
                <Grid item className={clsx(classes.shapeCircaleBack, classes.shapeCircle)}>
                    <Grid
                        className={clsx(classes.shapeDottedStart1, classes.shapeCircle)}
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}
                    />
                    <Popover
                        id='mouse-over-popover'
                        className={classes.popover}
                        classes={{
                            paper: classes.paper,
                        }}
                        open={openPopover}
                        anchorEl={anchorEl1}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        onClose={handlePopoverClose}
                        disableRestoreFocus
                    >
                        <div>
                            <Typography variant='body1'>
                                <b>{revName}</b>
                            </Typography>
                            <Typography variant='body2'>
                                {revDescription}
                            </Typography>
                            <div className={classes.timePaddingStyle}>
                                <Typography variant='caption' className={classes.timePaddingStyle}>
                                    <span>{moment(revCreatedTime).fromNow()}</span>
                                </Typography>
                            </div>
                        </div>
                    </Popover>
                </Grid>
                <Grid item className={classes.shapeRecBack} />
            </Grid>
        );
        return item6;
    }


    const items = [];
    if (!api.isRevision) {
        if (allRevisions && allRevisions.length !== 0) {
            items.push(
                <Grid item className={clsx(classes.shapeCircleBlack, classes.shapeCircle)} />,
            );
            for (let revision = 0; revision < (allRevisions.length); revision++) {
                if (revision % 2 === 0) {
                    items.push(
                        <Grid item>
                            <Grid className={classes.textShape4} />
                            <ReturnItem1
                                revDescription={allRevisions[revision].description}
                                revName={allRevisions[revision].displayName}
                                revCreatedTime={allRevisions[revision].createdTime}
                            />
                            {item1}
                            <Grid className={classes.textShape2}>
                                {allRevisions[revision].displayName}
                            </Grid>
                            <Grid>
                                <Button
                                    className={classes.textShape3}
                                    onClick={() => toggleOpenConfirmRestore(
                                        allRevisions[revision].displayName, allRevisions[revision].id,
                                    )}
                                    size='small'
                                    type='submit'
                                    startIcon={<RestoreIcon />}
                                >
                                    <FormattedMessage
                                        id='Apis.Details.Environments.Environments.revision.restore'
                                        defaultMessage='Restore'
                                    />
                                </Button>
                                <Button
                                    className={classes.textShape7}
                                    onClick={() => toggleOpenConfirmDelete(
                                        allRevisions[revision].displayName, allRevisions[revision].id,
                                    )}
                                    size='small'
                                    color='#38536c'
                                    startIcon={<DeleteForeverIcon />}
                                >
                                    <FormattedMessage
                                        id='Apis.Details.Environments.Environments.revision.delete'
                                        defaultMessage='Delete'
                                    />
                                </Button>
                            </Grid>
                        </Grid>,
                    );
                } else {
                    items.push(
                        <Grid item>
                            <Grid className={classes.textShape5} />
                            <Grid className={classes.textShape2}>
                                {allRevisions[revision].displayName}
                            </Grid>
                            <Grid>
                                <Button
                                    className={classes.textShape3}
                                    onClick={() => toggleOpenConfirmRestore(
                                        allRevisions[revision].displayName, allRevisions[revision].id,
                                    )}
                                    size='small'
                                    type='submit'
                                    startIcon={<RestoreIcon />}
                                >
                                    <FormattedMessage
                                        id='Apis.Details.Environments.Environments.revision.restore'
                                        defaultMessage='Restore'
                                    />
                                </Button>
                                <Button
                                    className={classes.textShape7}
                                    onClick={() => toggleOpenConfirmDelete(
                                        allRevisions[revision].displayName, allRevisions[revision].id,
                                    )}
                                    size='small'
                                    color='#38536c'
                                    startIcon={<DeleteForeverIcon />}
                                >
                                    <FormattedMessage
                                        id='Apis.Details.Environments.Environments.revision.delete'
                                        defaultMessage='Delete'
                                    />
                                </Button>
                            </Grid>
                            <ReturnItem6
                                revDescription={allRevisions[revision].description}
                                revName={allRevisions[revision].displayName}
                                revCreatedTime={allRevisions[revision].createdTime}
                            />
                            {item6}
                        </Grid>,
                    );
                }
            }
            if (allRevisions.length !== revisionCount) {
                items.push(
                    <Grid item>
                        <Grid className={classes.textShape5}>
                            <Button
                                type='submit'
                                size='small'
                                onClick={handleClickOpen}
                                className={classes.textShape6}
                                variant='outlined'
                            >
                                <FormattedMessage
                                    id='Apis.Details.Environments.Environments.Deployments.create.new.revision'
                                    defaultMessage='Create a new revision'
                                />
                            </Button>
                        </Grid>
                        <Grid className={classes.textShapeMiddle}>
                            {item4}
                        </Grid>
                    </Grid>,
                );
            }
            if (allRevisions.length === revisionCount) {
                items.push(
                    <Grid item>
                        <Grid className={classes.textShape5}>
                            <Button
                                type='submit'
                                size='small'
                                onClick={handleClickOpen}
                                className={classes.textShape6}
                                variant='outlined'
                            >
                                <FormattedMessage
                                    id='Apis.Details.Environments.Environments.Deployments.create.last.revision'
                                    defaultMessage='Create a new revision'
                                />
                            </Button>
                        </Grid>
                        <Grid className={classes.textShapeMiddle}>
                            {item5}
                        </Grid>
                    </Grid>,
                );
            }
            for (let unassignRevision = 0; unassignRevision
                < (revisionCount - (allRevisions.length + 1)); unassignRevision++) {
                items.push(
                    <Grid item>
                        <Grid className={classes.textShape4} />
                        {item2}
                    </Grid>,
                );
            }
            if (revisionCount !== allRevisions.length) {
                items.push(
                    <Grid item>
                        <Grid className={classes.textShape4} />
                        {item3}
                    </Grid>,
                );
            }
        }

        if (allRevisions && allRevisions.length === 0) {
            items.push(
                <div>
                    <Grid className={classes.textShape8} />
                    <Grid item className={clsx(classes.shapeCircleBlack, classes.shapeCircle)} />
                </div>,
            );
            items.push(
                <Grid item>
                    <Grid className={classes.textShape5}>
                        <Button
                            type='submit'
                            size='small'
                            onClick={handleClickOpen}
                            className={classes.textShape6}
                            variant='outlined'
                        >
                            <FormattedMessage
                                id='Apis.Details.Environments.Environments.Deployments.create.first.revision'
                                defaultMessage='Create a new revision'
                            />
                        </Button>
                    </Grid>
                    <Grid className={classes.textShapeMiddle}>
                        {item4}
                    </Grid>
                </Grid>,
            );
            for (let revision = 0; revision < (revisionCount - (allRevisions.length + 1)); revision++) {
                items.push(
                    <Grid item>
                        <Grid className={classes.textShape4} />
                        {item2}
                    </Grid>,
                );
            }
            items.push(
                <Grid item>
                    <Grid className={classes.textShape4} />
                    {item3}
                </Grid>,
            );
        }
    }
    return (
        <>
            <Grid container>
                <Button
                    onClick={toggleDeployRevisionPopup}
                    variant='contained'
                    color='primary'
                    size='large'
                    className={classes.deployNewRevButtonStyle}
                >
                    <FormattedMessage
                        id='Apis.Details.Environments.Environments.deploy.new.revision'
                        defaultMessage='Deploy New Revision'
                    />
                </Button>
            </Grid>
            <Grid container>
                <Dialog
                    open={openDeployPopup}
                    onClose={handleCloseDeployPopup}
                    aria-labelledby='form-dialog-title'
                    classes={{ paper: classes.dialogPaper }}
                >
                    <DialogTitle id='form-dialog-title' variant='h2'>
                        <FormattedMessage
                            id='Apis.Details.Environments.Environments.deploy.new.revision.heading'
                            defaultMessage='Deploy New Revision'
                        />
                    </DialogTitle>
                    <DialogContent className={classes.dialogContent}>
                        <Typography variant='body1' className={classes.labelSpacingDown}>
                            <b>
                                <FormattedMessage
                                    id='Apis.Details.Environments.Environments.new.revision.name.heading1'
                                    defaultMessage='Revision Name:'
                                />
                            </b>
                            <span className={classes.labelSpace}>
                                {'REVISION '}
                                {parseInt(lastRevisionCount, 0) + 1}
                            </span>
                        </Typography>
                        { allRevisions && allRevisions.length === revisionCount && (
                            <Box mb={3}>
                                <TextField
                                    fullWidth
                                    id='revision-to-delete-selector'
                                    select
                                    label={(
                                        <FormattedMessage
                                            id='Apis.Details.Environments.Environments.select.rev.delete'
                                            defaultMessage='Revision to delete'
                                        />
                                    )}
                                    name='extraRevisionToDelete'
                                    onChange={handleDeleteSelect}
                                    helperText={(
                                        <FormattedMessage
                                            id='Apis.Details.Environments.Environments.select.rev.helper'
                                            defaultMessage={'Please select a revision to delete as the '
                                            + 'maximum allowed number of revisions, {count} has reached'}
                                            values={{ count: revisionCount }}
                                        />
                                    )}
                                    margin='normal'
                                    variant='outlined'
                                >
                                    {allRevisions && allRevisions.filter(
                                        (o1) => o1.deploymentInfo.length === 0,
                                    ).map(
                                        (revision) => (
                                            <MenuItem value={revision.id}>
                                                {revision.displayName}
                                            </MenuItem>
                                        ),
                                    )}
                                </TextField>
                            </Box>
                        )}
                        <Box mb={3}>
                            <TextField
                                autoFocus
                                name='description'
                                margin='dense'
                                variant='outlined'
                                label='Description'
                                value={description}
                                helperText={(
                                    <FormattedMessage
                                        id='Apis.Details.Environments.Environments.revision.description.deploy'
                                        defaultMessage='Brief description of the new revision'
                                    />
                                )}
                                fullWidth
                                multiline
                                rows={3}
                                rowsMax={4}
                                onChange={handleChange}
                            />
                        </Box>
                        <Box mt={2}>
                            <Typography variant='h6' align='left' className={classes.sectionTitle}>
                                <FormattedMessage
                                    id='Apis.Details.Environments.Environments.api.gateways.heading'
                                    defaultMessage='API Gateways'
                                />
                            </Typography>
                            <Grid
                                container
                                spacing={3}
                            >
                                {settings.environment.map((row) => (
                                    <Grid item xs={4}>
                                        <Card
                                            className={clsx(SelectedEnvironment
                                                && SelectedEnvironment.includes(row.name)
                                                ? (classes.changeCard) : (classes.noChangeCard), classes.cardHeight)}
                                            variant='outlined'
                                        >
                                            <Box height='80%'>
                                                <CardContent className={classes.cardContentHeight}>
                                                    <Grid
                                                        container
                                                        direction='column'
                                                        spacing={2}
                                                    >
                                                        <Grid item>
                                                            <Typography variant='subtitle2'>
                                                                {row.name}
                                                            </Typography>
                                                            <Typography
                                                                variant='body2'
                                                                color='textSecondary'
                                                                gutterBottom
                                                            >
                                                                {row.type}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            {allEnvRevision
                                                                && allEnvRevision.filter(
                                                                    (o1) => {
                                                                        if (o1.deploymentInfo.filter(
                                                                            (o2) => o2.name === row.name,
                                                                        ).length > 0) {
                                                                            return o1;
                                                                        }
                                                                        return null;
                                                                    },
                                                                ).length !== 0 ? (
                                                                    allEnvRevision && allEnvRevision.filter(
                                                                        (o1) => {
                                                                            if (o1.deploymentInfo.filter(
                                                                                (o2) => o2.name === row.name,
                                                                            ).length > 0) {
                                                                                return o1;
                                                                            }
                                                                            return null;
                                                                        },
                                                                    ).map((o3) => (
                                                                        <div>
                                                                            <Chip
                                                                                label={o3.displayName}
                                                                                style={{ backgroundColor: '#15B8CF' }}
                                                                            />
                                                                        </div>
                                                                    ))) : (
                                                                // eslint-disable-next-line react/jsx-indent
                                                                    <div />
                                                                )}
                                                        </Grid>
                                                        <Grid item />
                                                    </Grid>
                                                </CardContent>
                                            </Box>
                                            <Box height='20%'>
                                                <CardActions className={classes.cardActionHeight}>
                                                    <Checkbox
                                                        id={row.name.split(' ').join('')}
                                                        value={row.name}
                                                        checked={SelectedEnvironment.includes(row.name)}
                                                        onChange={handleChange}
                                                        color='primary'
                                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                    />
                                                </CardActions>
                                            </Box>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                        {mgLabels.length > 0 && mgLabels.map((row) => (
                            <Box mt={2}>
                                <Typography variant='h6' align='left' className={classes.sectionTitle}>
                                    <FormattedMessage
                                        id='Apis.Details.Environments.Environments.gateway.labels.heading'
                                        defaultMessage='Gateway Labels'
                                    />
                                </Typography>
                                <Grid
                                    container
                                    spacing={3}
                                >
                                    <Grid item xs={4}>
                                        <Card
                                            className={clsx(SelectedEnvironment
                                                && SelectedEnvironment.includes(row.name)
                                                ? (classes.changeCard) : (classes.noChangeCard), classes.cardHeight)}
                                            variant='outlined'
                                        >
                                            <Box height='75%'>
                                                <CardContent className={classes.cardContentHeight}>
                                                    <Grid
                                                        container
                                                        direction='column'
                                                        spacing={2}
                                                    >
                                                        <Grid item>
                                                            <Typography variant='subtitle2'>
                                                                {row.name}
                                                            </Typography>
                                                            <Typography
                                                                variant='body2'
                                                                color='textSecondary'
                                                                gutterBottom
                                                            >
                                                                {row.type}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            {allEnvRevision && allEnvRevision.filter(
                                                                (o1) => {
                                                                    if (o1.deploymentInfo.filter(
                                                                        (o2) => o2.name === row.name,
                                                                    ).length > 0) {
                                                                        return o1;
                                                                    }
                                                                    return null;
                                                                },
                                                            ).length !== 0 ? (
                                                                    allEnvRevision && allEnvRevision.filter(
                                                                        (o1) => {
                                                                            if (o1.deploymentInfo.filter(
                                                                                (o2) => o2.name === row.name,
                                                                            ).length > 0) {
                                                                                return o1;
                                                                            }
                                                                            return null;
                                                                        },
                                                                    ).map((o3) => (
                                                                        <div>
                                                                            <Chip
                                                                                label={o3.displayName}
                                                                                style={{ backgroundColor: '#15B8CF' }}
                                                                            />
                                                                        </div>
                                                                    ))) : (
                                                                    // eslint-disable-next-line react/jsx-indent
                                                                    <div />
                                                                )}
                                                        </Grid>
                                                        <Grid item />
                                                    </Grid>
                                                </CardContent>
                                            </Box>
                                            <Box height='25%'>
                                                <CardActions className={classes.cardActionHeight}>
                                                    <Checkbox
                                                        id={row.name.split(' ').join('')}
                                                        value={row.name}
                                                        checked={SelectedEnvironment.includes(row.name)}
                                                        onChange={handleChange}
                                                        color='primary'
                                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                    />
                                                </CardActions>
                                            </Box>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Box>
                        ))}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDeployPopup}>
                            <FormattedMessage
                                id='Apis.Details.Environments.Environments.deploy.cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button
                            type='submit'
                            variant='contained'
                            onClick={
                                () => handleCreateAndDeployRevision(SelectedEnvironment)
                            }
                            color='primary'
                            disabled={SelectedEnvironment.length === 0
                                || (allRevisions.length === revisionCount && !extraRevisionToDelete)}
                        >
                            <FormattedMessage
                                id='Apis.Details.Environments.Environments.deploy.deploy'
                                defaultMessage='Deploy'
                            />
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
            <Grid
                container
                direction='row'
                alignItems='flex-start'
                spacing={1}
            >
                <Grid item>
                    <Typography variant='h6' gutterBottom>
                        <FormattedMessage
                            id='Apis.Details.Environments.Environments.Deployments'
                            defaultMessage='Revisions'
                        />
                    </Typography>
                </Grid>
                <Grid item>
                    <Tooltip
                        title={(
                            <FormattedMessage
                                id='Apis.Details.Environments.Environments.Create.Revision.Deploy'
                                defaultMessage='Create new revision and deploy'
                            />
                        )}
                        placement='top-end'
                        aria-label='New Deployment'
                    >
                        <IconButton size='small' aria-label='delete'>
                            <HelpOutlineIcon fontSize='small' />
                        </IconButton>
                    </Tooltip>
                </Grid>

            </Grid>
            <Box ml={6} lassName={classes.gridOverflow}>
                <Grid
                    container
                    direction='row'
                    alignItems='flex-start'
                    xs={12}
                >
                    {items}
                    {confirmDeleteDialog}
                    {confirmRestoreDialog}
                </Grid>
            </Box>
            <Grid container>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby='form-dialog-title'
                    classes={{ paper: classes.createRevisionDialogStyle }}
                >
                    <DialogTitle id='form-dialog-title' variant='h2'>
                        <FormattedMessage
                            id='Apis.Details.Environments.Environments.revision.create.heading'
                            defaultMessage='Create Revision'
                        />
                    </DialogTitle>
                    <DialogContent className={classes.dialogContent}>
                        <Typography variant='body1' className={classes.labelSpacingDown}>
                            <b>
                                <FormattedMessage
                                    id='Apis.Details.Environments.Environments.new.revision.name.heading2'
                                    defaultMessage='Revision Name:'
                                />
                            </b>
                            <span className={classes.labelSpace}>
                                {'REVISION '}
                                {parseInt(lastRevisionCount, 0) + 1}
                            </span>
                        </Typography>
                        { allRevisions && allRevisions.length === revisionCount && (
                            <Box mb={3}>
                                <TextField
                                    fullWidth
                                    id='revision-to-delete-selector'
                                    select
                                    label={(
                                        <FormattedMessage
                                            id='Apis.Details.Environments.Environments.select.rev.delete'
                                            defaultMessage='Revision to delete'
                                        />
                                    )}
                                    name='extraRevisionToDelete'
                                    onChange={handleDeleteSelect}
                                    helperText={(
                                        <FormattedMessage
                                            id='Apis.Details.Environments.Environments.select.rev.helper'
                                            defaultMessage={'Please select a revision to delete as the '
                                            + 'maximum allowed number of revisions, {count} has reached'}
                                            values={{ count: revisionCount }}
                                        />
                                    )}
                                    margin='normal'
                                    variant='outlined'
                                >
                                    {allRevisions && allRevisions.filter(
                                        (o1) => o1.deploymentInfo.length === 0,
                                    ).map(
                                        (revision) => (
                                            <MenuItem value={revision.id}>
                                                {revision.displayName}
                                            </MenuItem>
                                        ),
                                    )}
                                </TextField>
                            </Box>
                        )}
                        <Box mb={3}>
                            <TextField
                                autoFocus
                                name='description'
                                margin='dense'
                                variant='outlined'
                                label='Description'
                                value={description}
                                helperText={(
                                    <FormattedMessage
                                        id='Apis.Details.Environments.Environments.revision.description.create'
                                        defaultMessage='Brief description of the new revision'
                                    />
                                )}
                                fullWidth
                                multiline
                                rows={3}
                                rowsMax={4}
                                onChange={handleChange}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>
                            <FormattedMessage
                                id='Apis.Details.Environments.Environments.create.cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button
                            onClick={handleClickAddRevision}
                            type='submit'
                            variant='contained'
                            color='primary'
                        >
                            <FormattedMessage
                                id='Apis.Details.Environments.Environments.create.create'
                                defaultMessage='Create'
                            />
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
            <Box mx='auto' mt={5}>
                <Typography variant='h6' className={classes.sectionTitle}>
                    <FormattedMessage
                        id='Apis.Details.Environments.Environments.APIGateways'
                        defaultMessage='API Gateways'
                    />
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='left'>
                                    <FormattedMessage
                                        id='Apis.Details.Environments.Environments.api.gateways.name'
                                        defaultMessage='Name'
                                    />
                                </TableCell>
                                <TableCell align='left'>
                                    <FormattedMessage
                                        id='Apis.Details.Environments.Environments.api.gateways.type'
                                        defaultMessage='Type'
                                    />
                                </TableCell>
                                <TableCell align='left'>
                                    <FormattedMessage
                                        id='Apis.Details.Environments.Environments.gateway.endpoints'
                                        defaultMessage='Endpoints'
                                    />
                                </TableCell>
                                {api && api.isDefaultVersion !== true
                                    ? (
                                        <TableCell align='left'>
                                            <FormattedMessage
                                                id='Apis.Details.Environments.Environments.gateway.deployed.revision'
                                                defaultMessage='Deployed Revision'
                                            />
                                        </TableCell>
                                    )
                                    : (
                                        <TableCell align='left'>
                                            <FormattedMessage
                                                id='Apis.Details.Environments.Environments.gateway.action'
                                                defaultMessage='Action'
                                            />
                                        </TableCell>
                                    )}
                                <TableCell align='left'>
                                    <FormattedMessage
                                        id='Apis.Details.Environments.Environments.display.in.devportal'
                                        defaultMessage='Display in Devportal'
                                    />
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {settings.environment.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component='th' scope='row'>
                                        {row.name}
                                    </TableCell>
                                    <TableCell align='left'>{row.type}</TableCell>
                                    {api.isWebSocket() ? (
                                        <>
                                            <TableCell
                                                align='left'
                                                className={classes.primaryEndpoint}
                                            >
                                                {row.endpoints.ws}
                                                <div className={classes.secondaryEndpoint}>
                                                    {row.endpoints.wss}
                                                </div>
                                            </TableCell>
                                        </>
                                    ) : (
                                        <>
                                            <TableCell align='left' className={classes.primaryEndpoint}>
                                                {row.endpoints.http}
                                                <div className={classes.secondaryEndpoint}>
                                                    {row.endpoints.https}
                                                </div>
                                            </TableCell>
                                        </>
                                    )}
                                    <TableCell align='left'>
                                        {allEnvRevision && allEnvRevision.filter(
                                            (o1) => {
                                                if (o1.deploymentInfo.filter(
                                                    (o2) => o2.name === row.name,
                                                ).length > 0) {
                                                    return o1;
                                                }
                                                return null;
                                            },
                                        ).length !== 0 ? (
                                                allEnvRevision && allEnvRevision.filter(
                                                    (o1) => {
                                                        if (o1.deploymentInfo.filter(
                                                            (o2) => o2.name === row.name,
                                                        ).length > 0) {
                                                            return o1;
                                                        }
                                                        return null;
                                                    },
                                                ).map((o3) => (
                                                    <div>
                                                        <Chip
                                                            label={o3.displayName}
                                                            style={{ backgroundColor: '#15B8CF' }}
                                                        />
                                                        <Button
                                                            className={classes.button1}
                                                            variant='outlined'
                                                            disabled={api.isRevision}
                                                            onClick={() => undeployRevision(o3.id, row.name)}
                                                            size='small'
                                                        >
                                                            <FormattedMessage
                                                                id='Apis.Details.Environments.Environments.undeploy.btn'
                                                                defaultMessage='Undeploy'
                                                            />
                                                        </Button>
                                                    </div>
                                                ))) : (
                                                // eslint-disable-next-line react/jsx-indent
                                                <div>
                                                    <FormControl
                                                        className={classes.formControl}
                                                        variant='outlined'
                                                        margin='dense'
                                                        size='small'
                                                    >
                                                        <InputLabel
                                                            disabled={allRevisions}
                                                            id='demo-simple-select-label'
                                                        >
                                                            <FormattedMessage
                                                                id='Apis.Details.Environments.Environments.select.rev'
                                                                defaultMessage='Select Revision'
                                                            />
                                                        </InputLabel>
                                                        <Select
                                                            labelId='demo-simple-select-helper-label'
                                                            id='demo-simple-select-helper'
                                                            disabled={api.isRevision}
                                                            onChange={handleSelect}
                                                        >
                                                            {allRevisions && allRevisions.map(
                                                                (number) => (
                                                                    <MenuItem value={number.id}>
                                                                        {number.displayName}
                                                                    </MenuItem>
                                                                ),
                                                            )}
                                                        </Select>
                                                    </FormControl>
                                                    <Button
                                                        className={classes.button2}
                                                        disabled={api.isRevision || !selectedRevision}
                                                        variant='outlined'
                                                        onClick={() => deployRevision(selectedRevision, row.name)}

                                                    >
                                                        <FormattedMessage
                                                            id='Apis.Details.Environments.Environments.deploy.button'
                                                            defaultMessage='Deploy'
                                                        />
                                                    </Button>
                                                </div>
                                            )}
                                    </TableCell>
                                    <TableCell align='left'>
                                        <Switch
                                            checked={row.showInApiConsole}
                                            onChange={handleChange}
                                            disabled={api.isRevision}
                                            name='checkedA'
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {!api.isWebSocket()
                    && (
                        <MicroGateway
                            selectedMgLabel={selectedMgLabel}
                            setSelectedMgLabel={setSelectedMgLabel}
                            mgLabels={mgLabels}
                            allRevisions={allRevisions}
                            allEnvRevision={allEnvRevision}
                            api={api}
                            updateAPI={updateAPI}
                        />
                    )}
                {
                    allDeployments
                    && (
                        allDeployments.map((clusters) => (clusters.name.toLowerCase() === 'kubernetes' && (
                            <Kubernetes
                                clusters={clusters}
                                selectedDeployments={selectedDeployments}
                                setSelectedDeployments={setSelectedDeployments}
                                api={api}
                            />
                        )))
                    )
                }
            </Box>
        </>
    );
}
