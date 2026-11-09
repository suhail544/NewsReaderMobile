import express from "express";
import articleRoutes from "./routes/article.routes";
import rssRoutes from './routes/rss.routes'
import sourceRoutes from "./routes/source.routes";
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", articleRoutes);
app.use('/api', rssRoutes)
app.use("/api", sourceRoutes);

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});