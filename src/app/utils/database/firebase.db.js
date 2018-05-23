
import { fireDBConfig } from '../config/db.config';
import firebase from 'firebase';

let config = fireDBConfig;
firebase.initializeApp(config);

let database = firebase.database();

export { firebase, database as default };