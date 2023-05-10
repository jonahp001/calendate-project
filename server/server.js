import 'dotenv/config';
import express from 'express';
import errorMiddleware from './lib/error-middleware.js';
import pg from 'pg';

// eslint-disable-next-line no-unused-vars -- Remove when used
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/build', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.get('/api/entries/:userId', async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    if (!Number.isInteger(userId) || userId < 1) {
      res.status(400).json({ error: 'userId must be a positive integer' });
      return;
    }
    const sql = `
      select *
        from "entries"
        where "userId" = $1
    `;
    const params = [userId];
    const result = await db.query(sql, params);
    const entry = result.rows;
    res.status(200).json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'an unexpected error occurred' });
  }
});

app.post('/api/entries/:userId', async (req, res) => {
  try {
    const { newEventDescription, newStartTime, newEndTime, newNote, calendarDate } = req.body;
    const userId = Number(req.params.userId);
    if (!Number.isInteger(userId) || userId < 1) {
      res.status(400).json({ error: 'userId must be a positive integer' });
      return;
    }
    const sql = `
      insert into "entries" ("eventDescription", "startTime", "endTime", "notes", "userId", "eventDate")
        values ($1, $2, $3, $4, 1, $5)
        returning *
    `;
    const params = [newEventDescription, newStartTime, newEndTime, newNote, calendarDate];
    const result = await db.query(sql, params);
    const [entry] = result.rows;
    res.status(201).json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'an unexpected error occurred' });
  }
});

app.patch('/api/entries/:userId/:entryId', async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const entryId = Number(req.params.entryId);
    if (!Number.isInteger(userId) || userId < 1) {
      res.status(400).json({ error: 'userId must be a positive integer' });
      return;
    }
    const { newEventDescription, newStartTime, newEndTime, newNote, calendarDate } = req.body;
    const sql = `
      update "entries"
        set "eventDescription" = $1,
            "startTime" = $2,
            "endTime" = $3,
            "notes" = $4,
            "eventDate" = $5
      where "entryId" = $6
      returning *
    `;
    const params = [newEventDescription, newStartTime, newEndTime, newNote, calendarDate, entryId];
    const result = await db.query(sql, params);
    const [entry] = result.rows;
    if (!entry) {
      res.status(404).json({ error: `cannot find entry with entryId ${entryId}` });
      return;
    }
    res.json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'an unexpected error occurred' });
  }
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
