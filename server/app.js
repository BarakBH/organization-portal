const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Mock user database
// let users = [
//   { id: 1, firstName: 'יוסי', lastName: 'כהן', displayName: 'יוסי כהן', birthDate: new Date('19.01.92'), telephone: '0747400774', pelephone: '054-5049877', agaf: 'אגף טכנולוגיות', hativa: 'חטיבת טכנולוגית', mahlaka: 'ניתוח מערכות', role: 'מנהל מחלקת ניתוח מערכות', birthdayNot: true, displayPic: true },
//   { id: 2, firstName: 'אברהם', lastName: 'דהני', displayName: 'אברהם', birthDate: new Date('11.05.90'), telephone: '025544877', pelephone: '056-5978542', agaf: 'אגף תכנון', hativa: 'חטיבת יישומים', mahlaka: 'ניתוח מערכות', role: 'מנתח מערכות', birthdayNot: true, displayPic: true },
//   { id: 3, firstName: 'אודי', lastName: 'יוסף', displayName: 'אודי יוסף', birthDate: new Date('01.12.80'), telephone: '0348945645', pelephone: '050-0450455', agaf: 'אגף ביצוע', hativa: 'חטיבת ביצועים', mahlaka: 'ניתוח מערכות', role: 'ביצוען', birthdayNot: true, displayPic: true },
//   { id: 4, firstName: 'בניה', lastName: 'יועז', displayName: 'בניה', birthDate: new Date('07.11.78'), telephone: '022727555', pelephone: '053-3121137', agaf: 'אגף ביצוע', hativa: 'חטיבת ביצועים', mahlaka: 'ניתוח מערכות', role: 'ביצוען', birthdayNot: true, displayPic: true },
//   { id: 5, firstName: 'גל', lastName: 'הדר', displayName: 'גלוש', birthDate: new Date('21.12.88'), telephone: '07707224555', pelephone: '050-9589447', agaf: 'אגף עיצוב', hativa: 'חטיבת עיצובים', mahlaka: 'ניתוח מערכות', role: 'מפתח', birthdayNot: true, displayPic: true },
//   { id: 6, firstName: 'טוביה', lastName: 'כהן', displayName: 'טוביה', birthDate: new Date('27.07.78'), telephone: '045757575', pelephone: '054-1941565', agaf: 'אגף תכנון', hativa: 'חטיבת תכנונים', mahlaka: 'ניתוח מערכות', role: 'מנתח', birthdayNot: true, displayPic: true },
// ];

let user = { userID: 1, firstName: 'יוסי', lastName: 'כהן', displayName: 'יוסי כהן', year: '1992', month: '01', day: '19', telephone: '0747400774', pelephone: '054-5049877', agaf: 'אגף טכנולוגיות', hativa: 'חטיבת טכנולוגית', mahlaka: 'ניתוח מערכות', role: 'מנהל מחלקת ניתוח מערכות', receiveBirthdayNotifications: true, showProfilePicture: true };

// Routes

// Fetch user details
app.get('/user', (req, res) => {
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Update user details
app.put('/user', (req, res) => {
  const { displayName, year, month, day, telephone, pelephone, role, receiveBirthdayNotifications, showProfilePicture } = req.body;

  if (user) {
    user.displayName = displayName;
    user.year = year;
    user.month = month;
    user.day = day;
    user.telephone = telephone;
    user.pelephone = pelephone;
    user.role = role;
    user.receiveBirthdayNotifications = receiveBirthdayNotifications;
    user.showProfilePicture = showProfilePicture;
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
