FROM gdssingapore/airbase:node-22
ENV NEXT_TELEMETRY_DISABLED=1
ENV SKIP_ENV_VALIDATION=1
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build
CMD [ "npm", "run", "start" ]