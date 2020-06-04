<script>
    export let typeText = false;
    export let paddingTop = 20;
    export let paddingBottom = 20;
    export let borderStyle = "solid";
    export let borderColor = "#000000";
    export let borderWidth = 1;
    export let text = "";
    export let fontColor = borderColor;
    export let textPadding = "4px";
    export let fontSize = "1em"

</script>
<div class="seperator-wrapper">
    {#each [0,1] as item}
        <div class="col">
            <div 
                class="row-upper"
                style="height: {paddingTop-borderWidth}px; border-bottom: {borderWidth}px {borderStyle} {borderColor};"
            ></div>
            <div 
                class="row-lower"
                style="height: {paddingBottom}px;"
            ></div>
        </div>
        {#if typeText && (item === 0)}
            <p
                style="color: {fontColor}; padding: 0 {textPadding}px; font-size: {fontSize};">{text}</p>
        {/if}
    {/each}
</div>

<style lang="scss">
    .seperator-wrapper {
        width: 100%;
        font-family: inherit;
        display: flex;

        .col {
            display:flex;
            flex-direction: column;
            flex-grow: 1;
        }

        p {
            flex-grow: 0;
        }

    }
</style>