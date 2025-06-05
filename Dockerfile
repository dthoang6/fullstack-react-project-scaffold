# Define node image base and tag it AS build to enables multi stage builds in Docker
FROM node:20 AS build

# During build time, set the VITE_BACKEND_URL environment variable by using ARG instruction
ARG VITE_BACKEND_URL=http://localhost:3001/api/v1

WORKDIR /build
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
# create a static vuild of our Vite app
RUN npm run build

# Final Stage
# Run an nginx web server
FROM nginx AS final
WORKDIR /usr/share/nginx/html
# Copy everthing from the built stage into the final stage
COPY --from=build /build/dist .