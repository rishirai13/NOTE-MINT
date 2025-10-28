import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import getPort from "get-port";
import chalk from "chalk";

const app = express();

// 🧩 Extend IncomingMessage to capture raw body
declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

// 🧠 Parse JSON + Capture Raw Body
app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use(express.urlencoded({ extended: false }));

// 📜 Request Logging Middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      const method = chalk.cyan(req.method);
      const statusColor =
        res.statusCode >= 500
          ? chalk.red
          : res.statusCode >= 400
          ? chalk.yellow
          : chalk.green;

      let logLine = `${method} ${path} ${statusColor(res.statusCode)} in ${duration}ms`;
      if (capturedJsonResponse) logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      if (logLine.length > 120) logLine = logLine.slice(0, 119) + "…";

      log(`[${new Date().toLocaleTimeString()}] ${logLine}`);
    }
  });

  next();
});

// 🚀 Bootstrap Function
(async () => {
  try {
    // Register all app routes
    const server = await registerRoutes(app);

    // 🧱 Centralized Error Handler
    app.use(
      (err: any, _req: Request, res: Response, _next: NextFunction) => {
        const status = err.status || err.statusCode || 500;
        const message = err.message || "Internal Server Error";
        console.error(chalk.red(`❌ Error: ${message}`), err.stack || "");
        res.status(status).json({ message });
      }
    );

    // ⚙️ Setup Environment (Dev or Prod)
    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    // 🧩 Determine Safe Host + Auto Port
    const desiredPort = parseInt(process.env.PORT || "5000", 10);
    const port = await getPort({ port: desiredPort });
    const host =
      process.env.HOST ||
      (process.env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1");

    // 🌐 Start Server
    server.listen(port, host, () => {
      const url = `http://${host}:${port}`;
      console.log(chalk.greenBright(`✅ Server running on ${url}`));
      if (port !== desiredPort) {
        console.warn(chalk.yellow(`⚠️ Port ${desiredPort} was busy — using ${port} instead.`));
      }
    });

    // 🧹 Graceful Shutdown
    const shutdown = (signal: string) => {
      console.log(chalk.gray(`\nReceived ${signal}, shutting down gracefully...`));
      server.close(() => {
        console.log(chalk.gray("Server closed. Bye 👋"));
        process.exit(0);
      });
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("uncaughtException", (err) => {
      console.error(chalk.red("💥 Uncaught Exception:"), err);
      shutdown("uncaughtException");
    });
  } catch (err) {
    console.error(chalk.red("❌ Failed to start server:"), err);
    process.exit(1);
  }
})();
