/*dbAdmin = db.getSiblingDB("admin");
dbAdmin.createUser({
    user: 'chugong-user',
    pwd: 'chugong-password',
    roles: [{role: 'readWrite', db: 'chugong'}],
});

db = new Mongo().getDB('security');

dbAdmin.createUser({
    user: 'security-user',
    pwd: 'security-password',
    roles: [{role: 'readWrite', db: 'security'}],
});

db.getSiblingDB('security').createCollection('application.user')
*/
db.getSiblingDB('visitorsapp').createCollection('visitors');
//db.getSiblingDB('visitorsapp').createCollection('quests');
//db.getSiblingDB('visitorsapp').createCollection('questlines');