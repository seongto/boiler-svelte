<script>
    export let tagType;
    export let className;
    export let context;

    let textArray = context.split("\n");

</script>

{#if tagType === "h1"}
    <slot></slot>
    {#each textArray as item}
        <h1 class={className}>{item}</h1>
    {/each}
{:else if tagType === "h2"}
    <slot></slot>
    {#each textArray as item}
        <h2 class={className}>{item}</h2>
    {/each}
{:else if tagType === "h3"}
    <slot></slot>
    {#each textArray as item}
        <h3 class={className}>{item}</h3>
    {/each}
{:else if tagType === "span"}
    <slot></slot>
    {#each textArray as item}
        <span class={className}>{item}</span>
    {/each}
{:else}
    <slot></slot>
    {#each textArray as item}
        <p class={className}>{item}</p>
    {/each}
{/if}


<style lang="scss">

</style>