// backend/database.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run("CREATE TABLE status (batteryLevel INTEGER, status TEXT)");
    db.run("INSERT INTO status (batteryLevel, status) VALUES (75, 'active')");

    db.run("CREATE TABLE logs (id INTEGER PRIMARY KEY, log TEXT)");
    const stmt = db.prepare("INSERT INTO logs (log) VALUES (?)");
    stmt.run("Started cleaning");
    stmt.run("Docked for charging");
    stmt.run("Battery at 80%");
    stmt.run("Resumed cleaning");
    stmt.finalize();

    db.run("CREATE TABLE historical (time TEXT, batteryLevel INTEGER)");
    const stmtHist = db.prepare("INSERT INTO historical (time, batteryLevel) VALUES (?, ?)");
    stmtHist.run("2023-05-20T12:00:00Z", 90);
    stmtHist.run("2023-05-20T13:00:00Z", 85);
    stmtHist.run("2023-05-20T14:00:00Z", 80);
    stmtHist.finalize();
});

module.exports = db;
