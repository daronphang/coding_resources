### CI/CD Pipeline

Continuous Integration is the process where software is built and initial tests are completed. Continuous Deployment is the process of combining code with infrastructure, ensuring all tests are completed and policies followed.

CI/CD pipelines are a practice focused on improving software delivery using either a DevOps or Site Reliability Engineering (SRE) approach. A series of steps that must be performed in order to deliver a new version of software. Introduces monitoring and automation to improve the process of application development. Pipeline elements include:

1. Build: Stage where application is compiled.
2. Test: Stage where code is tested.
3. Release: Stage where application is delivered to repository.
4. Deploy: Stage where code is deployed to production.
5. Validation and Compliance: Determined by needs of organization.

#### Benefits

- Developers can stay focused on writing code and monitoring the behavior of the system in production.
- QA and product stakeholders have easy access to the latest, or any, version of the system.
- Product updates are not stressful.
- Logs of all code changes, tests and deployments are available for inspection at any time.
- Rolling back to a previous version in the event of a problem is a routine push-button action.
- A fast feedback loop helps build an organizational culture of learning and responsibility.

Good CI/CD pipeline is fast, reliable and accurate.

### Best Practices with Docker

- Before optimization, think how inner loop (code, build, run, test) relates with outer loop (push change, CI build, CI test, deployment).
- Use Docker Hub access token when setting up CI rather than password.
- Reduce build time and number of calls by making use of build cache to reuse layers that have been pulled.
- Have release images goto DockerHub.

```yaml
name: CI to Docker Hub
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Check Out Repo
        uses: actions/checkout@v2

      - name: Login to Docker Hub
        uses: docker/login-action@v1
        with:
          username: ${{ secrets.DOCKER_HUB_USERNAME }}
          password: ${{ secrets.DOCKER_HUB_ACCESS_TOKEN }}

      - name: Set up Docker Buildx
        id: buildx
        uses: docker/setup-buildx-action@v1

      - name: Build and push
        id: docker_build
        uses: docker/build-push-action@v2
        with:
          context: ./
          file: ./Dockerfile
          push: true
          tags: ${{ secrets.DOCKER_HUB_USERNAME }}/simplewhale:latest

      - name: Image digest
        run: echo ${{ steps.docker_build.outputs.digest }}
```
