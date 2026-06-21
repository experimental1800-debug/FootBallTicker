import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import {
  fetchCachedWorldCupEventsFromWorldCup26,
  getFallbackWorldCupEvents,
} from './src/lib/worldCupEvents';

function worldCupEventsApiPlugin() {
  const handleRequest = async (res: { setHeader: (name: string, value: string) => void; statusCode: number; end: (body: string) => void; }) => {
    res.setHeader('Content-Type', 'application/json');

    try {
      const payload = await fetchCachedWorldCupEventsFromWorldCup26();

      res.statusCode = 200;
      res.end(JSON.stringify(payload));
    } catch (error) {
      const message =
        error instanceof Error
          ? `${error.message}. Falling back to the built-in schedule.`
          : 'Unable to reach worldcup26.ir. Falling back to the built-in schedule.';

      res.statusCode = 200;
      res.end(JSON.stringify(getFallbackWorldCupEvents(message)));
    }
  };

  return {
    name: 'world-cup-events-api',
    configureServer(server: {
      middlewares: {
        use: (
          handler: (
            req: { url?: string },
            res: { setHeader: (name: string, value: string) => void; statusCode: number; end: (body: string) => void; },
            next: () => void
          ) => void | Promise<void>
        ) => void;
      };
    }) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.split('?')[0] !== '/api/world-cup-events') {
          next();
          return;
        }

        await handleRequest(res);
      });
    },
    configurePreviewServer(server: {
      middlewares: {
        use: (
          handler: (
            req: { url?: string },
            res: { setHeader: (name: string, value: string) => void; statusCode: number; end: (body: string) => void; },
            next: () => void
          ) => void | Promise<void>
        ) => void;
      };
    }) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.split('?')[0] !== '/api/world-cup-events') {
          next();
          return;
        }

        await handleRequest(res);
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), worldCupEventsApiPlugin()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
