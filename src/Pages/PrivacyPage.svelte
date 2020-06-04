<script>
    import * as constants from '../assets/js/constants.js';
    import { onMount } from 'svelte';
    
    import Header   from '../Components/Header.svelte';
    import Footer   from '../Components/Footer.svelte';
    import Meta     from '../Components/Meta.svelte';
    import Privacy  from '../Components/Privacy.svelte';

    let scrollY;
    let metadata = {
        title: 'allius',
        description: '나의 브랜드로 만드는 기회',
        image: `${constants.IMG_URL}/static-images/meta_img_01.jpg`,
        imageAlt: '나의 브랜드로 만드는 기회',
        url:'https://home.allius.io'
    };

    onMount(() => {
        scrollY = 0;
    });

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

    <meta property="og:url" content={metadata.url} />
    <meta property="twitter:url" content={metadata.url} />

    <meta property="og:type" content="website" />
</svelte:head>

<Header />
<div class="sections">
    <Privacy />
</div>
<Footer />

<svelte:window bind:scrollY={scrollY}/>


<style lang="scss">
    @import '../assets/scss/common.scss'; 

    .sections {
        background-color: white;
        max-width: $wrapper;
        margin: 100px auto 0;
        padding: 0px 30px;
        font-size: $font-size * 0.8;
        font-family: $font-kr;
        word-break: keep-all;

        @include respond-to('w1000') {
            font-size: $font-size * 0.75;
        }

        @include respond-to('w800') {
            font-size: $font-size * 0.7;
        }

        @include respond-to('w600') {
            padding: 0 12px;
        }

    }

</style>