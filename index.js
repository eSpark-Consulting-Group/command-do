/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import CronJob from "react-native-cron-job";
import messaging from '@react-native-firebase/messaging';
import Notification from './src/utils/Notification';

messaging().setBackgroundMessageHandler(async (notification) => {
    console.log('Message handled in the background!', notification);
});

messaging().onMessage(async (notification) => {
    console.log('Notification handled in the Foreground!', notification);
});

async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
    }
}

requestUserPermission();


const CronJobTask = async () => {

      // Do your task here.
        Notification.schduleNotification(new Date())

      // Be sure to call completeTask at the end.
      CronJob.completeTask();
};

CronJob.startCronJob(9,0); // starts cronjob everyday at 09:00 AM
CronJob.startCronJob(12,0); // starts cronjob everyday at 12:00 PM


AppRegistry.registerHeadlessTask('CRONJOB', () => CronJobTask);
AppRegistry.registerComponent(appName, () => App);
