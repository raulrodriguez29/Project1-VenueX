<h2>About Flyway</h2>
<p>Flyway is a database version control tool. Adding files to this folder will allow you to make changes to the database. </p>

<h2>Flyway Guidelines</h2>
<h3>1. Never edit applied migrations</h3>

<p>Once a migration has been applied to any environment (dev, staging, production), never modify it.</p>

<p>Instead, create a new migration for any changes.</p>

Example:
<code>
V1__init.sql          # already applied
V2__add_users.sql     # new changes
</code>


<p>Editing old migrations can break other developers’ databases because Flyway tracks applied versions.</p>

<h3>2. Use descriptive names</h3>

<p>Flyway orders migrations by version number, so keep names clear:</p>

<code>
V3__add_index_to_orders.sql
V4__update_user_roles.sql
</code>
<br>

<p>Include what the migration does in the name — makes it easier to understand history. Also, double underscore.</p>

<h3>3.Always commit the migrations/sql folder</h3>

Track all migration files in GitHub.

Don’t track:

Temporary SQL scripts

Database dumps or generated folders (flyway/target/)

<h3>4. Running migrations locally</h3>

<p>After pulling changes from GitHub:</p>

<code>
flyway info       # see which migrations are pending
flyway migrate    # apply new migrations
</code>
<br>


<p>This ensures your local DB matches the repo.</p>



