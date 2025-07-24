FROM node:18

COPY package.json package-lock.json* ./

RUN npm install

WORKDIR /app

COPY . .

RUN npm run build

# Install serve globally
RUN npm install -g serve

# Expose port 5000 (default serve port)
EXPOSE 3000

# Serve the built files from /app/dist
CMD ["serve", "-s", "dist", "-l", "3000"]
