<script>
    import * as constants   from '../assets/js/constants.js';
    export let metadata = {
        title: 'allius',
        description: '나의 브랜드로 만드는 기회',
        image: `${constants.IMG_URL}/static-images/meta_img_01.jpg`,
        imageAlt: '나의 브랜드로 만드는 기회',
        url:'https://home.allius.io'
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