<h2>Docker Compose for Shared Database Schema</h2>
<p>The docker-compose.yml file will automatically set up a preconfigured database with version control. It does this by coordinating two containers, a postgres container and a flyway container.</p>
<p>Run <code>docker compose up</code> from the project directory to start running both containers.</p>
<p><code>docker compose down</code> will stop the containers.</p>
