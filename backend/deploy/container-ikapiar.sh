podman ps -q --filter "name=ikapiar-backend" | grep -q . && \
podman stop ikapiar-backend && \
podman rm ikapiar-backend && \
podman pull ghcr.io/ikapiar/backend:latest && \
podman run -d --name ikapiar-backend --restart always --pull always --env-file /apps/ikapiar-backend/env -p 4000:4000 ghcr.io/ikapiar/backend:latest