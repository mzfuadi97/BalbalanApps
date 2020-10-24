var webPush = require('web-push');
   
const vapidKeys = {
   "publicKey": "BHyyHZa6KkiVWjnCwwXecxA2jVxNeNwpM2Ah1RzTHx2EipkXSwKk_8AfiMZ83lDji42idbcIeMI2PULIRfhH7Os",
   "privateKey": "HU0eVKq9Ynl2qNkgd_KBnCjLSAs2biUVV9uRx9w-lE0"
};


webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dFgtrGsilNI:APA91bE3dcAmLb2MPy9crWi5XSAdBNroqG0QBbz63qtYvgk4NX7PziR21fv0wLuKa1h3xQBoEklipiPvAbUAn3GGTtW61KhYJDe16hLcW1pZDB0g8qwg2ESEKxv2KA1bAp7LZuDd7keC",
   "keys": {
	  "p256dh": "BIZKij62jXrQPQ7X4KUcuELY0kcpOESBMzHwuIylD4AkoR7swTB4lTjts5kjE6AUgUYupO0YFDWVx0dnW9XbFsM=",
	  "auth": "ZclmcPFyPfH2bv4gZ85Vpg=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
   gcmAPIKey: '630825191173',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);