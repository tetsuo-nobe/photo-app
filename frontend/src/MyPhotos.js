import React, { useState, useEffect } from 'react';
import { Storage, API } from 'aws-amplify';
import { PhotoPicker } from 'aws-amplify-react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import PhotoAlbumIcon from '@material-ui/icons/PhotoAlbum';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { makeStyles } from '@material-ui/core/styles';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
    <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-prevent-tabpanel-${index}`}
        aria-labelledby={`scrollable-prevent-tab-${index}`}
        {...other}>
        {value === index && <Box p={3}>{children}</Box>}
    </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-prevent-tab-${index}`,
        'aria-controls': `scrollable-prevent-tabpanel-${index}`,
    };
}

function MyPhotos(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    if (!props.authState) {
        return (
            <div className="jumbotron" >
                <h2>Welcome to My Photo App. <br></br>Let's develop this application.</h2>
            </div>
        );
    }

    if (props.authState === "signedIn") {
        return (
            <div>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    indicatorColor="secondary"
                    textColor="secondary"
                    aria-label="icon label tabs example">
                    <Tab icon={<PhotoAlbumIcon />} label="Photos" aria-label="photos" {...a11yProps(0)} />
                    <Tab icon={<AddAPhotoIcon />} label="Upload" aria-label="upload" {...a11yProps(1)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <MyPhotoList authData={props.authData} authState={props.authState} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <MyPhotoPicker authData={props.authData} authState={props.authState} />
                </TabPanel>
            </div>
        );
    }
    return (
        <div></div>
    );
}

const usePhotoListStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    gridList: {
        width: 900
    },
}));

function MyPhotoList(props) {
    const classes = usePhotoListStyles();
    const [photos, setPhotos] = useState([]);

    /*
    useEffect(() => {
        const fetch = async () => {
            API.get('photo-api', '/photos/' + props.authData.username, {headers: {}, response: true}).then(response => {
                var data = response.data;
                setPhotos(data.Items);
            })
        };
        fetch();
    }, []);
    */

    if (photos.length === 0) {
        return (
            <div>No Photos !</div>
        )
    }

    return (
        <div className={classes.root}>
            <GridList cellHeight="auto" cols={3} className={classes.gridList}>
            {
                photos.map((photo) => (
                    <MyPhotoItem key={photo.objectkey} photo={photo} />
                ))
            }
            </GridList>
        </div>
    );
}

function MyPhotoItem(props) {
    var objectkey = props.photo.objectkey;
    var labels = props.photo.labels;
    var preSignedURL = props.photo.preSignedURL;
    return (
        <GridListTile key={objectkey} style={{ height: '300px', width: '300px' }}>
            <img src={preSignedURL} alt={objectkey} />
            <GridListTileBar
                title={labels.join(',')}
            />
        </GridListTile>
    )
}

function MyPhotoPicker(props) {
    var now = new Date();
    return (
        <PhotoPicker preview
            onPick={data => {
                const { file } = data;
                /*
                Storage.put(now.getTime() + '_' + file.name, file, {
                    level: 'private',
                    contentType: file.type,
                    metadata: {
                        username: props.authData.username
                    }
                })
                .then (result => alert('Upload Successful 👍'))
                .catch(error => alert(error))
                */
            }}
        />
    )
}

export default MyPhotos;
