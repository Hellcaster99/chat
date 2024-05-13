FROM node:latest AS FIRST_BUILD

WORKDIR /app/client

COPY package*.json ./
COPY vite.config.js ./

RUN npm install

COPY . .

RUN npm run build

# # Production stage
# FROM node:latest
# COPY --from=FIRST_BUILD /app/client/dist /usr/share/nginx/html

EXPOSE 5173

CMD ["npm", "run", "preview"]