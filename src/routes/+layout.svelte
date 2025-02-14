<script lang="ts">
  const { children } = $props();
</script>

<header>
  <nav>
    <h3>Examples:</h3>
    <ul>
      <li>
        <a href="/examples/database/collection-state">collection-state</a>
      </li>
      <li><a href="/examples/database/document-state">document-state</a></li>
    </ul>
  </nav>
</header>

<main>
    {@render children?.()}
</main>

<footer></footer>
