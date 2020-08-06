<script>
    export let metadata = {
        title: 'svelte',
        description: 'description',
        image: `${process.env.IMG_URL}/static-images/sample.png`,
        imageAlt: 'image',
    };
</script>

<svelte:head>
    <title>{metadata.title}</title>
    <meta name="title" content={metadata.title} />
    <meta property="og:title" content={metadata.title} />
    <meta property="twitter:title" content={metadata.title} />

    <meta name="description" content={metadata.description} />
    <meta property="og:description" content={metadata.description} />
    <meta property="twitter:description" content={metadata.description} />

    <meta property="og:image" content={metadata.image} />
    <meta
    property="twitter:image"
    content={metadata.image}
    />

    <meta property="og:image:alt" content={metadata.imageAlt} />
    <meta property="twitter:image:alt" content={metadata.imageAlt} />

    <meta property="og:type" content="website" />

</svelte:head>