<script lang="ts">
  import { CollectionState } from "$lib/database/CollectionState.svelte.js";
  import { databases } from "$lib/../www-lib/appwrite.js";

  const appwriteTasksState = new CollectionState(
    databases,
    "database",
    "tasks"
  );
</script>

<h1>Collection State</h1>

{JSON.stringify(appwriteTasksState.documents)}

{#if appwriteTasksState.documents}
  <h3>
    {#each appwriteTasksState.documents as task}
      {task.title}
    {/each}
  </h3>
{/if}
