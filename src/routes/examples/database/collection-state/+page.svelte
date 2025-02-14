<script lang="ts">
  import { CollectionState } from "$lib/database/CollectionState.svelte.js";
  import { databases } from "$lib/../www-lib/appwrite.js";

  const appwriteTasksState = new CollectionState(
    databases,
    "database",
    "tasks"
  ); // this is typed well
</script>

<h1>Collection State</h1>

{JSON.stringify(appwriteTasksState.documents)}

{#if appwriteTasksState.documents}
  <h3>
    {#each appwriteTasksState.documents as task} 
    <!-- // Argument of type 'TasksCollectionAttributes' is not assignable to parameter of type 'ArrayLike<unknown> | Iterable<unknown>'.ts(2345): this needs to be typed, but right now its not -->
      {task.title}
       <!-- // 'task' is of type 'unknown'.ts(18046) : this needs to be typed, but right now its not -->
    {/each}
  </h3>
{/if}
